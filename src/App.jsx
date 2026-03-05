import { useState, useCallback } from "react";

const UNUSED_CHARACTERS = [
  "'Spinner","3-D Man / Charles Chandler","3-D Man / Triathalon / Delroy Garrett","A-Bomb","Aarkus (Vision)","Aaron Davis (Earth-1610)","Abigail Brand","Abominable Snowman","Abyss (Nils Styger)","Acrobat (Spider-Squad)","Adam X","Aegis (Lady Of All Sorrows)","Aegis (Trey Rollins)","Agent Peggy Carter","Agent X","Agent Zero / Maverick","Ahura","Ai Apaec","Ajak Celestia","Al B. Harper","Alaris","Aldrich Killian","Alecto","Aleph","Alexander Pierce","Alicia Masters","Alpha","Amatsu-Mikaboshi / Chaos King","American Dream","American Kaiju","American Panther","Amphibian / Kingsley Rice","Anddar Bal","Andrea Strucker","Android Man","Aneka","Anna Maria Marconi","Anna Watson","Ant-Man I (Hank Pym)","Anti-Man / Conner Sims","Anya Corazon (Earth-982)","Apocryphus","Arachknight (Peter Parker)","Arachne","Arachnoman","Arcade","Archangel","Arclight","Aries / Marcus Lassiter (Lords Of The Zodiac)","Arkon","Armadillo","Aron The Rogue Watcher","Asp","Astra","Astrolabe / Al-Hasan","Astronomer","Atlas","Att-Lass","Aunt May Parker","Avalanche / Dominikos Petrakis","Avatar (Princess Alaisa Ruantha Pethnan)","Avengers","Aya","Ayaman","Ayo","Azazel","Balder The Brave","Bamfs","Banshee","Banyan (Ajay Roy)","Baron Blood","Baron Gregor Russoff","Baron Macabre","Baron Strucker","Battlestar","Beetle I (Abner Jenkins)","Beetle Iii (Janice Lincoln)","Belasco","Belle Thorne","Ben Parker","Ben Urich","Bengal","Benjamin Deeds","Betty Brant","Beyonder","Bi-Beast","Big Bertha (Ashley Crawford)","Big Man","Big Wheel","Biohazard (From New Warriors)","Black Ant (Eric O'Grady)","Black Cat Venom","Black Dwarf","Black King / Sebastian Shaw","Black Mamba","Black Mariah","Black Panther Ii / Shuri","Black Spectre","Black Suit Spider-Man (Peter Parker)","Black Talon","Black Tom","Black Widow 2099","Black Widow Ii (Yelena Belova)","Blacklash","Blackout (Lilin)","Blackout (Marcus Daniels)","Blackwing I (Joseph Manfredi)","Blastaar","Blazing Skull","Blindspot","Bling","Blizzard (Donald Gill)","Blockbuster","Blood Brothers","Blood Spider (Michael Bingham)","Bloodhawk","Bloodlust (Femme Fatales)","Blue Eagle","Blur","Bob Diamond (Sons Of The Tiger)","Bolivar Trask","Bombastic Bag-Man Suit","Bombshell (Lara Baumgartner)","Boom Boom","Boomerang","Box","Brainstorm (Valeria Richards)","Bride Of The Nine Spiders","Brigid O'Reilly","Brood Queen","Brother Royal","Brotherhood Of Badoon","Bruiser","Bruno Carrelli","Brutacus","Brute (Ralph Hutchins)","Bucka / Bucky (Past Life) (Egypt)","Bucky (Past Life) (Middle Ages)","Bulldozer","Butterball","Caesar Cicero","Caledonia (Alysande Stuart)","Callisto","Calypso","Cancer (Lords Of The Zodiac)","Cap-Wolf (Sam Wilson)","Cap-Wolf (Steve Rogers)","Captain America 2099","Captain America I (Steve Rogers)","Captain America Ii (Bucky Barnes)","Captain America Iii (Sam Wilson)","Captain Avalon","Captain Britain","Captain Glory","Captain Marvel I (Mar-Vell)","Captain Marvel Iii (Carol Danvers)","Captain Stacy","Cardinal Raker","Caretaker I (Blood)","Caretaker Ii (Sara)","Carina Walters","Carlie Cooper","Carol Landers","Caroline Le Fay","Carrion (Malcolm Mcbride)","Carrion Crow","Catseye","Cerebra","Ch'Od","Challenger","Champion (Of The Universe) / Tryco Slatterus","Chance","Charlie-27","Chase Stein (Runaways)","Chaste","Chemistro","Cheshire Cat","Chimera","Chipmunk Hunk","Chthon","Citizen V","Clash (Clayton Cole)","Cloud 9","Clown","Coil","Comanche","Condor","Constrictor","Contemplator","Controller","Corsair","Count Nefaria","Coyote","Crimson Dynamo/ Anton Vanko","Crippler","Crossfire","Crush","Crusher Hogan","Cullen Bloodstone","Cyclone","Cynthia Von Doom","Cypher","D'Spayre","Daimon Hellstrom","Dani Moonstar / Mirage / Psyche","Daniel Drumm","Dante (New Alpha Flight)","Daredevil Noir","Dark Phoenix","Dark Raider (Reed Richards)","Darkoth (Desmond Pitt)","Darkstar","Darwin","De'Lila","Dead Aim","Dead Girl","Deadpool Kid","Death Adder","Death Locket","Deathbird","Deathurge","Demogoblin","Demonicus","Designate / Thor Girl (Tarene)","Detroit Steel I (Doug Johnson Iii)","Detroit Steel Ii / Sasha Hammer","Devlor The Deadly","Devos The Devastator","Diablo (Esteban Diablo)","Diamondhead","Dinah Soar","Doc Samson","Doctor Doom (Victor Von Doom)","Doctor Druid","Doctor Faustus (Johann Fennhoff)","Doctor Nemesis","Doctor Octopus 2099","Doctor Spectrum","Doctor Voodoo / Brother Voodoo","Dog Brother #1","Dogpool","Doomstadt","Doop","Doorman (Demarr Davis)","Doyle Dormammu","Dr. Nels Van Adder / Proto-Goblin","Dragonfly","Drexxon","Druid","Druig","Dusk (Peter Parker)","Dust (Sooraya Qadir)","Dwarf King (King Eitri)","Dweller In Darkness","Eden Fesi","Egghead","Electro 2099","Electro Ii / Aftershock (Allison Dillon)","Electron","El Aguila","Elloe Kaifi","Eon","Eternity","Excalibur","Executioner","Exodus","Eye Boy","Falcon Ii (Joaquin Torres)","Fancy Dan","Fandral","Fantastic Four","Fat Cobra","Fatale","Fenris (Group)","Feral","Finesse","Firebird","Firebrand / Gary Gilbert","Fixer","Flag-Smasher","Flash Thompson","Foolkiller","Force (Clayton Wilson)","Franklin Richards","Frost Giants","Fulmina (Sylvia Prell)","Gaea","Ganke Lee","Gardener","Gargoyle","Garokk","Gateway","Gazelle","Gemini (Lords Of The Zodiac)","Ghost Panther (T'Challa)","Ghost Rider 2099 (Kenshiro 'Zero' Cochrane)","Ghost Rider Ii (Johnny Blaze)","Ghost Rider Iv (Robbie Reyes)","Ghost Spider Iii","Giant-Man","Gibbon","Gideon","Glob Herman","Glorian (Thomas Gideon)","Glory Grant","Golden Age Deadpool","Gorilla-Man","Gorr The Godbutcher","Graviton","Gravity","Grey Gargoyle / Paul Duval","Grim Reaper / Eric Williams","Grizzly (Maxwell Markham)","Guardian (Spider-Clone)","Guardian / James Hudson","Gwen Stacy","Gypsy Moth","Hammerhead","Hank Pym","Hannibal King","Hardball","Harpoon","Harry Osborn","Hate-Monger","Hawkeye 2099","Hellcat (Patsy Walker)","Hellphyr","Hellscout","Hepzibah","Hiram Shaw","Hiroim","Hollywood","Hornet (Peter Parker)","Horus","Hulk 2099","Human Cannonball / Jack Pulver","Huntara","Husk","Hussar","Hyperion","Hypno-Hustler","Ikaris (Eternals)","Ikon","Immortus","Impossible Man","Infamous Iron Man (Victor Von Doom)","Invisible Girl (Susan Storm Richards)","Iron Cross (Clare Gruler)","Iron Hammer [Iron Man And Thor]","Iron Monger / Obadiah Stane","Iron Patriot Iii (Toni Ho)","Iron Spider","Ironclad (U-Foes)","Isaac Newton","Iso (Xiaoyi)","J. Jonah Jameson, Sr.","Jack O'Lantern","Jack Of Hearts","Jackal","Jackpot","Jean Dewolff","Jemma Simmons","Jester","Jewel (Jessica Jones)","Jimmy Woo","John Jameson","Justice","Kallark / Gladiator","Kaluu","Kangaroo (Brian Hibbs)","Karma","Karn","Karnak","Karnilla, Queen Of The Norns","Karolina Dean (Runaways)","Kid Colt","Kid Kaiju","Kid Kree / Mel-Varr","Kid Venom","Killer Shrike","Killraven","King Cobra / Klaus Voorhees","Kingo","Korath The Pursuer","Korvac/ Michael Korvac","Kraven The Hunter","Kraven The Hunter (Poison)","Kristoff Vernard","Lady Deadpool","Lady Hellbender","Lady Mandarin (Kwannon) / Revanche","Lady Octopus","Lady Spider","Lash","Lei Kung The Thunderer","Leo (Lords Of The Zodiac)","Leonus","Libra","Lila Cheney","Lilith","Lin Sun (Sons Of The Tiger)","Lineage","Lionfang","Live Wire (Rance Preston)","Living Brain","Living Lightning","Living Mummy, The / N'Kantu","Lockdown (Jomo Kimanye)","Longbow","Longshot","Looter","Lord Chaos","Lord Templar","Lorelei","Lunatik","Lyja (The Laserfist)","M (Monet St. Croix)","M.O.D.A.M.","Mac Gargan","Madame Hydra (Viper)","Madame Masque","Madelyne Pryor","Madison Jeffries","Maelstrom","Maestro","Magma","Man-Beast","Man-Wolf","Mandarin","Mangog","Mania (Andi Benton)","Mania (Symbiote / Kylntar)","Maniac (Lee Price)","Manifold","Manphibian","Marak","Marduk Kurios","Maria Russoff","Maris Morlak","Mastermind (Jason Wyngarde)","Mastermind (Martinique Wyngarde)","Master Hate","Master Order","Matriarch, The","Max Modell","Mayhem (April Parker)","Mechamage","Menace","Mendel Stromm / Robot-Master","Mesmero","Metallo","Mettle","Mimic","Mindworm","Mister Immortal (Craig Hollis)","Mistress Death","Molecule Man (Owen Reece)","Molly Hayes (Runaways)","Molten Man","Morlun","Mosaic","Moses Magnum","Mother Mold","Mr. Hyde","Mr. Joe Fixit","Ms. Marvel I (Carol Danvers)","Ms. Marvel Ii (Kamala Khan)","N'Astirh","Naja","Night Thrasher","Nightfall","Nighthawk / Nightshade / Tilda Johnson","Nightmask","Nightshade","Noh-Varr / Protector","Nomad (Steve Rogers)","Norman Osborn","Northstar","Nova I (Richard Rider)","Nova Ii (Sam Alexander)","Nuke","Obliterator (Interstellar)","Occulus","Old Man Bullseye","Old Man Hawkeye","Original Human Torch (Jim Hammond)","Over-Mind / Grom","Pagan","Paladin","Panda-Mania","Phoenix (1,000,000 Bc)","Piledriver","Pip The Troll","Plunderer","Power Man","Power Princess","Powerhouse (Franklin Richards)","Predator X","Prestige / Rachel Gray","Proteus","Psycho-Man","Puck (New Alpha Flight)","Puma","Puppet Master","Purple Man","Pyro","Quasar","Quasar Ii (Avril Kincaid)","Quentin Quire","Radioactive Man","Ragnarok","Ravenous","Rawhide Kid","Raza Longknife","Raze","Red Ghost (Ivan Kragoff)","Red Goblin","Red Hulk Ii (Robert Maverick)","Red King","Red Onslaught","Red She-Hulk","Red Wolf","Regent (Augustus Roman)","Reptil","Requiem (Gamora)","Reverend Achebe","Rick Jones","Rictor","Riot (Symbiote / Kylntar)","Riptide","Robbie Robertson","Ronin / Clint Barton","Ruby Thursday","S'Byll","Sabra","Satana Hellstrom (Satana)","Satannish","Scarlet Beetle","Scarlet Centurion","Scarlet Samurai","Scarlet Spider Ii (Ben Reilly)","Scarlet Spider Iii (Felicity Hardy)","Scorpia (Elaine Coll)","Screwball","Seeker","Sentinel Prime / Prime Sentinel","Sentinels","Seth","Shaman / Michael Twoyoungmen","Shanna The She-Devil","Shaper Of Worlds","Shatterstar","Shiklah","Shockwave","Shriek (Frances Barrison)","Sigyn","Sikorsky","Silver Dagger","Silvermane","Sin / Sinthea Shmidt","Singularity","Siryn","Slingshot","Slyde","Smythe","Snowbird / Narya","Songbird","Sp//Dr (Peni Parker)","Speed Demon","Speedball","Sphinx","Spider-Boy","Spider-Girl (Anya Corazon)","Spider-Girl (May Parker)","Spider-Man Ii (Miles Morales)","Spider-Man Noir","Spider-Slayer","Spider-Uk","Spiral","Spitfire","Spot (Johnathan Ohnn)","Sprite","Spyder-Knight","Spymaster","Squirrelpool","Steel Serpent","Steel Spider (Ollie Osnick)","Stegron Dino Man (Vincent Stegron)","Stepford Cuckoos / Celeste","Stinger (Cassie Lang)","Stingray","Stone","Striker","Sugar Man","Sun King","Sunfire","Superior Carnage (Karlin Malus)","Superior Doctor Octopus","Supreme Intelligence","Swordsman (Jacques Duquesne)","Synch / Everett Thomas","Talos","Tarantula","Taserface","Taurus (Cornelius Van Lunt)","Techno Golem (Tomoe)","Teen Abomination / Jamie Carlson","Tempus / Chrono Key","Terminatrix / Ravonna Lexus Renslayer","Texas Twister (Drew Daniels)","Thane","The Aged Genghis","The Apocalypse Twins","The Griever","The Hand","The Presence","The Shroud","The Stranger","Thunderball","Thunderbird","Tiger Shark","Tigra","Tinkerer","Titanium Man","Topaz Ii","Torgo","Toro","Tracksuit Mafia / Tracksuit Brothers","Trapster / Paste-Pot Pete (Peter Petruski)","Trickshot / Buck Chisholm","Trinary","Turk Barrett","Two-Gun Kid","U-Go Girl","Ulik","Union Jack","Unus The Untouchable","Vapor / Ann Darnell","Vector / Simon Utrecht","Veil","Venom 2099","Venompool","Victor Mancha","Victor Stein","Victorious","Vin Gonzales","Vindicator","Void","Volstagg","Vox / Maximus Boltagon","Voyager (Valerie Vector)","Vulcan","Wasp I (Janet Van Dyne)","Wasp Ii (Hope Van Dyne)","Wasp Iii (Nadia Pym)","Weapon Hex (Wanda) [Scarlet Witch And X-23]","Weapon X","Wendigo","Whiplash/ Anton Vanko","Whirlwind","White Fox / Ami Han","White Wolf","Whizzer","Wild One","Wiz Kid","Wizard","Wonder Man","Wrecker","Wyatt Wingfoot","X-Cutioner","X-Man (Nate Grey)","X-Ray / James 'Jimmy' Darnell","Xandu","Xarus","Xemnu The Titan","Yellow Claw / Plan Chu","Yon-Rogg","Yotat","Yu-Ti","Yukio","Zadkiel","Zak-Del (Wraith)","Zelma Stanton","Zeus","Zom","Zzzax"
];

