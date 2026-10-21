# Seuils et notifications

**Un seuil doit correspondre à une action.**

- **WARNING** : une intervention est à prévoir avant dégradation.
- **CRITICAL** : le service est dégradé, ou le risque exige une intervention rapide.

## Points de départ

Ne pas appliquer `80/90` partout. Ces valeurs sont des **points de départ à ajuster après observation**, en tenant compte des unités et du mode de calcul du plugin.

| Indicateur | WARNING initial | CRITICAL initial | À adapter selon |
|---|---:|---:|---|
| CPU utilisé | 85 % | 95 % | Charge habituelle, durée, rôle du serveur |
| Mémoire utilisée | 85 % | 95 % | Traitement du cache, swap, pression mémoire |
| Disque utilisé | 80 % | 90 % | Capacité, espace libre, vitesse de croissance |
| Certificat TLS | < 30 jours | < 15 jours | Délai réel de renouvellement |
| Âge d'une sauvegarde quotidienne | > 26 h | > 50 h | RPO et planning de sauvegarde |
| Temps de réponse applicatif | Objectif de service | Impact utilisateur | Mesures réelles, engagement métier |

!!! tip "Disques : le pourcentage ne suffit pas"
    À 90 %, un volume de 100 Go conserve 10 Go ; un volume de 10 To conserve 1 To. Raisonner aussi en espace libre et en délai d'intervention.

## Porter les seuils dans les macros

Les seuils vont dans les **macros de service** du template `TS_` ; les macros d'hôte servent aux paramètres de connexion communs. Réutiliser les macros réellement exposées par le connecteur : leurs noms varient d'un contrôle à l'autre.
[Documentation des macros (25.10)](https://docs.centreon.com/fr/docs/25.10/monitoring/basic-objects/macros/)

Chaque exception posée sur un service est documentée : justification, propriétaire, date de révision, ticket éventuel. **Une exception qui se répète doit devenir un profil de template.**

## Séparer trois réglages

| Réglage | Question à laquelle il répond |
|---|---|
| Seuil WARNING / CRITICAL | À partir de quelle mesure l'état change-t-il ? |
| Intervalle et nombre de tentatives | Combien de temps pour confirmer le problème ? |
| Notification et escalade | Qui prévenir, quand, par quel canal ? |

Exemple pour un CPU : contrôle toutes les 5 minutes, nouvelle tentative toutes les minutes, 3 tentatives maximum. Une anomalie confirmée deux fois passe en état HARD environ deux minutes après sa première détection — ce qui **ne veut pas dire** que le CPU a dépassé le seuil en continu pendant deux minutes : ce sont des mesures ponctuelles successives.

La criticité métier d'un serveur doit surtout guider **les horaires, les destinataires et l'escalade**, pas les seuils techniques.

## Faire vivre la politique

1. Observer les métriques sur une période représentative (deux à quatre semaines).
2. Identifier les pics habituels, traitements batch et sauvegardes.
3. Tester le profil sur quelques hôtes représentatifs.
4. Contrôler les valeurs héritées et les commandes effectives.
5. Déployer progressivement et supprimer les alertes sans action associée.
