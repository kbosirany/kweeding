# kweeding — Site de Mariage

Un site web de mariage **one-page**, responsive et élégant, inspiré du template [rampatra/wedding-website](https://github.com/rampatra/wedding-website).

## Fonctionnalités

- Design responsive (mobile, tablette, desktop)
- Section Hero avec photo de fond
- Compte à rebours jusqu'au jour J
- Timeline "Notre Histoire"
- Programme (cérémonie, réception…)
- Galerie photos avec lightbox
- Vidéo YouTube de fond
- Carte Google Maps du lieu
- Formulaire RSVP → Google Sheets
- FAQ (dress code, hébergement, transport, cadeaux)
- Hébergement gratuit via GitHub Pages

## Structure du projet

```
kweeding/
├── index.html          ← Page principale
├── css/
│   ├── styles.css      ← CSS compilé (lisible)
│   └── styles.min.css  ← CSS minifié (production)
├── js/
│   ├── scripts.js      ← JS source
│   └── scripts.min.js  ← JS minifié (production)
├── sass/
│   ├── styles.scss     ← Point d'entrée SCSS
│   └── partials/
│       ├── _colors.scss
│       ├── _typography.scss
│       ├── _buttons.scss
│       └── _layout.scss
├── img/
│   ├── hero/           ← Photo de fond du hero
│   ├── gallery/        ← Photos galerie
│   ├── story/          ← Photos timeline
│   ├── icons/          ← Icônes SVG custom
│   └── logos/          ← Monogramme du couple
├── fonts/              ← Polices locales (si besoin)
├── data/
│   └── site-content.json  ← Contenu éditorial centralisé
├── vendor/
│   ├── css/            ← Librairies CSS tierces (si embarquées)
│   └── js/             ← Librairies JS tierces (si embarquées)
├── favicon/            ← Favicons
├── package.json
├── gulpfile.js
└── README.md
```

## Démarrage rapide

### 1. Cloner le repo
```bash
git clone https://github.com/kbosirany/kweeding.git
cd kweeding
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Compiler les assets
```bash
npm run build
# ou en mode watch :
npm run watch
```

### 4. Lancer en local
```bash
npm start
# Ouvre http://localhost:3000
```

Ou ouvrez simplement `index.html` dans votre navigateur.

## Personnalisation

### Contenu éditorial
Éditez `data/site-content.json` pour :
- Changer les noms du couple
- Mettre la bonne date et le lieu
- Modifier les textes de la timeline, la FAQ, etc.

### Styles
Éditez les fichiers SCSS dans `sass/partials/` :
- `_colors.scss` → palette de couleurs
- `_typography.scss` → polices et tailles
- `_buttons.scss` → styles des boutons
- `_layout.scss` → mise en page globale

Puis recompilez : `npm run build`

### Images
Remplacez les placeholders dans `img/` :
- `img/hero/hero-bg.jpg` → photo de fond du Hero (1920×1080 min)
- `img/gallery/photo-X.jpg` → vos photos de couple
- `img/logos/monogram.svg` → votre monogramme

### Google Maps
Dans `js/scripts.js`, mettez les coordonnées GPS de votre lieu :
```js
var venue = { lat: 48.8566, lng: 2.3522 };
```
Et ajoutez votre clé API Google Maps dans `index.html`.

### RSVP (Google Sheets)
1. Créez un Google Sheet
2. Dans **Extensions > Apps Script**, collez le script de réception de formulaire
3. Déployez-le en tant que Web App
4. Copiez l'URL du script dans `data/site-content.json` → `rsvp.googleScriptUrl`
5. Reportez-la aussi dans l'attribut `action` du formulaire dans `index.html`

### Compte à rebours
Dans `js/scripts.js`, mettez la vraie date du mariage :
```js
var weddingDate = new Date('2025-06-14T15:00:00');
```

## Déploiement sur GitHub Pages

1. Poussez votre code sur la branche `main`
2. Dans les **Settings** du repo → **Pages** → Source : `main` / `/ (root)`
3. Votre site est disponible sur `https://kbosirany.github.io/kweeding`

Pour un domaine custom, créez un fichier `CNAME` à la racine avec votre domaine.

## Crédits

Inspiré du template open-source [rampatra/wedding-website](https://github.com/rampatra/wedding-website).
