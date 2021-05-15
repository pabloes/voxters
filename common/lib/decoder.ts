export const propertySizes = [64, 64, 7, 9];
export const properties  = [
    "eye", "mouth", "eye_color", "head"
];


export enum COLOR {
    RED,    
    PINK,
    YELLOW,
    WHITE,
    GREEN,
    TURQUOISE,
    BLUE
};

export function decode(dna, propertySizes){
    const results = [];
    
    let i = 0;
    let factor = 1;
    while(i < propertySizes.length){
        results.push( Math.floor(dna/factor)%propertySizes[i] );
        factor = factor * propertySizes[i];

        i++;
    }

    return results;
}

export function maximumNumber(propertySizes){
    let i = 0;
    let factor = 1;
    while(i < propertySizes.length){        
        factor *= propertySizes[i];
        i++
    }
    return factor-1;
}

export function getDna({eyeIndex, mouthIndex, eyeColorIndex, headIndex}){
    return encode(propertySizes, [eyeIndex, mouthIndex, eyeColorIndex, headIndex])
}

export function encode(propertySizes, propertyValues){
    let i = 0;
    let dna = 0;
    let factor = 1;
    while(i < propertySizes.length){        
        dna = dna + ( propertyValues[i] * factor );
        factor *= propertySizes[i];

        i++;
    }
    return dna;
}

export function getEncoder(properties, propertySizes){
    return function(dna){
        const decoded = decode(dna, propertySizes);
        return properties.reduce((acc, current, index)=>{
            acc[current] = decoded[index];
            return acc;
        },{});
    }
}

//TODO add metadata