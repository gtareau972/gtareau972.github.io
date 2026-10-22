# Centreon Monitoring Agent (CMA)

Le **Centreon Monitoring Agent** est l'agent de nouvelle génération de Centreon. Installé sur l'hôte supervisé, il exécute des contrôles **natifs** (sans plugin à déployer) ou des plugins locaux, et remonte les résultats au poller en **gRPC chiffré**. C'est l'alternative moderne à NRPE et NSClient++.

!!! info "Version"
    Page rédigée pour **Centreon 25.10**. La 26.10 est sortie le 16 octobre 2026 : vérifier la documentation de la version exploitée avant toute installation.

## Quand le privilégier

| Mode de collecte | À privilégier pour | Limites |
|---|---|---|
| **CMA** | Serveurs Linux et Windows, contrôles système, plugins maison | Agent à déployer et à maintenir sur chaque hôte |
| SNMP | Équipements réseau, matériel, appliances | Profondeur limitée sur les systèmes, SNMP v3 conseillé |
| NRPE / NSClient++ | Parc existant | Technologies historiques : prévoir une migration vers CMA |
| API / protocole applicatif | Cloud, applications, bases | Comptes de service et flux spécifiques |

## Principe de fonctionnement

- Le moteur du poller (Centreon Engine) embarque un récepteur **OTLP** (OpenTelemetry) qui reçoit les données de l'agent.
- L'agent récupère périodiquement sa configuration de contrôles auprès du poller.
- Les templates de contrôle sont fournis par les connecteurs **Linux CMA** et **Windows CMA**.
- Port par défaut : **4317/TCP (gRPC)**, à ouvrir dans le sens de la connexion choisie.

### Deux modes de connexion

| Mode | Sens | Cas d'usage |
|---|---|---|
| **Agent-initiated** | L'agent se connecte au poller, qui écoute | Cas standard : un poller reçoit de nombreux agents |
| **Poller-initiated** (*reverse*) | Le poller se connecte à l'agent | L'agent ne peut pas joindre le poller, par exemple un poller en DMZ |

Les deux modes peuvent coexister sur un même poller. Une fois la connexion établie, les échanges sont bidirectionnels.

## Installation (25.10)

Dans l'interface : **Configuration > Pollers > Agent configurations**, bouton **Command**. Choisir le poller et l'OS : Centreon génère une commande prête à l'emploi (mode *agent-initiated*), à exécuter sur l'hôte.

Installation par paquets, telle que publiée sur [download.centreon.com](https://download.centreon.com/fr/) :

=== "RHEL / Alma / Oracle Linux"

    ```bash
    # Dépôt Centreon 25.10 (exemple el9)
    dnf install -y https://packages.centreon.com/rpm-standard/25.10/el9/centreon-25.10.repo
    dnf install -y centreon-monitoring-agent
    systemctl enable --now centreon-monitoring-agent
    ```

=== "Debian / Ubuntu"

    ```bash
    # Clé + dépôt Centreon 25.10
    wget -O- https://apt-key.centreon.com | gpg --dearmor | tee /usr/share/keyrings/centreon.gpg > /dev/null
    echo "deb [signed-by=/usr/share/keyrings/centreon.gpg] https://apt.centreon.com/25.10 $(lsb_release -sc) main" \
      | tee /etc/apt/sources.list.d/centreon.list
    apt update && apt install -y centreon-monitoring-agent
    systemctl enable --now centreon-monitoring-agent
    ```

=== "Windows"

    Installeur `.exe` 64 bits (Windows Server 2016+ / Windows 10+), ou script `install_cma.ps1` généré par l'interface. Paramètres principaux : `-Endpoint` (obligatoire), `-Token`, `-HostTemplate`, `-Encryption` (`full` par défaut), `-Reverse` (`false` par défaut).

**Systèmes supportés (25.10)** : RHEL, Oracle Linux et AlmaLinux 8, 9 et 10 ; Debian 11, 12 et 13 ; Ubuntu 22.04 et 24.04 LTS ; Windows.

## Sécurité

- **TLS obligatoire en production**, avec un **jeton d'authentification**.
- À la création d'un poller, Centreon génère une autorité de certification dans `/etc/pki/centreon-engine` (validité 10 ans). La paire de clés dérivée est renouvelée automatiquement tous les 30 jours ; l'agent valide la clé publique par son empreinte.
- Ne jamais déployer en mode non chiffré hors maquette.

## Vérification

```bash
systemctl status centreon-monitoring-agent      # agent actif sur l'hôte
ss -tlnp | grep 4317                              # port en écoute (poller ou agent selon le mode)
```

Puis contrôler dans **Supervision > Statut des ressources** que les services de l'hôte remontent et sortent de l'état *pending*.

## Points d'attention

- **Fuseau horaire** : si un hôte utilise une période de contrôle, son fuseau doit correspondre à celui du poller. Sinon, l'ordonnancement et le calcul de fraîcheur sont faux, sans aucune erreur visible côté moteur.
- **Migration NRPE / NSClient++** : la documentation propose une procédure dédiée. Migrer par lots, en faisant tourner les deux collectes en parallèle le temps de valider les seuils.
- **Plugins maison** : CMA sait exécuter des plugins Bash, Perl, Python ou PowerShell compatibles Nagios, ce qui facilite la reprise de l'existant.
- **Nommage** : appliquer la même convention qu'ailleurs, en héritant des templates des connecteurs CMA (voir [Organisation des templates](templates.md)).

## Sources

*Consultées le 22 octobre 2026.*

- [Centreon Monitoring Agent (sommaire)](https://docs.centreon.com/docs/25.10/category/centreon-monitoring-agent/)
- [Mise en place de l'environnement de l'agent](https://docs.centreon.com/docs/25.10/cma/cma-setup/)
- [Code source (centreon-collect)](https://github.com/centreon/centreon-collect)
- [Introduction au Centreon Monitoring Agent](https://docs.centreon.com/docs/cma)
- [Centreon – Téléchargements](https://download.centreon.com/fr/), onglet *Agent* : commandes d'installation, versions et systèmes supportés
