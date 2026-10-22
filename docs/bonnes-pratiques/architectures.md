# Architectures Centreon

Les procédures (mise à jour, sauvegarde, ajout de poller, bascule, MBI) dépendent de l'architecture. Voici celles que j'exploite et leurs points d'attention, pour **Centreon 25.10**.

| Architecture | Composition | Points d'attention |
|---|---|---|
| Standalone | Central (web, Engine, Broker) et base sur un même serveur, avec ou sans pollers | Dimensionnement de la base, sauvegarde du serveur unique |
| Base déportée | Central et base sur deux serveurs distincts + pollers | Flux central ↔ base, droits MariaDB/MySQL distants, ordre des mises à jour |
| Réplication master/slave | Central + deux bases répliquées + pollers | État et retard de réplication, procédure de bascule, cohérence des sauvegardes |
| HA 2 nœuds | Deux centraux embarquant chacun leur base (Master/Slave), quorum device, une VIP | Central et base basculent ensemble ; procédures de mise à jour propres à la HA |
| HA 4 nœuds | Deux centraux + deux bases répliquées + quorum device, deux VIP | Séparation des ressources central / base, ordre des opérations de maintenance |

En HA, le cluster est piloté par **Pacemaker et Corosync** ; un poller peut jouer le rôle de quorum device.

!!! info "Où en sont les versions ?"
    La **26.10** est sortie le 16 octobre 2026 ; son installation *unattended* cible RHEL / AlmaLinux / Oracle Linux 9 et 10, et Debian 13. La branche **25.10** continue de recevoir des correctifs (centreon-web 25.10.18 au 30/09/2026). Avant une montée de version, consulter la [politique de cycle de vie](https://docs.centreon.com/docs/25.10/releases/lifecycle/) et la [matrice de montée de version](https://docs.centreon.com/docs/25.10/upgrade/upgrade-matrix/), et appliquer les procédures propres à la HA.

!!! warning "Réplication hors HA"
    La documentation 25.10 ne décrit pas d'architecture « central + deux bases master/slave » hors HA. S'appuyer sur la documentation MariaDB/MySQL et sur les principes de réplication décrits dans les pages HA.

## Modules

| Module | Rôle | Points d'attention |
|---|---|---|
| BAM | Activités métier (BA, KPI) | Règles de calcul, intégration avec MBI |
| MBI | Reporting | Serveur de reporting dédié, ETL, impact sur la base de supervision |
| MAP | Cartographie | Serveur MAP, compatibilité de version |

## Sources

*Consultées le 22 octobre 2026.*

- [Architectures](https://docs.centreon.com/fr/docs/25.10/installation/architectures/)
- [Centreon HA](https://docs.centreon.com/fr/docs/25.10/installation/installation-of-centreon-ha/centreon-ha/)
- [Éléments d'un cluster HA](https://docs.centreon.com/fr/docs/25.10/installation/installation-of-centreon-ha/cluster-elements/)
- [Guide d'exploitation HA](https://docs.centreon.com/fr/docs/25.10/administration/centreon-ha/operating-guide/)
- [Mise à jour de la HA](https://docs.centreon.com/fr/docs/25.10/category/updating-centreon-ha/)
- [BAM](https://docs.centreon.com/fr/docs/25.10/service-mapping/introduction/) · [MBI](https://docs.centreon.com/fr/docs/25.10/reporting/introduction/) · [MAP](https://docs.centreon.com/fr/docs/25.10/category/graphical-views-maps/)
- [Centreon – Téléchargements](https://download.centreon.com/fr/), onglets *Paquets* et *Sources* : version 26.10, systèmes supportés et dernières versions 25.10
- [Politique de cycle de vie (25.10)](https://docs.centreon.com/docs/25.10/releases/lifecycle/)
- [Matrice de montée de version (25.10)](https://docs.centreon.com/docs/25.10/upgrade/upgrade-matrix/)
