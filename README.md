# Pure Vue — Site web

Site one-page pour **Pure Vue** (Nettoyage & Services), lavage de vitres à Trois-Rivières.
Construit avec **Next.js 16**, **React 19** et **Tailwind CSS 4**.

## Démarrer en local

```bash
npm install
npm run dev
```

Le site est disponible sur http://localhost:3000

## Modifier le contenu

Presque tout le contenu (nom, téléphone, courriel, services, avantages) se trouve dans
un seul fichier facile à éditer :

```
src/lib/site.ts
```

- Coordonnées de l'entreprise → objet `site` (inclut NEQ, TPS, TVQ affichés dans le pied de page)
- Liste des services → tableau `services`
- Raisons « Pourquoi nous » → tableau `advantages`
- Chiffres animés (barre de stats) → tableau `stats`
- Comparaisons avant / après → tableau `beforeAfter`
- Galerie de photos de contrats → tableau `gallery`
- Notre équipe (photo, nom, rôle) → tableau `team`
- Avis clients → tableaux `reviews` et `googleRating`

Les couleurs et le style global sont dans `src/app/globals.css` (variables `@theme`).

### Remplacer les photos placeholder

Les images sont actuellement des **placeholders** (picsum.photos, i.pravatar.cc).
Pour mettre tes vraies photos :

1. Dépose tes fichiers dans `public/` (ex: `public/galerie/01.jpg`, `public/equipe/marc.jpg`,
   `public/avant-apres/contrat1-avant.jpg`).
2. Dans `src/lib/site.ts`, remplace les URLs `https://...` par les chemins locaux
   (ex: `src: "/galerie/01.jpg"`).
3. Une fois toutes les images locales, tu peux retirer les `remotePatterns` dans
   `next.config.ts`.

### À remplir avant la mise en ligne

- **Numéros NEQ / TPS / TVQ** dans `site` (objet en haut de `src/lib/site.ts`) — actuellement des zéros.
- **Noms et rôles de l'équipe** dans `team` — actuellement « Prénom Nom ».
- **Vrais avis Google** dans `reviews` + le nombre réel dans `googleRating`.
- **Chiffres réels** dans `stats` (contrats réalisés, note, etc.).

## Formulaire de contact (envoi de courriel)

Le formulaire envoie les demandes par courriel grâce à [Resend](https://resend.com).

1. Crée un compte gratuit sur [resend.com](https://resend.com).
2. Récupère ta clé API.
3. Copie `.env.example` vers `.env.local` et remplis :

   ```
   RESEND_API_KEY=ta_cle_ici
   CONTACT_TO_EMAIL=purevue64@gmail.com
   CONTACT_FROM_EMAIL=onboarding@resend.dev
   ```

> Au départ, tu peux utiliser `onboarding@resend.dev` comme expéditeur pour tester.
> Pour utiliser une adresse `@pure-vue.ca`, vérifie ton domaine dans Resend.

**Sans clé API**, le formulaire fonctionne quand même (il affiche la confirmation) mais
les demandes sont seulement journalisées dans la console au lieu d'être envoyées —
pratique pour développer. Les boutons d'appel et de courriel direct, eux, fonctionnent
toujours.

## Déploiement

Le plus simple est [Vercel](https://vercel.com) (créateurs de Next.js) :

1. Pousse le code sur un dépôt GitHub.
2. Importe le dépôt dans Vercel.
3. Ajoute les variables d'environnement (`RESEND_API_KEY`, etc.) dans les réglages du projet.
4. Déploie. Branche ensuite ton domaine `pure-vue.ca`.

## Build de production

```bash
npm run build
npm start
```