// ── SNAP Cards currently in the game (631 entries) ───────────────────────────
const SNAP_CARDS = [
  "Abomination","Absorbing Man","Acid Arrow","Adam Warlock","Adamantium Infusion","Aero","Agamotto","Agatha Harkness","Agent 13","Agent Coulson","Agent Venom","Agony","Agony - Spider-Verse","Air-Walker","Ajax","Alioth","America Chavez","Angel","Angela","Annihilus","Annihilus Champion","Ant Man","Anti-Venom","Anti-Venom - Spider-Verse","Apocalypse","Apocalypse, Celestials' Chosen","Arachnid Acrobatics","Araña","Archangel Horseman of Death","Ares","Arishem","Armor","Arnim Zola","Askani'son","Astral Projection","Attuma","Aurora","Awesome Andy","Baron Mordo","Baron Zemo","Basic Arrow","Bast","Bastion","Batroc the Leaper","Beast","Berserker Rage","Beta Ray Bill","Bishop","Black Bolt","Black Cat","Black Knight","Black Panther","Black Panther Champion","Black Swan","Black Widow","Blade","Blink","Blob","Blue Marvel","Bolts of Balthakk","Brand of Shou-Lao","Brood","Broodling","Bruce Banner","Bucky Barnes","Bug","Bullseye","Cable","Caiera","Caliban Horseman of Pestilence","Cannonball","Cap's Shield","Captain America","Captain America Champion","Captain Carter","Captain Marvel","Captain America (Avengers)","Carnage","Cassandra Nova","Celestial Empowerment","Cerebro","Chamber","Chameleon","Chimichanga","Clea","Cloak","Clobberin' Time","Cobra","Colleen Wing","Colonel America","Colossus","Copycat","Corvus Glaive","Cosmic Ghost Rider","Cosmo","Council of Reeds","Crossbones","Crystal","Cull Obsidian","Cyclops","Cyclops - X-Men","Dagger","Daken","Danger","Daredevil","Darkhawk","Dazzler","Deadpool","Deafening Chord","Death","Deathlok","Debrii","Demon","Destroyer","Devil Dinosaur","Diamondback","Djinn","Doctor Doom","Doctor Doom 2099","Doctor Octopus","Doctor Strange","Doctor Strange - Avengers","Domino","Doom Bot","Doom Bot 2099","Dormammu","Dracula","Dragon Breath","Dragon Lord","Dragon Man","Dragon of the Moon","Drax","Drax - Guardians of the Galaxy","Drax, Avatar Of Life","Drone","Dum Dum Dugan","Ebony Blade","Ebony Maw","Echo","Electro","Elektra","Elixir","Elsa Bloodstone","Emperor Hulkling","En Sabah Nur","Enchantress","Esme Cuckoo","Eson","Ezekiel Sims","Falcon","Fan Fei","Fantasticar","Fantomex","Fastball Special","Fenris Wolf","Fin Fang Foom","Firehair","Firelord","Firestar","Flame On","Flames of the Faltine","Flatman","Flight Harness","Foggy Nelson","Force Field","Forge","Frigga","Galacta","Galactus","Galactus First Steps","Gambit","Gambit Horseman of Death","Gamora","Gamora - Guardians of the Galaxy","Garrison Kane","Ghost","Ghost - Thunderbolts","Ghost Rider","Ghost-Spider","Ghost-Spider - Spider-Verse","Giganto","Gilgamesh","Gladiator","Goblin Queen","Goliath","Goose","Gorgon","Gorr the God Butcher","Grand Master","Grapple Arrow","Green Goblin","Groot","Groot - Guardians of the Galaxy","Gwenpool","H.E.R.B.I.E.","Havok","Hawkeye","Hawkeye - Avengers","Hawkeye Kate Bishop","Hazmat","Headpool","Heimdall","Hela","Helicarrier","Hellcow","Hellion","Helpful Assistance","Hercules","High Evolutionary","Hit-Monkey","Hobgoblin","Hope Summers","Howard the Duck","Hulk","Hulk - Avengers","Hulk Smash","Hulkbuster","Human Torch","Human Torch First Steps","Hydra Bob","Hydra Stomper","Hydro-Man","Ice Cube","Iceman","Ikari","Illusion!","Images of Ikonn","Inevitable","Infinity Ultron","Invisible Woman","Invisible Woman First Steps","Iron Fist","Iron Lad","Iron Man","Iron Man Champion","Iron Patriot","Ironheart","Isca the Unbeaten","J. Jonah Jameson","Jack Flag","Jane Foster Mighty Thor","Jean Grey","Jean Grey - X-Men","Jeff the Baby Dolphin!?","Jeff the Baby Land Shark","Jennifer Kale","Jessica Jones","Jim Hammond Human Torch","Joaquin Torres Falcon II","Jocasta","Jubilee","Jubilee - X-Men","Jubilee Silver Surfer","Juggernaut","Juggernaut Horseman of War","Ka-Zar","Kahhori","Kang","Karen Page","Khonshu","Khonshu Full","Khonshu Waxing","Kid Omega","Killmonger","King Eitri","Kingpin","Kitty Pryde","Klaw","Knull","Korg","Kraglin","Kraven","Lady Bullseye","Lady Deathstrike","Lady Deathstrike - Brotherhood of Mutants","Lady Sif","Lasher","Laufey","Leader","Leech","Legion","Lin Lie Iron Fist","Living Monolith","Lizard","Lockheed","Lockjaw","Loki","Lord of the Negative Zone","Luke Cage","Luna Snow","M.O.D.O.K.","Mad Thinker","Madame Web","Magik","Magneto","Magneto - Brotherhood of Mutants","Magus","Majestic Wingbeat","Major Victory","Makkari","Malekith","Man-Spider","Man-Thing","Mantis","Mantis - Guardians of the Galaxy","Maria Hill","Marrow","Martyr","Marvel Boy","Massive Arsenal","Master Mold","Master Plan","Master of Magnetism","Maverick","Maximum Carnage","Maximus","Medusa","Mephisto","Mercury","Merlin","Miek","Miles Morales Spider-Man","Mind Stone","Mirage","Misery","Mister Fantastic","Mister Fantastic First Steps","Mister Negative","Mister Sinister","Misty Knight","Mjolnir","Mjolnir - Avengers","Mobius M. Mobius","Mockingbird","Moira X","Mojo","Mole Man","Monster","Monstro","Moon Girl","Moon Knight","Moondragon","Moonstone","Morbius","Morgan le Fay","Morph","Mother Askani","Ms. Marvel","Multiple Man","Muramasa Shard","Muse","Mysterio","Mysterio?","Mystique","Mystique - Brotherhood of Mutants","Nakia","Namor","Namora","Namorita","Nebula","Negasonic Teenage Warhead","Nicholas Scratch","Nick Fury","Nico Minoru","Night Nurse","Nightcrawler","Nightcrawler - X-Men","Nightmare","Nimrod","Ninja","Nocturne","Nova","Nova Frankie Raye","Odin","Okoye","Omega Red","Omega Sentinel","Omniversal Presence","Once And Future","Onslaught","Orka","Overdrive Reactor","Ozymandias","Patriot","Peni Parker","Phastos","Phoenix Force","Pig","Pixie","Polaris","Polaris Horseman of Pestilence","Polymorph","Power Stone","Prodigy","Professor X","Professor X - X-Men","Project Armageddon","Prowler","Proxima Midnight","Psylocke","Punisher","Punisher War Machine","Pym","Particle Arrow","Quake","Quicksand","Quicksilver","Quinjet","Rama-Tut","Random","Raptor","Ravonna Renslayer","Reality Stone","Red Guardian","Red Hulk","Red Shift","Red Skull","Redwing","Remote Mines","Rescue","Return to the Past","Rhino","Rock","Rocket Raccoon","Rocket Raccoon - Guardians of the Galaxy","Rocket Raccoon Champion","Rocket and Groot","Rockslide","Rogue","Ronan the Accuser","SP//dr","Sabretooth","Sage","Sam Wilson Captain America","Sandman","Sandstorm","Sasquatch","Sauron","Scarlet Spider","Scarlet Spider - Spider-Verse","Scarlet Spider Clone","Scarlet Witch","Scarlet Witch - Brotherhood of Mutants","Scorn","Scorpion","Scream","Sebastian Shaw","Selene","Selene - Brotherhood of Mutants","Selene Horseman of Famine","Sentinel","Sentinel Champion","Sentry","Sentry - Thunderbolts","Sera","Sersi","Shadow King","Shadowlands Daredevil","Shang-Chi","Shang-Chi, Master of the Rings","Shanna","She-Hulk","Shield Throw","Shocker","Shou-Lao the Undying","Shuri","Silk","Silver Sable","Silver Samurai","Silver Surfer","Silver Surfer First Steps","Sinister Clone","Skaar","Snowguard","Snowguard Bear","Snowguard Hawk","Snowguard Wolf","Soul Stone","Space Stone","Sparky","Spectrum","Speed","Spider-Ham","Spider-Man","Spider-Man 2099","Spider-Man 2099 - Spider-Verse","Spider-Man Noir","Spider-Punk","Spider-Woman","Squirrel Girl","Star-Lord","Star-Lord, Master of the Sun","Starbrand","Stardust","Starhawk","Stark Technology","Starlord - Guardians of the Galaxy","Stature","Stegron","Stick","Storm","Storm Horseman of Famine","Stormbreaker","Strange Supreme","Strong Guy","Stryfe","Sub-Mariner","Subterranean Summons","Summoning Ritual 1","Summoning Ritual 2","Summoning Ritual 3","Sunspot","Super-Adaptoid","Super-Skrull","Supergiant","Superior Spider-Man","Surge","Surtur","Swarm","Sword Master","Sword of Fu Xi","Symbiote","Symbiote Spider-Man","Symbiote Spider-Man - Spider-Verse","Tao Mandala","Taskmaster","Taskmaster - Thunderbolts","Techno-Organic Virus","Techno-Organic Virus Infection","Temporal Manipulation","Terrax the Tamer","Test Card","Thaddeus Ross","Thanos","Thanos Champion","The Ancient One","The Collector","The Fallen One","The First Ghost Rider","The Hood","The Hunger","The Infinaut","The Living Tribunal","The Ten Rings","The Ten Rings Upgraded","The Thing","The Thing First Steps","The Void","Thena","Thor","Thor - Avengers","Thundering Hammer","Tiger Spirit","Time Stone","Titania","Toad","Tombstone","Topaz","Toxie Doxie","Toxie Doxie - Thunderbolts","Toxin","Triton","Typhoid Mary","U.S. Agent","Uatu the Watcher","Ultron","Ultron Mind Stone","Ultron Power Stone","Ultron Reality Stone","Ultron Soul Stone","Ultron Space Stone","Ultron Time Stone","Uncle Ben","Valentina","Valentina - Thunderbolts","Valkyrie","Venom","Venus","Vibranium","Vibro-Shock Gauntlets","Victoria Hand","Viper","Vision","Vision - Avengers","Viv Vision","Vulture","Wade Wilson","Wakanda Forever","War Machine","Warlock","Warpath","Wasp","Wave","Weapon H","Weapon X Wolverine","Web Sling","Werewolf By Night","White Queen","White Queen - Brotherhood of Mutants","White Tiger","White Widow","Wiccan","Widow's Bite","Widow's Kiss","Wild Child","Wilson Fisk","Winds of Watoomb","Winter Soldier","Winter Soldier - Thunderbolts","Witchfire","Wolfsbane","Wolverine","Wolverine - X-Men","Wolverine Horseman of War","Wong","X-23","Xorn","Yaka Arrow","Yellowjacket","Yo-Yo","Yondu","Zabu","Zero","Zombie Captain Marvel","Zombie Galacti","Zombie Giant-Man","Zombie Horde","Zombie Mister Fantastic","Zombie Power Man","Zombie Scarlet Witch","Zombie Sentry"
];

