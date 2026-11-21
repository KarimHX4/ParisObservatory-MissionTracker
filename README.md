# Mission Tracker — Observatoire de Paris (site non officiel)

Carte interactive du Système solaire montrant, en temps réel (positions calculées), les missions spatiales auxquelles l'Observatoire de Paris – PSL (LIRA/LESIA, LERMA, GEPI, LTE/SYRTE, IMCCE) a participé.

**Page :** https://karimhx4.github.io/ParisObservatory-MissionTracker/

- Onglets **En cours / Terminées / Futures**, calculés selon la date affichée (le curseur de temps va de 1977 à 2036).
- Fiche par mission : contribution de l'Observatoire, dates, chronomètres, distance, jalons, sources.
- Application installable (PWA), utilisable hors connexion.

## Données

Toutes les missions sont décrites dans [`missions.js`](missions.js) : une entrée par mission (dates, contribution, jalons, sources, modèle de position).
Ajouter une mission = ajouter une entrée. Les dates et jalons sont vérifiés chaque semaine à partir des sources officielles.

## Limites

Site non officiel. Les positions sont calculées (éphémérides képlériennes JPL, transferts de Lambert entre survols) et ne proviennent pas de la télémétrie ; certaines trajectoires et orbites sont simplifiées ou approximatives (indiqué sur la fiche de chaque mission). OSIRIS-REx/APEX et Hayabusa2 ne sont pas représentées sur la carte.

Suivi détaillé de MMX : https://karimhx4.github.io/mmx-tracker/
