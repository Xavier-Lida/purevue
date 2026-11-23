# Offre patinoire (page d'accueil)

La page d'accueil présente les patinoires de cour clé en main, dans le même design que le reste du site.

- `/` : l'offre patinoire
- `/noel` : l'offre des lumières de Noël, qui était sur l'accueil (rien n'a été supprimé)
- `/patinoire` : redirige vers l'accueil, pour les liens déjà partagés

## Modifier le contenu

Tout est dans **`src/lib/patinoire.ts`** : prix, forfaits, tailles de base, places de lancement,
étapes, garanties, questions fréquentes, régions.

| Je veux… | Je change… |
| --- | --- |
| Changer un prix ou une taille | `price` et `size` dans `rinkPackages` |
| Fermer l'offre de lancement | `launch.active: false` |
| Afficher l'agenda (prendre rendez-vous tout de suite) | `bookingUrl` : colle le lien Cal.com du type d'événement |
| Activer le pixel Meta | `metaPixelId` : colle l'identifiant du pixel |
| Couper Clarity | `clarityId: ""` |
| Changer la durée annoncée | `installTime` |

## Images des forfaits

Chaque forfait affiche l'image trouvée dans **`public/patinoire/forfaits/`**
(format 4:3, environ 1200 x 900). Sans image, le forfait affiche un dessin.

- `compact.jpg`, `classique.jpg`, `pro.jpg` : vraies photos de tes installations
- `compact-exemple.jpg`, `classique-exemple.jpg`, `pro-exemple.jpg` : images générées,
  affichées avec la mention « Image d'exemple »

## Photos et vidéos de tes installations

Dépose-les dans **`public/patinoire/`** :

- Photos : `01-nom.jpg`, `02-nom.jpg`… La première remplace le dessin en haut de page,
  les autres vont dans la section « Nos patinoires ».
- Vidéos : `v1-nom.mp4` + `v1-nom.poster.jpg` (image affichée avant la lecture).

Mets seulement de vraies photos de tes installations dans ce dossier.

## Où vont les demandes

Le formulaire « Rappelez-moi » envoie chaque demande à deux endroits :

1. **Par courriel**, comme le formulaire du site (Formspree si `NEXT_PUBLIC_FORMSPREE_FORM_ID`
   est défini sur Vercel, sinon `/api/patinoire` avec Resend).
2. **Dans le Google Sheet** (copie de sûreté, source `patino`).

Le courriel du client est facultatif : seuls le nom et le téléphone sont obligatoires.

## Suivi et confidentialité

Clarity et le pixel Meta se chargent seulement si le visiteur clique « Accepter »
(Loi 25). La politique est à `/confidentialite`.

## Fichiers

- `src/lib/patinoire.ts` : contenu et réglages
- `src/app/page.tsx` : la page d'accueil (offre patinoire)
- `src/app/noel/page.tsx` : l'offre des lumières de Noël
- `src/components/patinoire/` : forfaits, illustrations, formulaire, réservation, en-tête, suivi
- `src/lib/patinoire-images.ts` : lecture des images des forfaits
- `src/app/api/patinoire/route.ts` : envoi des demandes par courriel
- `src/app/confidentialite/page.tsx` : politique de confidentialité
