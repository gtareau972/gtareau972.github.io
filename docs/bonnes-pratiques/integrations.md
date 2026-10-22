# Intégrations : ITSM, flux d'événements et notifications

Une supervision n'a de valeur que si l'alerte arrive **au bon endroit, sous la bonne forme**. Centreon propose trois familles d'intégrations, que la page de téléchargement officielle regroupe dans son onglet *Intégrations*.

| Famille | Rôle | Catalogue (octobre 2026) |
|---|---|---|
| **Open Tickets** | Ouvrir et clôturer des tickets dans l'ITSM depuis la console | 15 providers |
| **Stream Connectors** | Diffuser événements et métriques en temps réel vers d'autres plateformes | 19 connecteurs |
| **Plugins de notification** | Pousser les alertes vers les canaux des équipes | 13 plugins |

## Open Tickets : l'ITSM au cœur de l'exploitation

**Providers fournis** : BMC FootPrints 11, BMC ITSM (Remedy), EasyVista (REST et SOAP), GLPI (legacy et REST API), iTop, Ivanti, Jira, Mail, OTRS, Request Tracker 2, Serena, ServiceNow, Simple (générique).

**Fonctionnement (25.10)**

- Une **règle** par usage, définie dans le menu *Notifications*, associée à un provider.
- Une macro personnalisée **`TICKET_ID`** reçoit le numéro de ticket. La documentation recommande de l'ajouter aux **templates génériques d'hôte et de service** : tous les objets qui en héritent en bénéficient.
- Ouverture et clôture depuis le widget *Resource table* des tableaux de bord.
- Possibilité d'**enchaîner des règles** (ouvrir un ticket puis envoyer un e-mail) et d'exécuter des commandes après l'ouverture.

**Mes recommandations**

- Ne créer un ticket que sur un **état HARD** confirmé, jamais sur un état SOFT.
- Dédupliquer : **un incident = un ticket**, rattaché par `TICKET_ID`, plutôt qu'un ticket par contrôle en erreur.
- Ouvrir le ticket **sur l'élément qui a du sens pour le support** : le service métier (BAM) ou l'hôte, pas chacun de ses services.
- Tester le provider sur une **file ITSM de recette** avant de le brancher sur la file de production.

## Stream Connectors : Centreon dans la chaîne d'observabilité

Adossés au flux **BBDO** du Broker et à un framework **Lua**, les stream connectors filtrent, enrichissent et transmettent les événements et métriques en temps réel.

**Destinations disponibles** : Apache Kafka, Canopsis, ClickHouse, Datadog, Elasticsearch, Google BigQuery, HP BSM, HP OMi (OpsBridge), InfluxDB 2, Keep, Logstash, NDO (legacy), Opsgenie, PagerDuty, Prometheus, ServiceNow EM, SIGNL4, Splunk, Warp 10.

**Mes recommandations**

- **Filtrer au plus près de la source** (type d'événement, statut, groupes d'hôtes) : n'envoyer que ce que la cible exploite réellement.
- Surveiller la **file de rétention du Broker** : une destination indisponible ne doit pas saturer le disque du central.
- Valider le connecteur sur une plateforme de recette ; en HA, vérifier sa présence et sa configuration **sur les deux nœuds centraux** (à vérifier selon l'architecture).
- Pour un besoin spécifique, le framework Lua permet d'écrire son propre connecteur.

## Plugins de notification : les alertes là où vivent les équipes

**Canaux disponibles** : Microsoft Teams, Slack, Telegram, e-mail HTML, passerelles SMS (Foxbox, HighSMS, iSendPro, Jasmin, Orange, OVH), Prowl, Sirportly, Centreon Open Tickets.

**Mes recommandations**

- **Un canal par public** : e-mail pour les équipes, SMS pour l'astreinte, messagerie instantanée pour la visibilité.
- Garder la séparation **seuil / confirmation / notification** (voir [Seuils et notifications](seuils-et-notifications.md)).
- Les notifications suivent le moteur Centreon : contacts, périodes et escalades. Une notification n'est envoyée qu'après passage en état HARD, puis à chaque intervalle de notification tant que le problème persiste.

## Documentation officielle (25.10)

- [Open Tickets](https://docs.centreon.com/docs/25.10/alerts-notifications/ticketing/)
- [Stream connectors (Data Analytics)](https://docs.centreon.com/docs/25.10/integrations/data-analytics/data-analytics-overview/)
- [Concepts de notification](https://docs.centreon.com/docs/25.10/alerts-notifications/notif-concept/)
- [Catalogue complet des intégrations](https://download.centreon.com/fr/)
