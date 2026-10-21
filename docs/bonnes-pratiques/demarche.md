# Démarche de mise en supervision

Une nouvelle ressource ne devrait jamais arriver en production avec des alertes « par défaut ». Voici le déroulé que je suis.

```mermaid
flowchart LR
  A[Besoin] --> B[Choix du connecteur]
  B --> C[Test CLI du plugin]
  C --> D[Template interne TS_]
  D --> E[Pilote sur quelques hôtes]
  E --> F[Généralisation]
  F --> G[Revue des alertes]
  G -.-> D
```

## 1. Qualifier le besoin

- Que doit-on détecter, et **quelle action** déclenche chaque alerte ?
- Qui est notifié, à quelles heures, avec quelle escalade ?
- Quel mode de collecte est possible : SNMP, agent, API, protocole applicatif ? Quelles contraintes réseau et sécurité (flux, comptes de service) ?

## 2. Choisir le Monitoring Connector

Partir du connecteur officiel quand il existe : il fournit le plugin, les commandes et les templates.
[Catalogue des Monitoring Connectors](https://docs.centreon.com/pp/integrations/plugin-packs/getting-started/introduction/)

## 3. Tester le plugin en ligne de commande

Toujours valider le plugin **depuis le poller qui supervisera la ressource**, avec l'utilisateur `centreon-engine`, avant toute configuration dans l'interface. Les options exactes sont propres à chaque connecteur : elles sont documentées sur sa page et visibles avec `--help`.

```bash
su - centreon-engine -s /bin/bash -c \
  "/usr/lib/centreon/plugins/centreon_linux_snmp.pl --plugin=os::linux::snmp::plugin --list-mode"
```

Vérifier : la sortie, les métriques de performance, les unités et le temps d'exécution.

## 4. Créer le template de service interne

Un template `TS_` hérite du template éditeur et porte les seuils par défaut dans les macros de service. Voir [Organisation des templates](templates.md) et [Seuils et notifications](seuils-et-notifications.md).

## 5. Piloter, puis généraliser

Appliquer d'abord sur quelques hôtes représentatifs, observer deux à quatre semaines, ajuster, puis déployer progressivement.

## 6. Faire vivre la configuration

Revoir régulièrement les alertes qui ne déclenchent aucune action : soit le seuil est mal placé, soit l'alerte doit disparaître.
