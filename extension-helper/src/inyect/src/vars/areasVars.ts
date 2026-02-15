export const areaNumbers: Record<string, string>= {
    "11": "yes",
    "221": "yes",
    "2213": "yes",
    "2214": "yes",
    "2215": "yes",
    "2216": "yes",
    "2217": "yes",
    
    "230": "yes",
    "237": "yes",
    "3848": "yes",   
    "2226": "yes",  
    "2323": "yes",
}

export interface Area {
    region: string;
    codigos: string[];
}

export const areasInterior: Area[]=[//Hacer que se auto aprenda retro alimentandose del input
    { region: "", codigos: ["3464", "2478", "3489", "3484", "2235", "2223"] },
    
    // Resto de las provincias 
    { region: "Córdoba", codigos: ["351", "3537","3516", "3513", "3544","3518", "3548","3543", "353", "358", "3525", "3541", "3543", "3524", "2336", "3382", "3385", "3387", "3463", "34637"] },
    { region: "Corrientes", codigos: ["379", "3777", "3756", "3795", "3758", "3772", "3773", "3774", "3775", "3777", "3781", "3782", "3786", "3832"]},
    { region: "Formosa", codigos: ["370", "3705", "3718"] },
    { region: "La Rioja", codigos: ["380", "3804", "2236", "3825"] },
    { region: "Mendoza", codigos: ["261", "260", "263", "2616"] },
    { region: "Neuquén", codigos: ["299", "2942"] },
    { region: "Entre Ríos", codigos: ["343", "345", "3454", "3446"] },
    { region: "Misiones", codigos: ["376", "3755", "3764", "3757"] },
    { region: "Chubut", codigos: ["2804", "280", "2945"] },
    { region: "Chaco", codigos: ["362", "364", "3735"] },
    { region: "Santa Cruz", codigos: ["2966", "291", "2902"] },
    { region: "Salta", codigos: ["387", "3877"] },
    { region: "Catamarca", codigos: ["383", "3834"] },
    { region: "San Juan", codigos: ["264", "2644"] },
    { region: "San Luis", codigos: ["266", "2665", "2664"] },
    { region: "Tucumán", codigos: ["381", "3863", "3816"] },
    { region: "Jujuy", codigos: ["388"] },
    { region: "Santa Fe", codigos: ["342", "3492", "3415", "3404", "341", "2353", "2473", "2477", "3382", "3401", "3405", "3483" ] },
    { region: "La Pampa", codigos: ["2954", "2334"] },
    { region: "Santiago del Estero", codigos: ["385", "3857", "3856"] },
    { region: "Río Negro", codigos: ["2920", "298"] },
    { region: "Tierra del Fuego", codigos: ["2901"] }
];