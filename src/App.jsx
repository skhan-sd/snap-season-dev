import { useState, useCallback } from "react";

const UNUSED_CHARACTERS = [
  "'Spinner","3-D Man / Charles Chandler","3-D Man / Triathalon / Delroy Garrett","60S Spider-Man Cartoon","90S Spider-Man Cartoon","A-Bomb","A'Di (New Alpha Flight)","A'Sai (Earth-616)","Aarkus (Vision)","Aaron Davis (Earth-1610)","Abby-L (Earth-616)","Abigail Baxter","Abigail Brand","Abominable Snowman","Abyss (Ex Nihilo)","Abyss (Nils Styger)","Acrobat (Spider-Squad)","Adam X","Adamantine","Aegis (Lady Of All Sorrows)","Aegis (Trey Rollins)","Ael-Dan","Aerolite","Aftershock","Agence Byzantine","Agent 9","Agent Anti-Venom","Agent Nine (Peter Parker)","Agent Peggy Carter","Agent X","Agent Zero / Maverick","Agon","Ahura","Ai Apaec","Aireo","Ajak Celestia","Ajes'Ha","Al B. Harper","Al'Arok","Alaris","Albert Devoor","Alden Maas","Aldrich Killian","Alecto","Aleph","Alexander Pierce","Alias Private Investigations","Alice Guilliver / The Wu","Alice Hayes","Alice Kedzierski","Alicia Masters","Alma Chalmers","Alpha","Alpha Monster / Leviathon Monster","Alton Osborn, Sr.","Alvi Brorson","Alyce Grimm / Alice \"\"Rad\"\" Grimm","Alynn Cambers","Aman / Ayaman","Amatsu-Mikaboshi / Chaos King","Amberson Osborn","Ambur","American Dream","American Kaiju","American Panther","Amphibian / Kingsley Rice","Anais (Les Heroes)","Anddar Bal","Andrea Strucker","Android Man","Aneka","Anna Maria Marconi","Anna Watson","Ant-Man I (Hank Pym)","Anti-Man / Conner Sims","Anya Corazon (Earth-11209)","Anya Corazon (Earth-982)","Apocryphus","Appala The Sun Queen","Aptak","Aquarius / Darrenn Bentley (Lords Of The Zodiac)","Arachknight (Peter Parker)","Arachknight (Peter Parker) [Spider-Man And Moon Knight]","Arachne","Arachne (Earth-398)","Arachnoman","Aracnido Jr. (Spider-Man Mexico)","Aradnea","Arc (Of Imperial Guard)","Arcade","Arcadius","Arclight","Aries / Marcus Lassiter (Lords Of The Zodiac)","Arizona Annie","Arkon","Armadillo","Aron The Rogue Watcher","Arquindae","Arthrosians (Generic)","Arthur Pendragon","Asp","Ast","Astra","Astrolabe / Al-Hasan","Astronomer","Atlas","Att-Lass","August Wu Of The Coral Shore","Av-Rom","Avalanche / Dominikos Petrakis","Avalanche Ii","Avatar (Princess Alaisa Ruantha Pethnan)","Avia","Avius","Aya","Ayaman","Ayo","Azazel","Baal (Earth-2301)","Bacchae","Bag'Le","Bahng (Headman Of Doka'Abi Clan)","Balder The Brave","Bamfs","Banshee","Banyan (Ajay Roy)","Bar With No Doors","Barbuda (Formerly A.I.M. Island)","Baron Blood","Baron Gregor Russoff","Baron Macabre","Baron Strucker","Baroshtok","Bartak","Barton Grimes (Brothers Grimm)","Battlestar","Bav-Tek","Becky Barnes","Bedlam","Beetle I (Abner Jenkins)","Beetle Iii (Janice Lincoln)","Belasco","Belial (Lt. Gregory Of Doa)","Bella Fishbach","Belle Thorne","Ben Parker","Ben Urich","Bengal","Benjamin Deeds","Betty Brant","Beverly Switzler","Beyonder","Bi-Beast","Big Bertha (Ashley Crawford)","Big House","Big Man","Big Wheel","Biohazard (From New Warriors)","Blaast","Blabber (Brand)","Black Ant (Eric O'Grady)","Black Cat Venom","Black Dwarf","Black King / Sebastian Shaw","Black Mamba","Black Mariah","Black Panther Ii / Shuri","Black Queen / Selene","Black Spectre","Black Suit Spider-Man (Peter Parker)","Black Talon","Black Tom","Black Widow 2099","Black Widow Ii (Yelena Belova)","Blackbird (Vehicle)","Blackbody","Blacklash","Blackout (Lilin)","Blackout (Marcus Daniels)","Blackwing I (Joseph Manfredi)","Blackwing Ii","Blanca Del Hierro","Blastaar","Blazing Skull","Blindspot","Bling","Blizzard (Donald Gill)","Blizzard / Jim","Blockbuster","Blood Brothers","Blood Spider (Michael Bingham)","Bloodhawk","Bloodlust (Femme Fatales)","Blue Eagle","Blue Streak (Fast Five)","Blur","Bob Diamond (Sons Of The Tiger)","Bob Landers","Bolivar Trask","Bombastic Bag-Man Suit","Bombshell (Lara Baumgartner)","Bombshell (Momma Baumgarter)","Bombshell (Wendy Conrad) (Death-Throws)","Boom Boom","Bora","Borers","Borgo","Boris","Boss Barker","Bounty","Bowman","Box","Brad Davis","Brahmanes","Brain (Slugger Johnson)","Brain Parasites","Brainstorm (Valeria Richards)","Bride Of The Nine Spiders","Bridget O'Neil","Brigand","Brightstorm","Brigid O'Reilly","Brix","Brood Queen","Brother Royal","Bruiser","Bruno Carrelli","Brutacus","Brutacus (Salem'S Seven)","Brute (Ralph Hutchins)","Bruttu","Bucka / Bucky (Past Life) (Egypt)","Bucky (Past Life) (Middle Ages)","Budan","Bull Brogin","Bulldozer","Bullseye Killer / Eliza (Elektra Noir)","Burnt Orange","Butterball","Caesar Cicero","Caledonia (Alysande Stuart)","Callisto","Calvin Morse","Calypso","Cancer (Lords Of The Zodiac)","Canice Cassidy (Earth-311)","Cap-Wolf (Sam Wilson)","Cap-Wolf (Steve Rogers)","Cap'N Reptyl","Capo","Capricorn (Lords Of The Zodiac)","Captain America 2099","Captain America 20Xx (Danielle Cage)","Captain America I (Steve Rogers)","Captain America Ii (Bucky Barnes)","Captain America Iii (Sam Wilson)","Captain Avalon","Captain Britain","Captain Corbett (Circus Of Crime)","Captain Glory","Captain Marvel I (Mar-Vell)","Captain Marvel Iii (Carol Danvers)","Captain Stacy","Cardinal Raker","Caretaker I (Blood)","Caretaker Ii (Sara)","Carina Walters","Carlie Cooper","Carlo Zota","Carol Landers","Caroline Le Fay","Carrion (Malcolm Mcbride)","Carrion Crow","Casey Kinmont","Catastrophobia (Uprising Storm)","Catherine Wilder","Catseye","Cauldron The Scalding Man","Cell Block X","Cerebra","Ceres","Ch'Od","Challenger","Champion (Of The Universe) / Tryco Slatterus","Chance","Charles Standish","Charlie-27","Chase Stein (Runaways)","Chaste","Chee","Chemistro","Cheshire Cat","Chimera","Chipmunk Hunk","Chiron","Chitauri","Chondu","Chorus Sentry","Choshin Of The House Of The Bull","Chronos","Chronos / Kronos","Chthon","Chynae","Cipher (Joras-Kyl)","Citadel At The End Of Time","Citizen V","Clash (Clayton Cole)","Cloud 9","Clown","Clumsy Foulup","Cockroach Hamilton","Coil","Cole","Collection Agency / Janus Members","Comanche","Comte De Nuit","Condor","Condor, The","Constrictor","Contemplator","Contemplator Impersonator","Contraxian","Controller","Conundrum","Cordon","Cornelius Van Lunt (Civilian)","Cornell Cottonmouth","Coroner","Corruptor","Corsair","Count Kaoz","Count Nefaria","Cowboy Spider-Man (Earth-31913)","Coyote","Cr'Reee","Crater","Creature From Krogarr","Crimson Dynamo/ Anton Vanko","Crimson Hawks","Crippler","Crossfire","Crucible / Wladyslav Shinsky And Maris Morlack","Crusader/ Z'Reg","Crush","Crusher Hogan","Cryptomnesia (Uprising Storm)","Crystar","Cubisk Core","Cul Burson / Serpent","Cullen Bloodstone","Currs","Cursed Cass","Cyclone","Cynosure I (Saen Sendak)","Cynosure Ii (Lena Sendak)","Cynthia Von Doom","Cypher","Cyphyrr-4 / Cy-Phurr-4","Czar-Doon","D’Spayre","Daddy Wronglegs","Daemos","Dagoth","Daily Globe","Daimon Hellstrom","Dal Damoc","Dale Yorkes","Damon Ryder","Dani Moonstar / Mirage / Psyche","Daniel Damian","Daniel Drumm","Daniel Grimm / Daniel Grimm, Jr.","Dante (New Alpha Flight)","Dar-Benn","Daredevil Noir","Dark Counsel (Vartu)","Dark Knight Of Astralon","Dark Phoenix","Dark Raider (Reed Richards)","Darkoth (Desmond Pitt)","Darkstar","Darwin","De'Lila","Dead Aim","Dead Girl","Deadpool Kid","Death Adder","Death Locket","Deathbird","Deathunt 9000","Deathurge","Debra Love","Delphinia","Demogoblin","Demonicus","Denial","Denise Waters","Dennis Bowden","Desidera","Designate / Thor Girl (Tarene)","Despair","Detective Fantome","Detroit Steel I (Doug Johnson Iii)","Detroit Steel Ii / Sasha Hammer","Devil Corker","Devil Dino (Human)","Devil Hulk / Brian Banner","Devil- Slayer","Devlor The Deadly","Devos The Devastator","Dexter Bennett","Diablo (Esteban Diablo)","Diamondhead","Dictionary Dawson","Dinah Soar","Discharge","Dmitri The Science Boy","Doc Samson","Docteur Q","Doctor Doom (Victor Von Doom)","Doctor Druid","Doctor Faustus (Johann Fennhoff)","Doctor Kronton","Doctor Mandibus","Doctor Nemesis","Doctor Octopus 2099","Doctor Phillip Zolten Rambow","Doctor Spectrum","Doctor Voodoo / Brother Voodoo","Dog Brother #1","Dogpool","Doka'Abi Clan (From Sakaar)","Don Nefaria / Count Luchino Nefaria","Don Rigoletto","Don Vincente Fortunato","Donald Pierce / White Bishop / White King","Donna Maria Perez","Doomsday Man","Doomstadt","Doop","Doorman (Demarr Davis)","Dora Miljae","Doris","Doubt","Downer","Doyle Dormammu","Dr. Karla Sofen (Civilian)","Dr. Nels Van Adder / Proto-Goblin","Dr. Spectrum","Dragon Lord Of Rammatpolen","Dragoness","Dragonfly","Dragonfly (Karsano)","Dragonfly (Meiko Yin)","Drall, Gladiator From Beyond The Stars","Dreadface","Dream Weaver","Drexxon","Drill (Power Tools)","Drive","Druid","Druig","Dusk","Dusk (Peter Parker)","Dust (Sooraya Qadir)","Dwarf King (King Eitri)","Dweller In Darkness","Dylan-Cir","Earnst","Earth X Spider-Woman","Earthshaker (Earth-982)","Ebon Seeker","Ebony","Echidna","Eden Fesi","Editor","Edward Brock (Earth-11080)","Edward Brock (Earth-13017)","Edward Brock (Earth-14702)","Edward Brock (Earth-50701)","Edward Brock (Earth-71004)","Edward Brock (Earth-71912)","Edward Brock (Earth-808122)","Egghead","Ego-Spawn","El Aguila","Electro 2099","Electro Ii / Aftershock (Allison Dillon)","Electron","Eliminator","Elloe Kaifi","Elmar Radd","Elspeth Cromwell","Elvis Morin","Emily Bright","Emily Osborn","Emperator Prime","Emperor Dorrek","Entropy (Eternity'S Child)","Eon","Ergons (Sklarr)","Eternity","Excalibur","Executioner","Exile (Victor Kohl)","Exodus","Explosion (Eternity'S Child)","Eye Boy","F.R.I.D.A.Y","Fabian Lamuerto (Earth-982)","Falcon Ii (Joaquin Torres)","Falcona","Fancy Dan","Fandral","Fantastic Force","Fasaud / Farouk Al-Fasaud","Fat Cobra","Fatale","Father Diablo","Father Spider","Faze","Fennan Radd","Fera","Feral","Ferene (The Other)","Fhyty","Finesse","Fiona","Firebird","Firebrand / Gary Gilbert","Firebrick","Fireclaw","Firefrost","Firepower / David Roberts","Fist Of N’Astirh","Fixer","Flag-Smasher","Flaidermaus","Flame (Dan Springer)","Flash Thompson","Flashfire (Grannz)","Flb'Dbi Race","Flint","Flugron","Flying Dutchman (Captain Joost Van Straaten)","Flynn","Fomalhauti","Foolkiller","Forbush Man","Force (Clayton Wilson)","Forey","Forgetmenot / Xabi","Frances Barrison","Frank Dean","Franken-Castle","Frankenstein","Frankensurfer / Borgo","Franklin Richards","Franklin Storm","Fulmina (Sylvia Prell)","Fume","Furgar","Future Foundation Suit","Futurist (Dr. Randolph James)","Gaard / Vangaard","Gabe Acheron","Gabriel Gant","Gabriel Mason","Gabriela Pertuz","Gaea","Gaius Tiberius Augustus Agrippa / Flavius Scollio","Galen-Kor","Ganke Lee","Gardener","Gargoyle","Garnok Rebbahn","Garokk","Gasher","Gateway","Gazelle","Gazelle (Scratch) (Salem'S Seven);Geatar","Gemini (Lords Of The Zodiac)","Gene Hayes","General Kalamari","General Ross","General Zkrodd","Genie","Genocide/ Holocaust","Geoffrey Wilder / Chamber","Gert Hauptmann","Gertrude Yorkes (Runaways)","Ghost Panther (T'Challa)","Ghost Panther (T'Challa) [Black Panther And Ghost Rider]","Ghost Rider 2099 (Kenshiro \"\"Zero\"\" Cochrane)","Ghost Rider Ii (Johnny Blaze)","Ghost Rider Iv (Robbie Reyes)","Ghost Spider Iii","Giant Maniac (Lee Price)","Giant-Man","Gibbon","Gideon","Gideon Mace","Glob","Glob Herman","Glorian (Thomas Gideon)","Glorianna (Rhonda Gleming)","Glory (New Alpha Flight)","Glory Grant","Gnasher","Gold Rush (Fast Five)","Goldbug","Golden Age Deadpool","Golden Archer / Black Archer / Wyatt Mcdonald","Golden Skull","Goleta","Googam, Son Of Goom","Goom","Gor-Kill The Living Demon","Gordon Clay","Gorgilla","Gorilla-Man","Gormuu","Gornkai","Gorr The Godbutcher","Gorr The Golden Gorilla","Grady Scraps","Grant Ward (Agents Of S.H.I.E.L.D.)","Gravitation (Eternity'S Child)","Graviton","Gravity","Great Coordinator (Harvey Jessup)","Great One","Green Light (Fast Five)","Greenskyn Smashtroll","Gregory Gideon","Gregson Gilbert (Professor)","Grendel / Symbiote","Grey Gargoyle / Paul Duval","Grid","Grim (Gibert Manigo)","Grim Reaper / Eric Williams","Grindhouse","Grizzly","Grizzly (Maxwell Markham)","Grog","Grove","Guardian (Spider-Clone)","Guardian / James Hudson","Guilt","Gun Metal","Gun-R","Guslaug","Gwen Stacy","Gwenpig","Gyltra","Gypsy Moth","Gyre (Twisted Sisters)","H.A.M.M.E.R.","H.U.B.E.R.T. (Hyper-Ultronic Brain Employing Randomized Tracings)","Haazareth Three","Haechi (Mark Sim)","Hagar","Haichun Of The House Of The Bear","Hammer (Six Pack)","Hammerhead","Handsaw (Power Tools)","Handsome Harry Phillips","Hank / Hank Johnson, Agent Of Hydra","Hank Pym","Hannibal King","Hardball","Harek Korgon","Harpoon","Harquis Tey","Harry Leland / Black Bishop","Harry Osborn","Harvey Jessup","Hate-Monger","Hate-Monger (Android)","Hawkeye 2099","Hawkeye Ii / Kate Bishop","He Who Summons","Heather Mcneil / Hudson (Civilian)","Hel Wolf","Helbindi","Helix (Twisted Sisters)","Hellcat (Patsy Walker)","Hellfire","Hellphyr","Hellscout","Hellstorm","Henkor","Hepzibah","Hermetikus (Tyreeze Tarolt)","Heroes For Hire Inc.","Hi-Vo","Hiram Shaw","Hiram Sheckerberg","Hiroim","Ho Yinsen","Hobgoblin 2099","Hoggoth","Hollywood","Horn","Hornet (Peter Parker)","Horrorscope","Horus","Hotness","Howler (Zed)","Hub (Hubartes Plutaris)","Hulk 2099","Human Cannonball / Jack Pulver","Human Fly (Richard Deacon)","Huntara","Husk","Hussar","Hydron","Hydron (Salem'S Seven)","Hynnit","Hyperion","Hyperstorm","Hypno-Creature","Hypno-Hustler","Hyzaktl","Ice Box","Ichor","Iconoclast","Iguana","Ikaris (Eternals)","Ikelli","Ikon","Ilgych","Immortus","Impact","Imperator","Impossible Man","In-Betweener","Infamous Iron Man (Victor Von Doom)","Infant Terrible","Inferno","Infinity","Invisible Girl (Susan Storm Richards)","Ire","Iric Borson","Iron Cross (Clare Gruler)","Iron Hammer [Iron Man And Thor]","Iron Mask","Iron Monger / Obadiah Stane","Iron Patriot Iii (Toni Ho)","Iron Spider","Iron Spider (Aaron Davis)","Ironclad (U-Foes)","Isaac Newton","Iso (Xiaoyi)","Isobel Aguirre","It Crawls By Night","Itz (New Alpha Flight)","Izumi","J.A.R.V.I.S.","Jack Jameson (Earth-982)","Jack O’Lantern","Jack Of Hearts","Jackal","Jackhammer (Power Tools)","Jackpot","Jaguur","Jake Grimm / Dr. Jacob Grimm","Jaketch","James Hudson (Civilian)","Janet Stein","Janus","Janus Collection Agency","Jarhead","Jartran Radd","Jason Of Sparta / J'Son Of Sparta","Jasper Sitwell","Jay T. Thomas (Earth-20007)","Jean Dewolff","Jeff The Land Shark","Jemma Simmons","Jenix","Jennie Royce","Jennifer Justice (Earth-61211)","Jerome Hamilton","Jeryn","Jesse Drew (Earth-65)","Jessica Drew (Earth-11080)","Jessica Drew (Earth-1815)","Jessica Drew (Earth-94)","Jester","Jetstream","Jewel (Jessica Jones)","Jian Feeta","Jigsaw","Jimmy Woo","Jinni Demon","John Jameson","Jolen","Jon Kasiya","Jonathan Tremont","Joost Van Straaten","Jormungand / Midgard Serpent","Jose Santini","Joseph Calhoun","Josie'S Bar","Joy Meachum","Joystick","Jude","Julie Angel / Juliette D'Angelo","Jurgen Muntz","Justice","Justice Liberty","Justice Love","Justice Might","Justice Rose","Justice Truth","Jyx","Kaboom","Kacy","Kaldera","Kaliban","Kallark / Gladiator","Kalum-Lo","Kaluu","Kangaroo (Brian Hibbs)","Kar-Sagg","Karant Kiar","Karma","Karn","Karnak","Karnilla, Queen Of The Norns","Karolina Dean (Runaways)","Kerberos","Khirn","Khoon The Explorer","Kiber The Cruel/ Frederick Kiber","Kid Colt","Kid Kaiju","Kid Kree / Mel-Varr","Kid Ock (Oliver Osnick)","Kid Venom","Killer Shrike","Killer Thrill","Killraven","King Cobra / Klaus Voorhees","Kingo","Kirigi The Undying","Kirsten Mcduffie","Kitang","Kkallakku","Klagg","Knickknack (Death-Throws)","Knockout (Femme Fatales)","Ko-Rel","Kobik","Koi Boi","Komodo","Korath The Pursuer","Korda","Korvac/ Michael Korvac","Kosmos","Kraa The Unhuman","Krang","Krat","Kraven The Hunter","Kraven The Hunter (Poison)","Kristoff Vernard","Kurani","Kurrgo","Kurse","Kylon","Kylor","La Lumiere Bleue","Lady Deadpool","Lady Hellbender","Lady Mandarin (Kwannon) / Revanche","Lady Octopus","Lady Spider","Lana Baumgartner (Earth-1610)","Lancelot","Larry Lee","Larry Rambow / Larry Rambo","Larry The Cranky Demon","Laserfist (Lyja)","Lash","Lava Monster","Le Cowboy","Le Vent","Leah (Construct Of Loki)","Leap Frog","Legate (Krieger Sect)","Lei Kung The Thunderer","Leo (Lords Of The Zodiac)","Leo Fitz","Leonus","Leslie Dean","Letha","Lexi Miranda","Lian Tang","Libra","Libra/ Gustav Brandt (Lords Of The Zodiac)","Lila Cheney","Lilia Calderu","Lilith","Lily Holister","Lin Sun (Sons Of The Tiger)","Lineage","Lionfang","Lionheart","Lippy Louie","Live Wire (Rance Preston)","Living Brain","Living Dream (Thahn Ng)","Living Lightning","Living Mummy, The / N'Kantu","Living Totem","Liz Allen","Llyra Morris","Lo-Karr, Bringer Of Doom","Lockdown (Jomo Kimanye)","Lola Daniels","Lonesome Pinky / Joseph Pincus","Longbow","Longshot","Looter","Lord Chaos","Lord Templar","Lorelei","Lorrie Melton","Los Diablos Base","Lt. General Fredricks","Lucas Jackson","Lucky (Pizza Dog)","Lugwrench Lubowski","Luna","Lunatik","Lurking Unnknown","Lyja (The Laserfist)","M (Monet St. Croix)","M-11","M.O.D.A.M.","M'Ndavians","Mac Gargan","Mace (Peter Parker)","Mach-V","Mach-X (Abner Jenkins)","Machete","Madame Hydra (Viper)","Madame Masque","Madelyne Pryor","Madison Jeffries","Madness / Corwin Jones / Symbiote","Maeera","Maelstrom","Maestro","Magma","Mahkizmo","Maiden Of Carrion (Nedra)","Maiden Of Deceit (Aldvi)","Maiden Of Filth (Hermotha)","Maiden Of Insanity (Disthora)","Maiden Of Seduction (Arnleif)","Maiden Of Slaughter (Balda)","Maiden Of Torture (Daggaerdh)","Maiden Of Vermin (Sigotta)","Majestrix Lilandra","Makio Yakaki","Makoth","Malcom (Xavier Security Enforcers)","Malice (Sue Storm (Doppelganger))","Malice (Sue Storm)","Malice / Nakia Shauku","Man Mountain (Michael) Marko","Man-Ape / M'Baku","Man-Beast","Man-Wolf","Mandarin","Mandroid(S)","Mangog","Mania (Andi Benton)","Mania (Symbiote / Kylntar)","Maniac (Lee Price)","Manifold","Manny Merengues","Manphibian","Manta","Mar-Vell","Marak","Marduk Kurios","Maria Russoff","Maris Morlak","Martha Johansson","Martha Osborn","Martinex","Marvel Girl","Mary Parker","Masacre","Masked Marauder","Massacre (Marcus Lyman)","Massdriver","Master Hate","Master Khan","Master Of Guile","Master Of The World / Eshu","Master Order","Master Xar","Mastermind (Jason Wyngarde)","Mastermind (Martinique Wyngarde)","Maston-Dar","Matani Tivan","Matriarch, The","Max Borne (Earth-98105)","Max Modell","Mayhem (April Parker)","Mayhem (Brigid O'Reilly)","Mechamage","Medico Mistico","Meg'Ror","Mega-Sentinel","Megataur","Megaton / Jules Carter","Mekara","Mel Prasis","Melinda May","Melter / Bruno Horgan","Menace","Mendel Stromm / Robot-Master","Mendez","Mentacle","Mentallo","Mentor","Mercurio The 4-D Man","Meredith Quill","Meruda","Mesmero","Metallo","Metalloid","Mettle","Mia The Magic Girl","Michele Gonzales","Might","Mikhail Rasputin","Militant","Millennius","Mimic","Mindblast (Danielle Forte)","Mindworm","Minxi","Miracle Man","Misa","Mister Alternity","Mister Fantastic (Reed Richards)","Mister Fish","Mister Immortal (Craig Hollis)","Mister Negative","Mister Sinister","Mistress Death","Mistress Love","Mistur","Modulus","Moira Mactaggert","Molecule Man (Owen Reece)","Molly Hayes (Runaways)","Molly Hunt","Moloids","Molten Man","Molyb","Molyn, The Metal Master","Monako","Mondo","Monkey King","Monocle (Michael Berman)","Monstrom","Montana ( Enforcers)","Moomba","Moon Boy","Moonglow/ Arcanna Jones","Mordred","Morgan Le Fey","Moridun","Morlun","Mosaic","Moses Magnum","Mother Bones","Mother Mold","Motherboard 49.7","Mowfus (Monster From The Lost Lagoon)","Mr. Hyde","Mr. Joe Fixit","Ms. Marvel I (Carol Danvers)","Ms. Marvel Ii (Kamala Khan)","Mud-Ah","Muramasa Blade","N’Astirh","Naamurah (Earth-001)","Nadar","Naja","Nalin Oberoi (Earth-50101)","Nallo","Napoleon G. Robberson","Nathaniel Richards","Native Queen","Nature Girl","Nebulon","Necrodamus","Nelson & Murdock Law Office","Nenora","New Attilan","New Black Suit Spider-Man (Peter Parker)","Nicodemus West","Night Phantom / Travis Hoyt","Night Thrasher","Nightfall","Nighthawk / Nightshade / Tilda Johnson","Nightmask","Nightshade","Nightside","Nikki","Ninetyseven / Aiko Maki","Nitro","Noah Baxter","Nocculus","Noh-Varr / Protector","Noir","Nomad (Steve Rogers)","Norman Macarthur","Norman Osborn","Norrin Radd","Northstar","Nosferata (Black Widow From Avalon)","Nova Corpsman (Rhomann Dey)","Nova I (Richard Rider)","Nova Ii (Sam Alexander)","Nova Prime (Irani Rael)","Nova Prime (Tanak Valt)","Now! Magazine","Nox","Noxx","Nuform / Nuform Vibranium","Nuke","Nuklo / Robert Frank Jr.","Nul, Breaker Of Worlds","Nur (Frank Mcgee)","Nurotox Spider-Man","Nux Vomico","Obliterator (Interstellar)","Obliterator (Maht Pacle)","Oblivion","Occulus","Oclin Uwir Prin","Octo-Spidey","Oddball / Elton Healey","Ogre (Wicked Brigade)","Ogun","Old Lace (Runaways)","Old Man Bullseye","Old Man Hawkeye","Omega Core","Onomi Whitemane","Oog","Oola Udonta","Orb","Original Human Torch (Jim Hammond)","Orion","Orrgo","Orson Randall","Oshtur","Osprey","Otis Danger Johnson","Outlaw","Outriders","Over-Mind / Grom","Overdrive","Overlord","Overlord Rakkhal","Override","Ovoid Race","Ox (Enforcers)","Pagan","Pagliacci","Paibok The Power Skrull","Paladin","Panacea (Ash Minnick)","Panda-Mania","Pandora Peters","Panic","Paris Green","Patience Of The House Of The Rabbit","Patton Parnel (Earth-51412)","Peggy Macarthur","Pei","Percy Grimes (Brothers Grimm)","Peter Parker (Earth-11045)","Peter Parker (Earth-11080)","Peter Parker (Earth-11209)","Peter Parker (Earth-12121)","Peter Parker (Earth-148)","Peter Parker (Earth-9997, Police Uniform)","Petras Pentragon","Petunia Grimm","Phadros","Phaeder","Phage (Rico Axelson)","Phage (Symbiote / Kylntar)","Phalanx","Phantom Rider (Carter Slade)","Phil Coulson","Phobos","Phoenix (1,000,000 Bc)","Pick Axe (Power Tools)","Pildorr The Plunderer From Outer Space","Piledriver","Pinyon","Pip The Troll","Pisces (Lords Of The Zodiac)","Plunderer","Pockets Possum","Pod (Aikku Jokinen)","Poison (Peter Parker)","Poison Doctor Octopus","Poison Green Goblin","Poison Rhino","Poison Spider-Man (Peter Parker)","Poole Boys","Porcal","Poundcakes","Powder Keg","Power Man","Power Princess","Powerhouse (Franklin Richards)","Pradda Fol","Predator X","Prester John / Johann","Prestige / Rachel Gray","Princess Anelle","Princess Pearla","Prism","Priya Aggarwal","Professor Xu","Protector (Thoran Rul)","Proteus","Psider-Man, Pseter Psarker","Psycho-Man","Ptakr","Public Identity Spider-Man (Peter Parker, Earth-96282)","Puck (New Alpha Flight)","Pulsar / Impulse","Puma","Puppet Master","Puppy","Purple Man","Pyramoids (Items)","Pyreus Kril","Pyro","Pyro Ii","Qi Of The House Of The Snake","Qnax","Quasar","Quasar Ii (Avril Kincaid)","Quasimodo (Quasi-Motivational Destruct Organism)","Queen / Ana Soria","Queen Adora","Queen Shiklah","Queen Veranke","Quelin","Quentin Quire","Quickfire","Quincy Harker","R.O.B.","R'Klll","Ra-Venn","Raa","Rachel Van Helsing","Radioactive Man","Rafael Carago","Ragnarok","Raider","Raizo Kodo","Raksor","Rand Inc.","Randac","Randall (Xavier Security Enforcers)","Randell Jessup","Randy Robertson","Raphael Suarez","Raptor The Renegade","Rasa","Ratatoskr","Ravenous","Rawhide Kid","Raymond Bloch / Ox","Raza Longknife","Raze","Raze (Claire Dixon)","Raze (Symbiote / Kylntar)","Razor-Fist","Reader","Reaper (Henry Manigo)","Red 9 (Wallace Jackson)","Red Ghost (Ivan Kragoff)","Red Ghost'S Super-Apes","Red Goblin","Red Hulk Ii (Robert Maverick)","Red King","Red Line (Fast Five)","Red She-Hulk","Reeve","Regent (Augustus Roman)","Reignfire","Ren Kimura","Reptil","Reptilia (Salem'S Seven)","Reptilla","Reptyl / Cap'N Reptyl","Reptyl Prime","Requiem (Gamora)","Reverend Achebe","Reyno","Rhythm Ruiz / Roberto Ruiz","Richard Parker","Rick Jones","Rictor","Ringleader / Charles Last","Riot (Howard Ogden)","Riot (Symbiote / Kylntar)","Ripan","Riptide","Risque","Robbie Robertson","Robert Kelly","Robert Minoru","Roberta","Roberta Hunt","Rocket Racer","Rodor","Romeo","Rommbu","Romnar","Ronan The Accuser","Ronin","Ronin / Clint Barton","Rorgg, King Of The Spider-Men","Rosetta Stone","Roulette","Royal Blue","Royal Inhuman Vessel / R.I.V.","Ruby Thursday","Ruth Efford","Ruul","Ruul Race","Rynda","S’Byll","Sabra","Sagittarius (Lords Of The Zodiac)","Saint (Boris)","Sajani Jaffrey","Salamandra","Sallen-Bei","Sam Thorne","Sama-D","San","Sandorr","Sapna","Sarah Garza","Satana Hellstrom (Satana)","Satannish","Sawyer (Circus Of Crime)","Scalphunter / Grey Crow","Scarab (Deadly One)","Scarlet Beetle","Scarlet Centurion","Scarlet Centurion (Marcus Kang)","Scarlet Centurion (Nathaniel Richards)","Scarlet Samurai","Scarlet Spider Ii (Ben Reilly)","Scarlet Spider Iii (Felicity Hardy)","Scavenger","Scientist Supreme / Monica Rappiccini","Scorpia","Scorpia (Elaine Coll)","Scorpio (Lords Of The Zodiac)","Scorpion 2099","Scragg","Screwball","Sector 56-D (Star System)","Seeker","Seeker (Inhuman, 2Nd)","Seekers (Ravenous)","Seng Of The House Of The Eel","Senschi","Senso","Sentinel Prime / Prime Sentinel","Sergius O'Hoolihan","Serrata","Seth","Shaara","Shadow Queen","Shalla Bal","Shaman / Michael Twoyoungmen (Aka: Talisman)","Shanna The She-Devil/ Shanna O'Hara","Shaper Of Worlds","Shapeshifter","Shard (Shard Bishop) (Xavier Security Enforcers)","Sharon Carter / Agent 13","Sharon Selleck","Shatterfist","Shatterstar","Shay Smith","Shaylee Moonpeddle","Shazana","Shellshock","Shiklah","Shockwave","Shredded Man (Ivan Guerrero)","Shriek","Shriek (Frances Barrison)","Shrub","Sigyn","Sikorsky","Silence","Silent Fox","Silver Claw","Silver Dagger","Silver Ghost (Fast Five)","Silver Wolf (Andreas Vadas)","Silvermane","Simone Devouvier","Sin / Sinthea Shmidt","Singularity","Sir Raston","Siryn","Sisterhood Of The Badoon","Sk'Ym'X / Skrullian Skymaster","Skagerackrakor","Skein / Gypsy Moth","Skip Collins","Skooka","Skragg","Skreet","Skrull X","Skull The Redeemer (Formerly Skull The Slayer)","Skull The Slayer","Sligs","Slingshot","Slizzik","Slyde","Smythe","Snapdragon I (Rachel Leighton)","Snapdragon Ii (Sheoke Sanada)","Snowbird / Narya","Solomon Prey","Solus","Somnus","Songbird","Sons Of The Serpent","Sorrentino Ganger","Sp//Dr (Peni Parker)","Space Beasts","Space Phantom","Spark","Spear","Speed Demon","Speedball","Sphinx","Spider Gwen (Earth-1036)","Spider-Boy","Spider-Clan","Spider-Cyborg (Peter Parker)","Spider-Girl (Anya Corazon)","Spider-Girl (Earth-10943)","Spider-Girl (May Parker)","Spider-Gwen","Spider-Man (Earth-1137)","Spider-Man (Felix Lifson) (Earth-1036)","Spider-Man (Peter Parker)","Spider-Man (Peter Parker) (Earth-10182)","Spider-Man (Peter Parker) (Earth-37072)","Spider-Man 2099 (Miguel O'Hara)","Spider-Man Ii (Miles Morales)","Spider-Man Noir","Spider-Man Of Earth-4400","Spider-Man Reign","Spider-Man: India","Spider-Slayer","Spider-Uk","Spider-X","Spinerette","Spiral","Spirit Animal","Spitfire","Sporr","Sporr, The Thing That Could Not Die","Spot","Spot (Johnathan Ohnn)","Spragg","Sprite","Spyder-Knight","Spyder-Man (Peter Urich)","Spymaster","Squid","Squirrelpool","Ssith","St'Kr","Stacey Yorkes","Stallior","Starfox","Starlight / Red Guardian (Tania Belinskaya)","Steel Serpent","Steel Spider (Ollie Osnick)","Stegron Dino Man (Vincent Stegron)","Stella Negga","Stepford Cuckoos / Celeste","Sterilon","Steve Hopkins","Stewart Acheron","Stinger","Stinger (Cassie Lang)","Stingray","Stone","Stonewall","Striker","Stug-Bar","Stygorr","Styx","Sugar Man","Sun King","Sunfire","Supadaiman","Superia","Superintendent Carlson / Warden Carlson","Superior Carnage (Karlin Malus)","Superior Doctor Octopus","Supreme Intelligence","Suspensor","Swain (Jovana)","Swift-1","Swordmaster Ii","Swordsman (Andreas Von Strucker)","Swordsman (Jacques Duquesne)","Swordswoman","Sylark / Lady Lark","Sylk","Sylvie Laufeydottir","Sympira","Synapse","Synch / Everett Thomas","Syrrh","Tactical Force","Tai Miranda","Taj Nital","Talisman","Talokan","Talon","Talos","Tana (Julia Fontana)","Tanak Valt","Tanalth The Pursuer","Tar-Relll","Tar-Vash","Taranith Gestal","Tarnok-Kol","Tarq Maru","Taserface","Taurus (Cornelius Van Lunt)","Taxtor","Techno Golem (Tomoe)","Teela","Teen Abomination / Jamie Carlson","Telekinian (Ian Soo)","Tempus / Chrono Key","Tenebrae","Tenpin / Alvin Healey","Terminatrix / Ravonna Lexus Renslayer","Ternak","Texas Twister (Drew Daniels)","Thane","The Aged Genghis","The Apocalypse Twins","The Blip","The Blood Brothers/ Gh'Ree & R'Hos Blood","The Crawling Creature","The Divine Wolf Of The House Of The Wolf","The Eel Of Blessed Waters","The Green Thing","The Griever","The Hand","The Infinaut","The Insect Man","The Junkman","The Martian","The Pantheon","The Presence","The Professor","The Promoter / Xirena Awhina","The Raft","The Rat Of 12 Plagues","The Red King / Angmo-Asan","The Red Room","The Rose","The Sacred Timeline","The Scarab","The Shroud","The Spider-Man (Aaron Aikman) The Other / Ero / Miss Arrow","The Stranger","The Surveyor","The Thinker","The Triskelion","The Truth","The Unspoken / The Unspoken One","Thera","Thing (Ben Grimm)","Thomas Gideon","Thor I / Thor Odinson","Thor Ii (Jane Foster)","Thoran Rul","Thornn (Salem'S Seven)","Thorr The Unbelievable","Throb / Transhuman Robot","Throg","Throwdown (Death-Throws)","Thunderball","Thunderbird","Tiboro","Tic","Tiger Shark","Tiger’S Beautiful Daughter","Tigra","Tilda Johnson (Civilian)","Timberius","Tina Minoru","Tinac","Tinkerer","Titanium Man","Titus","Tom Thumb","Tomazooma","Tommy Boyd","Top Man","Topaz Ii","Torg","Torgo","Toro","Torque (Sue Richards)","Toth (Crystal Warrior Man-Thing)","Tracksuit Mafia / Tracksuit Brothers","Trader (Cort Zo Tinnus)","Tral","Trapster / Paste-Pot Pete (Peter Petruski)","Trickshot / Buck Chisholm","Trinary","Triphammer (Power Tools)","Trull The Inhuman","Turbo","Turk Barrett","Two-Gun Kid","Ty Stone","Tyannan Race","Tyndar","Tyr","Tzu- Zanna","U-Go Girl","U.L.T.I.M.A.T.U.M.","Uatu The Watcher","Ulik","Ultimate Cyber Scarlet Spider","Ultimate Iron Spider","Ultimate Nullifier (Item)","Ultimo","Ultimus","Ultimus / Ard-Con","Ulvar","Ulysses (Ulysses Cain)","Umar","Umbra","Una","Una-Rogg","Uni-Lord","Union Jack","Unlimited Class Wrestling Federation","Unus The Untouchable","Ur-Lini","Ursa Major","Vakume","Vakume (Salem'S Seven)","Valentina Allegra De Fontaine","Valeria Richards","Vampire By Night (Nina Price)","Vance Astro","Vandoom'S Monster","Vanessa Fisk","Vangaard (Johnny Storm)","Vapor / Ann Darnell","Vector / Simon Utrecht","Veil","Venom 2099","Venomized Spinneret","Venompool","Vernae","Vertigo","Vertigo (Fantastic Four)","Vertigo (Salem'S Seven)","Vice (Power Tools)","Victor Mancha","Victor Stein","Victor Strange","Victoria Bentley","Victorious","Vienna","Vin Gonzales","Vinatos","Vindicator","Virgo/ Elaine Mclaughlin (Lords Of The Zodiac)","Virilian","Virtual Reality","Virtue/ Ethan Edwards","Vivisector","Void","Volstagg","Vormund / Hauptmann Deutschland (Markus Ettlinger)","Vort","Vorzen","Vox / Maximus Boltagon","Voyager (Valerie Vector)","Vranx","Vron-Ikka","Vulcan","Vulture 2099","W.H.I.S.P.E.R.","Wallace Jackson","Walter Collins","War-Bow","Warbringer","Warden Michaels","Warhead","Warlord Morrat","Warmaker (Thor From Avalon)","Warrior Woman","Warstar (B'Nee And C'Cll)","Warwolf / Vic Marcus","Wasp I (Janet Van Dyne)","Wasp Ii (Hope Van Dyne)","Wasp Iii (Nadia Pym)","Wave Pearl Pangan","Weapon Hex (Wanda) [Scarlet Witch And X-23]","Web-Man (Earth-57780)","Webslinger","Weirdworld Dragon","Wendigo","Werner Von Doom","Whiplash (Foreman) (Femme Fatales)","Whiplash/ Anton Vanko","Whirlwind","Whisper","White Fox / Ami Han","White Jennie","White Raven","White Wolf","Whizzer","Widow Of The Web","Wild Blood","Wild Card (Peter Parker)","Wild One","Wild Worms","Wildman","Wildrun","Wildstreak (Tamika Bowden)","Will O’ The Wisp","William Sokolowski","Witchfinder Wolves","Wiz Kid","Wizard","Wizard (Fantastic Four)","Wladyslav Shinski","Wolvie","Wonder Man","Worldmind","Wrecker","Wundagore Mountain","Wyatt Wingfoot","Wyn / Reddwyn","Wynonah Wingfoot","X-Cutioner","X-Man (Nate Grey)","X-Ray / James \"\"Jimmy\"\" Darnell","Xalxor","Xandu","Xarus","Xemnu The Titan","Xemu","Xixix","Xunanguero","Yarro Gort","Yellow Claw / Plan Chu","Yeti (Doom)","Yeti (Kaliban)","Yeti (Prester John)","Yeti (Silver Surfer)","Ying Liu","Ymir","Yogi Dakor","Yon-Rogg","Yorak","Yotat","Younger Xavier","Yu-Ti","Yue Of The House Of The Rat","Yukio","Zabyk","Zadkiel","Zak-Del","Zak-Del (Wraith)","Zam","Zanth","Zarek","Zeaklar","Zedrao","Zelma Stanton","Zetora","Zeus","Zey-Rogg","Zhang","Zius","Zoe Laveau","Zom","Zombie Jasper Sitwell","Zorr","Zundamite","Zzutak - The Thing That Shouldn'T Exist","Zzxz (Symbiote / Kylntar)","Zzzax"
];

