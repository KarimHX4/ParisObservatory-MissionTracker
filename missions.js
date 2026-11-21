// Missions spatiales avec une participation de l'Observatoire de Paris – PSL (site non officiel).
// Un objet par mission. Dates en UTC : U(année, mois, jour[, h, min, s]).
// Position sur la carte (champ pos) :
//   legs  : [[astre, date], ...] trajectoire reconstruite (Lambert) entre survols ; after = position après le dernier survol
//   at    : {b:astre, r:km, per:jours} en orbite autour d'un astre (moon:'TITAN' pour une lune, surf:true pour la surface)
//   lag   : 'L1' | 'L2' | 'LEO' | 'HEO' (près de la Terre) · kep : orbite héliocentrique (clé de ORBITS) · voy : 0|1 (Voyager)
//   near  : {b, until, lag} co-orbite qui rejoint un astre (phases de survols répétés) · none : non représentée
// Statut calculé selon la date affichée : future (avant lancement) · live · done (après end).
const U=(y,m,d,h=0,mi=0,s=0)=>Date.UTC(y,m-1,d,h,mi,s);

// orbites héliocentriques approximatives (a [UA], e, i, Ω, ω, M [°], époque JD)
const ORBITS={
 p67:[3.4628,0.6410,7.0405,50.147,12.780,0,2457247.6],       // comète 67P/Tchourioumov-Guérassimenko, périhélie 13/08/2015
 psp:[0.388,0.882,3.4,76.7,0,0,2460668.5],                   // Parker Solar Probe, orbite finale (périhélie 24/12/2024), orientation approx.
 solo:[0.601,0.513,10,76.7,40,0,2459664.5],                  // Solar Orbiter, orbite approx. (périhélie 26/03/2022)
 uly:[3.37,0.603,79.1,337.2,22.4,0,2454330.5]                // Ulysses, orbite polaire approx. (périhélie août 2007)
};

const LIRA_MISSIONS=['Missions spatiales du pôle planétologie (LIRA)','https://lira.observatoiredeparis.psl.eu/Missions-spatiales-du-pole'];
const LESIA_TECH=['Filières techniques du LESIA','https://lesia.obspm.fr/Filieres-techniques.html'];
const LESIA_PROJ=['Projets instrumentaux du LESIA','https://lesia.obspm.fr/-Projets-instrumentaux-.html'];