// Normalized set for fast lookup — used to compute unusedChars at module load
function normalizeName(n) { return n.toLowerCase().replace(/[^a-z0-9]/g, ""); }
const _snapNormSet = new Set(SNAP_CARDS.map(normalizeName));

// ── Survey-derived Theme Demand Score ────────────────────────────────────────
const THEME_KEYWORDS = [
  { keys: ["mythology","gods","divine","olympus","asgard","pantheon"], score: 100 },
  { keys: ["multiverse","alt-universe","alternate","parallel","dimensions","variants"], score: 95 },
  { keys: ["sci-fi","high-tech","tech","science","robot","ai","future"], score: 80 },
  { keys: ["cosmic","space","galaxy","universe","intergalactic","celestial","herald"], score: 78 },
  { keys: ["horror","spooky","undead","ghost","demon","vampire","occult","dark magic","magic","arcane","mystical","sorcery"], score: 76 },
  { keys: ["historical","era","war","western","ancient","medieval","pop culture"], score: 49 },
  { keys: ["heist","crime","street","underground","mob","syndicate","gang"], score: 39 },
  { keys: ["seasonal","holiday","winter","summer","christmas","halloween"], score: 34 },
  { keys: ["cute","creatures","animals","pets","critters"], score: 32 },
];

function getTDS(theme) {
  const lower = theme.toLowerCase();
  let best = 40;
  for (const { keys, score } of THEME_KEYWORDS) {
    if (keys.some(k => lower.includes(k))) best = Math.max(best, score);
  }
  return best;
}

