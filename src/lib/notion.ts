import { Client, collectAllDataSourceRows, isFullDatabase, isFullPage } from "@notionhq/client";
import type { DatabaseObjectResponse, PageObjectResponse } from "@notionhq/client";
import { unstable_cache } from "next/cache";

// This project targets Notion API version 2025-09-03 (@notionhq/client v5+),
// where `databases.query` no longer exists: a database can hold several data
// sources, and querying happens on a data source via `dataSources.query`
// (here via the `collectAllDataSourceRows` pagination helper). A database
// created from the standard "New database" UI only ever has one data source.

// The live SEO database has no "Statut" property (confirmed against the real
// schema), so there's currently no draft/published gate — every row in the
// database is fetched. Add a Statut filter here once that property exists.

const SLUG_PROPERTY = "Slug";
const TARGET_KEYWORD_PROPERTY = "TargetKeyword";
const META_TITLE_PROPERTY = "MetaTitle";
const META_DESCRIPTION_PROPERTY = "MetaDescription";

export interface SeoPage {
  id: string;
  slug: string;
  targetKeyword: string;
  metaTitle: string;
  metaDescription: string;
}

function getClient(): Client {
  const auth = process.env.NOTION_API_KEY;
  if (!auth) {
    throw new Error("NOTION_API_KEY is not configured");
  }
  return new Client({ auth });
}

function requireDatabaseId(): string {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) {
    throw new Error("NOTION_DATABASE_ID is not configured");
  }
  return databaseId;
}

async function resolveDataSourceId(client: Client): Promise<string> {
  const databaseId = requireDatabaseId();
  const database: DatabaseObjectResponse | { object: "database"; id: string } =
    await client.databases.retrieve({ database_id: databaseId });

  if (!isFullDatabase(database) || database.data_sources.length === 0) {
    throw new Error(`Notion database ${databaseId} has no queryable data source`);
  }
  if (database.data_sources.length > 1) {
    console.warn(
      `[notion] database ${databaseId} has ${database.data_sources.length} data sources; using the first one ("${database.data_sources[0].name}")`
    );
  }
  return database.data_sources[0].id;
}

function getPlainText(property: PageObjectResponse["properties"][string] | undefined): string {
  if (!property) return "";
  if (property.type === "rich_text") {
    return property.rich_text.map((item) => item.plain_text).join("");
  }
  if (property.type === "title") {
    return property.title.map((item) => item.plain_text).join("");
  }
  return "";
}

function mapPageToSeoPage(page: PageObjectResponse): SeoPage | null {
  const slug = getPlainText(page.properties[SLUG_PROPERTY]);
  if (!slug) return null;

  return {
    id: page.id,
    slug,
    targetKeyword: getPlainText(page.properties[TARGET_KEYWORD_PROPERTY]),
    metaTitle: getPlainText(page.properties[META_TITLE_PROPERTY]),
    metaDescription: getPlainText(page.properties[META_DESCRIPTION_PROPERTY]),
  };
}

async function fetchSeoPagesFromNotion(): Promise<SeoPage[]> {
  const client = getClient();
  const dataSourceId = await resolveDataSourceId(client);

  const rows = await collectAllDataSourceRows(client, {
    data_source_id: dataSourceId,
  });

  const pages: SeoPage[] = [];
  for (const row of rows) {
    if (!isFullPage(row)) continue;
    const seoPage = mapPageToSeoPage(row);
    if (seoPage) pages.push(seoPage);
  }
  return pages;
}

/**
 * Cached for 1h and tagged `seo-pages` so the on-demand revalidation webhook
 * (src/app/api/revalidate/route.ts) can bust just this data with
 * `revalidateTag('seo-pages')` instead of forcing a full rebuild.
 */
export const getSeoPages = unstable_cache(fetchSeoPagesFromNotion, ["notion-seo-pages"], {
  tags: ["seo-pages"],
  revalidate: 3600,
});