// ── SNAP Cards currently in the game (from SNAP Current Cards.csv) ─────────────────────
const SNAP_CARDS = [
  "Abomination","Absorbing Man","Acid Arrow","Adam Warlock","Adamantium Infusion","Aero","Agamotto","Agatha Harkness","Agent 13","Agent Coulson","Agent Venom","Agony","Agony - Spider-Verse","Air-Walker","Ajax","Alioth","America Chavez","Angel","Angela","Annihilus","Annihilus Champion","Ant Man","Anti-Venom","Anti-Venom - Spider-Verse","Apocalypse","Apocalypse, Celestials' Chosen","Arachnid Acrobatics","Araña","Archangel Horseman of Death","Ares","Arishem","Armor","Arnim Zola","Askani'son","Astral Projection","Attuma","Aurora","Awesome Andy","Baron Mordo","Baron Zemo","Basic Arrow","Bast","Bastion","Batroc the Leaper","Beast","Berserker Rage","Beta Ray Bill","Bishop","Black Bolt","Black Cat","Black Knight","Black Panther","Black Panther Champion","Black Swan","Black Widow","Blade","Blink","Blob","Blue Marvel","Bolts of Balthakk","Brand of Shou-Lao","Brood","Broodling","Bruce Banner","Bucky Barnes","Bug","Bullseye","Cable","Caiera","Caliban Horseman of Pestilence","Cannonball","Cap's Shield","Captain America","Captain America Champion","Captain Carter","Captain Marvel","CaptainAmericaAvengers","Carnage","Cassandra Nova","Celestial Empowerment","Cerebro","Chamber","Chameleon","Chimichanga","Clea","Cloak","Clobberin' Time","Cobra","Colleen Wing","Colonel America","Colossus","Copycat","Corvus Glaive","Cosmic Ghost Rider","Cosmo","Council of Reeds","Crossbones","Crystal","Cull Obsidian","Cyclops","Cyclops - X-Men","Dagger","Daken","Danger","Daredevil","Darkhawk","Dazzler","Deadpool","Deafening Chord","Death","Deathlok","Debrii","Demon","Destroyer","Devil Dinosaur","Diamondback","Djinn","Doctor Doom","Doctor Doom 2099","Doctor Octopus","Doctor Strange","DoctorStrange - Avengers","Domino","DoomBot","DoomBot 2099","Dormammu","Dracula","Dragon Breath","Dragon Lord","Dragon Man","Dragon of the Moon","Drax","Drax - Guardians of the Galaxy","Drax, Avatar Of Life","Drone","Dum Dum Dugan","Ebony Blade","Ebony Maw","Echo","Electro","Elektra","Elixir","Elsa Bloodstone","Emperor Hulkling","En Sabah Nur","Enchantress","Esme Cuckoo","Eson","Ezekiel Sims","Falcon","Fan Fei","Fantasticar","Fantomex","Fastball Special","Fenris Wolf","Fin Fang Foom","Firehair","Firelord","Firestar","Flame On","Flames of the Faltine","Flatman","Flight Harness","Foggy Nelson","Force Field","Forge","Frigga","Galacta","Galactus","Galactus First Steps","Gambit","Gambit Horseman of Death","Gamora","Gamora - Guardians of the Galaxy","Garrison Kane","Ghost","Ghost - Thunderbolts","Ghost Rider","Ghost-Spider","Ghost-Spider - Spider-Verse","Giganto","Gilgamesh","Gladiator","Goblin Queen","Goliath","Goose","Gorgon","Gorr the God Butcher","Grand Master","Grapple Arrow","Green Goblin","Groot","Groot - Guardians of the Galaxy","Gwenpool","H.E.R.B.I.E.","Havok","Hawkeye","Hawkeye - Avengers","Hawkeye Kate Bishop","Hazmat","Headpool","Heimdall","Hela","Helicarrier","Hellcow","Hellion","Helpful Assistance","Hercules","High Evolutionary","Hit-Monkey","Hobgoblin","Hope Summers","Howard the Duck","Hulk","Hulk - Avengers","Hulk Smash","Hulkbuster","Human Torch","Human Torch First Steps","Hydra Bob","Hydra Stomper","Hydro-Man","Ice Cube","Iceman","Ikari","Illusion!","Images of Ikonn","Inevitable","Infinity Ultron","Invisible Woman","Invisible Woman First Steps","Iron Fist","Iron Lad","Iron Man","Iron Man Champion","Iron Patriot","Ironheart","Isca the Unbeaten","J. Jonah Jameson","Jack Flag","Jane Foster Mighty Thor","Jean Grey","Jean Grey - X-Men","Jeff the Baby Dolphin!?","Jeff the Baby Land Shark","Jennifer Kale","Jessica Jones","Jim Hammond Human Torch","Joaquin Torres Falcon II","Jocasta","Jubilee","Jubilee - X-Men","Jubilee Silver Surfer","Juggernaut","Juggernaut Horseman of War","Ka-Zar","Kahhori","Kang","Karen Page","Khonshu","Khonshu Full","Khonshu Waxing","Kid Omega","Killmonger","King Eitri","Kingpin","Kitty Pryde","Klaw","Knull","Korg","Kraglin","Kraven","Lady Bullseye","Lady Deathstrike","Lady Deathstrike - Brotherhood of Mutants","Lady Sif","Lasher","Laufey","Leader","Leech","Legion","Lin Lie Iron Fist","Living Monolith","Lizard","Lockheed","Lockjaw","Loki","Lord of the Negative Zone","Luke Cage","Luna Snow","M'Baku","M.O.D.O.K.","Mad Thinker","Madame Web","Magik","Magneto","Magneto - Brotherhood of Mutants","Magus","Majestic Wingbeat","Major Victory","Makkari","Malekith","Man-Spider","Man-Thing","Mantis","Mantis - Guardians of the Galaxy","Maria Hill","Marrow","Martyr","Marvel Boy","Massive Arsenal","Master Mold","Master Plan","Master of Magnetism","Maverick","Maximum Carnage","Maximus","Medusa","Mephisto","Mercury","Merlin","Miek","Miles Morales Spider-Man","Mind Stone","Mirage","Misery","Mister Fantastic","Mister Fantastic First Steps","Mister Negative","Mister Sinister","Misty Knight","Mjolnir","Mjolnir - Avengers","Mobius M. Mobius","Mockingbird","Moira X","Mojo","Mole Man","Monster","Monstro","Moon Girl","Moon Knight","Moondragon","Moonstone","Morbius","Morgan le Fay","Morph","Mother Askani","Ms. Marvel","Multiple Man","Muramasa Shard","Muse","Mysterio","Mysterio?","Mystique","Mystique - Brotherhood of Mutants","Nakia","Namor","Namora","Namorita","Nebula","Negasonic Teenage Warhead","Nicholas Scratch","Nick Fury","Nico Minoru","Night Nurse","Nightcrawler","Nightcrawler - X-Men","Nightmare","Nimrod","Ninja","Nocturne","Nova","Nova Frankie Raye","Odin","Okoye","Omega Red","Omega Sentinel","Omniversal Presence","Once And Future","Onslaught","Orka","Overdrive Reactor","Ozymandias","Patriot","Peni Parker","Phastos","Phoenix Force","Pig","Pixie","Polaris","Polaris Horseman of Pestilence","Polymorph","Power Stone","Prodigy","Professor X","Professor X - X-Men","Project Armageddon","Prowler","Proxima Midnight","Psylocke","Punisher","Punisher War Machine","PymParticle Arrow","Quake","Quicksand","Quicksilver","Quinjet","Rama-Tut","Random","Raptor","Ravonna Renslayer","Reality Stone","Red Guardian","Red Hulk","Red Shift","Red Skull","Redwing","Remote Mines","Rescue","Return to the Past","Rhino","Rock","Rocket Raccoon","Rocket Raccoon - Guardians of the Galaxy","Rocket Raccoon Champion","Rocket and Groot","Rockslide","Rogue","Ronan the Accuser","SP//dr","Sabretooth","Sage","Sam Wilson Captain America","Sandman","Sandstorm","Sasquatch","Sauron","Scarlet Spider","Scarlet Spider - Spider-Verse","Scarlet Spider Clone","Scarlet Witch","Scarlet Witch - Brotherhood of Mutants","Scorn","Scorpion","Scream","Sebastian Shaw","Selene","Selene - Brotherhood of Mutants","Selene Horseman of Famine","Sentinel","Sentinel Champion","Sentry","Sentry - Thunderbolts","Sera","Sersi","Shadow King","Shadowlands Daredevil","Shang-Chi","Shang-Chi, Master of the Rings","Shanna","She-Hulk","Shield Throw","Shocker","Shou-Lao the Undying","Shuri","Silk","Silver Sable","Silver Samurai","Silver Surfer","Silver Surfer First Steps","Sinister Clone","Skaar","Snowguard","Snowguard Bear","Snowguard Hawk","Snowguard Wolf","Soul Stone","Space Stone","Sparky","Spectrum","Speed","Spider-Ham","Spider-Man","Spider-Man 2099","Spider-Man 2099 - Spider-Verse","Spider-Man Noir","Spider-Punk","Spider-Woman","SpiderMan","Squirrel","Squirrel Girl","Star-Lord","Star-Lord, Master of the Sun","Starbrand","Stardust","Starhawk","Stark Technology","Starlord - Guardians of the Galaxy","Stature","Stegron","Stick","Storm","Storm Horseman of Famine","Stormbreaker","Strange Supreme","Strong Guy","Stryfe","Sub-Mariner","Subterranean Summons","Summoning Ritual 1","Summoning Ritual 2","Summoning Ritual 3","Sunspot","Super-Adaptoid","Super-Skrull","Supergiant","Superior Spider-Man","Surge","Surtur","Swarm","Sword Master","Sword of Fu Xi","Symbiote","Symbiote Spider-Man","Symbiote Spider-Man - Spider-Verse","Tao Mandala","Taskmaster","Taskmaster - Thunderbolts","Techno-Organic Virus","Techno-Organic Virus Infection","Temporal Manipulation","Terrax the Tamer","Test Card","Thaddeus Ross","Thanos","Thanos Champion","The Ancient One","The Collector","The Fallen One","The First Ghost Rider","The Hood","The Hunger","The Infinaut","The Living Tribunal","The Ten Rings","The Ten Rings Upgraded","The Thing","The Thing First Steps","The Void","Thena","Thor","Thor - Avengers","Thundering Hammer","Tiger Spirit","Time Stone","Titania","Toad","Tombstone","Topaz","Toxie Doxie","Toxie Doxie - Thunderbolts","Toxin","Triton","Typhoid Mary","U.S. Agent","Uatu the Watcher","Ultron","Ultron Mind Stone","Ultron Power Stone","Ultron Reality Stone","Ultron Soul Stone","Ultron Space Stone","Ultron Time Stone","Uncle Ben","Valentina","Valentina - Thunderbolts","Valkyrie","Venom","Venus","Vibranium","Vibro-Shock Gauntlets","Victoria Hand","Viper","Vision","Vision - Avengers","Viv Vision","Vulture","Wade Wilson","Wakanda Forever","War Machine","Warlock","Warpath","Wasp","Wave","Weapon H","Weapon X Wolverine","Web Sling","Werewolf By Night","White Queen","White Queen - Brotherhood of Mutants","White Tiger","White Widow","Wiccan","Widow's Bite","Widow's Kiss","Wild Child","Wilson Fisk","Winds of Watoomb","Winter Soldier","Winter Soldier - Thunderbolts","Witchfire","Wolfsbane","Wolverine","Wolverine - X-Men","Wolverine Horseman of War","Wong","X-23","Xorn","YakaArrow","Yellowjacket","Yo-Yo","Yondu","Zabu","Zero","Zombie Captain Marvel","Zombie Galacti","Zombie Giant-Man","Zombie Horde","Zombie Mister Fantastic","Zombie Power Man","Zombie Scarlet Witch","Zombie Sentry"
];

