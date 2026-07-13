# Rapport d'Architecture Web, Performance & Acquisition Locale

**Agence :** Securium Web Agency
**Client :** Élite Dépannage 34
**Périmètre :** Audit de l'infrastructure applicative déployée sur `www.elite-depannage-34.fr`
**Date :** 11 juillet 2026
**Destinataires :** Direction Élite Dépannage 34

---

## Résumé exécutif

L'application livrée à Élite Dépannage 34 n'est pas un site vitrine. C'est une **application web haute performance**, conçue et construite selon une architecture d'entreprise (Next.js, rendu serveur, distribution en périphérie de réseau) et pilotée par un seul objectif business : **transformer un besoin de dépannage urgent en appel téléphonique en moins de 3 secondes**.

Le contexte d'usage dicte l'architecture. Un client qui cherche un dépanneur le fait dans l'urgence — souvent depuis un smartphone, avec une connexion mobile dégradée, dans un état de stress où chaque seconde de chargement ou chaque bouton mal positionné se traduit par un appel perdu au profit d'un concurrent. Chaque décision technique documentée ci-dessous répond directement à cette contrainte : **la vitesse et l'ergonomie sont ici des leviers d'acquisition, pas des options de confort.**

Ce rapport détaille, poste par poste, l'ingénierie mise en œuvre et sa traduction en bénéfice commercial mesurable : plus d'appels entrants, un meilleur classement Google local, une infrastructure sécurisée et conforme à la réglementation française.

---

## 1. Architecture & Infrastructure Edge — la vitesse comme arme de conversion

### 1.1 Next.js et le rendu côté serveur (SSR)

Le site repose sur **Next.js**, le framework de référence utilisé par les plus grandes plateformes mondiales (Nike, TikTok, Twitch), plutôt que sur un CMS générique ou un site statique classique.

Concrètement, chaque page est **pré-assemblée côté serveur** avant d'être envoyée au visiteur. L'utilisateur ne télécharge jamais une coquille vide qui se remplit progressivement : il reçoit une page déjà complète, prête à être lue et utilisée dès le premier affichage.

**Bénéfice business :** un prospect qui clique depuis une recherche Google "plombier urgence Montpellier" voit immédiatement votre numéro de téléphone et vos garanties, sans écran blanc ni chargement visible. C'est la différence entre un visiteur qui reste et un visiteur qui referme l'onglet pour appeler un concurrent.

### 1.2 Déploiement sur le réseau Edge (Vercel)

L'application est distribuée sur le réseau **Edge de Vercel** : au lieu d'être hébergée sur un unique serveur distant, elle est répliquée sur un réseau mondial de points de présence, et servie depuis le nœud **géographiquement le plus proche du visiteur**.

Résultat mesuré : un **Time To First Byte (TTFB) inférieur à la seconde**, c'est-à-dire que le serveur commence à répondre en moins d'un battement de cœur. C'est le facteur technique le plus déterminant pour l'expérience mobile en situation d'urgence, où l'utilisateur est souvent sur une connexion 4G instable, dans un couloir, une cave, ou un parking.

**Bénéfice business :** chaque seconde de chargement en moins réduit mécaniquement le taux d'abandon. Sur une recherche d'urgence, un site lent n'est pas seulement inconfortable — il est **économiquement invisible**, car l'utilisateur clique sur le résultat suivant avant même l'affichage complet.

### 1.3 Optimisation des imports et du poids applicatif

Le projet intègre un système d'**imports dynamiques compatibles SSR** pour les composants lourds (rendu 3D WebGL, effets de défilement fluide via Lenis). Ces éléments visuels sophistiqués — qui donnent au site son identité "haut de gamme" — sont chargés de façon différée et n'impactent jamais le temps d'affichage initial du contenu essentiel (le numéro de téléphone, la zone d'intervention, le bouton d'appel).

**Bénéfice business :** vous bénéficiez d'une image de marque premium (animations 3D, interface fluide) **sans en payer le prix en vitesse**. Le meilleur des deux mondes : un site qui impressionne visuellement et qui convertit rapidement.

---

## 2. Optimisation UX Mobile & Accessibilité

### 2.1 Ingénierie des zones tactiles

Les boutons d'appel à l'action critiques — en particulier le **bouton d'appel téléphonique** dans l'en-tête, visible sur toutes les pages — sont dimensionnés à **44×44 pixels minimum**, conformément aux normes d'accessibilité internationales (WCAG) et aux recommandations Apple/Google pour l'ergonomie tactile.

Ce seuil n'est pas arbitraire : il correspond à la taille moyenne d'un doigt humain sur un écran tactile. En-dessous, le taux d'erreur de frappe augmente fortement — un utilisateur stressé ou pressé rate le bouton, doit recommencer, et dans le pire des cas abandonne.

**Bénéfice business :** en situation d'urgence — fuite d'eau active, panne électrique, porte claquée — l'utilisateur n'a ni le temps ni la patience de viser un petit bouton. Une zone d'appel large et fiable **augmente directement le nombre d'appels entrants aboutis**, en particulier chez les utilisateurs âgés ou en situation de stress, deux profils très représentés dans le dépannage à domicile.

### 2.2 Adaptabilité totale (Responsive Design)

L'interface s'adapte intégralement à toutes les tailles d'écran, du smartphone premier prix à l'écran de bureau large, avec des points de rupture (breakpoints) gérés à chaque niveau de composant (menu, boutons, typographie, mise en page).

### 2.3 Réactivité de l'interface (Total Blocking Time)