function avg(arr) { return arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : 0; }

function computeConfidence(theme, result) {
  const tds = getTDS(theme);
  const spRec = (result.seasonPass.recognizabilityScore ?? 7) * 10;
  const s5Rec = avg((result.series5 || []).map(c => (c.recognizabilityScore ?? 5))) * 10;
  const s4Rec = avg((result.series4 || []).map(c => (c.recognizabilityScore ?? 3))) * 10;
  const rs = spRec * 0.50 + s5Rec * 0.35 + s4Rec * 0.15;
  let rds = 100;
  if ((result.series5 || []).length < 5) rds -= 15;
  if ((result.series4 || []).length < 5) rds -= 10;
  if ((result.seasonPass.recognizabilityScore ?? 7) < 6) rds -= 20;
  if ((result.locations || []).length === 4) rds += 10;
  rds = Math.max(0, Math.min(100, rds));
  return Math.round(tds * 0.35 + rs * 0.40 + rds * 0.25);
}

// ── Fandom URL builder ────────────────────────────────────────────────────────
function fandomUrl(name) {
  const clean = name
    .replace(/\s*\(Earth-\d+\)/gi, "")
    .replace(/\s*\[.*?\]/g, "")
    .split(" / ")[0]
    .trim()
    .replace(/\s+/g, "_");
  return `https://marvel.fandom.com/wiki/${encodeURIComponent(clean)}`;
}

// ── System prompt ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a Marvel Comics expert and game design consultant specializing in Marvel SNAP card game season planning.

For each character evaluate:
- THEMATIC RELEVANCE (0-10): Fit to the theme
- POPULARITY (0-10): Comic appearances, crossovers, major arcs, mainstream recognition
- RECOGNIZABILITY (0-10): Would a casual Marvel fan recognize them?

Season Construction Rules:
- Season Pass (1 character): Iconic, visually strong, thematic anchor, marketing appeal
- Series 5 (5-10): Higher-profile, important allies/villains, major storyline participants
- Series 4 (5-10): More obscure, deep cuts, side characters, thematically cohesive
- Locations (exactly 4): Prominent Marvel Comics locations that fit the season theme.

VARIANT SUGGESTIONS (always required):
List 4-6 characters who are ALREADY RELEASED as playable Marvel SNAP cards (NOT from the unused list — think released cards like Hulk, Thor, Spider-Man, Iron Man, Wolverine, Venom, etc.) who would benefit from a new cosmetic Variant in this season's art style. These are existing cards getting new artwork, not new cards.

WISHLIST CHARACTERS (LAST RESORT — only populate if series5 + series4 total fewer than 8 characters):
If and only if the unused character list cannot fill 8+ total slots, suggest up to 5 characters NOT in the unused list who would strengthen the season. For each, set status to either "Needs Marvel Request" (completely new to any SNAP list) or "Already in SNAP" (released card that happens to fit the theme). If the grant fills 8+ slots, return an empty array for wishlistCharacters.

Artist Recommendations (exactly 3):
Recommend 3 artists whose style best fits this season's visual identity and key art composition.
- Include at least 1 artist who has worked on Marvel SNAP cards or variants.
- Include at least 1 external artist (comic, illustration, or concept art) not yet in SNAP.
- Be specific about WHY each artist's aesthetic matches this exact season's mood and characters.

ONLY select new cards from the provided unused character list. Locations can be any canonical Marvel location.

Return ONLY valid JSON (no markdown fences, no explanation):
{
  "seasonName": "string",
  "pitch": "string (2-3 sentences)",
  "seasonPass": { "name": "string", "reason": "string", "popularityScore": number, "thematicScore": number, "recognizabilityScore": number },
  "series5": [{ "name": "string", "reason": "string", "popularityScore": number, "thematicScore": number, "recognizabilityScore": number }],
  "series4": [{ "name": "string", "reason": "string", "popularityScore": number, "thematicScore": number, "recognizabilityScore": number }],
  "variantSuggestions": [{ "name": "string", "reason": "string (why this card suits the season's art style)" }],
  "wishlistCharacters": [{ "name": "string", "reason": "string", "status": "Needs Marvel Request" | "Already in SNAP" }],
  "locations": [{ "name": "string", "description": "string", "wikiSlug": "string" }],
  "suggestedTitle": "string",
  "keyArtComposition": "string",
  "backupSeasonPass": ["string", "string"],
  "mechanicalHooks": ["string", "string", "string"],
  "artistRecommendations": [
    { "name": "string", "style": "string (brief style description)", "why": "string (1-2 sentences specific to this season)", "inSnap": boolean }
  ],
  "viabilityNote": null
}`;

const buildUserPrompt = (theme, unusedChars, snapCards = []) => {
  const snapContext = snapCards.length > 0
    ? `\nFor variant suggestions, prioritise characters from this list of known Marvel SNAP cards: ${snapCards.slice(0, 150).join(", ")}.`
    : "";
  return `
