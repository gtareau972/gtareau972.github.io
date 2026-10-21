# Convention de nommage

!!! note
    Recommandations d'exploitation, pas une norme imposée par Centreon.

Des noms **stables**, sans espaces ni accents, avec un séparateur unique. Aucune adresse IP ni information qui change fréquemment.

| Objet | Convention | Exemple |
|---|---|---|
| Hôte | Nom DNS ou identifiant CMDB de référence | `par-prd-db-001` |
| Template d'hôte interne | `TH_<Technologie>_<Profil>` | `TH_Linux_Standard` |
| Template de service interne | `TS_<Technologie>_<Controle>_<Profil>` | `TS_Linux_CPU_Standard` |
| Service | `<Controle>-<Instance>` si nécessaire | `CPU`, `Disk-/var`, `HTTPS-Portail` |
| Groupe d'hôtes | `HG-<Axe>-<Valeur>` | `HG-ENV-PRD`, `HG-SITE-PAR` |
| Groupe de services | `SG-<Domaine>` | `SG-Database` |

## Règles complémentaires

- Conserver le nommage des services livré par les connecteurs lorsqu'il est déjà cohérent.
- Utiliser l'**alias** pour une description lisible : « Base PostgreSQL — production Paris ».
- Porter l'environnement, le site, l'application et le responsable dans les **groupes, catégories ou la CMDB**, pas dans le nom.
- Ne jamais mettre de seuils dans un nom : `CPU-W80-C90` devient faux dès que les seuils changent.
- Les préfixes `TH_` et `TS_` distinguent immédiatement les templates internes de ceux livrés par les Monitoring Connectors.