// Normalized lookup sets ───────────────────────────────────────────────────
function normalizeName(n) { return n.toLowerCase().replace(/[^a-z0-9]/g, ""); }
const _snapNormSet  = new Set(SNAP_CARDS.map(normalizeName));
const _grantNormSet = new Set(UNUSED_CHARACTERS.map(normalizeName));

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

// ── Flag characters that are out-of-grant or already in SNAP ─────────────────
function annotateCharacter(char) {
  const norm = normalizeName(char.name || "");
  return {
    ...char,
    _inSnap:      _snapNormSet.has(norm),
    _notInGrant:  !_grantNormSet.has(norm) && !_snapNormSet.has(norm),
  };
}
function annotateResult(parsed) {
  const sp    = parsed.seasonPass ? annotateCharacter(parsed.seasonPass) : parsed.seasonPass;
  const s5All = (parsed.series5 || []).map(annotateCharacter);
  const s4All = (parsed.series4 || []).map(annotateCharacter);

  // Clean: in grant, not already in SNAP — these go into the normal tier slots
  const s5Clean = s5All.filter(c => !c._inSnap && !c._notInGrant);
  const s4Clean = s4All.filter(c => !c._inSnap && !c._notInGrant);

  // Already-in-SNAP characters that the AI put in new card slots → redirect to Variants
  const snapRedirected = [...s5All, ...s4All]
    .filter(c => c._inSnap)
    .map(c => ({ name: c.name, reason: `Redirected from new card suggestion — already in SNAP. Thematic fit: ${c.thematicScore}/10.`, _redirected: true }));

  // Not-in-grant characters → separate "Potential Grant Requests" section,
  // sorted by combined score descending (highest priority first)
  const grantRequestsAll = [...s5All, ...s4All]
    .filter(c => c._notInGrant)
    .sort((a, b) => (b.thematicScore + b.popularityScore) - (a.thematicScore + a.popularityScore));

  // Only surface grant requests when the clean roster is thin (< 12 total)
  const cleanCount = s5Clean.length + s4Clean.length;
  const grantRequests = cleanCount < 12 ? grantRequestsAll : [];

  return {
    ...parsed,
    seasonPass:        sp,
    series5:           s5Clean,
    series4:           s4Clean,
    variantSuggestions:[...(parsed.variantSuggestions || []), ...snapRedirected],
    grantRequests,
    _cleanCount:       cleanCount,
  };
}

