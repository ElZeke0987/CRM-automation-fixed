
import type { dictType } from "../types";

// type NoDuplicates<T extends readonly string[]> =
//   T extends readonly [infer F extends string, ...infer R extends readonly string[]]
//     ? F extends R[number]
//       ? ["❌ Elemento duplicado:", F]
//       : NoDuplicates<R>
//     : T;

// function defineUniqueArray<T extends readonly string[]>(
//   arr: NoDuplicates<T> 
// ): T {
//   return arr;
// }
// type _Test =
//   "san justo" extends "san justo" ? true : false;
export const noroestePullLocs = [//101
    "isidro casanova", "gonzales catan", "la matanza", 
    "tapiales","moron", "moreno", "merlo", "hurlingham",
    "san justo", "pilar", "jose c paz", "gregorio de Laferrère", 
    "del viso", "tortuguitas", "vicente lópez", "ituzaingo", "san miguel",
    "tigre", "acasusso", "escobar", "rafael castillo", "grand bourg", "loma hermosa",
    "villa celina", "benavidez", "virrey del pino", "ramos mejía", "san fernando",
    "villa tesei", "martin coronado", "villa jose leon suarez", "marcos paz", "Martínez",
    "bella vista", "olivos", "don torcuato", "luján", "castelar", "paso del rey", "villa luzuriaga",
    "el talar", "matheu"
   
];

export const cabaPullLocs = [ //102
    "caba", "caseros","parque patricios","almagro", "villa crespo",
    "villa urquiza", "balvanera","villa del parque", "flores", "caballito", "palermo", "floresta",
    "pompeya", "el palomar", "san martin", "san andres", "villa bosch", "barracas", 
    "belgrano", "boedo", "chacarita", "colegiales", "constitucion", "la boca", "montserrat", 
    "nuñez", "palermo", "recoleta", "retiro", "saavedra", "san cristobal", "san nicolas", 
    "velez sarsfield", "villa devoto", "villa del parque", "villa paternal", "villa santa rita", 
    "villa soldati", "villa urquiza", "villa trujui", "villa lugano"

];

export const varelaPullLocs = [ //103
    "quilmes", "florencio varela", "quilmes oeste", "bernal", 
    "Berazategui", "la plata", "ensenada","solano", "los hornos",
    "Villa España (Berazategui)","Villa Mitre (Berazategui)",
    "San Francisco Solano Este","San Francisco Solano Oeste",
    "Pereyra","Ringuelet","Gorina","City Bell","Villa Domselaar","Ardigó"
    ,"Bosques","Zeballos", "platanos", "ranelagh", "ezpeleta", "Villa Vatteone","Punta Lara", "el pato",
    "Ardigó","Villa Garibaldi","Pereyra", "hudson", "burzaco", "bernal oeste"

] as const;

export const surPullLocs = [ //104
    "lomas de zamora", "lanus", "spegazzini", "wilde",
    "alejandro korn", "temperley", "guernica", 
    "malvinas argentinas", "ezeiza", "monte grande", "longchamps", "avellaneda", 
    "glew", "monte chingolo", "carlos spegazzini", "almirante brown",
    "adrogue", "burzaco", "claypole", "dock sud",  
    "llavallol",  "sarandi", "sourigues", "el jaguel","José Mármol","Rafael Calzada","San José",
    "San Vicente", "esteban echeverría", "canning"

] ;

export const interiorPullLocs = [ //interior
    "catamarca","córdoba", "corrientes","entre ríos", "paraná","jujuy", 
    "san salvador de jujuy","mendoza", "misiones","posadas","neuquén", 
    "viedma","salta","san juan", "san luis","río negro", "la pampa",
    "santa cruz","río gallegos", "santa fe", "santiago del estero", 
    "tierra del fuego", "ushuaia", "tucumán", "san miguel de tucumán", 
    "chaco", "resistencia", "chubut", "rawson", "formosa",  "santa rosa",
    "campana", "zarate", "clorinda", "mar del plata", "orense", "bahia blanca"
    ,"Monte Veloz","Villa Elisa", "Villa Domselaar", "carmen de areco", "venado tuerto"
    ,"tandil"
  ];




