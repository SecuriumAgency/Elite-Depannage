export const GTM_IDS = {
  "elite-depannage-34.fr": "GTM-N9RM57JQ",
  "www.elite-depannage-34.fr": "GTM-N9RM57JQ",
  // Ajoute les autres domaines (tenants) ici plus tard
} as const;

export type TenantDomain = keyof typeof GTM_IDS;
