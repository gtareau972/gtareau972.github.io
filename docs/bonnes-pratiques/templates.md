# Organisation des templates

!!! warning "Règle n° 1"
    Ne jamais modifier les templates fournis par les Monitoring Connectors. Créer des templates internes qui en héritent : les mises à jour des connecteurs restent ainsi sans risque.

## Une chaîne courte

**Éditeur → politique interne → service** suffit dans la grande majorité des cas.

```text
Template éditeur : contrôle CPU Linux
└── TS_Linux_CPU_Standard
    ├── Service CPU du serveur A
    └── Service CPU du serveur B
```

Quand un profil exige réellement une autre politique, on ajoute une branche plutôt qu'une exception par service :

```text
Template éditeur : contrôle CPU Linux
├── TS_Linux_CPU_Standard
└── TS_Linux_CPU_Batch
```

## Héritage : service et hôte ne fonctionnent pas pareil

- Un **template de service** n'a qu'un seul parent.
- Un **hôte** peut recevoir plusieurs templates d'hôte ; leur ordre détermine la priorité en cas de paramètres concurrents.

Conséquence : éviter de définir les mêmes paramètres dans plusieurs branches d'héritage d'hôte.

## Où placer quoi

| Niveau | Contenu |
|---|---|
| Template éditeur | Commande et paramètres techniques fournis |
| Template de service interne (`TS_`) | Seuils par défaut du profil |
| Service concret | Exception justifiée pour cette instance |
| Template d'hôte / hôte | Paramètres de connexion et caractéristiques communes |

## Sources

- [Templates de service](https://docs.centreon.com/fr/docs/25.10/monitoring/basic-objects/services-templates/)
- [Templates d'hôte](https://docs.centreon.com/fr/docs/25.10/monitoring/basic-objects/hosts-templates/)
- [Macros](https://docs.centreon.com/fr/docs/25.10/monitoring/basic-objects/macros/)
