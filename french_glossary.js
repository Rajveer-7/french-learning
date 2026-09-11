/* =============================================================
   Shared glossary engine — French study site
   Scans each section of a page, finds every French word used,
   and appends a "Glossaire" listing word · pronunciation · meaning.
   Include with:  <script src="french_glossary.js"></script>
   just before </body>, AFTER the page's own script has run.
   ============================================================= */
(function(){

/* ---------- the dictionary: word -> [pronunciation, meaning] ---------- */
const WORDS = {
/* pronouns & determiners */
"je":["zhuh","I"],"j":["zh","I (before a vowel)"],"tu":["tew","you (informal)"],
"il":["eel","he / it"],"elle":["ell","she / it"],"on":["ohn","we / one / people"],
"nous":["noo","we / us"],"vous":["voo","you (formal or plural)"],
"ils":["eel","they (m.)"],"elles":["ell","they (f.)"],
"me":["muh","me"],"te":["tuh","you"],"se":["suh","oneself"],"lui":["lwee","him / to him / to her"],
"leur":["luhr","their / to them"],"leurs":["luhr","their (plural)"],
"moi":["mwah","me"],"toi":["twah","you"],"eux":["uh","them"],
"y":["ee","there / to it"],"en":["ahn","of it / some / in"],
"qui":["kee","who / which"],"que":["kuh","that / which / what"],"qu":["k","that (before a vowel)"],
"dont":["dohn","of which / whose"],"où":["oo","where"],
"ce":["suh","this / it"],"c":["s","it (c'est)"],"cet":["set","this (m. before vowel)"],
"cette":["set","this (f.)"],"ces":["say","these"],"ça":["sah","that"],
"le":["luh","the (m.) / him / it"],"la":["lah","the (f.) / her / it"],"les":["lay","the (pl.) / them"],
"l":["l","the (before a vowel)"],"un":["uhn","a / one"],"une":["ewn","a (f.)"],
"des":["day","some / of the"],"du":["dew","some / of the (m.)"],"de":["duh","of / from"],
"d":["d","of (before a vowel)"],"au":["oh","to the / at the (m.)"],"aux":["oh","to the (pl.)"],
"mon":["mohn","my (m.)"],"ma":["mah","my (f.)"],"mes":["may","my (pl.)"],
"ton":["tohn","your (m.)"],"ta":["tah","your (f.)"],"tes":["tay","your (pl.)"],
"son":["sohn","his / her (m.)"],"sa":["sah","his / her (f.)"],"ses":["say","his / her (pl.)"],
"notre":["notr","our"],"nos":["noh","our (pl.)"],"votre":["votr","your"],"vos":["voh","your (pl.)"],
"quel":["kell","which / what (m.)"],"quelle":["kell","which / what (f.)"],
"tout":["too","all / everything"],"tous":["too","all (m. pl.)"],"toute":["toot","all (f.)"],"toutes":["toot","all (f. pl.)"],
"chaque":["shahk","each"],"quelque":["kel-kuh","some"],"quelques":["kel-kuh","a few"],
"autre":["OH-truh","other"],"même":["mem","same / even"],"plusieurs":["plew-ZYUR","several"],

/* être / avoir */
"être":["EH-truh","to be"],"suis":["swee","am"],"es":["ay","are (tu)"],"est":["eh","is"],
"sommes":["sum","are (nous)"],"êtes":["et","are (vous)"],"sont":["sohn","are (ils)"],
"étais":["ay-TEH","was (imparfait)"],"était":["ay-TEH","was"],"étaient":["ay-TEH","were"],
"été":["ay-TAY","been"],"sera":["suh-RAH","will be"],"serait":["suh-REH","would be"],
"soit":["swah","be (subjunctive)"],"soyez":["swah-YAY","be (imperative)"],
"avoir":["ah-VWAHR","to have"],"ai":["ay","have (je)"],"as":["ah","have (tu)"],"a":["ah","has"],
"avons":["ah-VOHN","have (nous)"],"avez":["ah-VAY","have (vous)"],"ont":["ohn","have (ils)"],
"avait":["ah-VEH","had"],"avais":["ah-VEH","had"],"eu":["ew","had (participle)"],
"aura":["oh-RAH","will have"],"aurait":["oh-REH","would have"],"aie":["ay","have (subjunctive)"],

/* high-frequency verbs */
"aller":["ah-LAY","to go"],"vais":["vay","go (je)"],"vas":["vah","go (tu)"],"va":["vah","goes"],
"allons":["ah-LOHN","go (nous)"],"allez":["ah-LAY","go (vous)"],"vont":["vohn","go (ils)"],
"allé":["ah-LAY","gone"],"allée":["ah-LAY","gone (f.)"],"ira":["ee-RAH","will go"],
"faire":["fehr","to do / to make"],"fais":["feh","do (je/tu)"],"fait":["feh","does / done"],
"faisons":["fuh-ZOHN","do (nous)"],"faites":["fet","do (vous)"],"font":["fohn","do (ils)"],
"faisait":["fuh-ZEH","was doing"],"fera":["fuh-RAH","will do"],
"prendre":["PRAHN-druh","to take"],"prends":["prahn","take"],"prend":["prahn","takes"],
"prenons":["pruh-NOHN","take (nous)"],"prenez":["pruh-NAY","take (vous)"],"pris":["pree","taken"],
"pouvoir":["poo-VWAHR","to be able to"],"peux":["puh","can (je/tu)"],"peut":["puh","can"],
"pouvons":["poo-VOHN","can (nous)"],"pouvez":["poo-VAY","can (vous)"],"peuvent":["puv","can (ils)"],
"pourriez":["poo-ree-AY","could (vous)"],"pourrait":["poo-REH","could"],"pu":["pew","been able"],
"vouloir":["voo-LWAHR","to want"],"veux":["vuh","want (je/tu)"],"veut":["vuh","wants"],
"voulez":["voo-LAY","want (vous)"],"veulent":["vul","want (ils)"],"voudrais":["voo-DREH","would like"],
"devoir":["duh-VWAHR","must / to have to"],"dois":["dwah","must (je/tu)"],"doit":["dwah","must"],
"devez":["duh-VAY","must (vous)"],"devrait":["duh-REH","should"],"devrais":["duh-REH","should"],
"savoir":["sah-VWAHR","to know (facts)"],"sais":["seh","know (je/tu)"],"sait":["seh","knows"],
"savez":["sah-VAY","know (vous)"],"su":["sew","known"],
"connaître":["koh-NEH-truh","to know (people/places)"],"connais":["koh-NEH","know"],
"connaît":["koh-NEH","knows"],"connaissent":["koh-NESS","know (ils)"],"connu":["koh-NEW","known"],
"venir":["vuh-NEER","to come"],"viens":["vyan","come"],"vient":["vyan","comes"],
"venons":["vuh-NOHN","come (nous)"],"venez":["vuh-NAY","come (vous)"],"viennent":["vyen","come (ils)"],
"venu":["vuh-NEW","come (participle)"],"viendra":["vyan-DRAH","will come"],
"habiter":["ah-bee-TAY","to live (somewhere)"],"habite":["ah-BEET","live / lives"],
"habites":["ah-BEET","live (tu)"],"habitons":["ah-bee-TOHN","live (nous)"],
"habitez":["ah-bee-TAY","live (vous)"],"habitent":["ah-BEET","live (ils)"],
"parler":["par-LAY","to speak"],"parle":["parl","speak / speaks"],"parles":["parl","speak (tu)"],
"parlons":["par-LOHN","speak (nous)"],"parlez":["par-LAY","speak (vous)"],"parlent":["parl","speak (ils)"],
"travailler":["trah-vah-YAY","to work"],"travaille":["trah-VYE","work / works"],
"travaillent":["trah-VYE","work (ils)"],"travaillez":["trah-vah-YAY","work (vous)"],
"aimer":["eh-MAY","to like / to love"],"aime":["em","like / likes"],"aimes":["em","like (tu)"],
"aiment":["em","like (ils)"],"aimerait":["eh-muh-REH","would like"],
"manger":["mahn-ZHAY","to eat"],"mange":["mahnzh","eat / eats"],"mangeons":["mahn-ZHOHN","eat (nous)"],
"boire":["bwahr","to drink"],"bois":["bwah","drink"],"boit":["bwah","drinks"],"bu":["bew","drunk"],
"voir":["vwahr","to see"],"vois":["vwah","see"],"voit":["vwah","sees"],"vu":["vew","seen"],
"regarder":["ruh-gar-DAY","to watch / to look at"],"regarde":["ruh-GARD","watch / watches"],
"écouter":["ay-koo-TAY","to listen"],"écoute":["ay-KOOT","listen / listens"],
"écoutez":["ay-koo-TAY","listen (vous)"],"écoutent":["ay-KOOT","listen (ils)"],
"dire":["deer","to say"],"dis":["dee","say"],"dit":["dee","says / said"],"dites":["deet","say (vous)"],
"lire":["leer","to read"],"lis":["lee","read"],"lit":["lee","reads"],"lu":["lew","read (participle)"],
"lisez":["lee-ZAY","read (vous)"],
"écrire":["ay-KREER","to write"],"écrit":["ay-KREE","writes / written"],"écrivez":["ay-kree-VAY","write (vous)"],
"mettre":["MEH-truh","to put"],"mets":["meh","put"],"met":["meh","puts"],"mis":["mee","put (participle)"],
"mettez":["meh-TAY","put (vous)"],
"sortir":["sor-TEER","to go out"],"sors":["sor","go out"],"sort":["sor","goes out"],
"partir":["par-TEER","to leave"],"pars":["par","leave"],"part":["par","leaves"],"parti":["par-TEE","left"],
"arriver":["ah-ree-VAY","to arrive"],"arrive":["ah-REEV","arrive / arrives"],"arrivé":["ah-ree-VAY","arrived"],
"rester":["res-TAY","to stay"],"reste":["rest","stay / stays"],"resté":["res-TAY","stayed"],
"entrer":["ahn-TRAY","to enter"],"entre":["AHN-truh","enters / between"],
"monter":["mohn-TAY","to go up"],"monte":["mohnt","goes up"],
"descendre":["deh-SAHN-druh","to go down"],"descend":["deh-SAHN","goes down"],
"tomber":["tohm-BAY","to fall"],"tombe":["tohmb","falls"],
"attendre":["ah-TAHN-druh","to wait for"],"attends":["ah-TAHN","wait"],"attend":["ah-TAHN","waits"],
"entendre":["ahn-TAHN-druh","to hear"],"entend":["ahn-TAHN","hears"],"entendez":["ahn-tahn-DAY","hear (vous)"],
"répondre":["ray-POHN-druh","to answer"],"répondez":["ray-pohn-DAY","answer (vous)"],
"vendre":["VAHN-druh","to sell"],"vend":["vahn","sells"],"vendu":["vahn-DEW","sold"],
"finir":["fee-NEER","to finish"],"finis":["fee-NEE","finish"],"finit":["fee-NEE","finishes"],"fini":["fee-NEE","finished"],
"choisir":["shwah-ZEER","to choose"],"choisit":["shwah-ZEE","chooses"],"choisissez":["shwah-zee-SAY","choose (vous)"],
"acheter":["ash-TAY","to buy"],"achète":["ah-SHET","buy / buys"],"acheté":["ash-TAY","bought"],
"chercher":["shair-SHAY","to look for"],"cherche":["shairsh","looks for"],
"trouver":["troo-VAY","to find"],"trouve":["troov","find / finds"],
"donner":["doh-NAY","to give"],"donne":["dun","give / gives"],
"porter":["por-TAY","to wear / to carry"],"porte":["port","wears / door"],"portes":["port","wear (tu)"],
"fermer":["fehr-MAY","to close"],"ferme":["fehrm","closes"],"fermes":["fehrm","close (tu)"],
"ouvrir":["oo-VREER","to open"],"ouvre":["OO-vruh","opens"],"ouvert":["oo-VEHR","open / opened"],
"penser":["pahn-SAY","to think"],"pense":["pahnss","think / thinks"],"pensez":["pahn-SAY","think (vous)"],
"jouer":["zhoo-AY","to play"],"joue":["zhoo","play / plays"],
"étudier":["ay-tew-DYAY","to study"],"étudie":["ay-tew-DEE","study / studies"],
"visiter":["vee-zee-TAY","to visit"],"visite":["vee-ZEET","visit / visits"],
"marcher":["mar-SHAY","to walk / to work (function)"],"marche":["marsh","walks"],
"passer":["pah-SAY","to pass / to spend (time)"],"passe":["pass","passes"],"passons":["pah-SOHN","we spend"],
"traverser":["trah-vehr-SAY","to cross"],"traverse":["trah-VEHRSS","crosses"],
"appeler":["ap-LAY","to call"],"appelle":["ah-PELL","call / calls"],"appelles":["ah-PELL","call (tu)"],
"appelez":["ah-play","call (vous)"],
"lever":["luh-VAY","to raise"],"lève":["lev","raises / gets up"],
"promener":["prom-NAY","to walk (someone)"],"promène":["prom-EN","walks"],
"ressembler":["ruh-sahm-BLAY","to look like"],"ressemble":["ruh-SAHM-bluh","looks like"],
"peser":["puh-ZAY","to weigh"],"pèse":["pehz","weighs"],
"baisser":["beh-SAY","to lower"],"déranger":["day-rahn-ZHAY","to bother"],"dérange":["day-RAHNZH","bothers"],
"dormir":["dor-MEER","to sleep"],"dort":["dor","sleeps"],"cacher":["kah-SHAY","to hide"],
"imaginez":["ee-mah-zhee-NAY","imagine (vous)"],"complétez":["kohm-play-TAY","complete (vous)"],
"soulignez":["soo-lee-NYAY","underline (vous)"],"classez":["klah-SAY","sort (vous)"],
"répétez":["ray-pay-TAY","repeat (vous)"],"regardez":["ruh-gar-DAY","look (vous)"],
"excusez":["ex-kew-ZAY","excuse (vous)"],"tournez":["toor-NAY","turn (vous)"],
"reproche":["ruh-PROSH","reproaches"],"reprochez":["ruh-proh-SHAY","reproach (vous)"],

/* prepositions & connectors */
"à":["ah","to / at / in"],"dans":["dahn","in / inside"],"sur":["sewr","on"],"sous":["soo","under"],
"devant":["duh-VAHN","in front of"],"derrière":["deh-RYEHR","behind"],
"chez":["shay","at (someone's) place"],"avec":["ah-VEK","with"],"sans":["sahn","without"],
"pour":["poor","for / in order to"],"par":["par","by / through"],"vers":["vehr","towards / around"],
"depuis":["duh-PWEE","since / for"],"pendant":["pahn-DAHN","during / for"],
"après":["ah-PREH","after"],"avant":["ah-VAHN","before"],"près":["preh","near"],"loin":["lwan","far"],
"contre":["KOHN-truh","against"],"bord":["bor","edge / side"],"côté":["koh-TAY","side"],
"fond":["fohn","bottom / back"],"face":["fass","face / opposite"],"milieu":["mee-LYUH","middle"],
"et":["ay","and"],"ou":["oo","or"],"mais":["meh","but"],"donc":["dohnk","so / therefore"],
"car":["kar","because / for"],"parce":["parss","because (parce que)"],"si":["see","if / so"],
"quand":["kahn","when"],"comme":["kum","like / as"],"alors":["ah-LOR","so / then"],
"cependant":["suh-pahn-DAHN","however"],"pourtant":["poor-TAHN","yet / however"],
"aussi":["oh-SEE","also / too"],"comment":["koh-MAHN","how"],"pourquoi":["poor-KWAH","why"],
"combien":["kohm-BYAN","how much / how many"],"quoi":["kwah","what"],

/* negation & quantity */
"ne":["nuh","not (first half)"],"n":["n","not (before a vowel)"],"pas":["pah","not"],
"rien":["ryan","nothing"],"personne":["pehr-SUN","nobody / person"],"jamais":["zhah-MEH","never"],
"plus":["plew","more / no longer"],"moins":["mwan","less"],"très":["treh","very"],
"trop":["troh","too much"],"peu":["puh","little / few"],"beaucoup":["boh-KOO","a lot"],
"assez":["ah-SAY","enough / quite"],"bien":["byan","well / good"],"mal":["mal","badly / bad"],
"encore":["ahn-KOR","again / still"],"déjà":["day-ZHAH","already"],"toujours":["too-ZHOOR","always / still"],
"souvent":["soo-VAHN","often"],"parfois":["par-FWAH","sometimes"],"rarement":["rar-MAHN","rarely"],
"maintenant":["mant-NAHN","now"],"vraiment":["vray-MAHN","really"],"seulement":["sul-MAHN","only"],
"ici":["ee-SEE","here"],"là":["lah","there"],"oui":["wee","yes"],"non":["nohn","no"],
"voici":["vwah-SEE","here is"],"voilà":["vwah-LAH","there is"],

/* time */
"jour":["zhoor","day"],"jours":["zhoor","days"],"matin":["mah-TAN","morning"],"matins":["mah-TAN","mornings"],
"soir":["swahr","evening"],"nuit":["nwee","night"],"semaine":["suh-MEN","week"],
"mois":["mwah","month"],"an":["ahn","year"],"ans":["ahn","years"],"année":["ah-NAY","year"],
"heure":["ur","hour / o'clock"],"heures":["ur","hours / o'clock"],"minute":["mee-NEWT","minute"],
"temps":["tahn","time / weather"],"fois":["fwah","time (occurrence)"],
"aujourd":["oh-zhoor","today (aujourd'hui)"],"hui":["dwee","today (aujourd'hui)"],
"hier":["ee-YEHR","yesterday"],"demain":["duh-MAN","tomorrow"],"tard":["tar","late"],"tôt":["toh","early"],

/* places & things */
"maison":["meh-ZOHN","house"],"appartement":["ah-par-tuh-MAHN","flat / apartment"],
"immeuble":["ee-MUH-bluh","building"],"chambre":["SHAHM-bruh","bedroom"],
"cuisine":["kwee-ZEEN","kitchen"],"salon":["sah-LOHN","living room"],"jardin":["zhar-DAN","garden"],
"studio":["stew-DYOH","studio flat"],"étage":["ay-TAZH","floor / storey"],"porte":["port","door"],
"fenêtre":["fuh-NEH-truh","window"],"placard":["plah-KAR","cupboard"],"lit":["lee","bed"],
"table":["TAH-bluh","table"],"chaise":["shez","chair"],"canapé":["kah-nah-PAY","sofa"],
"bureau":["bew-ROH","office / desk"],"rue":["rew","street"],"ville":["veel","town / city"],
"quartier":["kar-TYAY","neighbourhood"],"place":["plass","square / place"],"pont":["pohn","bridge"],
"canal":["kah-NAL","canal"],"lac":["lak","lake"],"mer":["mehr","sea"],"eau":["oh","water"],
"parc":["park","park"],"école":["ay-KOLL","school"],"banque":["bahnk","bank"],
"pharmacie":["far-mah-SEE","pharmacy"],"poste":["post","post office"],"gare":["gar","station"],
"magasin":["mah-gah-ZAN","shop"],"magasins":["mah-gah-ZAN","shops"],"café":["kah-FAY","café / coffee"],
"restaurant":["res-toh-RAHN","restaurant"],"hôpital":["oh-pee-TAL","hospital"],
"cinéma":["see-nay-MAH","cinema"],"bibliothèque":["bee-blee-oh-TEK","library"],
"voiture":["vwah-TEWR","car"],"bus":["bewss","bus"],"métro":["may-TROH","metro"],"train":["tran","train"],
"vélo":["vay-LOH","bike"],"sac":["sak","bag"],"clé":["klay","key"],"clés":["klay","keys"],
"livre":["LEE-vruh","book"],"téléphone":["tay-lay-FUN","phone"],"ordinateur":["or-dee-nah-TUR","computer"],
"lunettes":["lew-NET","glasses"],"argent":["ar-ZHAHN","money"],"loyer":["lwah-YAY","rent"],
"bruit":["brwee","noise"],"fête":["fet","party"],"ballon":["bah-LOHN","balloon"],
"pain":["pan","bread"],"lait":["leh","milk"],"chien":["shyan","dog"],"chat":["shah","cat"],

/* people */
"homme":["um","man"],"femme":["fam","woman / wife"],"fille":["feey","girl / daughter"],
"garçon":["gar-SOHN","boy"],"enfant":["ahn-FAHN","child"],"enfants":["ahn-FAHN","children"],
"ami":["ah-MEE","friend (m.)"],"amie":["ah-MEE","friend (f.)"],"amis":["ah-MEE","friends"],
"voisin":["vwah-ZAN","neighbour"],"voisins":["vwah-ZAN","neighbours"],"voisine":["vwah-ZEEN","neighbour (f.)"],
"père":["pehr","father"],"mère":["mehr","mother"],"frère":["frehr","brother"],"sœur":["sur","sister"],
"famille":["fah-MEEY","family"],"fils":["feess","son"],"parents":["pah-RAHN","parents"],
"gens":["zhahn","people"],"monsieur":["muh-SYUH","sir / Mr"],"madame":["mah-DAM","madam / Mrs"],
"professeur":["proh-feh-SUR","teacher"],"médecin":["mayd-SAN","doctor"],
"locataire":["loh-kah-TEHR","tenant"],"propriétaire":["proh-pree-ay-TEHR","owner / landlord"],
"colocataire":["koh-loh-kah-TEHR","flatmate"],"copains":["koh-PAN","mates / friends"],

/* body & description */
"cheveux":["shuh-VUH","hair"],"yeux":["yuh","eyes"],"tête":["tet","head"],"peau":["poh","skin"],
"barbe":["barb","beard"],"moustache":["moo-STASH","moustache"],
"grand":["grahn","tall / big"],"grande":["grahnd","tall / big (f.)"],"grands":["grahn","tall (pl.)"],
"petit":["puh-TEE","small / short"],"petite":["puh-TEET","small (f.)"],"petits":["puh-TEE","small (pl.)"],
"jeune":["zhuhn","young"],"vieux":["vyuh","old"],"vieille":["vyay","old (f.)"],
"beau":["boh","beautiful"],"beaux":["boh","beautiful (pl.)"],"belle":["bell","beautiful (f.)"],
"joli":["zhoh-LEE","pretty"],"jolie":["zhoh-LEE","pretty (f.)"],
"bon":["bohn","good"],"bonne":["bun","good (f.)"],"mauvais":["moh-VEH","bad"],
"nouveau":["noo-VOH","new"],"nouvelle":["noo-VELL","new (f.)"],"nouveaux":["noo-VOH","new (pl.)"],
"gros":["groh","big / fat"],"mince":["manss","slim"],"long":["lohn","long"],"longs":["lohn","long (pl.)"],
"court":["koor","short"],"courts":["koor","short (pl.)"],
"blond":["blohn","blond"],"blonds":["blohn","blond (pl.)"],"blonde":["blohnd","blonde (f.)"],
"brun":["bruhn","dark-haired"],"bruns":["bruhn","dark (pl.)"],"châtain":["shah-TAN","light brown (hair)"],
"noir":["nwahr","black"],"noirs":["nwahr","black (pl.)"],"blanc":["blahn","white"],
"rouge":["roozh","red"],"bleu":["bluh","blue"],"bleus":["bluh","blue (pl.)"],
"vert":["vehr","green"],"verts":["vehr","green (pl.)"],"marron":["mah-ROHN","brown (invariable)"],
"bouclés":["boo-KLAY","curly"],"raides":["red","straight (hair)"],
"triste":["treest","sad"],"content":["kohn-TAHN","happy / pleased"],"heureux":["uh-RUH","happy"],
"fatigué":["fah-tee-GAY","tired"],"fatiguée":["fah-tee-GAY","tired (f.)"],
"épuisée":["ay-pwee-ZAY","exhausted (f.)"],"désolé":["day-zoh-LAY","sorry"],"désolée":["day-zoh-LAY","sorry (f.)"],
"sympa":["sam-PAH","nice"],"gentil":["zhahn-TEE","kind"],"drôle":["drohl","funny"],
"seul":["sul","alone"],"seule":["sul","alone (f.)"],"peur":["pur","fear"],
"cher":["shehr","expensive / dear"],"chère":["shehr","expensive (f.)"],
"facile":["fah-SEEL","easy"],"difficile":["dee-fee-SEEL","difficult"],
"moderne":["moh-DEHRN","modern"],"premier":["pruh-MYAY","first"],"première":["pruh-MYEHR","first (f.)"],
"dernier":["dehr-NYAY","last"],"prochaine":["proh-SHEN","next"],
"vie":["vee","life"],"travail":["trah-VYE","work"],"faute":["foht","fault / mistake"],
"chose":["shohz","thing"],"choses":["shohz","things"],"mot":["moh","word / note"],
"anniversaire":["ah-nee-vehr-SEHR","birthday"],"vacances":["vah-KAHNSS","holidays"],
"grave":["grahv","serious"],"gauche":["gohsh","left"],"droite":["drwaht","right"],
"droit":["drwah","straight / right"],

/* numbers */
"zéro":["ZAY-roh","zero"],"deux":["duh","two"],"trois":["trwah","three"],"quatre":["KAT-ruh","four"],
"cinq":["sank","five"],"six":["seess","six"],"sept":["set","seven"],"huit":["weet","eight"],
"neuf":["nuhf","nine / new"],"dix":["deess","ten"],"onze":["ohnz","eleven"],"douze":["dooz","twelve"],
"treize":["trez","thirteen"],"quatorze":["kah-TORZ","fourteen"],"quinze":["kanz","fifteen"],
"seize":["sez","sixteen"],"vingt":["van","twenty"],"trente":["trahnt","thirty"],
"quarante":["kah-RAHNT","forty"],"cinquante":["san-KAHNT","fifty"],"soixante":["swah-SAHNT","sixty"],
"cent":["sahn","hundred"],"cents":["sahn","hundreds"],"mille":["meel","thousand"],
"premier":["pruh-MYAY","first"],"deuxième":["duh-ZYEM","second"],"troisième":["trwah-ZYEM","third"],

/* a few more high-frequency items */
"kilo":["kee-LOH","kilo"],"kilos":["kee-LOH","kilos"],"euros":["uh-ROH","euros"],
"mètres":["MEH-truh","metres"],"carrés":["kah-RAY","square"],
"merci":["mehr-SEE","thank you"],"bonjour":["bohn-ZHOOR","hello"],"salut":["sah-LEW","hi / bye"],
"pardon":["par-DOHN","sorry / excuse me"],"excuse":["ex-KEWZ","excuse"],"excuses":["ex-KEWZ","apologies"],
"plaît":["pleh","please (s'il vous plaît)"],"il":["eel","he / it"],
"chaussures":["shoh-SEWR","shoes"],"chemise":["shuh-MEEZ","shirt"],"fleurs":["fluhr","flowers"],
"musique":["mew-ZEEK","music"],"télévision":["tay-lay-vee-ZYOHN","television"],
"question":["kes-TYOHN","question"],"réponse":["ray-POHNSS","answer"],
"exemple":["eg-ZAHM-pluh","example"],"phrase":["frahz","sentence"],"mots":["moh","words"],
"français":["frahn-SEH","French"],"anglais":["ahn-GLEH","English"],
"avis":["ah-VEE","opinion"],"idée":["ee-DAY","idea"],"raison":["ray-ZOHN","reason / right"],
"besoin":["buh-ZWAN","need"],"envie":["ahn-VEE","desire / craving"],
"faim":["fan","hunger"],"soif":["swahf","thirst"],"froid":["frwah","cold"],"chaud":["shoh","hot"],
"rez":["ray","ground (rez-de-chaussée)"],"chaussée":["shoh-SAY","roadway (rez-de-chaussée)"],
"ascenseur":["ah-sahn-SUR","lift / elevator"],"balcon":["bal-KOHN","balcony"],
"cour":["koor","courtyard"],"terre":["tehr","ground / earth"],
"pièces":["pyess","rooms"],"pièce":["pyess","room"],"meublé":["muh-BLAY","furnished"],
"charges":["sharzh","utilities / charges"],"comprises":["kohm-PREEZ","included"],
"annonce":["ah-NOHNSS","advert / listing"],"annonces":["ah-NOHNSS","adverts"],
"informations":["an-for-mah-SYOHN","information"],"entrées":["ahn-TRAY","entrances"],
"immeubles":["ee-MUH-bluh","buildings"],"hôtels":["oh-TELL","hotels"],
"appartements":["ah-par-tuh-MAHN","apartments"],"habitations":["ah-bee-tah-SYOHN","dwellings"],
"originales":["oh-ree-zhee-NAL","original / unusual"],"modernes":["moh-DEHRN","modern"],
"logement":["lohzh-MAHN","housing / home"],"logements":["lohzh-MAHN","homes"],
"salons":["sah-LOHN","living rooms"],"studios":["stew-DYOH","studio flats"],
"placards":["plah-KAR","cupboards"],"locataires":["loh-kah-TEHR","tenants"],
"propriétaires":["proh-pree-ay-TEHR","owners"],"boîte":["bwaht","box"],"boîtes":["bwaht","boxes"],
"site":["seet","site / website"],"centre":["SAHN-truh","centre"],"commercial":["koh-mehr-SYAL","commercial"],
"gare":["gar","station"],"aéroport":["ah-ay-roh-POR","airport"],"rivière":["ree-VYEHR","river"],
"supermarché":["soo-pehr-mar-SHAY","supermarket"],"opéra":["oh-pay-RAH","opera house"],
"tiroir":["teer-WAHR","drawer"],"stylo":["stee-LOH","pen"],"mur":["mewr","wall"],
"arbre":["AHR-bruh","tree"],"vacances":["vah-KAHNSS","holidays"],
"réfrigérateur":["ray-free-zhay-rah-TUR","fridge"],"frigo":["free-GOH","fridge (informal)"],
"aspects":["ah-SPEH","aspects"],"physiques":["fee-ZEEK","physical"],
"émotions":["ay-moh-SYOHN","emotions"],"goûts":["goo","tastes / likes"],
"taille":["tye","height / size"],"couleur":["koo-LUHR","colour"],"âge":["ahzh","age"],
"portrait":["por-TREH","portrait"],"description":["des-kreep-SYOHN","description"],
"document":["doh-kew-MAHN","document"],"texte":["text","text"],"journal":["zhoor-NAL","newspaper"],
"littéraire":["lee-tay-REHR","literary"],"correspond":["koh-res-POHN","corresponds / matches"],
"éléments":["ay-lay-MAHN","elements"],"catégories":["kah-tay-goh-REE","categories"],
"mieux":["myuh","better"],"meilleur":["may-YUR","better / best"],
"volontaire":["voh-lohn-TEHR","deliberate"],"grave":["grahv","serious"],
"dos":["doh","back"],"profil":["proh-FEEL","profile"],"intérieur":["an-tay-RYUR","inside"],
"extérieur":["ex-tay-RYUR","outside"],"souriant":["soo-ree-AHN","smiling"],
"photo":["foh-TOH","photo"],"pied":["pyay","foot"],"pieds":["pyay","feet"],
"minutes":["mee-NEWT","minutes"],"gobelet":["gob-LEH","cup"],"assiette":["ah-SYET","plate"],
"bouteille":["boo-TAY","bottle"],"confettis":["kohn-feh-TEE","confetti"],
"serpentins":["sehr-pahn-TAN","streamers"],"guirlande":["geer-LAHND","garland"],
"désordre":["day-ZOR-druh","mess / disorder"]
};

/* ---------- helpers ---------- */
const ELISIONS = ["j","l","d","n","qu","c","s","t","m"];

function tokenize(text){
  const out = [];
  const clean = String(text)
    .toLowerCase()
    .replace(/[’ʼ]/g, "'")
    .replace(/ /g, ' ');
  clean.split(/[^a-zà-öø-ÿ']+/).forEach(raw=>{
    if(!raw) return;
    let w = raw.replace(/^'+|'+$/g,'');
    if(!w) return;
    const apos = w.indexOf("'");
    if(apos > -1){
      const head = w.slice(0, apos);
      const tail = w.slice(apos+1);
      if(ELISIONS.indexOf(head) > -1){
        out.push(head);
        if(tail) out.push(tail);
        return;
      }
      w = w.replace(/'/g,'');
    }
    out.push(w);
  });
  return out;
}

/* French-bearing elements inside a section */
const FR_SELECTORS = '.fr, .reading p, .qa .q, .riddle .prompt, .fillrow .sent span, .postit, .cell .fr, .quizfr';

function frenchTextIn(nodes){
  let text = '';
  nodes.forEach(node=>{
    if(node.nodeType !== 1) return;
    if(node.matches && node.matches(FR_SELECTORS)) text += ' ' + node.textContent;
    if(node.querySelectorAll){
      node.querySelectorAll(FR_SELECTORS).forEach(el=>{ text += ' ' + el.textContent; });
    }
  });
  return text;
}

function buildGlossary(text, labelSuffix){
  const seen = Object.create(null);
  tokenize(text).forEach(w=>{
    if(WORDS[w] && !seen[w]) seen[w] = true;
  });
  const words = Object.keys(seen).sort((a,b)=>a.localeCompare(b,'fr'));
  if(words.length < 3) return null;

  const wrap = document.createElement('details');
  wrap.className = 'glossbox';
  wrap.innerHTML = '<summary>Glossaire — ' + words.length + ' mots' + (labelSuffix?(' · '+labelSuffix):'') + '</summary>';
  const grid = document.createElement('div');
  grid.className = 'glossgrid';
  words.forEach(w=>{
    const [ph, en] = WORDS[w];
    const item = document.createElement('div');
    item.className = 'glossitem';
    item.innerHTML = '<span class="gw"></span><span class="gp"></span><span class="ge"></span>';
    item.querySelector('.gw').textContent = w;
    item.querySelector('.gp').textContent = ph;
    item.querySelector('.ge').textContent = en;
    item.title = 'Click to hear "' + w + '"';
    item.onclick = ()=>{ if(typeof speak === 'function') speak(w); };
    grid.appendChild(item);
  });
  wrap.appendChild(grid);
  return wrap;
}

/* ---------- styles ---------- */
function injectStyles(){
  if(document.getElementById('glossstyles')) return;
  const st = document.createElement('style');
  st.id = 'glossstyles';
  st.textContent = [
    '.glossbox{background:#f7f6fd;border:1px solid #dcd8f2;border-radius:12px;margin:16px 0 22px;overflow:hidden;}',
    '.glossbox>summary{cursor:pointer;padding:10px 14px;font-size:13.5px;font-weight:600;color:#4338ca;list-style:none;}',
    '.glossbox>summary::-webkit-details-marker{display:none;}',
    '.glossbox>summary::before{content:"\\25B8 ";font-size:12px;}',
    '.glossbox[open]>summary::before{content:"\\25BE ";}',
    '.glossbox>summary:hover{background:#eceafe;}',
    '.glossgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(215px,1fr));gap:6px;padding:6px 12px 14px;}',
    '.glossitem{background:#fff;border:1px solid #e6e3dc;border-radius:9px;padding:6px 9px;cursor:pointer;line-height:1.35;}',
    '.glossitem:hover{border-color:#4338ca;}',
    '.glossitem .gw{display:block;font-size:14px;font-weight:600;color:#23201b;}',
    '.glossitem .gp{display:block;font-size:11.5px;color:#0f7a54;font-style:italic;}',
    '.glossitem .ge{display:block;font-size:12px;color:#6b675f;}'
  ].join('\n');
  document.head.appendChild(st);
}

/* ---------- fix: stop the same word being spoken twice ----------
   Two things caused the double playback:
   1) a click landing on an inner element AND bubbling to its parent,
      firing speak() twice for one tap;
   2) speechSynthesis.cancel() followed immediately by speak() — the
      cancel hasn't settled, so the browser queues both utterances.
   Wrapping the page's global speak() fixes it everywhere at once. */
function patchSpeak(){
  if(typeof window.speak !== 'function' || window.__speakPatched) return;
  const original = window.speak;
  let lastText = '', lastTime = 0;
  window.speak = function(text){
    const now = Date.now();
    const t = String(text);
    // same phrase fired again within 400ms = a duplicate, not a real second tap
    if(t === lastText && (now - lastTime) < 400) return;
    lastText = t; lastTime = now;
    try { speechSynthesis.cancel(); } catch(e){}
    // let cancel() settle before queueing, so nothing doubles up
    setTimeout(function(){ original(t); }, 25);
  };
  window.__speakPatched = true;
}

/* ---------- run ---------- */
function run(){
  injectStyles();
  patchSpeak();

  /* A) Complete Book: one glossary per chapter body */
  const chapters = document.querySelectorAll('details.chap .chapbody');
  if(chapters.length){
    chapters.forEach(body=>{
      const text = frenchTextIn([body]);
      const g = buildGlossary(text, 'this chapter');
      if(g) body.appendChild(g);
    });
  }

  /* B) Cours pages: one glossary per h2 section inside #content */
  const content = document.getElementById('content');
  if(content){
    const kids = Array.from(content.children);
    let group = [], heading = null;
    const flush = ()=>{
      if(!group.length) return;
      const g = buildGlossary(frenchTextIn(group), heading || '');
      if(g && group[group.length-1].parentNode){
        group[group.length-1].after(g);
      }
      group = [];
    };
    kids.forEach(el=>{
      if(el.tagName === 'H2'){
        flush();
        heading = el.textContent.replace(/^\d+\w*\s*·\s*/,'').trim();
      } else {
        group.push(el);
      }
    });
    flush();
  }
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', run);
} else {
  run();
}

})();
