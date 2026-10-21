# Curriculum vitae

**Ghislain TAREAU** — Architecte Supervision / Observabilité · Expert Centreon · Zabbix
:lucide-map-pin: Île-de-France · :lucide-mail: [ghislain.tareau@gmail.com](mailto:ghislain.tareau@gmail.com) · :lucide-github: [GitHub](https://github.com/gtareau972)

<!-- Pour proposer le CV en PDF : déposer le fichier dans docs/assets/cv.pdf puis décommenter la ligne suivante.
[:lucide-download: Télécharger le CV en PDF](../assets/cv.pdf){ .md-button .md-button--primary }
-->

## Profil

Architecte supervision, **plus de 10 ans d'expérience** dans l'audit, la conception et la migration de plateformes de supervision multi-outils (Centreon, Zabbix, Nagios, Shinken, Nimsoft, Prometheus) pour des environnements critiques : transports, énergie, finance, luxe et groupe La Poste.

Expert Centreon (Central, Pollers, MAP, MBI, BAM, HA) et Zabbix, j'interviens de bout en bout :

- **Audit** de l'existant (sondes, scripts, templates, alerting) et recueil des besoins des équipes Production, Exploitation et Ingénierie ;
- **Conception** d'architectures cibles et **migration** de plateformes : Shinken → Centreon, Centreon → Zabbix Cloud, Centreon On-Premise → Cloud ;
- **Industrialisation** : standardisation des templates et des sondes, développement de plugins (Bash, Python, PowerShell), alerting unifié et intégration ITSM ;
- **Documentation** technique et d'exploitation, et **formation** des équipes internes.

## Expériences professionnelles

<div class="timeline" markdown>

### Architecte Supervision Centreon Cloud — Eiffage
*Depuis mai 2026 · Freelance*

- Migration de la supervision Centreon 21.10 On-Premise vers Centreon Cloud sur un périmètre de **5 000 hôtes et 26 000 services** : analyse des besoins, cartographie de l'architecture existante.
- Migration des ressources via l'API REST v2 · ouverture et validation des flux pollers → Centreon Cloud · SSO et gestion des accès · run en parallèle On-Premise / Cloud.
- Rationalisation et standardisation du catalogue de templates : remplacement des sondes scripts custom par les Plugin Packs Centreon.
- Traitement des alertes UNKNOWN / CRITICAL post-migration : automatisation du déploiement des plugins manquants, configuration des agents NRPE et NSClient++.
- Déploiement des connecteurs VMware et Oracle · troubleshooting et MCO · documentation technique.
- Dashboards par équipe pour le suivi des incidents et du ticketing.
- Alerting unifié via OpenTicket vers EasyVista (création automatique de tickets) · formation des équipes.

*Env. : Centreon Cloud, Centreon 21.10, API REST v2, Plugin Packs, NRPE, NSClient++, OpenTicket, EasyVista, RedHat 9, Oracle Linux, PostgreSQL, MariaDB, VMware ESXi*

### Architecte Supervision Centreon — Dior
*Juillet 2025 – décembre 2025 · Freelance*

- Pilotage et coordination du projet de refonte Centreon : analyse des besoins métiers, définition des exigences, cartographie de l'existant.
- Plan de migration : prérequis réseau / sécurité, run en parallèle, gestion des risques et coordination des intervenants.
- Pilotage technique de l'architecture Centreon (MAP, MBI, BAM) · suivi des recettes et livraisons correctives · reporting SLA.
- Développement de sondes Bash · troubleshooting et MCO · documentation technique.

*Env. : Centreon MAP, MBI, BAM, Oracle Linux*

### Architecte Supervision Centreon / Zabbix — Docaposte (groupe La Poste)
*Janvier 2023 – juin 2025 · Freelance*

- Pilotage de la migration complète de Centreon vers Zabbix Cloud : audit, cartographie des périmètres, planification des sprints, coordination des équipes.
- Modèle de supervision commun Zabbix : structuration des templates, triggers, niveaux et politique d'alertes.
- Architectures de supervision haute disponibilité (Centreon et Zabbix) · intégration ITSM (Jira, GLPI).
- Animation de workshops techniques · reporting MBI · documentation des plans d'actions.

*Env. : Zabbix Cloud, Prometheus, alert_manager, Centreon MAP, MBI, BAM, RedHat, CentOS, Oracle Linux*

### Architecte Supervision Centreon — GRDF
*Mars 2021 – décembre 2022 · Freelance*

- Analyse de l'architecture existante (Shinken) et conception de l'architecture cible Centreon.
- Pilotage Agile des migrations Shinken → Centreon et de la migration datacenter : coordination, Go / No-Go, suivi financier et planning.
- Plan de migration : stratégie de transition, gestion des risques, évolution post-migration.
- Formation des équipes à MAP, MBI et BAM · modélisation des surveillances · reporting SLA · documentation d'exploitation.

*Env. : Centreon MAP, MBI, BAM, RedHat, CentOS*

### Expert Outillage Centreon — SNCF
*Septembre 2020 – février 2021 · Freelance*

- Mise en œuvre et optimisation de la plateforme Centreon sur un environnement grande échelle.
- Amélioration de l'architecture, modélisation des surveillances, gestion des évolutions.

*Env. : Centreon, Linux, Windows*

### Ingénieur de Production — Huawei
*Avril 2020 – juillet 2020 · Freelance*

- Mise en œuvre de la supervision Zabbix · industrialisation des processus de production.
- Indicateurs ITIL · procédures et normes d'exploitation.

*Env. : Zabbix, Linux, Windows, Apache, Tomcat*

### Consultant Supervision — BNP Paribas
*Octobre 2019 – février 2020 · ESN Adneom*

- Mise en œuvre, maintenance et optimisation des solutions Nimsoft · troubleshooting · modélisation des surveillances.

*Env. : Nimsoft, Nagios, Thruk*

### Référent Supervision — Econocom
*Octobre 2017 – février 2019 · ESN*

- Conception de solutions de supervision · configuration d'équipements réseau · audit de l'existant.
- Mise en supervision de **plus de 1 000 serveurs** · scripts Shell / Bash · dashboards SLA.

*Env. : Centreon MAP, MBI, BAM, RedHat, CentOS, iTop*

### Technicien Maintenance Informatique
*Septembre 2011 – août 2016 · Poste interne*

- Gestion de parc Linux / Mac OS X · support VIP · administration Linux (Proxmox, PFsense, DHCP / DNS).
- Installation de réseaux événementiels · maintien des équipements réseau.

*Env. : Proxmox, PFsense, OCS / GLPI, EON, Linux*

</div>

## Compétences

=== "Supervision"

    - **Centreon** : Central / Pollers / Remote, MAP, MBI, BAM, HA et architecture distribuée, flux Broker et Gorgone
    - **Zabbix** (dont Zabbix Cloud)
    - Prometheus, alert_manager · Nagios, Shinken, Thruk · Nimsoft, IBM Tivoli (ITM) · EON
    - Observabilité (notions) : Grafana, Elastic, concepts SLA / SLO / SLI

=== "Systèmes et bases"

    - Linux : RedHat, Debian, CentOS, Oracle Linux · Windows Server
    - Bases : MariaDB / MySQL, PostgreSQL — optimisation des performances Broker et pollers
    - Virtualisation : Proxmox, VMware
    - Réseau : PFsense, DHCP, DNS

=== "Automatisation et collecte"

    - Scripting : Bash, Python, PowerShell, Perl
    - CLAPI, API REST · développement de plugins de supervision
    - Protocoles : SNMP v2c / v3, SSH, NRPE, NSClient++, API

=== "ITSM et pilotage"

    - Intégrations Centreon ↔ Jira, GLPI, iTop, EasyVista : création automatique de tickets, acquittement d'alertes
    - Processus ITIL : changement, mise en production, configuration, demandes
    - Pilotage de projet, coordination (équipes internes, TMA, prestataires), reporting SLA
    - Agile : Scrum, Kanban

## Formation

| Diplôme | Établissement | Spécialité |
|---|---|---|
| Bac +5 — Responsable Ingénierie Systèmes & Réseaux | CESI | Administration systèmes et réseaux, gestion de projet |

## Langues

- Français : langue maternelle
- Anglais : intermédiaire

## Centres d'intérêt

Ceinture noire de Pencak Silat · boxe anglaise et thaï · kizomba · jeux vidéo, lecture, cinéma