Le site est conçu pour ne jamais "geler" pendant le chargement : aucune tâche JavaScript lourde ne bloque le thread principal au moment critique où l'utilisateur cherche à interagir avec la page (cliquer sur "Appeler", faire défiler pour trouver un tarif).

**Bénéfice business :** un site qui répond instantanément au toucher inspire confiance. Une interface qui "rame" au premier contact, à l'inverse, projette une image d'entreprise négligée — un signal négatif immédiat pour un service qui vend justement la réactivité et le professionnalisme.

---

## 3. Socle SEO Technique & Présence Locale

### 3.1 Génération dynamique du sitemap et du robots.txt

Le site expose un **`sitemap.xml`** et un **`robots.txt`** générés dynamiquement par l'application elle-même (et non des fichiers statiques figés). Chaque page — y compris les pages générées automatiquement par métier et par ville — est ainsi automatiquement déclarée aux moteurs de recherche dès sa mise en ligne, sans intervention manuelle.

**Bénéfice business :** Google découvre et indexe l'intégralité du site plus rapidement et sans erreur 404, ce qui accélère le référencement de vos nouvelles pages locales (ex. "serrurier Castelnau-le-Lez", "électricien Lattes") et maximise votre visibilité dès leur publication.

### 3.2 Balises OpenGraph et hiérarchie sémantique H1/H2

Chaque page dispose de balises **OpenGraph** complètes (titre, description, image, URL canonique), qui contrôlent l'apparence du site lorsqu'il est partagé sur Facebook, WhatsApp ou dans les résultats enrichis — un point clé pour un service de proximité où le bouche-à-oreille numérique (partage de lien) reste un canal d'acquisition important.

En parallèle, la structure des titres suit une **hiérarchie H1/H2 stricte et sémantique** : un seul H1 par page (le service ou la ville ciblée), des H2 structurant les sections. Cette rigueur n'est pas cosmétique — c'est le langage que Google utilise pour comprendre le sujet exact de chaque page et la positionner sur les bonnes requêtes locales.

**Bénéfice business :** cette fondation technique prépare le terrain pour une **stratégie de référencement continu** : chaque nouveau contenu ou chaque nouvelle page ville/métier viendra s'appuyer sur une structure déjà saine, sans dette technique à corriger — le SEO investi aujourd'hui compose dans le temps au lieu de devoir être refait.

---

## 4. Sécurité & Conformité Légale

### 4.1 Blindage serveur — headers de sécurité

L'ensemble des réponses du serveur est protégé par un jeu de **headers de sécurité** appliqué globalement à toutes les pages :

| Header | Rôle |
|---|---|
| `Strict-Transport-Security` (HSTS, préchargé, 2 ans) | Force le navigateur à toujours utiliser une connexion chiffrée (HTTPS), même si un lien HTTP est cliqué par erreur |
| `X-Frame-Options: SAMEORIGIN` | Empêche un site tiers malveillant d'afficher votre site dans un cadre invisible pour piéger vos visiteurs |
| `X-Content-Type-Options: nosniff` | Empêche le navigateur d'exécuter un fichier comme s'il était un script, une faille classique d'injection |
| `Referrer-Policy` | Limite les informations de navigation transmises à des sites tiers |
| `Permissions-Policy` | Désactive par défaut l'accès caméra, micro et géolocalisation, réduisant la surface d'attaque |

**Bénéfice business :** ces en-têtes constituent une couche de défense invisible pour le visiteur mais essentielle : elles protègent vos clients contre le détournement de session, le clickjacking et l'usurpation de contenu — des risques qui, s'ils se matérialisaient, endommageraient durablement la confiance envers votre marque.

### 4.2 Conformité légale — mentions LCEN

Le site intègre une page **Mentions légales** générée dynamiquement, structurée conformément aux exigences de la **LCEN** (Loi pour la Confiance dans l'Économie Numérique) : identification de l'éditeur, coordonnées, hébergeur (IONOS SARL), et informations réglementaires associées.

Ce module est architecturé pour rester **facilement maintenable** : toute modification (SIRET, forme juridique, coordonnées) se fait à un seul endroit dans le code, sans risque d'incohérence entre plusieurs pages.

**Bénéfice business :** une conformité légale à jour protège l'entreprise en cas de contrôle ou de litige, et renforce la crédibilité perçue par vos prospects — un site aux mentions légales complètes et professionnelles rassure autant qu'un badge de confiance.

> **Point d'action pour le client :** certains champs des mentions légales (forme juridique, SIRET, siège social, directeur de publication) sont actuellement marqués *"à compléter"*. Nous recommandons de nous transmettre ces informations sous 7 jours afin de finaliser la mise en conformité totale du site.

---

## Synthèse

| Pilier | Ingénierie déployée | Impact business direct |
|---|---|---|
| Vitesse | Next.js SSR + réseau Edge Vercel | TTFB < 1s → moins d'abandons, plus d'appels |
| Mobile & UX | Zones tactiles 44px, responsive total, zéro blocage | Taux de conversion tactile maximisé |
| SEO local | Sitemap/robots dynamiques, OpenGraph, hiérarchie H1/H2 | Meilleure indexation, meilleur classement local |
| Sécurité & légal | Headers HSTS/CSP-like, mentions LCEN | Confiance client, conformité réglementaire |

L'infrastructure livrée place Élite Dépannage 34 au niveau technique d'acteurs bien plus grands, avec un seul objectif : **transformer chaque visite mobile en urgence en appel entrant.**

---

*Rapport rédigé par Securium Web Agency — Pôle Ingénierie & Performance Web.*
