# Page patinoire (`/patinoire`)

Page de vente des patinoires de cour clé en main, dans le même design que le reste du site.
Rien d'autre sur le site n'a été modifié, sauf `src/app/sitemap.ts` (2 lignes ajoutées).

## Modifier le contenu

Tout est dans **`src/lib/patinoire.ts`** : prix, forfaits, places de lancement, étapes,
garanties, questions fréquentes, régions.

| Je veux… | Je change… |
| --- | --- |
| Changer un prix | `price` dans `rinkPackages` |
| Fermer l'offre de lancement | `launch.active: false` |
| Afficher l'agenda (prendre rendez-vous tout de suite) | `bookingUrl` : colle le lien Cal.com du type d'événement |
| Activer le pixel Meta | `metaPixelId` : colle l'identifiant du pixel |
| Couper Clarity | `clarityId: ""` |
| Changer la durée annoncée | `installTime` |

## Photos et vidéos

Dépose-les dans **`public/patinoire/`** :

- Photos : `01-nom.jpg`, `02-nom.jpg`… La première remplace le dessin en haut de page,
  les autres vont dans la section « Nos patinoires ».
- Vidéos : `v1-nom.mp4` + `v1-nom.poster.jpg` (image affichée avant la lecture).

Sans photo, la page affiche un dessin de patinoire. Mets seulement de vraies photos
de tes installations.

## Où vont les demandes

Le formulaire « Rappelez-moi » envoie chaque demande à deux endroits :

1. **Par courriel**, comme le formulaire du site (Formspree si `NEXT_PUBLIC_FORMSPREE_FORM_ID`
   est défini sur Vercel, sinon `/api/patinoire` avec Resend).
2. **Dans le Google Sheet** (copie de sûreté, source `patino`).

Le courriel du client est facultatif : seuls le nom et le téléphone sont obligatoires.

## Suivi et confidentialité

Clarity et le pixel Meta se chargent seulement si le visiteur clique « Accepter »
(Loi 25). La politique est à `/confidentialite` : relis-la avant la mise en ligne.

## Fichiers

- `src/lib/patinoire.ts` : contenu et réglages
- `src/app/patinoire/page.tsx` : la page
- `src/components/patinoire/` : calculateur, forfaits, formulaire, réservation, en-tête, suivi
- `src/app/api/patinoire/route.ts` : envoi des demandes par courriel
- `src/app/confidentialite/page.tsx` : politique de confidentialité