const MISSIONS=[
// ======================= EN COURS =======================
{id:'mmx',name:'MMX',full:'Martian Moons eXploration',agency:'JAXA',col:'#ff4fa3',kind:'mmx',type:'Retour d\'échantillons de Phobos',dest:'Mars · Phobos',
 launch:U(2026,10,19,19,41,3),arrive:U(2027,8,15),arriveLbl:'insertion en orbite martienne (~août 2027)',
 pos:{legs:[['earth',U(2026,10,19,19,41,3)],['mars',U(2027,8,15)]],after:{at:{b:'mars',r:30000,per:1.6}}},
 contrib:[['LIRA','Responsable scientifique (PI) du spectro-imageur infrarouge MIRS (0,9 – 3,6 µm), qui cartographiera Phobos et Deimos pour choisir les sites d\'échantillonnage.']],
 desc:'Première mission de retour d\'échantillons de Phobos : orbite martienne en 2027, prélèvement en 2029, retour sur Terre en 2031. Suivi détaillé : karimhx4.github.io/mmx-tracker.',
 miles:[[U(2026,10,19,19,41,3),'Lancement H3 F10'],[U(2027,8,15),'Insertion en orbite martienne (~)'],[U(2027,9,15),'Orbite autour de Phobos (~)'],[U(2029,6,1),'Échantillonnage (~)'],[U(2031,7,1),'Retour sur Terre (~)']],
 src:[LIRA_MISSIONS,['MMX Tracker','https://karimhx4.github.io/mmx-tracker/']]},

{id:'bepi',name:'BepiColombo',full:'BepiColombo (MPO + Mio)',agency:'ESA · JAXA',col:'#ffb347',kind:'probe',type:'Deux orbiteurs de Mercure',dest:'Mercure',
 launch:U(2018,10,20),arrive:U(2026,11,21),arriveLbl:'insertion en orbite autour de Mercure',
 pos:{legs:[['earth',U(2018,10,20)],['earth',U(2020,4,10)],['venus',U(2020,10,15)],['venus',U(2021,8,10)],['mercury',U(2021,10,1)]],
      after:{near:{b:'mercury',until:U(2026,11,21),lag:-14},then:{at:{b:'mercury',r:6000,per:0.1}}}},
 contrib:[['LIRA','Co-responsable (co-PI) de la suite SIMBIO-SYS et livraison du plan focal du spectromètre VIHI.'],['LESIA','Récepteurs radio et logiciel de vol de l\'instrument SORBET à bord de Mio.']],
 desc:'Après huit ans de croisière et neuf survols (Terre, Vénus, Mercure), BepiColombo s\'insère en orbite autour de Mercure ; les deux orbiteurs se séparent en décembre 2026 et la phase scientifique commence en avril 2027.',
 miles:[[U(2018,10,20),'Lancement Ariane 5'],[U(2020,4,10),'Survol de la Terre'],[U(2020,10,15),'1er survol de Vénus'],[U(2021,8,10),'2e survol de Vénus'],[U(2021,10,1),'1er des 6 survols de Mercure'],[U(2025,1,8),'6e survol de Mercure'],[U(2026,9,3),'Séparation du module de transfert MTM'],[U(2026,11,21),'Insertion en orbite de Mercure'],[U(2026,12,9),'Séparation MPO / Mio'],[U(2027,4,6),'Début de la phase scientifique']],
 src:[LIRA_MISSIONS,LESIA_TECH,['ESA – arrivée de BepiColombo','https://www.esa.int/Science_Exploration/Space_Science/BepiColombo/Latest_updates_BepiColombo_s_arrival_at_Mercury']]},

{id:'juice',name:'JUICE',full:'JUpiter ICy moons Explorer',agency:'ESA',col:'#7ad7ff',kind:'probe',type:'Orbiteur de Jupiter et Ganymède',dest:'Jupiter · Ganymède',
 launch:U(2023,4,14,12,14),arrive:U(2031,7,1),arriveLbl:'arrivée à Jupiter (juillet 2031)',
 pos:{legs:[['earth',U(2023,4,14,12,14)],['earth',U(2024,8,20)],['venus',U(2025,8,31)],['earth',U(2026,9,29)],['earth',U(2029,1,18)],['jupiter',U(2031,7,1)]],after:{at:{b:'jupiter',r:2.5e6,per:30}}},
 contrib:[['LIRA','Partenaire du spectro-imageur MAJIS et co-responsable scientifique (co-PI) de l\'expérience radio et plasma RPWI.'],['LERMA','Récepteur à 1 200 GHz de l\'instrument submillimétrique SWI.'],['IMCCE / LTE','Éphémérides utilisées pour la trajectoire de la sonde.']],
 desc:'JUICE rejoint Jupiter en 2031 après plusieurs assistances gravitationnelles (Lune-Terre, Vénus, Terre ×2) pour étudier Ganymède, Europe et Callisto, puis se mettre en orbite autour de Ganymède.',
 miles:[[U(2023,4,14),'Lancement Ariane 5'],[U(2024,8,20),'Survol Lune-Terre (LEGA)'],[U(2025,8,31),'Survol de Vénus'],[U(2026,9,29),'2e survol de la Terre'],[U(2029,1,18),'3e survol de la Terre'],[U(2031,7,1),'Arrivée à Jupiter'],[U(2034,12,1),'Orbite autour de Ganymède (~)']],
 src:[['JUICE : contributions de l\'Observatoire de Paris','https://observatoiredeparis.psl.eu/juice-contributions-from.html'],['LIRA – accueil','https://lira.observatoiredeparis.psl.eu/?lang=fr']]},

{id:'solo',name:'Solar Orbiter',full:'Solar Orbiter',agency:'ESA · NASA',col:'#ffe066',kind:'probe',type:'Observatoire du Soleil',dest:'Orbite autour du Soleil',
 launch:U(2020,2,10),
 pos:{legs:[['earth',U(2020,2,10)],['venus',U(2020,12,27)],['venus',U(2021,8,9)],['earth',U(2021,11,27)]],after:{kep:'solo'}},
 contrib:[['LESIA','Récepteurs radio et logiciel de vol de l\'instrument RPW, centre d\'opérations RPW (ROC) ; participation à STIX.']],
 desc:'Sonde qui s\'approche à environ 0,3 UA du Soleil en inclinant peu à peu son orbite pour observer ses pôles. Orbite représentée de façon approximative.',
 miles:[[U(2020,2,10),'Lancement Atlas V'],[U(2020,12,27),'1er survol de Vénus'],[U(2021,11,27),'Survol de la Terre'],[U(2022,3,26),'1er périhélie à ~0,32 UA']],
 src:[LESIA_TECH,LESIA_PROJ]},

{id:'psp',name:'Parker Solar Probe',full:'Parker Solar Probe',agency:'NASA',col:'#ff8a5c',kind:'probe',type:'Sonde solaire',dest:'Couronne solaire',
 launch:U(2018,8,12),pos:{kep:'psp'},
 contrib:[['LESIA','Participation à l\'instrument FIELDS (mesures radio et plasma).']],
 desc:'L\'objet le plus rapide jamais construit : depuis fin 2024, il passe tous les 88 jours à environ 6 millions de km de la surface du Soleil. Orbite finale représentée, orientation approximative.',
 miles:[[U(2018,8,12),'Lancement Delta IV Heavy'],[U(2024,11,6),'7e et dernier survol de Vénus'],[U(2024,12,24),'Périhélie record (~6,1 M km)']],
 src:[LESIA_PROJ]},

{id:'perseverance',name:'Perseverance',full:'Mars 2020 · rover Perseverance',agency:'NASA',col:'#ff7a2f',kind:'rover',type:'Rover martien',dest:'Mars · cratère Jezero',
 launch:U(2020,7,30),arrive:U(2021,2,18),arriveLbl:'atterrissage dans le cratère Jezero',
 pos:{legs:[['earth',U(2020,7,30)],['mars',U(2021,2,18)]],after:{at:{b:'mars',surf:true,ang:2.2}}},
 contrib:[['LIRA','Réalisation du spectromètre infrarouge IRS de SuperCam.']],
 desc:'Rover qui explore le cratère Jezero depuis février 2021 et prépare des échantillons de roches martiennes.',
 miles:[[U(2020,7,30),'Lancement Atlas V'],[U(2021,2,18),'Atterrissage à Jezero']],
 src:[LIRA_MISSIONS]},

{id:'mex',name:'Mars Express',full:'Mars Express',agency:'ESA',col:'#e8433a',kind:'probe',type:'Orbiteur martien',dest:'Mars',
 launch:U(2003,6,2),arrive:U(2003,12,25),arriveLbl:'insertion en orbite martienne',
 pos:{legs:[['earth',U(2003,6,2)],['mars',U(2003,12,25)]],after:{at:{b:'mars',r:9000,per:0.3}}},
 contrib:[['LIRA (ex-LESIA)','L\'équipe planétologie a contribué à la fabrication d\'instruments de la sonde.']],
 desc:'Doyenne des missions européennes en activité autour d\'une autre planète, en orbite martienne depuis 2003.',
 miles:[[U(2003,6,2),'Lancement Soyouz-Fregat'],[U(2003,12,25),'Insertion en orbite martienne']],
 src:[['Pôle planétologie (LIRA)','https://lira.observatoiredeparis.psl.eu/-Pole-Planetologie-']]},

{id:'jwst',name:'JWST',full:'James Webb Space Telescope',agency:'NASA · ESA · CSA',col:'#ffd23f',kind:'scope',type:'Télescope spatial infrarouge',dest:'Point de Lagrange L2',
 launch:U(2021,12,25,12,20),pos:{lag:'L2',ph:0},
 contrib:[['LESIA','Coronographes de l\'instrument MIRI (détection d\'exoplanètes géantes), avec l\'imageur MIRIM.'],['LIRA','Co-responsable de programmes d\'observation du système jovien et de Titan.']],
 desc:'Le plus grand télescope spatial, en orbite autour du point L2 à 1,5 million de km de la Terre.',
 miles:[[U(2021,12,25),'Lancement Ariane 5'],[U(2022,1,24),'Arrivée au point L2'],[U(2022,7,12),'Premières images scientifiques']],
 src:[['L\'Observatoire et l\'instrument MIRI','https://observatoiredeparis.psl.eu/l-observatoire-participera-a-la-realisation-de-l.html'],['CNES – Webb / MIRI','https://cnes.fr/projets/miri/en-details'],LIRA_MISSIONS]},

{id:'juno',name:'Juno',full:'Juno',agency:'NASA',col:'#c9a0ff',kind:'probe',type:'Orbiteur de Jupiter',dest:'Jupiter',
 launch:U(2011,8,5),arrive:U(2016,7,5),arriveLbl:'insertion en orbite autour de Jupiter',
 pos:{legs:[['earth',U(2011,8,5)],['earth',U(2013,10,9)],['jupiter',U(2016,7,5)]],after:{at:{b:'jupiter',r:4e6,per:33}}},
 contrib:[['LESIA','Partenaire de la mission (CNES) ; modélisation des émissions radio de Jupiter (code ExPRES) et analyse des données Waves.']],
 desc:'En orbite polaire autour de Jupiter depuis 2016. La dernière extension officielle s\'est achevée en septembre 2025 ; la sonde a continué à fonctionner, mais son avenir reste incertain.',
 miles:[[U(2011,8,5),'Lancement Atlas V'],[U(2013,10,9),'Survol de la Terre'],[U(2016,7,5),'Insertion en orbite jovienne'],[U(2025,9,30),'Fin de l\'extension officielle']],
 src:[['CNES – Juno','https://cnes.fr/en/projects/juno'],['Les émissions radio de Jupiter vues par Juno','https://www.observatoiredeparis.psl.eu/les-emissions-radio-de.html?lang=fr']]},

{id:'stereo',name:'STEREO-A',full:'Solar TErrestrial RElations Observatory',agency:'NASA',col:'#9ee6c4',kind:'probe',type:'Observatoire du Soleil',dest:'Orbite autour du Soleil',
 launch:U(2006,10,26),pos:{stereo:true},
 contrib:[['LESIA','Récepteurs radio de l\'instrument S/WAVES.']],
 desc:'Observatoire solaire qui tourne autour du Soleil un peu plus vite que la Terre ; il l\'a « rattrapée » en août 2023 et s\'en éloigne de nouveau. Position approximative.',
 miles:[[U(2006,10,26),'Lancement Delta II'],[U(2023,8,12),'Passage au plus près de la Terre']],
 src:[LESIA_TECH]},

{id:'wind',name:'Wind',full:'Wind',agency:'NASA',col:'#b8f0ff',kind:'sat',type:'Vent solaire',dest:'Point de Lagrange L1',
 launch:U(1994,11,1),pos:{lag:'L1',ph:0},
 contrib:[['LESIA','Récepteurs radio de l\'instrument WAVES.']],
 desc:'Vétéran de la météo spatiale, au point L1 entre la Terre et le Soleil, où il mesure le vent solaire.',
 miles:[[U(1994,11,1),'Lancement Delta II'],[U(2004,5,1),'Installation durable au point L1']],
 src:[LESIA_TECH]},

{id:'voyager1',name:'Voyager 1',full:'Voyager 1',agency:'NASA',col:'#7cf0c0',kind:'voy',type:'Sonde interstellaire',dest:'Espace interstellaire',
 launch:U(1977,9,5),pos:{voy:0},
 contrib:[['LESIA','Co-investigateur de l\'expérience radio planétaire PRA ; archive et diffusion des données PRA.']],
 desc:'L\'objet humain le plus lointain, dans l\'espace interstellaire depuis 2012.',
 miles:[[U(1977,9,5),'Lancement'],[U(1979,3,5),'Survol de Jupiter'],[U(1980,11,12),'Survol de Saturne'],[U(2012,8,25),'Entrée dans l\'espace interstellaire']],
 src:[['MASER – données Voyager/PRA','https://maser.lesia.obspm.fr/task-1-data-collections/maser-datasets/maser-datasets-obsparis-lesia.html']]},

{id:'voyager2',name:'Voyager 2',full:'Voyager 2',agency:'NASA',col:'#ffb36b',kind:'voy',type:'Sonde interstellaire',dest:'Espace interstellaire',
 launch:U(1977,8,20),pos:{voy:1},
 contrib:[['LESIA','Co-investigateur de l\'expérience radio planétaire PRA ; archive et diffusion des données PRA.']],
 desc:'Seule sonde à avoir survolé Uranus et Neptune, dans l\'espace interstellaire depuis 2018.',
 miles:[[U(1977,8,20),'Lancement'],[U(1979,7,9),'Survol de Jupiter'],[U(1981,8,26),'Survol de Saturne'],[U(1986,1,24),'Survol d\'Uranus'],[U(1989,8,25),'Survol de Neptune'],[U(2018,11,5),'Entrée dans l\'espace interstellaire']],
 src:[['MASER – données Voyager/PRA','https://maser.lesia.obspm.fr/task-1-data-collections/maser-datasets/maser-datasets-obsparis-lesia.html']]},

{id:'aces',name:'ACES · PHARAO',full:'Atomic Clock Ensemble in Space',agency:'ESA · CNES',col:'#41e0ff',kind:'station',type:'Horloge atomique sur l\'ISS',dest:'Station spatiale internationale',
 launch:U(2025,4,21),end:U(2028,4,21),endLbl:'fin prévue (durée nominale 3 ans)',pos:{lag:'LEO',ph:0},
 contrib:[['LTE (ex-SYRTE)','Impliqué depuis l\'origine dans l\'horloge à atomes froids de césium PHARAO, cœur de la mission.']],
 desc:'Première horloge à atomes de césium refroidis en orbite, fixée à l\'extérieur du module Columbus de l\'ISS pour tester la relativité générale.',
 miles:[[U(2025,4,21),'Lancement Falcon 9'],[U(2025,4,25),'Installation sur le module Columbus'],[U(2025,5,15),'Premières données (~)']],
 src:[['PHARAO lancée (Observatoire de Paris)','https://observatoiredeparis.psl.eu/pharao-successfully-launched.html?lang=en'],['CNES – PHARAO','https://cnes.fr/projets/pharao']]},

{id:'osirisrex',name:'OSIRIS-REx / APEX',full:'OSIRIS-REx, prolongée en OSIRIS-APEX',agency:'NASA',col:'#d0d0ff',kind:'probe',type:'Retour d\'échantillons d\'astéroïde',dest:'Apophis (2029)',
 launch:U(2016,9,8),pos:{none:true},
 contrib:[['LIRA','Participation à l\'exploitation scientifique des données, notamment des caméras OCAMS et du spectromètre OVIRS.']],
 desc:'A rapporté sur Terre des échantillons de l\'astéroïde Bennu en 2023, puis a été réorientée vers Apophis, qu\'elle doit rejoindre en 2029. Trajectoire non modélisée sur la carte.',
 miles:[[U(2016,9,8),'Lancement'],[U(2020,10,20),'Prélèvement sur Bennu'],[U(2023,9,24),'Retour de la capsule sur Terre']],
 src:[LIRA_MISSIONS]},

{id:'hayabusa2',name:'Hayabusa2',full:'Hayabusa2',agency:'JAXA',col:'#ffc1d9',kind:'probe',type:'Retour d\'échantillons d\'astéroïde',dest:'1998 KY26 (2031)',
 launch:U(2014,12,3),pos:{none:true},
 contrib:[['LIRA','Participation à l\'exploitation scientifique des données de la mission.']],
 desc:'A rapporté des échantillons de l\'astéroïde Ryugu en 2020 et poursuit sa route vers le petit astéroïde 1998 KY26. Trajectoire non modélisée sur la carte.',
 miles:[[U(2014,12,3),'Lancement'],[U(2019,2,22),'1er prélèvement sur Ryugu'],[U(2020,12,5),'Retour de la capsule sur Terre']],
 src:[LIRA_MISSIONS]},

// ======================= TERMINÉES =======================
{id:'rosetta',name:'Rosetta',full:'Rosetta & Philae',agency:'ESA',col:'#8fd3ff',kind:'probe',type:'Orbiteur de comète',dest:'Comète 67P',
 launch:U(2004,3,2),arrive:U(2014,8,6),arriveLbl:'arrivée à la comète 67P',end:U(2016,9,30),endLbl:'atterrissage final sur la comète',
 pos:{legs:[['earth',U(2004,3,2)],['earth',U(2005,3,4)],['mars',U(2007,2,25)],['earth',U(2007,11,13)],['earth',U(2009,11,13)],['p67',U(2014,8,6)]],after:{follow:'p67'}},
 contrib:[['LESIA','Voie VIRTIS-H (spectromètre infrarouge haute résolution) ; participation à l\'instrument micro-ondes MIRO ; co-investigateurs de la caméra OSIRIS.']],
 desc:'Première sonde en orbite autour d\'une comète et premier atterrissage (Philae) sur un noyau cométaire, en 2014. Rosetta repose sur 67P, dont on suit ici l\'orbite.',
 miles:[[U(2004,3,2),'Lancement Ariane 5'],[U(2007,2,25),'Survol de Mars'],[U(2014,8,6),'Arrivée à 67P'],[U(2014,11,12),'Atterrissage de Philae'],[U(2015,8,13),'Périhélie de la comète'],[U(2016,9,30),'Fin de mission sur la comète']],
 src:[LIRA_MISSIONS,['Lancement de Rosetta (Observatoire de Paris)','https://www.obspm.fr/lancement-de-rosetta-par.html?lang=en']]},

{id:'cassini',name:'Cassini-Huygens',full:'Cassini-Huygens',agency:'NASA · ESA · ASI',col:'#f2d27a',kind:'probe',type:'Orbiteur de Saturne + sonde Huygens',dest:'Saturne · Titan',
 launch:U(1997,10,15),arrive:U(2004,7,1),arriveLbl:'insertion en orbite autour de Saturne',end:U(2017,9,15),endLbl:'plongée finale dans Saturne',
 pos:{legs:[['earth',U(1997,10,15)],['venus',U(1998,4,26)],['venus',U(1999,6,24)],['earth',U(1999,8,18)],['jupiter',U(2000,12,30)],['saturn',U(2004,7,1)]],after:{at:{b:'saturn',r:1.2e6,per:20}}},
 contrib:[['LESIA / LIRA','Co-investigateurs des instruments VIMS et CIRS (Cassini), DISR et HASI (Huygens) ; récepteurs radio de RPWS et traitement des données (Kronos).']],
 desc:'Treize ans d\'exploration de Saturne, de ses anneaux et de ses lunes ; la sonde Huygens s\'est posée sur Titan le 14 janvier 2005.',
 miles:[[U(1997,10,15),'Lancement Titan IV'],[U(2000,12,30),'Survol de Jupiter'],[U(2004,7,1),'Orbite autour de Saturne'],[U(2005,1,14),'Atterrissage de Huygens sur Titan'],[U(2017,9,15),'Plongée finale dans Saturne']],
 src:[LIRA_MISSIONS,LESIA_TECH]},

{id:'vex',name:'Venus Express',full:'Venus Express',agency:'ESA',col:'#fff0b8',kind:'probe',type:'Orbiteur de Vénus',dest:'Vénus',
 launch:U(2005,11,9),arrive:U(2006,4,11),arriveLbl:'insertion en orbite autour de Vénus',end:U(2014,12,16),endLbl:'fin de mission',
 pos:{legs:[['earth',U(2005,11,9)],['venus',U(2006,4,11)]],after:{at:{b:'venus',r:30000,per:1}}},
 contrib:[['LESIA','Co-responsable du spectromètre VIRTIS, modèle de rechange de celui de Rosetta.']],
 desc:'Huit ans d\'étude de l\'atmosphère de Vénus, de 2006 à 2014.',
 miles:[[U(2005,11,9),'Lancement Soyouz-Fregat'],[U(2006,4,11),'Orbite autour de Vénus'],[U(2014,12,16),'Fin de mission']],
 src:[LIRA_MISSIONS]},

{id:'galileo',name:'Galileo',full:'Galileo',agency:'NASA',col:'#d9b38c',kind:'probe',type:'Orbiteur de Jupiter',dest:'Jupiter',
 launch:U(1989,10,18),arrive:U(1995,12,7),arriveLbl:'insertion en orbite autour de Jupiter',end:U(2003,9,21),endLbl:'plongée finale dans Jupiter',
 pos:{legs:[['earth',U(1989,10,18)],['venus',U(1990,2,10)],['earth',U(1990,12,8)],['earth',U(1992,12,8)],['jupiter',U(1995,12,7)]],after:{at:{b:'jupiter',r:2e6,per:40}}},
 contrib:[['LESIA','Participation au spectromètre infrarouge NIMS.']],
 desc:'Premier orbiteur de Jupiter (1995-2003), avec une sonde de descente dans l\'atmosphère jovienne.',
 miles:[[U(1989,10,18),'Lancement (navette Atlantis)'],[U(1990,2,10),'Survol de Vénus'],[U(1995,12,7),'Orbite autour de Jupiter'],[U(2003,9,21),'Plongée finale dans Jupiter']],
 src:[['Projets instrumentaux du LESIA','https://lesia.obspm.fr/Les-projets-instrumentaux-du-LESIA']]},

{id:'ulysses',name:'Ulysses',full:'Ulysses',agency:'ESA · NASA',col:'#ffe9a8',kind:'probe',type:'Sonde solaire polaire',dest:'Orbite polaire du Soleil',
 launch:U(1990,10,6),end:U(2009,6,30),endLbl:'fin de mission',
 pos:{legs:[['earth',U(1990,10,6)],['jupiter',U(1992,2,8)]],after:{kep:'uly'}},
 contrib:[['Observatoire de Paris-Meudon','Co-auteur de l\'expérience radio et plasma URAP ; récepteurs radio réalisés au LESIA.']],
 desc:'Seule sonde à avoir survolé les pôles du Soleil, grâce à un survol de Jupiter qui l\'a fait sortir du plan des planètes. Orbite finale approximative.',
 miles:[[U(1990,10,6),'Lancement (navette Discovery)'],[U(1992,2,8),'Survol de Jupiter'],[U(1994,9,13),'1er survol du pôle Sud solaire'],[U(2009,6,30),'Fin de mission']],
 src:[['URAP (archive PDS)','https://pds-ppi.igpp.ucla.edu/archive1/ULY_5001/DOCUMENT/URAP/URAPINST.HTM'],LESIA_TECH]},

{id:'gaia',name:'Gaia',full:'Gaia',agency:'ESA',col:'#cfe3ff',kind:'disc',type:'Astrométrie de la Galaxie',dest:'Point de Lagrange L2',
 launch:U(2013,12,19,9,12),end:U(2025,3,27),endLbl:'satellite désactivé',pos:{lag:'L2',ph:2.1},
 contrib:[['GEPI · IMCCE · SYRTE','Plus de 50 personnes impliquées depuis 1998 dans le traitement des données (DPAC) : spectroscopie, objets du Système solaire, binaires, validation du catalogue.']],
 desc:'A mesuré la position, la distance et le mouvement de près de deux milliards d\'étoiles de la Voie lactée.',
 miles:[[U(2013,12,19),'Lancement Soyouz-Fregat'],[U(2018,4,25),'2e catalogue (DR2)'],[U(2022,6,13),'3e catalogue (DR3)'],[U(2025,3,27),'Désactivation']],
 src:[['10e anniversaire de Gaia (Observatoire de Paris)','https://observatoiredeparis.psl.eu/10th-anniversary-of-gaia.html'],['Gaia au jour le jour','https://observatoiredeparis.psl.eu/gaia-au-jour-le-jour.html']]},

{id:'herschel',name:'Herschel',full:'Herschel Space Observatory',agency:'ESA',col:'#a8d8ff',kind:'disc',type:'Télescope spatial infrarouge lointain',dest:'Point de Lagrange L2',
 launch:U(2009,5,14),end:U(2013,4,29),endLbl:'épuisement de l\'hélium',pos:{lag:'L2',ph:4.2},
 contrib:[['LERMA','Contributions à l\'instrument hétérodyne HIFI (canal 500 µm).']],
 desc:'Le plus grand télescope infrarouge lointain de son époque, dédié à la formation des étoiles et des galaxies.',
 miles:[[U(2009,5,14),'Lancement Ariane 5 (avec Planck)'],[U(2013,4,29),'Fin des observations']],
 src:[['LERMA – instrumentation (SWI, HIFI)','https://lerma.obspm.fr/IMG/pdf/pole_4_-_c._prigent.pdf']]},

{id:'planck',name:'Planck',full:'Planck',agency:'ESA',col:'#e0c8ff',kind:'disc',type:'Fond diffus cosmologique',dest:'Point de Lagrange L2',
 launch:U(2009,5,14),end:U(2013,10,23),endLbl:'satellite désactivé',pos:{lag:'L2',ph:5.3},
 contrib:[['LERMA','Implication scientifique dans l\'exploitation de la mission.']],
 desc:'A cartographié le rayonnement fossile du Big Bang avec une précision inégalée.',
 miles:[[U(2009,5,14),'Lancement Ariane 5 (avec Herschel)'],[U(2013,10,23),'Désactivation']],
 src:[['Présentation du LERMA','https://lerma.obspm.fr/IMG/pdf/presentation_generale_lerma.pdf']]},

{id:'corot',name:'CoRoT',full:'Convection, Rotation et Transits planétaires',agency:'CNES',col:'#ffd7a8',kind:'sat',type:'Astérosismologie et exoplanètes',dest:'Orbite terrestre',
 launch:U(2006,12,27),end:U(2013,6,24),endLbl:'fin de mission',pos:{lag:'LEO',ph:1.5},
 contrib:[['LESIA','Forte implication du pôle étoiles ; plateforme logicielle de test de la mission.']],
 desc:'Satellite français pionnier de la détection d\'exoplanètes par transit (CoRoT-7b) et de l\'étude des oscillations stellaires.',
 miles:[[U(2006,12,27),'Lancement Soyouz'],[U(2009,2,3),'Annonce de CoRoT-7b'],[U(2013,6,24),'Fin de mission']],
 src:[['Bilan du pôle Astronomie (LESIA)','https://www.lesia.obspm.fr/IMG/pdf/BILAN_Activites_Astronomie.pdf'],LESIA_TECH]},

{id:'cluster',name:'Cluster',full:'Cluster II',agency:'ESA',col:'#c4ffd9',kind:'sat',type:'Quatre satellites de la magnétosphère',dest:'Orbite terrestre',
 launch:U(2000,7,16),end:U(2024,9,8),endLbl:'rentrée du dernier satellite',pos:{lag:'HEO',ph:0.4},
 contrib:[['LESIA','Analyseur d\'ondes plasma de l\'instrument STAFF.']],
 desc:'Quatre satellites volant en formation pendant 24 ans pour étudier la magnétosphère terrestre en 3D.',
 miles:[[U(2000,7,16),'1er lancement Soyouz'],[U(2000,8,9),'2e lancement Soyouz'],[U(2024,9,8),'Rentrée de Salsa, fin de mission']],
 src:[LESIA_TECH]},

{id:'image',name:'IMAGE',full:'Imager for Magnetopause-to-Aurora Global Exploration',agency:'NASA',col:'#ffffff',kind:'sat',type:'Imagerie de la magnétosphère',dest:'Orbite terrestre',
 launch:U(2000,3,25),end:U(2005,12,18),endLbl:'perte de contact',pos:{lag:'HEO',ph:3.6},
 contrib:[['LESIA','Chaîne de pré-amplification des récepteurs radio du sondeur RPI.']],
 desc:'Première mission à imager globalement la magnétosphère terrestre.',
 miles:[[U(2000,3,25),'Lancement Delta II'],[U(2005,12,18),'Perte de contact']],
 src:[LESIA_TECH]},

// ======================= FUTURES =======================
{id:'plato',name:'PLATO',full:'PLAnetary Transits and Oscillations of stars',agency:'ESA',col:'#ffe28a',kind:'scope',type:'Chasseur d\'exoplanètes',dest:'Point de Lagrange L2',
 launch:U(2027,1,15),launchLbl:'fin 2026 – début 2027 (Ariane 6)',pos:{lag:'L2',ph:1.1},
 contrib:[['LESIA / LIRA','Logiciel de vol, plateforme de test et responsabilités scientifiques, dans la lignée de CoRoT.']],
 desc:'26 caméras pour chercher des planètes de type terrestre autour de 200 000 étoiles et étudier leurs oscillations.',
 miles:[[U(2027,1,15),'Lancement Ariane 6 (~)'],[U(2027,6,1),'Début des observations (~)']],
 src:[['Feu vert de l\'ESA pour PLATO','https://observatoiredeparis.psl.eu/feu-vert-de-l-esa-pour-la-4646.html'],['ESA – Plato sur Ariane 6','https://www.esa.int/Science_Exploration/Space_Science/Plato/Planet_hunter_Plato_to_fly_on_Ariane_6']]},

{id:'ariel',name:'Ariel',full:'Atmospheric Remote-sensing Infrared Exoplanet Large-survey',agency:'ESA',col:'#b0ffea',kind:'scope',type:'Atmosphères d\'exoplanètes',dest:'Point de Lagrange L2',
 launch:U(2029,6,1),launchLbl:'2029',pos:{lag:'L2',ph:3.1},
 contrib:[['LIRA','Responsable de l\'étalonnage du spectromètre infrarouge AIRS, instrument principal.']],
 desc:'Étudiera la composition des atmosphères d\'un millier d\'exoplanètes.',
 miles:[[U(2029,6,1),'Lancement prévu (~)']],
 src:[LIRA_MISSIONS]},

{id:'dragonfly',name:'Dragonfly',full:'Dragonfly',agency:'NASA',col:'#ffa8a8',kind:'rover',type:'Giravion sur Titan',dest:'Titan (Saturne)',
 launch:U(2028,7,5),launchLbl:'fenêtre du 5 au 25 juillet 2028',arrive:U(2034,7,1),arriveLbl:'arrivée sur Titan (2034)',
 pos:{legs:[['earth',U(2028,7,5)],['saturn',U(2034,7,1)]],after:{at:{moon:'TITAN',surf:true}}},
 contrib:[['LIRA','Participation au spectromètre de masse DraMS (avec chromatographe DraMS-GC).']],
 desc:'Drone à rotors à propulsion nucléaire qui volera de site en site à la surface de Titan. Trajectoire simplifiée (sans assistances gravitationnelles).',
 miles:[[U(2028,7,5),'Lancement Falcon Heavy (~)'],[U(2034,7,1),'Arrivée sur Titan (~)']],
 src:[LIRA_MISSIONS,['NASA – Dragonfly','https://science.nasa.gov/blogs/dragonfly/2025/09/08/nasas-dragonfly-soaring-through-key-development-test-activities']]},

{id:'envision',name:'EnVision',full:'EnVision',agency:'ESA',col:'#ffe6a8',kind:'probe',type:'Orbiteur de Vénus',dest:'Vénus',
 launch:U(2031,11,1),launchLbl:'~2031',arrive:U(2032,4,15),arriveLbl:'arrivée à Vénus (date indicative)',
 pos:{legs:[['earth',U(2031,11,1)],['venus',U(2032,4,15)]],after:{at:{b:'venus',r:20000,per:0.2}}},
 contrib:[['LIRA','Tête optique et filtres de l\'instrument infrarouge VenSpec-M, contribution au spectromètre VenSpec-U.']],
 desc:'Étudiera l\'activité géologique et l\'atmosphère de Vénus. Lancement prévu vers 2031 ; date d\'arrivée et trajectoire indicatives.',
 miles:[[U(2031,11,1),'Lancement (~)'],[U(2032,4,15),'Arrivée à Vénus (date indicative)']],
 src:[LIRA_MISSIONS]},

{id:'veritas',name:'VERITAS',full:'Venus Emissivity, Radio science, InSAR, Topography & Spectroscopy',agency:'NASA',col:'#ffd0a0',kind:'probe',type:'Orbiteur de Vénus',dest:'Vénus',
 launch:U(2031,6,1),launchLbl:'pas avant 2031',arrive:U(2031,11,15),arriveLbl:'arrivée à Vénus (date indicative)',
 pos:{legs:[['earth',U(2031,6,1)],['venus',U(2031,11,15)]],after:{at:{b:'venus',r:15000,per:0.15}}},
 contrib:[['LIRA','Tête optique et filtres du spectromètre infrarouge VEM.']],
 desc:'Cartographiera la surface et la topographie de Vénus. Lancement pas avant 2031 ; date d\'arrivée et trajectoire indicatives.',
 miles:[[U(2031,6,1),'Lancement (~)'],[U(2031,11,15),'Arrivée à Vénus (date indicative)']],
 src:[LIRA_MISSIONS]}
];