export const pullsDict: dictType = {
    "name": "pulls",
    "type": "enum",
    "options":{
        "101": noroestePullLocs,
        "102": cabaPullLocs,
        "103": varelaPullLocs,
        "104": surPullLocs,
        "interior": interiorPullLocs
    }
}



export const locationDictionary: dictType = {

    "name": "localidades",
    "type": "enum",
    "options":{
        "Glew": ["glew"],
        "Los Hornos": ["los hornos", "ls hornos", "los horns", "los horos"],
        "Tortuguitas": ["tortuguitas", "tortugitas"],
        "Acasusso": ["acasuso", "acassusso", "acassuso", "acasusso"],
        "Balvanera": ["balvanera"],
        "Marcos Paz": ["marcos paz", "marco paz", "marcos pa", "marcos pas", "marco pa"],
        "Guernica": ["guernica"],
        "Caballito": ["caballite", "caballit"],
        "Aldo Bonzi": ["Bonzi", "A. Bonzi", "AldoBonzi", "Bonzi Bs.As.", "AldoB"],
        "Avellaneda": ["Avelaneda", "Abellaneda", "Avejaneda", "Vellaneda"],
        "Banfield": ["Banfild", "Banfiel", "Bamfield", "Banfild"],
        "Berazategui": ["Berazateguy", "Berazatequi", "Berasategui", "Bera"],
        "Caba": ["caba", "Capital", "Capital federal", "Ciudad de Buenos Aires", "Ciudad de Bs.As.", "Ciudad de bs as"],
        "Caseros": ["Caserus", "Casero", "Caceros", "Cazeros"],
        "Castelar": ["Castellar", "Castelan", "Castelar", "Castelar"],
        "Ciudad Evita": ["C. Evita", "Cdad. Evita", "Ciudadevita", "Evita Ciudad"],
        "Ciudad Madero": ["Madero", "C. Madero", "CiudadMadero", "Madero Bs.As.", "C.Madero"],
        "Carlos Spegazzini": ["Carlos Spegazzinni", "Carlos Spegazzini", "CarlosSpegazzini", "Spegazzini", "Spegazini", 
          "Spegasini", "Spegazinni", "carlos espegazini", "carlos espegazzini"],
        "El Palomar": ["Palomar", "El Palomar", "Palomar Bs.As.", "ElPaloMar", "Cdad Jardin", "Ciudad Jardin"],
        "Luján": ["Lujan"],
        "San Martin": ["San Martn", "S. Martin", "S Martin"],
        "La Plata": ["LaPlata", "l plata", "la plat"],
        "El Talar": ["Talar", "Tala"],
        "El Jaguel": ["El Jaguel", "El Jagüel", "Jagüel", "Jagel", "Jagul", "El Jagel"],
        "Floresta": ["Floresta", "florestaa"],
        "Mar del Plata": ["mar del plata", "mar del plta", "mdplata", "mdp"], 
        "Pompeya": ["pompey", "pompeya"],
        "Don Torcuato": ["Torcuato", "DonTorcuato", "D. Torcuato", "Torcu"],
        "Ezeiza": ["Ezeiza", "Ezeisa", "Eziza", "Ezeiza Airport"],
        "Florencio Varela": ["Florencio", "F. Varela", "Varela", "Floren Varela"],
        "Gerli": ["Gerli", "Jerli", "Gerly", "Guerli"],
        "González Catán": ["Gonzalez Catan", "Gonzales Catán", "GonzaCatán", "Catán", "gonsales catan", "gonsalez catan", "gonzalés catán", "gonzales catan", "gonales catan", "gonáles catan", "gonzález catan", "gonzalez catan"],
        "Gregorio de Laferrère": ["Laferrère", "Gregorio Laferrere", "Laferrere", "G. Laferrère", "lafe", "laferrere", "laferr", "la fe", "laferrer", "laferer"],
        "Del Viso": ["del viso"],
        "Parque Patricios": ["parque patricio", "parque patricios"],
        "Campana": ["campana"],
        "Zarate": ["zarate"],
        "Clorinda": ["clorinda"],
        "Escobar": ["escobar", "belen de escobar"],
        "Almirante Brown": ["Alt. Brown", "Alte. Brown", "Alm. Brown", "Al. Brown", "Brown", "almt brown"],
        "Martin Coronado": ["martin coronado", "martin corona", "martin corona do", "martin corona", "m coronado"],
        
        "San Francisco Solano Este": ["solano este", "s. f. solano este"],
        "San Francisco Solano Oeste": ["solano oeste", "s. f. solano oeste"],

        "José Mármol": ["jose marmol", "j. marmol", "marmol"],
        "Rafael Calzada": ["rafael calzada", "r. calzada", "calzada"],
        "San José (Almirante Brown)": ["san jose brown", "san jose almte brown", "san jose ab"],

        "Villa España (Berazategui)": ["villa españa berazategui", "v. españa bera"],
        "Villa Mitre (Berazategui)": ["villa mitre berazategui", "v. mitre bera"],

        "Hudson": ["hudson", "platanos hudson"],
        "Pereyra": ["pereyra", "pereyra iraola"],
        "Villa Elisa": ["villa elisa", "v. elisa"],
        "Canning": ["caning", "cannin", "canin", "cannnin"],

        "Bosques": ["bosques", "bosques norte", "bosques sur"],
        "Zeballos": ["zeballos", "pablo zeballos"],
        "San Juan Bautista (Florencio Varela)": ["san juan bautista", "san juan varela"],

        "Villa Vatteone": ["vatteone", "villa vatteone"],
        "El Pato": ["el pato", "pato berazategui"],

        "Ringuelet": ["ringuelet"],
        "Gorina": ["gorina"],
        "City Bell": ["city bell", "citybell"],

        "Ensenada": ["ensenada"],
        "Punta Lara": ["punta lara"],

        "Villa Domselaar": ["domselaar", "villa domselaar"],
        "Alejandro Korn": ["alejandro korn", "korn"],

        "Villa Trujui": ["villa trujui", "trujui"],

        "Ardigó": ["ardigo", "ardigó"],

        "Monte Veloz": ["monte veloz"],
        "Villa Garibaldi": ["garibaldi", "villa garibaldi"],

        "Haedo": ["Haedo", "Aedo", "Haedho", "Haedo CABA"],
        "Hurlingham": ["Hurlingam", "Hurlinghan", "Huringham", "Hurlin"],
        "Isidro Casanova": ["Casanova", "I. Casanova", "IsidroCasa", "Casanova Bs.As.", "Casa", "Casanoba", "Isidro C."],
        "Ituzaingó": ["Ituzaingo", "Ituzáingo", "Ituzaingó", "Itu"],
        "José C. Paz": ["Jose C. Paz", "J. C. Paz", "José Paz", "JC Paz"],
        "Villa Jose Leon Suarez": ["jose leon suarez", "villa j leon suárez", "leon suarez", "villa leon suárez", "j l suarez", "j l suárez", "villa j l suarez"],
        "Matheu": ["Mateu", "Matheuu"],
        "La Matanza": ["Matanza", "Lamatanza", "LaMatanza", "Partido de La Matanza"],
        "Lanús": ["Lanus", "Lanuz", "Lanús Oeste", "Lanús Este"],
        "Esteban Echeverría": ["estebande echeverria", "esteban echeverria", "esteban echeverría", "esteba echeverria", "esteban echeverre"],
        "Bernal Oeste": ["Bernal Oeste", "Bernal O."],
        "Bernal Este": ["Bernal Este", "Bernal E."],
        "Bernal": ["Bernal", "Bernal Bs.As.", "Bernal Centro", "Bernal", "berna"],
        "Benavidez": ["Benavides", "benavid"],
        "Llavallol": ["Llavallol", "Yavallol", "Llavalol", "LlaValol"],
        "Lomas de Zamora": ["Lomas Zamora", "LomasDeZamora", "Lomas", "LoZamora"],
        "Longchamps": ["Longchamps", "Longchamp", "Lonchamps", "Longshamps", "longchanps"],
        "Los Polvorines": ["Polvorines", "L. Polvorines", "LosPolvorines", "Polvorin"],
        "Luis Guillón": ["Guillon", "lui guillo", "luis guiilon", "luis guillon", "guillón"],

        "Máximo Paz": ["Maximo Paz", "MaximoPaz", "MaximoP"],
        "Malvinas Argentinas": ["Malvinas", "Malvinas Arg", "MalvinasBsAs", "MalvinasAr"],
        "Merlo": ["Merlo", "Merlo Bs.As.", "Merlo Centro", "Mero"],
        "Monte Chingolo": ["MonteChingolo", "Chingolo", "M. Chingolo", "MonteChingo", "Monte Chingollo"],
        "Monte Grande": ["Montegrande", "M. Grande", "MonteGrande", "MonteGrand"],
        "Moreno": ["Moreno", "Moreno Bs.As.", "Moreno Centro", "Moredo"],
        "Morón": ["Moron", "Morrón", "Morón", "Morón Centro"],
        "Monserrat": ["Monserrat", "Monserrat Caba", "Monserrat", "monserra"],
        "Grand Bourg": ["Grand Bourg", "GrandBourg", "grandbour", "gran bur"],
        "Villa Celina": ["Villa Celina", "V. Celina", "VillaCelina", "Celina"],
        
        "Quilmes": ["Quilme", "Quilmez", "Quilmes", "Quilmes Oeste"],
        "Rafael Castillo": ["R. Castillo", "Rafael Castillo", "RafaCastillo", "Castillo", "RafaCasti", "Rafael Castilo", "Rafael C.", "Rafel Castillo"],
        "Ramos Mejía": ["Ramos Mejia", "Ramo Mejía", "Ramoz Mejía", "Ramos Megia", "Ramosmejia", "ramo mejia", "ramos mejía", "ramoz mejía", "ramoz mejia", "ramos megia", "ramos mejia", "ramos meji"],
        "Remedios de Escalada": ["Remedios Escalada", "R. de Escalada", "Escalada", "Remedios"],
        "San Fernando": ["SanFernando", "S. Fernando", "SanFer", "San Fer"],
        "San Isidro": ["SanIsidro", "S. Isidro", "SanIsi", "SanIsidro Norte"],
        "San Justo": ["SanJusto", "S. Justo", "San Just", "SanJust", "san justo", "san juto", "sa justo", "zan juzto", "san just", "an justo", " an juto", "an jto", "san jsto"],
        "San Miguel": ["SanMiguel", "S. Miguel", "SanMi", "San Migue"],
        "Sarandí": ["Sarandi", "Sarandí", "Sarandí Avellaneda", "Zarandí"],
        "Solano": ["Solano", "Villa Solano", "Solan", "Sola", "Solano Oeste"],
        "San Andres": ["San Andres", "SanAndres", "S. Andres", "SanAndres"],
        "Tapiales": ["Tapiales", "Tapial", "Tapi", "Tapiales Bs.As.", "Tapia"],
        "Temperley": ["Temperley", "Temperlei", "Temp", "Temper"],
        "Tigre": ["Tigre", "Tigre Centro", "Tigre Delta", "Tigre Bs.As.", "Tgre", "Tigr"],
        
        
        
        "Valentín Alsina": ["Valentin Alsina", "V. Alsina", "Alsina", "ValenAlsina"],
        "Vicente López": ["VicenteLopez", "V. López", "Vicente López", "VicenLopez"],
        "Villa Ballester": ["V. Ballester", "Ballester", "VillaBallester", "Villa B.","Ballester Bs.As.", "VillaBalles"],
        "Villa Centenario": ["V. Centenario", "Centenario", "VillaCentenario", "VillaCen"],
        "Villa Fiorito": ["Fiorito", "VillaFiorito", "V. Fiorito", "Fiorito Bs.As."],
        "Villa Madero": ["Madero", "VillaMadero", "V. Madero", "Madero Bs.As."],
        "Villa Luzuriaga": ["Luzuriaga", "V. Luzuriaga", "Luzu", "Luzuriaga Bs.As.", "VillaLuzu"],
        "Villa Insuperable": ["Insuperable", "V. Insuperable", "Insuperable Bs.As.", "VillaInsu"],
        "Villa La Florida": ["La Florida", "V. La Florida", "Florida Oeste", "VillaFlorida"],
        "Villa Adelina": ["Adelina", "V. Adelina", "Adelina Bs.As.", "VillaAdelina"],
        "Villa de Mayo": ["Villa Mayo", "V. de Mayo", "Mayo Bs.As.", "VillaMayo"],
        "Villa Maipú": ["V. Maipú", "VillaMaipu"],
        "Villa Scasso": ["Scasso", "V. Scasso", "Scasso Bs.As.", "VillaScasso"],
        "Villa Diamante": ["V. Diamante", "Diamante Bs.As.", "VillaDiamante"],
        "Villa Tranquila": ["V. Tranquila", "Tranquila Bs.As.", "VillaTranqui"],
        "Villa Corina": ["V. Corina", "Corina Bs.As.", "VillaCorina"],
        "Villa Domínico": ["Domínico", "V. Domínico", "Dominico", "VillaDomini"],
        "Villa Montoro": ["Montoro", "V. Montoro", "Montoro Bs.As.", "VillaMontoro"],
        "Villa Porvenir": ["Porvenir", "V. Porvenir", "Porvenir Bs.As.", "VillaPorve"],
        "Villa Numancia": ["Numancia", "V. Numancia", "Numancia Bs.As.", "VillaNuman"],
        "Villa Bordeu": ["Bordeu", "V. Bordeu", "Bordeu Bs.As.", "VillaBordeu"],
        "Villa Galicia": [ "V. Galicia", "Galicia Bs.As.", "VillaGalicia"],
        "Villa del Parque": ["Parque", "V. del Parque", "Parque Bs.As.", "VillaParque", "Villa del Parque"],
        "Villa Ortúzar": ["Ortúzar", "V. Ortúzar", "Ortuzar", "VillaOrtu"],
        "Villa Real": ["Real", "V. Real", "Real Bs.As.", "VillaReal"],
        "Villa Santa Rita": ["Santa Rita", "V. Santa Rita", "SantaRita Bs.As.", "VillaRita"],
        "Villa General Mitre": ["G. Mitre", "Villa Mitre", "Mitre Bs.As.", "VillaGMitre"],
        "Villa Pueyrredón": ["Pueyrredón", "V. Pueyrredón", "Pueyrredon", "VillaPuey"],
        "Villa Urquiza": ["Urquiza", "V. Urquiza", "Urquiza Bs.As.", "VillaUrqui", "villa urquiza"],
        "Villa Crespo": ["Crespo", "V. Crespo", "Crespo Bs.As.", "VillaCrespo"],
        "Villa Luro": ["Luro", "V. Luro", "Luro Bs.As.", "VillaLuro"],
        "Villa Lugano": ["Lugano", "V. Lugano", "Lugano Bs.As.", "VillaLugano"],
        "Villa Riachuelo": ["Riachuelo", "V. Riachuelo", "Riachu", "VillaRiachu"],
        "Villa Soldati": ["Soldati", "V. Soldati", "Soldati Bs.As.", "VillaSoldati"],
        "Villa Lanzone": ["Lanzone", "V. Lanzone", "Lanzone Bs.As.", "VillaLanzo"],
        "Villa Albertina": ["V. Albertina", "Albertina Bs.As.", "VillaAlber"],
        "Villa Ayacucho": ["Ayacucho", "V. Ayacucho", "Ayacucho Bs.As.", "VillaAyacu"],
        "Villa Bosch": ["Bosch", "V. Bosch", "Bosch Bs.As.", "VillaBosch"],
        "Villa Chacabuco": ["Chacabuco", "V. Chacabuco", "Chaca", "VillaChaca"],
        "Villa Coronel Arias": ["C. Arias", "Villa Arias", "Arias Bs.As.", "VillaCoronel"],
        "Villa de los Patricios": [ "V. Patricios", "Patricios Bs.As.", "VillaPatri"],
        "Villa España": [ "V. España", "España Bs.As.", "VillaEspaña"],
        "Villa Felicia": [ "V. Felicia", "Felicia Bs.As.", "VillaFeli"],
        "Villa Gobernador Gálvez": ["G. Gálvez", "Villa Gálvez", "Gálvez Bs.As.", "VillaGGalvez"],
        "Loma Hermosa": ["lom hermo", "lomo hermoso"],
        "Villa Hermosa": ["V. Hermosa", "Hermosa Bs.As.", "VillaHermosa"],
        "Villa Libertad": ["V. Libertad", "Libertad Bs.As.", "VillaLiber"],
        "Villa Lynch": ["Lynch", "V. Lynch", "Lynch Bs.As.", "VillaLynch"],
        "Villa Martelli": ["Martelli", "V. Martelli", "Martelli Bs.As.", "VillaMartelli"],
        "Villa Modelo": [ "V. Modelo", "Modelo Bs.As.", "VillaModelo"],
        "Villa Muñiz": ["Muñiz", "V. Muñiz", "Muniz", "VillaMuniz"],
        "Villa Obrera": ["Obrera", "V. Obrera", "Obrera Bs.As.", "VillaObrera"],
        "Villa Progreso": ["Progreso", "V. Progreso", "Progreso Bs.As.", "VillaProgre"],
        "Villa Raffo": ["Raffo", "V. Raffo", "Raffo Bs.As.", "VillaRaffo"],
        "Villa Reconquista": ["Reconquista", "V. Reconquista", "Reconquista Bs.As.", "VillaRecon"],
        "Villa Sarmiento": ["Sarmiento", "V. Sarmiento", "Sarmiento Bs.As.", "VillaSarmiento"],
        "Villa Tesei": ["Tesei", "V. Tesei", "Tesei Bs.As.", "VillaTesei"],
        "Villa Udaondo": ["Udaondo", "V. Udaondo", "Udaondo Bs.As.", "VillaUdaondo"],
        "Villa Yapeyú": ["Yapeyú", "V. Yapeyú", "Yapeyu", "VillaYapeyu"],
        "Villa Zagala": ["Zagala", "V. Zagala", "Zagala Bs.As.", "VillaZagala"],
        "Villa Zavaleta": ["Zavaleta", "V. Zavaleta", "Zavaleta Bs.As.", "VillaZavala"],
        "Villa Zula": ["Zula", "V. Zula", "Zula Bs.As.", "VillaZula"],
        "Venado Tuerto": ["venado tuerto", "venad tuerto"],

        //Caba localidades:

        "Almagro": ["almagro", "almagr"],
        "Barracas": ["barraca", "barracas"],
        "Belgrano": ["belgrano", "belgrano r", "belgrano c"],
        "Boedo": ["boedo"],
        "Chacarita": ["chacarita", "chaca"],
        "Colegiales": ["colegiale", "colegiales"],
        "Constitución": ["constitucion", "consti"],
        "La Boca": ["laboca", "la boca"],
        "Montserrat": ["montserrat", "monserrat"],
        "Núñez": ["nunez", "nuñez"],
        "Palermo": ["palermo", "palermo soho", "palermo hollywood"],
        "Recoleta": ["recoleta"],
        "Retiro": ["retiro"],
        "Saavedra": ["saavedra"],
        "San Cristóbal": ["san cristobal", "san cristóbal"],
        "San Nicolás": ["san nicolas", "microcentro"],
        "Vélez Sarsfield": ["velez", "velez sarsfield"],
        "Villa Devoto": ["devoto", "villa devoto"],
        "Villa Paternal": ["paternal", "villa paternal"],


        //GBA Norte
        "Beccar": ["beccar", "becar"],
        "Bella Vista": ["bella vista", "bellavista"],
        "Boulogne Sur Mer": ["boulogne", "boulogne sur mer"],
        "Carapachay": ["carapachay", "carapachai"],
        "Florida": ["florida", "florida oeste", "florida este"],
        "La Lucila": ["la lucila", "lucila"],
        "Martínez": ["martinez", "martines"],
        "Muñiz": ["muñiz", "muniz"],
        "Olivos": ["olivos"],
        "Pilar": ["pilar centro", "pilar"],
        "San Vicente": ["san vicente"],
        "Victoria": ["victoria"],
        "Villa Astolfi": ["astolfi", "villa astolfi"],
        "Villa Rosa": ["villa rosa"],
        //GBA Oeste
        "Ciudadela": ["ciudadela"],
        "La Tablada": ["la tablada", "tablada"],
        "Lomas del Mirador": ["lomas del mirador", "mirador"],
        "Paso del Rey": ["paso del rey", "pasodelrey"],
        "Santos Lugares": ["santos lugares"],
        //GBA Sur
        "Adrogué": ["adrogue", "adrogué"],
        "Burzaco": ["burzaco"],
        "Claypole": ["claypole", "clay pol"],
        "Dock Sud": ["dock sud", "dock"],
        "Ezpeleta": ["ezpeleta"],
        "Plátanos": ["platanos", "plátanos"],
        "Ranelagh": ["ranelagh"],
        "Sourigues": ["sourigues"],
        "Tandil": ["tandil", "tandíl", "tandl", "tandel"],
        
        "Virrey del Pino": ["birrey del pino", "virrey del pino"],
        "Wilde": ["Wilde", "Wilde Avellaneda", "Wild", "Vilde"],
        "Catamarca": ["Cata", "Cata.", "Catam"],
        "Chaco": ["Ch", "Provincia del Chaco"],
        "Chubut": ["Chbt", "Provincia del Chubut"],
        "Córdoba": ["Cordoba", "Cba", "CBA", "Córdova"],
        "Corrientes": ["Corriente", "Ctés", "Ctes"],
        "Entre Ríos": ["EntreRios", "E. Rios", "ER", "Entrerios"],
        "Formosa": ["Form", "Fsa"],
        "Jujuy": ["Juy", "Jj", "San Salvador", "S.S. de Jujuy"],
        "La Pampa": ["LP", "L.Pampa", "Pampa"],
        "La Rioja": ["L.R.", "Rioja", "L Rioja"],
        "Mendoza": ["Mza", "Mendoza Capital"],
        "Misiones": ["Mision", "Mnes", "Posadas (confusión con capital)"],
        "Neuquén": ["Neuquen", "Nqn", "NQN"],
        "Río Negro": ["Rio Negro", "R.Negro", "RN"],
        "Salta": ["Sta", "Salta Capital"],
        "San Juan": ["S.Juan", "Sto. Juan", "SJ"],
        "San Luis": ["S.Luis", "SL", "Sto. Luis", "San Luis"],
        "Santa Cruz": ["S.Cruz", "Sta. Cruz", "SC"],
        "Santa Fe": ["Sta Fe", "S.Fe", "SantaFe", "SFe"],
        "Santiago del Estero": ["Sgo. del Estero", "Santiago", "S.del Estero", "SDE"],
        "Tierra del Fuego, Antártida e Islas del Atlántico Sur": ["Tierra del Fuego", "T.del Fuego", "TDF", "Tierra del Fuego Antartida", "Usuahia (error por capital)"],
        "Tucumán": ["Tucuman"],
        "Orense": ["orense"],
        "Bahia Blanca": ["bahia blanca", "b blanca", "bahia blanc", "b. blanca"],
        "Carmen de Areco": ["c areco", "carm areco", "carmen de arec"]
    }
}