function computeConfidence(theme, result) {
  const tds = getTDS(theme);
  const spRec = (result.seasonPass.recognizabilityScore ?? 7) * 10;
  const s5Rec = avg((result.series5 || []).map(c => (c.recognizabilityScore ?? 5))) * 10;
  const s4Rec = avg((result.series4 || []).map(c => (c.recognizabilityScore ?? 3))) * 10;
  const rs = spRec * 0.50 + s5Rec * 0.35 + s4Rec * 0.15;
  let rds = 100;
  if ((result.series5 || []).length < 6) rds -= 15;
  if ((result.series4 || []).length < 7) rds -= 10;
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
- Series 5 (6-8): Higher-profile, important allies/villains, major storyline participants
- Series 4 (7-9): More obscure, deep cuts, side characters, thematically cohesive — target 15 total across Series 5 + Series 4
- Locations (exactly 4): Prominent Marvel Comics locations that fit the season theme.

VARIANT SUGGESTIONS (always required):
List 4-6 characters who are ALREADY RELEASED as playable Marvel SNAP cards (NOT from the unused list — think released cards like Hulk, Thor, Spider-Man, Iron Man, Wolverine, Venom, etc.) who would benefit from a new cosmetic Variant in this season's art style. These are existing cards getting new artwork, not new cards.

WISHLIST CHARACTERS (LAST RESORT — only populate if series5 + series4 total fewer than 12 characters):
If and only if the unused character list cannot fill 12+ total slots, suggest up to 5 characters NOT in the unused list who would strengthen the season. For each, set status to either "Needs Marvel Request" (completely new to any SNAP list) or "Already in SNAP" (released card that happens to fit the theme). If the grant fills 12+ slots, return an empty array for wishlistCharacters.

Artist Recommendations (exactly 3):
Recommend 3 artists whose style best fits this season's visual identity and key art composition.
- Include at least 1 artist who has worked on Marvel SNAP cards or variants.
- Include at least 1 external artist (comic, illustration, or concept art) not yet in SNAP.
- Be specific about WHY each artist's aesthetic matches this exact season's mood and characters.

CRITICAL RULES FOR NEW CARD SELECTION:
- ONLY select new cards from the "Full Unused Character List" provided in the user message. Do NOT suggest characters outside this list for new cards.
- NEVER suggest a character as a new card if they are already a playable card in Marvel SNAP. The list provided is specifically filtered to exclude existing SNAP cards.
- Do NOT suggest fictional entities that are not actual Marvel Comics characters (no generic "demons", "robots", or unnamed entities).
- For group names like "Avengers", "Eternals", or "X-Men" — these are teams, not individual characters. Do NOT use them as new card suggestions. Use individual members instead.
- Locations can be any canonical Marvel location.

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
Only populate wishlistCharacters if series5 + series4 total fewer than 12 characters; otherwise return an empty array.
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
function buildSlackMessage(result, theme, confidence, submittedBy) {
  const lines = [];
  lines.push(`🎴 *${result.seasonName}* — _"${result.suggestedTitle}"_`);
  lines.push(`*Theme:* ${theme}   *Confidence:* ${confidence}%   _Submitted by ${submittedBy || "Unknown"}_`);
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
  // Variants (AI suggestions only — not the redirected SNAP cards)
  const aiVariants = (result.variantSuggestions || []).filter(v => !v._redirected);
  if (aiVariants.length) {
    lines.push("");
    lines.push("`Variants`");
    aiVariants.forEach(v => lines.push(`• ${v.name}`));
  }
  // Grant Requests
  if (result.grantRequests?.length) {
    lines.push("");
    lines.push("`📋 Potential Grant Requests`");
    result.grantRequests.forEach(c => lines.push(`• ${c.name}`));
  }
  // Wishlist (legacy fallback)
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

function copySlackMessage(result, theme, confidence) {
  const submittedBy = sessionStorage.getItem("snap-auth-name") || "Unknown";
  const message = buildSlackMessage(result, theme, confidence, submittedBy);
  return navigator.clipboard.writeText(message)
    .then(() => true)
    .catch(() => { throw new Error("Clipboard blocked"); });
}

async function sendToSlack(result, theme, confidence) {
  const submittedBy = sessionStorage.getItem("snap-auth-name") || "Unknown";
  const message = buildSlackMessage(result, theme, confidence, submittedBy);
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
  // Warning badges for out-of-spec characters
  const borderColor = char._inSnap ? "#dc2626" : char._notInGrant ? "#d97706" : c;
  return (
    <div style={{ background:"#0f172a", border:`1px solid ${borderColor}44`, borderLeft:`3px solid ${borderColor}`, borderRadius:10, padding:"12px 14px" }}>
      {char._inSnap && (
        <div style={{ background:"#450a0a", border:"1px solid #dc2626", borderRadius:6, padding:"4px 10px", marginBottom:8, fontSize:11, color:"#fca5a5", fontWeight:700 }}>
          🚫 Already in SNAP — this character is already a playable card
        </div>
      )}
      {char._notInGrant && (
        <div style={{ background:"#422006", border:"1px solid #d97706", borderRadius:6, padding:"4px 10px", marginBottom:8, fontSize:11, color:"#fcd34d", fontWeight:700 }}>
          ⚠️ Not in Grant — this character is outside the Second Dinner grant list
        </div>
      )}
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
  const borderColor = v._redirected ? "#dc2626" : "#7c3aed";
  const icon = v._redirected ? "🔄" : "🎨";
  return (
    <div style={{ background:"#0f172a", border:`1px solid ${borderColor}44`, borderLeft:`3px solid ${borderColor}`, borderRadius:10, padding:"10px 14px", display:"flex", alignItems:"flex-start", gap:10 }}>
      <div style={{ fontSize:16, flexShrink:0, marginTop:1 }}>{icon}</div>
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
          <span style={{ fontWeight:700, color:"#f1f5f9", fontSize:13 }}>{v.name}</span>
          <a href={fandomUrl(v.name)} target="_blank" rel="noopener noreferrer"
            style={{ fontSize:10, color:"#60a5fa", background:"#1e3a5f", borderRadius:4, padding:"1px 6px", textDecoration:"none" }}>📖 Fandom</a>
          {v._redirected && (
            <span style={{ fontSize:10, fontWeight:700, color:"#fca5a5", background:"#450a0a", borderRadius:4, padding:"1px 6px" }}>Moved from new card slot</span>
          )}
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
    idle:    { bg:"#1a1a2e", border:"#4a4a8f", color:"#a78bfa", label:"📤 Send to Brainstorming Channel", cursor:"pointer" },
    sending: { bg:"#1e1e3a", border:"#6366f1", color:"#818cf8", label:"⏳ Sending…",                      cursor:"not-allowed" },
    success: { bg:"#052e16", border:"#16a34a", color:"#4ade80", label:"✅ Posted to #snap-season-brainstorming", cursor:"default" },
    error:   { bg:"#1c0a0a", border:"#dc2626", color:"#f87171", label:"❌ Failed — retry?",               cursor:"pointer" },
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

function CopySlackButton({ result, theme, confidence }) {
  const [status, setStatus] = useState("idle");
  const handle = async () => {
    setStatus("copying");
    try {
      await copySlackMessage(result, theme, confidence);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };
  const label = status === "copying" ? "⏳ Copying…" : status === "copied" ? "✅ Copied!" : status === "error" ? "❌ Failed" : "💬 Copy for Slack Thread";
  const color = status === "copied" ? "#4ade80" : status === "error" ? "#f87171" : "#94a3b8";
  const bg    = status === "copied" ? "#052e16"  : status === "error" ? "#1c0a0a"  : "#1e293b";
  const border= status === "copied" ? "#16a34a"  : status === "error" ? "#dc2626"  : "#334155";
  return (
    <button onClick={status === "copying" ? undefined : handle} style={{
      padding:"9px 18px", borderRadius:8, border:`1px solid ${border}`,
      background:bg, color, fontWeight:700, fontSize:13,
      cursor: status === "copying" ? "not-allowed" : "pointer", transition:"all 0.2s"
    }}>
      {label}
    </button>
  );
}

function AddToBacklogButton({ data, theme, confidence }) {
  const [status, setStatus] = useState("idle");

  const handleClick = async () => {
    if (status !== "idle") return;
    setStatus("saving");
    const pw = sessionStorage.getItem("snap-auth-pw") || "";
    const chars = [
      ...(data.series5 || []).map(c => c.name),
      ...(data.series4 || []).map(c => c.name),
    ].join(", ");
    const idea = {
      name: data.seasonName || theme,
      theme: theme,
      themeCategory: "other",
      grantViability: "tbd",
      confidence: confidence ?? 50,
      aiConfidence: confidence ?? null,
      priority: confidence ?? 50,
      is383: false,
      notes: [
        data.seasonPass ? `Season Pass: ${data.seasonPass.name}` : "",
        data.pitch ? `Pitch: ${data.pitch}` : "",
      ].filter(Boolean).join("\n"),
      characters: chars,
      seasonPass: data.seasonPass?.name || "",
    };
    try {
      const res = await fetch("/api/planner/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-app-password": pw },
        body: JSON.stringify(idea),
      });
      const json = await res.json();
      if (json.ok) {
        setStatus("done");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("err");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("err");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const labels = { idle: "📋 Add to Backlog", saving: "Saving…", done: "✅ Added to Backlog!", err: "⚠ Failed — retry?" };
  const colors = { idle: "#0891b2", saving: "#334155", done: "#16a34a", err: "#dc2626" };
  return (
    <button onClick={handleClick} disabled={status === "saving"} style={{
      padding:"8px 16px", borderRadius:8, border:"none", cursor: status === "saving" ? "not-allowed" : "pointer",
      fontWeight:600, fontSize:12, background: colors[status], color:"#fff", transition:"background 0.2s",
    }}>{labels[status]}</button>
  );
}

function ExportPanel({ data, theme, confidence }) {
  const btn = (color, label, fn) => (
    <button onClick={fn} style={{ padding:"8px 16px", borderRadius:8, border:"none", cursor:"pointer", fontWeight:600, fontSize:12, background:color, color:"#fff" }}>{label}</button>
  );
  return (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:16, alignItems:"center" }}>
      <AddToBacklogButton data={data} theme={theme} confidence={confidence} />
      {btn("#10b981","⬇ CSV",  () => exportCSV(data, theme))}
      {btn("#8b5cf6","📋 Copy for Sheets", () => copySheets(data))}
      <SlackButton result={data} theme={theme} confidence={confidence} />
      <CopySlackButton result={data} theme={theme} confidence={confidence} />
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function App() {
  // ── Auth ──────────────────────────────────────────────────────────────────
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("snap-auth") === "1");
  const [pwInput, setPwInput] = useState("");
  const [nameInput, setNameInput] = useState("");
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
        sessionStorage.setItem("snap-auth-name", nameInput.trim() || "Unknown");
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
          max_tokens:6000,
          system: SYSTEM_PROMPT,
          messages:[{ role:"user", content: buildUserPrompt(theme, unusedChars, snapCards) }]
        })
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error.message || json.error);
      const raw = json.content?.find(b => b.type==="text")?.text || "";
      const clean = raw.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();
      const parsed = annotateResult(JSON.parse(clean));
      const computedScore = computeConfidence(theme, parsed);
      parsed.confidence = computedScore;
      setResult(parsed);
      setConfidence(computedScore);
      // Log the search (fire-and-forget)
      try {
        const submittedBy = sessionStorage.getItem("snap-auth-name") || "Unknown";
        const fullRoster = [
          { tier: "Season Pass", name: parsed.seasonPass?.name },
          ...(parsed.series5 || []).map(c => ({ tier: "Series 5", name: c.name })),
          ...(parsed.series4 || []).map(c => ({ tier: "Series 4", name: c.name })),
        ];
        await fetch("/api/log", {
          method: "POST",
          headers: { "Content-Type":"application/json", ...getAuthHeader() },
          body: JSON.stringify({
            theme,
            submittedBy,
            seasonName:    parsed.seasonName,
            confidence:    computedScore,
            seasonPass:    parsed.seasonPass?.name,
            newCardsCount: 1 + (parsed.series5?.length || 0) + (parsed.series4?.length || 0),
            variantCount:  parsed.variantSuggestions?.length || 0,
            wishlistCount: parsed.wishlistCharacters?.length || 0,
            roster:        fullRoster,
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

  // Count redirected cards for info banner
  const snapRedirectedCount = viable
    ? (result.variantSuggestions || []).filter(v => v._redirected).length
    : 0;
  const hasGrantRequests = viable && result.grantRequests?.length > 0;

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
            type="text"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !authBusy && nameInput.trim() && handleAuth()}
            placeholder="Your name"
            autoFocus
            style={{ width:"100%", padding:"12px 14px", borderRadius:10, border:"1px solid #334155", background:"#1e293b", color:"#f1f5f9", fontSize:14, outline:"none", marginBottom:8, boxSizing:"border-box" }}
          />
          <input
            type="password"
            value={pwInput}
            onChange={e => { setPwInput(e.target.value); setAuthError(false); }}
            onKeyDown={e => e.key === "Enter" && !authBusy && nameInput.trim() && handleAuth()}
            placeholder="Enter password"
            style={{ width:"100%", padding:"12px 14px", borderRadius:10, border:`1px solid ${authError ? "#dc2626" : "#334155"}`, background:"#1e293b", color:"#f1f5f9", fontSize:14, outline:"none", marginBottom:8, boxSizing:"border-box" }}
          />
          {authError && <div style={{ color:"#f87171", fontSize:12, marginBottom:8 }}>Incorrect password. Please try again.</div>}
          <button
            onClick={handleAuth}
            disabled={authBusy || !pwInput.trim() || !nameInput.trim()}
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
      <div style={{ textAlign:"center", marginBottom:28, position:"relative" }}>
        <a href="/planner" style={{
          position:"absolute", right:0, top:0,
          fontSize:12, color:"#6366f1", textDecoration:"none",
          padding:"6px 12px", border:"1px solid #4338ca", borderRadius:8,
          fontWeight:600, background:"#0f172a", display:"inline-flex", alignItems:"center", gap:5,
        }}>📅 Planning Board →</a>
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
            {(snapRedirectedCount > 0 || hasGrantRequests) && (
              <div style={{ background:"#0f172a", border:"1px solid #334155", borderRadius:8, padding:"10px 14px", marginBottom:12, textAlign:"left", fontSize:11, color:"#64748b", lineHeight:1.6 }}>
                {snapRedirectedCount > 0 && (
                  <div>🔄 {snapRedirectedCount} character{snapRedirectedCount > 1 ? "s" : ""} already in SNAP — moved to Variants section automatically.</div>
                )}
                {hasGrantRequests && (
                  <div>📋 {result.grantRequests.length} character{result.grantRequests.length > 1 ? "s" : ""} outside the grant list — see Potential Grant Requests below.</div>
                )}
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
              {/* Potential Grant Requests — not-in-grant chars the AI suggested, shown only when roster is thin */}
              {result.grantRequests?.length > 0 && (
                <div style={{ marginBottom:20 }}>
                  <div style={{ background:"#1c1200", border:"1px solid #854d0e", borderRadius:10, padding:"12px 16px", marginBottom:12 }}>
                    <div style={{ color:"#fbbf24", fontWeight:700, fontSize:13, marginBottom:4 }}>📋 Potential Grant Requests</div>
                    <p style={{ color:"#a16207", fontSize:12, margin:0, lineHeight:1.5 }}>
                      The grant list doesn't have enough characters to fully fill this theme — {result._cleanCount} of 15 slots filled from grant.
                      The characters below are outside the current grant and would need to be requested from Marvel.
                      Ordered by priority (thematic fit + popularity).
                    </p>
                  </div>
                  <div style={{ display:"grid", gap:8, gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))" }}>
                    {result.grantRequests.map(c => (
                      <div key={c.name} style={{ background:"#0f172a", border:"1px solid #854d0e44", borderLeft:"3px solid #d97706", borderRadius:10, padding:"12px 14px" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                          <div style={{ flex:1 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                              <span style={{ fontWeight:700, color:"#f1f5f9", fontSize:14 }}>{c.name}</span>
                              <a href={fandomUrl(c.name)} target="_blank" rel="noopener noreferrer"
                                style={{ fontSize:10, color:"#60a5fa", background:"#1e3a5f", borderRadius:4, padding:"1px 6px", textDecoration:"none", whiteSpace:"nowrap" }}>📖 Fandom</a>
                              <span style={{ fontSize:10, fontWeight:700, color:"#fbbf24", background:"#422006", borderRadius:4, padding:"1px 6px" }}>📋 Grant Request</span>
                            </div>
                            <div style={{ fontSize:11, color:"#d97706", marginTop:2 }}>Not in current grant · Needs Marvel approval</div>
                          </div>
                          <div style={{ textAlign:"right", marginLeft:8 }}>
                            <div style={{ fontSize:18, fontWeight:800, color:"#d97706" }}>{((c.thematicScore + c.popularityScore)/2).toFixed(1)}</div>
                            <div style={{ fontSize:10, color:"#64748b" }}>AVG</div>
                          </div>
                        </div>
                        <p style={{ color:"#64748b", fontSize:12, marginTop:8, marginBottom:0, lineHeight:1.6 }}>{c.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Wishlist — AI's own last-resort suggestions when grant is insufficient */}
              {hasWishlist && (
                <div style={{ marginBottom:20 }}>
                  <div style={{ background:"#1c0f00", border:"1px solid #92400e", borderRadius:10, padding:"12px 16px", marginBottom:12 }}>
                    <div style={{ color:"#fb923c", fontWeight:700, fontSize:13, marginBottom:4 }}>⚠️ Additional Wishlist Characters</div>
                    <p style={{ color:"#92400e", fontSize:12, margin:0, lineHeight:1.5 }}>
                      Extra characters the AI flagged as strong thematic fits that aren't in the grant.
                      Red = requires a new Marvel request. Orange = already in SNAP.
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