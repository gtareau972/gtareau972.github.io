# Bonnes pratiques de mise en supervision

Ces pages décrivent la méthode que j'applique sur des plateformes **Centreon 25.10**. Ce sont des recommandations d'exploitation issues du terrain, pas une norme de l'éditeur : chaque point renvoie, quand c'est utile, à la [documentation officielle 25.10](https://docs.centreon.com/fr/docs/25.10/).

!!! info "Version"
    La documentation Centreon affiche désormais la 26.10 par défaut. Les liens de ce site pointent volontairement vers `/docs/25.10/`.

| Page | En une phrase |
|---|---|
| [Démarche de mise en supervision](demarche.md) | De la demande à l'alerte utile, étape par étape |
| [Nommage](nommage.md) | Des noms stables, lisibles et sans information volatile |
| [Organisation des templates](templates.md) | Hériter des templates éditeur au lieu de les modifier |
| [Seuils et notifications](seuils-et-notifications.md) | Un seuil = une action ; séparer seuil, confirmation et notification |
| [Architectures Centreon](architectures.md) | Ce qui change selon l'architecture, du standalone à la HA 4 nœuds |
