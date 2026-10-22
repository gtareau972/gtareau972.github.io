# Centreon et l'IA : le serveur MCP

Le **Model Context Protocol (MCP)** est un standard ouvert qui permet à un assistant IA (Claude, ChatGPT, Gemini, Copilot, Mistral Le Chat, IDE…) d'interroger des outils externes. Centreon publie un **serveur MCP** qui expose la supervision temps réel à ces assistants.

!!! warning "Fonctionnalité en bêta"
    Les outils et interfaces évoluent sans préavis. Ne pas l'utiliser en production sans validation sécurité, et toujours vérifier la documentation au moment du déploiement.

## Deux sources, deux périmètres : à clarifier avant de déployer

Au 22 octobre 2026, Centreon référence **deux projets** différents :

| | Page de téléchargement (onglet MCP) | Documentation développeur |
|---|---|---|
| Dépôt | `CentreonLabs/centreon-mcp` | `centreon/centreon-mcp` |
| Statut | Bêta | Fonctionnalité « en évolution rapide » |
| Outils | 3 : `get_realtime_status`, `list_all_status`, `acknowledge_resource` | 23, en lecture **et en écriture** |
| Périmètre | Lecture du statut et acquittement, **sans toucher à la configuration** | Inclut création, modification et suppression de configuration, export et rechargement des pollers, temps d'arrêt, contrôles forcés |

C'est une différence majeure : le second projet peut **modifier la configuration et recharger les pollers**. Choisir la version en connaissance de cause, et commencer par le périmètre lecture seule.

## Déploiement (version CentreonLabs)

**Prérequis** : Python 3.13+ ou Docker, une instance Centreon joignable, un jeton d'API personnel (*Configuration > Users > API tokens*).

```bash
git clone https://github.com/CentreonLabs/centreon-mcp.git
cd centreon-mcp
# Renseigner le fichier .env (voir ci-dessous)
docker compose up --build
# Serveur MCP sur le port 8000
```

| Variable | Rôle |
|---|---|
| `CENTREON_BASE_URL` * | URL du serveur Centreon, sans `/api/latest` |
| `CENTREON_API_TOKEN` * | Jeton d'API Centreon |
| `MCP_API_KEY` * | Jeton *Bearer* que les clients doivent présenter au serveur MCP |
| `CENTREON_VERIFY_SSL` | Vérification du certificat (`true` par défaut) |
| `CENTREON_CA_BUNDLE` | Chemin d'une autorité de certification interne |
| `NGROK_AUTHTOKEN` | Tunnel ngrok (déploiement compose uniquement) |

\* obligatoire

Configuration côté client MCP :

```json
{
  "mcpServers": {
    "centreon": {
      "url": "https://your-mcp-host:8000/mcp",
      "headers": { "Authorization": "Bearer your-mcp-api-key" }
    }
  }
}
```

## Mes recommandations de sécurité

- **Compte dédié** : créer un utilisateur Centreon spécifique, avec des **ACL restreintes** au périmètre utile, et lui associer son propre jeton d'API. Ne jamais réutiliser un compte administrateur.
- **Pas d'exposition Internet** : le tunnel ngrok est pratique en démonstration, pas en production. Garder le serveur MCP sur le réseau d'administration.
- **Garder la vérification TLS** (`CENTREON_VERIFY_SSL=true`) et fournir la CA interne via `CENTREON_CA_BUNDLE` plutôt que de la désactiver.
- **`MCP_API_KEY` robuste**, stocké dans un coffre et renouvelé régulièrement, comme le jeton Centreon.
- **Choix du modèle** : la documentation Centreon recommande un LLM local, ou un service en ligne dont la licence garantit que les données ne servent pas à l'entraînement.
- **Traçabilité** : les acquittements faits par l'assistant portent un commentaire ; vérifier qu'ils restent identifiables dans l'historique.
- **En HA** : pointer `CENTREON_BASE_URL` sur la **VIP** du central, pas sur un nœud.

## Exemples d'usage

- « Quels hôtes du groupe HG-ENV-PRD sont en CRITICAL depuis plus d'une heure ? »
- « Résume l'état des services de la base de données de production. »
- « Acquitte l'alerte disque de srv-app-01 avec le commentaire : intervention planifiée, ticket INC0123. »

## Liens

- [Serveur MCP (CentreonLabs, GitHub)](https://github.com/CentreonLabs/centreon-mcp)
- [Documentation développeur Centreon : serveur MCP](https://docs.centreon.com/docs/developer/mcp-server/)
- [Jetons d'API (25.10)](https://docs.centreon.com/docs/25.10/api/api-tokens/)