Theme: "${theme}"
Full Unused Character List (${unusedChars.length} characters):
${unusedChars.join(", ")}
Produce a complete Marvel SNAP Season Proposal for the theme: "${theme}".
Only use characters from the list above for new cards. Locations can be any canonical Marvel location.
Always include variantSuggestions (4-6 existing SNAP cards getting new artwork).${snapContext}
Only populate wishlistCharacters if series5 + series4 total fewer than 8 characters; otherwise return an empty array.
If insufficient matches exist, set viabilityNote to "Theme not viable with current grant list".`;
};

// ── Export helpers ────────────────────────────────────────────────────────────
function downloadDataURI(content, filename, mime) {
  const uri = `data:${mime};charset=utf-8,${encodeURIComponent(content)}`;
  const a = document.createElement("a");
  a.href = uri; a.download = filename; a.click();
}
function exportJSON(data, theme) {
  downloadDataURI(JSON.stringify(data, null, 2), `snap-season-${theme.replace(/\s+/g,"_")}.json`, "application/json");
}
function exportCSV(data, theme) {
  const rows = [["Tier","Character","Thematic","Popularity","Recognizability","Avg","Reasoning","Fandom Link"]];
  const add = (tier, list) => list.forEach(c => {
    const a = ((c.thematicScore + c.popularityScore) / 2).toFixed(1);
    rows.push([tier, c.name, c.thematicScore, c.popularityScore, c.recognizabilityScore ?? "–", a, `"${(c.reason||"").replace(/"/g,'""')}"`, fandomUrl(c.name)]);
  });
  add("Season Pass", [data.seasonPass]);
  add("Series 5", data.series5);
  add("Series 4", data.series4);
  if (data.locations?.length) {
    rows.push([]); rows.push(["--- LOCATIONS ---"]);
    rows.push(["Location","Description","Fandom Link"]);
    data.locations.forEach(l => rows.push([l.name, `"${(l.description||"").replace(/"/g,'""')}"`, `https://marvel.fandom.com/wiki/${l.wikiSlug}`]));
  }
  downloadDataURI(rows.map(r => r.join(",")).join("\n"), `snap-season-${theme.replace(/\s+/g,"_")}.csv`, "text/csv");
}
function copySheets(data) {
  const rows = [["Tier","Character","Thematic","Popularity","Recognizability","Avg","Reasoning","Fandom Link"]];
  const add = (tier, list) => list.forEach(c => rows.push([tier, c.name, c.thematicScore, c.popularityScore, c.recognizabilityScore ?? "–", ((c.thematicScore+c.popularityScore)/2).toFixed(1), c.reason, fandomUrl(c.name)]));
  add("Season Pass", [data.seasonPass]);
  add("Series 5", data.series5);
  add("Series 4", data.series4);
  navigator.clipboard.writeText(rows.map(r => r.join("\t")).join("\n"))
    .then(() => alert("✅ Copied! Paste directly into Google Sheets."))
    .catch(() => alert("Clipboard blocked — try JSON or CSV export instead."));
}

// ── Slack helpers ─────────────────────────────────────────────────────────────
function buildSlackMessage(result, theme, confidence) {
  const lines = [];
  lines.push(`🎴 *${result.seasonName}* — _"${result.suggestedTitle}"_`);
  lines.push(`*Theme:* ${theme}   *Confidence:* ${confidence}%`);
  lines.push("");
  lines.push(`_${result.pitch}_`);
  lines.push("");
  lines.push("`Season Pass`");
  lines.push(`• ${result.seasonPass.name}`);
  lines.push("");
  lines.push("`Series 5`");
  (result.series5 || []).forEach(c => lines.push(`• ${c.name}`));
  lines.push("");
  lines.push("`Series 4`");
  (result.series4 || []).forEach(c => lines.push(`• ${c.name}`));
  if (result.variantSuggestions?.length) {
    lines.push("");
    lines.push("`Variants`");
    result.variantSuggestions.forEach(v => lines.push(`• ${v.name}`));
  }
  if (result.wishlistCharacters?.length) {
    lines.push("");
    lines.push("`⚠️ Wishlist (Grant Gaps)`");
    result.wishlistCharacters.forEach(w => lines.push(`• ${w.name} — _${w.status}_`));
  }
  lines.push("");
  lines.push(`🎨 *Artists:* ${(result.artistRecommendations || []).map(a => a.name).join(" · ")}`);
  lines.push(`📍 *Locations:* ${(result.locations || []).map(l => l.name).join(" · ")}`);
  return lines.join("\n");
}

async function sendToSlack(result, theme, confidence) {
  const message = buildSlackMessage(result, theme, confidence);
  const pw = sessionStorage.getItem("snap-auth-pw") || "";
  const res = await fetch("/api/slack", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-app-password": pw },
    body: JSON.stringify({ message, channel: "C07EXLBDDNE" })
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return true;
}

// ── Sub-components ─────────────────────────────────────────────────────────────
const scoreColor = (s) => s >= 8 ? "#4ade80" : s >= 5 ? "#facc15" : "#f87171";

function ScoreBar({ label, value }) {
  if (value === undefined || value === null) return null;
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#94a3b8" }}>
        <span>{label}</span><span style={{ color: scoreColor(value) }}>{value}/10</span>
      </div>
      <div style={{ background:"#1e293b", borderRadius:4, height:6, overflow:"hidden" }}>
        <div style={{ width:`${value*10}%`, height:"100%", background: scoreColor(value), borderRadius:4, transition:"width 0.5s" }} />
      </div>
    </div>
  );
}

