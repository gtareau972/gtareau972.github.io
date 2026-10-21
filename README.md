# Site CV — Supervision & Observabilité

Site statique construit avec [Zensical](https://zensical.org/) et publié gratuitement sur GitHub Pages.

## Ajouter du contenu

Tout le contenu est en Markdown dans `docs/` :

| Section | Dossier | Pour ajouter |
|---|---|---|
| CV | `docs/cv/` | Modifier `index.md` ; déposer le PDF dans `docs/assets/cv.pdf` |
| Bonnes pratiques | `docs/bonnes-pratiques/` | Créer un `.md` puis l'ajouter à `nav` dans `zensical.toml` |
| REX | `docs/rex/` | Copier `modele.md` en `AAAA-MM-titre.md`, l'ajouter au tableau de `index.md` et à `nav` |
| Réalisations | `docs/realisations/` | Ajouter une ligne au tableau |

Chaque `git push` sur `main` reconstruit et republie le site (workflow `.github/workflows/docs.yml`).
Le bouton « crayon » en haut de chaque page permet aussi d'éditer directement sur GitHub depuis un navigateur.

## Prévisualiser en local

```bash
pip install zensical
zensical serve      # http://localhost:8000
```

## Règle de publication

Le site est public : **anonymiser** systématiquement (IP, noms de clients, mots de passe, communautés SNMP).