function CharacterCard({ char, tier }) {
  const [open, setOpen] = useState(false);
  const tColors = { seasonPass:"#f59e0b", series5:"#818cf8", series4:"#34d399" };
  const tierLabels = { seasonPass:"🏆 SEASON PASS", series5:"⭐ SERIES 5", series4:"💎 SERIES 4" };
  const c = tColors[tier];
  const avg = ((char.thematicScore + char.popularityScore) / 2).toFixed(1);
  return (
    <div style={{ background:"#0f172a", border:`1px solid ${c}33`, borderLeft:`3px solid ${c}`, borderRadius:10, padding:"12px 14px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
            <span style={{ fontWeight:700, color:"#f1f5f9", fontSize:14 }}>{char.name}</span>
            <a href={fandomUrl(char.name)} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
              style={{ fontSize:10, color:"#60a5fa", background:"#1e3a5f", borderRadius:4, padding:"1px 6px", textDecoration:"none", whiteSpace:"nowrap" }}>
              📖 Fandom
            </a>
          </div>
          <div style={{ fontSize:11, color:c, marginTop:2 }}>{tierLabels[tier]}</div>
        </div>
        <div style={{ textAlign:"right", marginLeft:8 }}>
          <div style={{ fontSize:20, fontWeight:800, color: scoreColor(parseFloat(avg)) }}>{avg}</div>
          <div style={{ fontSize:10, color:"#64748b" }}>AVG</div>
        </div>
      </div>
      <p onClick={() => setOpen(!open)}
        style={{ color: open?"#cbd5e1":"#64748b", fontSize:12, marginTop:8, marginBottom: open?10:0, cursor:"pointer", lineHeight:1.6,
          ...(open ? {} : { overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }) }}>
        {char.reason}
      </p>
      {open && (
        <div style={{ borderTop:"1px solid #1e293b", paddingTop:10 }}>
          <ScoreBar label="Thematic Fit" value={char.thematicScore} />
          <ScoreBar label="Popularity" value={char.popularityScore} />
          <ScoreBar label="Recognizability" value={char.recognizabilityScore} />
        </div>
      )}
      {!open && <button onClick={() => setOpen(true)} style={{ fontSize:10, color:"#475569", background:"none", border:"none", cursor:"pointer", padding:0, marginTop:2 }}>▼ expand</button>}
    </div>
  );
}

function LocationCard({ loc }) {
  const url = `https://marvel.fandom.com/wiki/${loc.wikiSlug || loc.name.replace(/\s+/g,"_")}`;
  return (
    <div style={{ background:"#0f172a", border:"1px solid #f97316aa", borderLeft:"3px solid #f97316", borderRadius:10, padding:"12px 14px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
        <span style={{ fontWeight:700, color:"#f1f5f9", fontSize:14 }}>📍 {loc.name}</span>
        <a href={url} target="_blank" rel="noopener noreferrer"
          style={{ fontSize:10, color:"#60a5fa", background:"#1e3a5f", borderRadius:4, padding:"1px 6px", textDecoration:"none" }}>
          📖 Fandom
        </a>
      </div>
      <p style={{ color:"#94a3b8", fontSize:12, margin:"8px 0 0", lineHeight:1.6 }}>{loc.description}</p>
    </div>
  );
}

function ArtistCard({ artist, index }) {
  const colors = ["#818cf8","#f472b6","#34d399"];
  const c = colors[index % colors.length];
  return (
    <div style={{ background:"#0f172a", border:`1px solid ${c}44`, borderLeft:`3px solid ${c}`, borderRadius:10, padding:"16px 14px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
        <div>
          <div style={{ fontWeight:700, color:"#f1f5f9", fontSize:15 }}>{artist.name}</div>
          <div style={{ fontSize:11, color: artist.inSnap ? "#4ade80" : "#fb923c", marginTop:3, fontWeight:600 }}>
            {artist.inSnap ? "✅ Currently in Marvel SNAP" : "🌟 External — not yet in SNAP"}
          </div>
        </div>
        <div style={{ fontSize:22 }}>🎨</div>
      </div>
      <div style={{ background:"#1e293b", borderRadius:6, padding:"8px 10px", marginBottom:8 }}>
        <span style={{ fontSize:10, color:"#64748b", textTransform:"uppercase", letterSpacing:1 }}>Style</span>
        <p style={{ color:"#cbd5e1", fontSize:12, margin:"3px 0 0", lineHeight:1.5 }}>{artist.style}</p>
      </div>
      <div style={{ background:`${c}11`, borderRadius:6, padding:"8px 10px", border:`1px solid ${c}22` }}>
        <span style={{ fontSize:10, color:c, textTransform:"uppercase", letterSpacing:1, fontWeight:600 }}>Why this season</span>
        <p style={{ color:"#e2e8f0", fontSize:12, margin:"3px 0 0", lineHeight:1.6 }}>{artist.why}</p>
      </div>
    </div>
  );
}

function ConfidenceMeter({ score, theme }) {
  const color = score >= 75 ? "#4ade80" : score >= 50 ? "#facc15" : "#f87171";
  const label = score >= 75 ? "High Confidence" : score >= 50 ? "Moderate Confidence" : "Low Confidence";
  const tds = getTDS(theme);
  return (
    <div style={{ background:"#1e293b", borderRadius:10, padding:"12px 16px", marginBottom:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
        <div>
          <span style={{ color:"#94a3b8", fontSize:13 }}>Season Confidence</span>
          <span style={{ color:"#475569", fontSize:11, marginLeft:8 }}>
            (Theme Demand: {tds}%)
          </span>
        </div>
        <span style={{ color, fontWeight:800, fontSize:20 }}>{score}% <span style={{ fontSize:12, fontWeight:400 }}>{label}</span></span>
      </div>
      <div style={{ background:"#0f172a", borderRadius:6, height:10, overflow:"hidden" }}>
        <div style={{ width:`${score}%`, height:"100%", background:color, borderRadius:6, transition:"width 1s ease" }} />
      </div>
      <div style={{ fontSize:10, color:"#475569", marginTop:6 }}>
        Score = (Theme Demand × 35%) + (Roster Recognizability × 40%) + (Pool Depth × 25%)
      </div>
    </div>
  );
}

function VariantCard({ v }) {
  return (
    <div style={{ background:"#0f172a", border:"1px solid #7c3aed44", borderLeft:"3px solid #7c3aed", borderRadius:10, padding:"10px 14px", display:"flex", alignItems:"flex-start", gap:10 }}>
      <div style={{ fontSize:16, flexShrink:0, marginTop:1 }}>🎨</div>
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
          <span style={{ fontWeight:700, color:"#f1f5f9", fontSize:13 }}>{v.name}</span>
          <a href={fandomUrl(v.name)} target="_blank" rel="noopener noreferrer"
            style={{ fontSize:10, color:"#60a5fa", background:"#1e3a5f", borderRadius:4, padding:"1px 6px", textDecoration:"none" }}>📖 Fandom</a>
        </div>
        <p style={{ color:"#64748b", fontSize:11, margin:"4px 0 0", lineHeight:1.5 }}>{v.reason}</p>
      </div>
    </div>
  );
}

function WishlistCard({ w }) {
  const needsRequest = w.status === "Needs Marvel Request";
  return (
    <div style={{ background:"#0f172a", border:`1px solid ${needsRequest ? "#dc2626" : "#d97706"}44`, borderLeft:`3px solid ${needsRequest ? "#dc2626" : "#d97706"}`, borderRadius:10, padding:"10px 14px", display:"flex", alignItems:"flex-start", gap:10 }}>
      <div style={{ fontSize:16, flexShrink:0, marginTop:1 }}>{needsRequest ? "📋" : "🔄"}</div>
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
          <span style={{ fontWeight:700, color:"#f1f5f9", fontSize:13 }}>{w.name}</span>
          <span style={{ fontSize:10, fontWeight:600, color: needsRequest ? "#f87171" : "#fbbf24", background: needsRequest ? "#450a0a" : "#422006", borderRadius:4, padding:"1px 6px" }}>
            {w.status}
          </span>
        </div>
        <p style={{ color:"#64748b", fontSize:11, margin:"4px 0 0", lineHeight:1.5 }}>{w.reason}</p>
      </div>
    </div>
  );
}

function SlackButton({ result, theme, confidence }) {
  const [status, setStatus] = useState("idle");
  const [errMsg, setErrMsg] = useState("");
  const handle = async () => {
    setStatus("sending"); setErrMsg("");
    try {
      await sendToSlack(result, theme, confidence);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (e) {
      setErrMsg(e.message || "Unknown error");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };
  const configs = {
    idle:    { bg:"#1a1a2e", border:"#4a4a8f", color:"#a78bfa", label:"📤 Send to Slack", cursor:"pointer" },
    sending: { bg:"#1e1e3a", border:"#6366f1", color:"#818cf8", label:"⏳ Sending…",       cursor:"not-allowed" },
    success: { bg:"#052e16", border:"#16a34a", color:"#4ade80", label:"✅ Posted to #snap-season-brainstorming", cursor:"default" },
    error:   { bg:"#1c0a0a", border:"#dc2626", color:"#f87171", label:"❌ Failed — retry?", cursor:"pointer" },
  };
  const cfg = configs[status];
  return (
    <div>
      <button onClick={status === "sending" ? undefined : handle} style={{
        padding:"9px 18px", borderRadius:8, border:`1px solid ${cfg.border}`,
        background:cfg.bg, color:cfg.color, fontWeight:700, fontSize:13,
        cursor:cfg.cursor, transition:"all 0.2s", display:"flex", alignItems:"center", gap:6
      }}>
        {cfg.label}
      </button>
      {status === "error" && errMsg && <div style={{ fontSize:11, color:"#f87171", marginTop:4 }}>{errMsg}</div>}
    </div>
  );
}

function ExportPanel({ data, theme, confidence }) {
  const btn = (color, label, fn) => (
    <button onClick={fn} style={{ padding:"8px 16px", borderRadius:8, border:"none", cursor:"pointer", fontWeight:600, fontSize:12, background:color, color:"#fff" }}>{label}</button>
  );
  return (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:16, alignItems:"center" }}>
      {btn("#3b82f6","⬇ JSON", () => exportJSON(data, theme))}
      {btn("#10b981","⬇ CSV",  () => exportCSV(data, theme))}
      {btn("#8b5cf6","📋 Copy for Sheets", () => copySheets(data))}
      <SlackButton result={data} theme={theme} confidence={confidence} />
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function App() {
  // ── Auth ──────────────────────────────────────────────────────────────────
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("snap-auth") === "1");
  const [pwInput, setPwInput] = useState("");
  const [authError, setAuthError] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);

  // ── Main state ─────────────────────────────────────────────────────────────
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("roster");

  const getAuthPw      = () => sessionStorage.getItem("snap-auth-pw") || "";
  const getAuthHeader  = () => ({ "x-app-password": getAuthPw() });
  // Filter grant list against existing SNAP cards so AI only sees truly new characters
  const unusedChars    = UNUSED_CHARACTERS.filter(n => !_snapNormSet.has(normalizeName(n)));
  const snapCards      = SNAP_CARDS;

  const EXAMPLES = ["Dark Magic","Cosmic War","Street-Level Crime","Symbiote Invasion","Mythology","Time Travel","Young Heroes","Villains of Wakanda"];

  const handleAuth = async () => {
    setAuthBusy(true); setAuthError(false);
    try {
      const res = await fetch("/api/auth", { headers: { "x-app-password": pwInput } });
      const json = await res.json();
      if (json.ok) {
        sessionStorage.setItem("snap-auth", "1");
        sessionStorage.setItem("snap-auth-pw", pwInput);
        setAuthed(true);
      } else {
        setAuthError(true);
      }
    } catch { setAuthError(true); }
    setAuthBusy(false);
  };

  const generate = useCallback(async () => {
    if (!theme.trim()) return;
    setLoading(true); setResult(null); setError(null); setConfidence(null); setTab("roster");
    try {
      const res = await fetch("/api/generate", {
        method:"POST",
        headers:{ "Content-Type":"application/json", ...getAuthHeader() },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:4500,
          system: SYSTEM_PROMPT,
          messages:[{ role:"user", content: buildUserPrompt(theme, unusedChars, snapCards) }]
        })
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error.message || json.error);
      const raw = json.content?.find(b => b.type==="text")?.text || "";
      const clean = raw.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();
      const parsed = JSON.parse(clean);
      const computedScore = computeConfidence(theme, parsed);
      parsed.confidence = computedScore;
      setResult(parsed);
      setConfidence(computedScore);
      // Log the search (fire-and-forget)
      try {
        await fetch("/api/log", {
          method: "POST",
          headers: { "Content-Type":"application/json", ...getAuthHeader() },
          body: JSON.stringify({
            theme,
            seasonName:    parsed.seasonName,
            confidence:    computedScore,
            seasonPass:    parsed.seasonPass?.name,
            newCardsCount: 1 + (parsed.series5?.length || 0) + (parsed.series4?.length || 0),
            variantCount:  parsed.variantSuggestions?.length || 0,
            wishlistCount: parsed.wishlistCharacters?.length || 0,
          })
        });
      } catch {}
    } catch(e) {
      setError(e.message || "Unknown error.");
    } finally {
      setLoading(false);
    }
  }, [theme]); // eslint-disable-line react-hooks/exhaustive-deps

  const tabBtn = (id, label) => (
    <button key={id} onClick={() => setTab(id)} style={{
      padding:"8px 18px", borderRadius:8, border:"none", cursor:"pointer", fontWeight:600, fontSize:13,
      background: tab===id ? "#6366f1" : "#1e293b",
      color: tab===id ? "#fff" : "#94a3b8", transition:"all 0.2s"
    }}>{label}</button>
  );
  const avgPop = (list) => list.length ? (list.reduce((s,c)=>s+c.popularityScore,0)/list.length).toFixed(1) : "–";
  const viable = result && !result.viabilityNote?.includes("not viable");
  const hasWishlist = viable && result.wishlistCharacters?.length > 0;

  // ── Password gate ─────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{ minHeight:"100vh", background:"#020617", color:"#f1f5f9", fontFamily:"'Inter','Segoe UI',sans-serif", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ background:"#0f172a", border:"1px solid #334155", borderRadius:16, padding:40, textAlign:"center", maxWidth:360, width:"100%" }}>
          <div style={{ fontSize:40, marginBottom:12 }}>⚡</div>
          <h1 style={{ margin:"0 0 6px", fontSize:22, fontWeight:800, background:"linear-gradient(90deg,#818cf8,#f472b6,#fb923c)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            MARVEL SNAP Season Generator
          </h1>
          <p style={{ color:"#475569", fontSize:12, margin:"0 0 24px" }}>Internal tool · Second Dinner use only</p>
          <input
            type="password"
            value={pwInput}
            onChange={e => { setPwInput(e.target.value); setAuthError(false); }}
            onKeyDown={e => e.key === "Enter" && !authBusy && handleAuth()}
            placeholder="Enter password"
            autoFocus
            style={{ width:"100%", padding:"12px 14px", borderRadius:10, border:`1px solid ${authError ? "#dc2626" : "#334155"}`, background:"#1e293b", color:"#f1f5f9", fontSize:14, outline:"none", marginBottom:8, boxSizing:"border-box" }}
          />
          {authError && <div style={{ color:"#f87171", fontSize:12, marginBottom:8 }}>Incorrect password. Please try again.</div>}
          <button
            onClick={handleAuth}
            disabled={authBusy || !pwInput.trim()}
            style={{ width:"100%", padding:"12px", borderRadius:10, border:"none", cursor: authBusy ? "not-allowed" : "pointer",
              background: authBusy ? "#374151" : "linear-gradient(135deg,#6366f1,#8b5cf6)",
              color:"#fff", fontWeight:700, fontSize:14 }}
          >
            {authBusy ? "⏳ Checking…" : "🔐 Enter"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:"#020617", color:"#f1f5f9", fontFamily:"'Inter','Segoe UI',sans-serif", padding:24 }}>
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <div style={{ fontSize:36, marginBottom:4 }}>⚡</div>
        <h1 style={{ margin:0, fontSize:26, fontWeight:800, background:"linear-gradient(90deg,#818cf8,#f472b6,#fb923c)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          MARVEL SNAP Season Generator
        </h1>
        <p style={{ color:"#64748b", margin:"6px 0 0", fontSize:13 }}>
          AI-powered · Survey-calibrated confidence · Artist recs · Slack integration · {unusedChars.length} characters
        </p>
      </div>

      <div style={{ maxWidth:640, margin:"0 auto 24px" }}>
        <div style={{ display:"flex", gap:10, marginBottom:12 }}>
          <input value={theme} onChange={e => setTheme(e.target.value)} onKeyDown={e => e.key==="Enter" && generate()}
            placeholder='Enter a theme e.g. "Dark Magic" or "Cosmic War"'
            style={{ flex:1, padding:"12px 16px", borderRadius:10, border:"1px solid #334155", background:"#0f172a", color:"#f1f5f9", fontSize:14, outline:"none" }} />
          <button onClick={generate} disabled={loading || !theme.trim()}
            style={{ padding:"12px 20px", borderRadius:10, border:"none", cursor: loading?"not-allowed":"pointer",
              background: loading?"#374151":"linear-gradient(135deg,#6366f1,#8b5cf6)",
              color:"#fff", fontWeight:700, fontSize:14, whiteSpace:"nowrap" }}>
            {loading ? "⏳ Analyzing…" : "🎴 Generate"}
          </button>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {EXAMPLES.map(t => (
            <button key={t} onClick={() => setTheme(t)}
              style={{ padding:"4px 10px", borderRadius:20, border:"1px solid #334155", background:"#0f172a", color:"#94a3b8", fontSize:11, cursor:"pointer" }}>{t}</button>
          ))}
        </div>
      </div>

      {loading && (
        <div style={{ maxWidth:640, margin:"0 auto", textAlign:"center", padding:40 }}>
          <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
          <p style={{ color:"#94a3b8" }}>Analyzing {unusedChars.length} characters for: <strong style={{ color:"#818cf8" }}>{theme}</strong></p>
          <p style={{ color:"#475569", fontSize:12 }}>Scoring thematic relevance, popularity, synergy, artist fit…</p>
          <div style={{ margin:"20px auto", width:200, height:4, background:"#1e293b", borderRadius:4, overflow:"hidden" }}>
            <div style={{ width:"60%", height:"100%", background:"linear-gradient(90deg,#6366f1,#8b5cf6)", borderRadius:4, animation:"slide 1.5s infinite" }} />
          </div>
          <style>{`@keyframes slide{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}`}</style>
        </div>
      )}

      {error && (
        <div style={{ maxWidth:640, margin:"0 auto", background:"#1c0a0a", border:"1px solid #7f1d1d", borderRadius:10, padding:16 }}>
          <div style={{ color:"#f87171", fontWeight:700, marginBottom:4 }}>⚠ Error</div>
          <div style={{ color:"#fca5a5", fontSize:13 }}>{error}</div>
        </div>
      )}

      {result && !viable && (
        <div style={{ maxWidth:640, margin:"0 auto", background:"#1c1107", border:"1px solid #78350f", borderRadius:12, padding:20, textAlign:"center" }}>
          <div style={{ fontSize:32, marginBottom:8 }}>⚠️</div>
          <div style={{ color:"#fb923c", fontWeight:700, marginBottom:6 }}>Theme Not Viable</div>
          <p style={{ color:"#fbbf24", fontSize:13 }}>{result.viabilityNote}</p>
        </div>
      )}

      {viable && (
        <div style={{ maxWidth:920, margin:"0 auto" }}>
          <div style={{ background:"linear-gradient(135deg,#1e1b4b,#0f172a)", border:"1px solid #4338ca", borderRadius:16, padding:24, marginBottom:20, textAlign:"center" }}>
            <div style={{ fontSize:11, color:"#818cf8", textTransform:"uppercase", letterSpacing:2, marginBottom:6 }}>Season Proposal</div>
            <h2 style={{ margin:"0 0 4px", fontSize:28, fontWeight:900, color:"#fff" }}>{result.seasonName}</h2>
            <div style={{ color:"#a5b4fc", fontSize:13, marginBottom:10 }}>"{result.suggestedTitle}"</div>
            <p style={{ color:"#cbd5e1", fontSize:13, lineHeight:1.7, maxWidth:600, margin:"0 auto 16px" }}>{result.pitch}</p>
            <ConfidenceMeter score={confidence ?? result.confidence} theme={theme} />
            {hasWishlist && (
              <div style={{ background:"#1c0f00", border:"1px solid #92400e", borderRadius:8, padding:"10px 14px", marginBottom:12, textAlign:"left" }}>
                <span style={{ color:"#fb923c", fontWeight:700, fontSize:12 }}>⚠️ Grant partially insufficient — {result.wishlistCharacters.length} wishlist character{result.wishlistCharacters.length > 1 ? "s" : ""} needed. See Roster tab.</span>
              </div>
            )}
            {result.keyArtComposition && (
              <div style={{ background:"#0f172a", borderRadius:8, padding:10, fontSize:12, color:"#94a3b8", textAlign:"left" }}>
                🎨 <strong style={{ color:"#f1f5f9" }}>Key Art:</strong> {result.keyArtComposition}
              </div>
            )}
          </div>

          <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
            {tabBtn("roster","🃏 Roster")}
            {tabBtn("artists","🎨 Artists")}
            {tabBtn("locations","📍 Locations")}
            {tabBtn("mechanics","⚙️ Mechanics")}
            {tabBtn("meta","📊 Meta")}
          </div>

          {tab==="roster" && (
            <div>
              <div style={{ marginBottom:20 }}>
                <h3 style={{ color:"#f59e0b", fontSize:13, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>🏆 Season Pass Character</h3>
                <CharacterCard char={result.seasonPass} tier="seasonPass" />
                {result.backupSeasonPass?.length > 0 && (
                  <div style={{ marginTop:8, fontSize:12, color:"#64748b" }}>
                    Backup candidates: {result.backupSeasonPass.map(n => <span key={n} style={{ color:"#94a3b8", marginRight:8 }}>• {n}</span>)}
                  </div>
                )}
              </div>
              <div style={{ marginBottom:20 }}>
                <h3 style={{ color:"#818cf8", fontSize:13, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>
                  ⭐ Series 5 — {result.series5.length} Characters
                  <span style={{ color:"#475569", fontWeight:400, marginLeft:8 }}>Avg Popularity: {avgPop(result.series5)}</span>
                </h3>
                <div style={{ display:"grid", gap:8, gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))" }}>
                  {result.series5.map(c => <CharacterCard key={c.name} char={c} tier="series5" />)}
                </div>
              </div>
              <div style={{ marginBottom:20 }}>
                <h3 style={{ color:"#34d399", fontSize:13, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>
                  💎 Series 4 — {result.series4.length} Characters
                  <span style={{ color:"#475569", fontWeight:400, marginLeft:8 }}>Avg Popularity: {avgPop(result.series4)}</span>
                </h3>
                <div style={{ display:"grid", gap:8, gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))" }}>
                  {result.series4.map(c => <CharacterCard key={c.name} char={c} tier="series4" />)}
                </div>
              </div>
              {/* Variant Suggestions */}
              {result.variantSuggestions?.length > 0 && (
                <div style={{ marginBottom:20 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                    <h3 style={{ color:"#a78bfa", fontSize:13, textTransform:"uppercase", letterSpacing:1, margin:0 }}>
                      🎨 Variant Suggestions — Existing SNAP Cards
                    </h3>
                    <span style={{ fontSize:11, color:"#475569", background:"#1e293b", borderRadius:20, padding:"2px 10px" }}>Already in game · New art only</span>
                  </div>
                  <div style={{ display:"grid", gap:8, gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))" }}>
                    {result.variantSuggestions.map(v => <VariantCard key={v.name} v={v} />)}
                  </div>
                </div>
              )}
              {/* Wishlist — Last Resort */}
              {hasWishlist && (
                <div style={{ marginBottom:20 }}>
                  <div style={{ background:"#1c0f00", border:"1px solid #92400e", borderRadius:10, padding:"12px 16px", marginBottom:12 }}>
                    <div style={{ color:"#fb923c", fontWeight:700, fontSize:13, marginBottom:4 }}>⚠️ Grant Insufficient — Wishlist Characters</div>
                    <p style={{ color:"#92400e", fontSize:12, margin:0, lineHeight:1.5 }}>
                      The current grant list doesn't fully support this theme. The characters below would strengthen the season but are not in the grant.
                      Red = requires a new Marvel request. Orange = already exists in SNAP but not in grant.
                    </p>
                  </div>
                  <div style={{ display:"grid", gap:8, gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))" }}>
                    {result.wishlistCharacters.map(w => <WishlistCard key={w.name} w={w} />)}
                  </div>
                </div>
              )}
              <ExportPanel data={result} theme={theme} confidence={confidence ?? result.confidence} />
            </div>
          )}

          {tab==="artists" && (
            <div>
              <div style={{ marginBottom:16 }}>
                <h3 style={{ color:"#f472b6", fontSize:13, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>🎨 Recommended Artists</h3>
                <p style={{ color:"#475569", fontSize:12, margin:"0 0 16px" }}>
                  3 artists whose visual style best matches <strong style={{ color:"#818cf8" }}>{result.seasonName}</strong>'s aesthetic and key art direction.
                  Green badge = already in SNAP · Orange badge = external artist not yet in SNAP.
                </p>
              </div>
              <div style={{ display:"grid", gap:12, gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))" }}>
                {(result.artistRecommendations || []).map((a, i) => <ArtistCard key={a.name} artist={a} index={i} />)}
              </div>
              {result.keyArtComposition && (
                <div style={{ marginTop:16, background:"#0f172a", border:"1px solid #1e293b", borderRadius:10, padding:14 }}>
                  <div style={{ color:"#818cf8", fontSize:11, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>🖼 Key Art Direction</div>
                  <p style={{ color:"#94a3b8", fontSize:13, margin:0, lineHeight:1.7 }}>{result.keyArtComposition}</p>
                </div>
              )}
            </div>
          )}

          {tab==="locations" && (
            <div>
              <h3 style={{ color:"#f97316", fontSize:13, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>📍 Season Locations</h3>
              <p style={{ color:"#475569", fontSize:12, margin:"0 0 16px" }}>4 canonical Marvel locations defining the season's aesthetic and narrative.</p>
              <div style={{ display:"grid", gap:10, gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", marginBottom:16 }}>
                {(result.locations || []).map(loc => <LocationCard key={loc.name} loc={loc} />)}
              </div>
              <ExportPanel data={result} theme={theme} confidence={confidence ?? result.confidence} />
            </div>
          )}

          {tab==="mechanics" && (
            <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:12, padding:24 }}>
              <h3 style={{ color:"#f1f5f9", marginTop:0 }}>⚙️ Mechanical Hooks for SNAP Gameplay</h3>
              {result.mechanicalHooks?.map((hook, i) => (
                <div key={i} style={{ display:"flex", gap:12, marginBottom:14 }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", background:"#1e293b", display:"flex", alignItems:"center", justifyContent:"center", color:"#818cf8", fontWeight:700, flexShrink:0, fontSize:12 }}>{i+1}</div>
                  <p style={{ color:"#cbd5e1", margin:0, lineHeight:1.7, fontSize:14 }}>{hook}</p>
                </div>
              ))}
              <div style={{ marginTop:20, padding:14, background:"#1e293b", borderRadius:8 }}>
                <div style={{ color:"#f59e0b", fontWeight:700, marginBottom:6, fontSize:13 }}>💡 Design Philosophy</div>
                <p style={{ color:"#94a3b8", fontSize:12, margin:0, lineHeight:1.6 }}>
                  These hooks are derived from the "{theme}" theme. Each mechanic should reinforce the season's narrative identity while creating interesting counterplay opportunities.
                </p>
              </div>
            </div>
          )}

          {tab==="meta" && (
            <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:12, padding:24 }}>
              <h3 style={{ color:"#f1f5f9", marginTop:0 }}>📊 Season Metadata</h3>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
                {[
                  ["Theme Input", theme],
                  ["Season Name", result.seasonName],
                  ["Title Tagline", result.suggestedTitle],
                  ["Confidence (Survey-calibrated)", `${confidence ?? result.confidence}%`],
                  ["Theme Demand Score", `${getTDS(theme)}% (from player survey)`],
                  ["Total New Characters", 1 + result.series5.length + result.series4.length],
                  ["Variant Suggestions", result.variantSuggestions?.length ?? 0],
                  ["Wishlist Characters", result.wishlistCharacters?.length ?? 0],
                  ["Season Pass", result.seasonPass?.name],
                  ["Locations", (result.locations||[]).map(l=>l.name).join(", ")],
                ].map(([label, value]) => (
                  <div key={label} style={{ background:"#1e293b", borderRadius:8, padding:12 }}>
                    <div style={{ color:"#475569", fontSize:11, marginBottom:2 }}>{label}</div>
                    <div style={{ color:"#f1f5f9", fontSize:13, fontWeight:600 }}>{value}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom:16 }}>
                <div style={{ color:"#94a3b8", fontSize:12, marginBottom:8 }}>Recognizability — Series 5</div>
                {result.series5.map(c => (
                  <div key={c.name} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:5 }}>
                    <div style={{ width:150, fontSize:11, color:"#64748b", flexShrink:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.name}</div>
                    <div style={{ flex:1, background:"#1e293b", borderRadius:4, height:7 }}>
                      <div style={{ width:`${(c.recognizabilityScore??0)*10}%`, height:"100%", background:"#818cf8", borderRadius:4 }} />
                    </div>
                    <div style={{ width:24, fontSize:11, color:"#818cf8", textAlign:"right" }}>{c.recognizabilityScore ?? "–"}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom:16 }}>
                <div style={{ color:"#94a3b8", fontSize:12, marginBottom:8 }}>Recognizability — Series 4</div>
                {result.series4.map(c => (
                  <div key={c.name} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:5 }}>
                    <div style={{ width:150, fontSize:11, color:"#64748b", flexShrink:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.name}</div>
                    <div style={{ flex:1, background:"#1e293b", borderRadius:4, height:7 }}>
                      <div style={{ width:`${(c.recognizabilityScore??0)*10}%`, height:"100%", background:"#34d399", borderRadius:4 }} />
                    </div>
                    <div style={{ width:24, fontSize:11, color:"#34d399", textAlign:"right" }}>{c.recognizabilityScore ?? "–"}</div>
                  </div>
                ))}
              </div>
              <ExportPanel data={result} theme={theme} confidence={confidence ?? result.confidence} />
            </div>
          )}
        </div>
      )}

      <div style={{ textAlign:"center", marginTop:40, color:"#334155", fontSize:11 }}>
        Marvel SNAP Season Generator v4 · Survey-Calibrated · Variants · Wishlist · Slack · {unusedChars.length} Characters
      </div>
    </div>
  );
}