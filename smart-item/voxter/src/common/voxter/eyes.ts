import { COLOR } from "../lib/decoder";
const colors = [
  `#ff0000`,
  `#ff00ff`, 
  `#ffff00`,
  `#ffffff`,
  `#00ff00`,
  `#00ffff`,
  `#0000ff`,  
];
const emissiveByColor = [
  8,
  6,
  4,
  4,
  4,
  4,
  10
];

export const createEyes = (boxter, variationIndex, color, texture) => {
    const eyes = new Entity();
    eyes.setParent(boxter);
    //CACHE!?!
    const mat = new Material();
    const eyeShape = new PlaneShape();
    eyeShape.withCollisions = false;
    eyeShape.uvs = getUvs(variationIndex+1);
    eyes.addComponent(eyeShape);    
    eyes.addComponent(new Transform({
      //position:new Vector3(0,1/3-0.025,-0.5001), 
      position:new Vector3(0,1/3-0.025,0.5009), 
      scale:new Vector3(1-0.05,1/3, 1)
    }));
    eyes.getComponent(Transform).rotate(Vector3.Up(), 180)
   // mat.albedoColor= Color3.FromHexString(color);
    mat.emissiveColor = Color3.FromHexString(color);
    mat.emissiveIntensity = emissiveByColor[colors.indexOf(color)];
    mat.albedoTexture = texture;
    mat.alphaTexture = texture; 
    eyes.addComponent(mat);
    return {
      applyIndex,
      applyColor:(color)=>{
      //  mat.albedoColor= Color3.FromHexString(color);
        mat.emissiveColor = Color3.FromHexString(color); 
        mat.emissiveIntensity = emissiveByColor[colors.indexOf(color)];
      }
    };

    function applyIndex(variationIndex){
      eyeShape.uvs =getUvs(variationIndex+1);
    }
    function getUvs(variationIndex){
      let spriteCols = 8   // number of columns
      let spriteRows = 8   // number of rows
      let currentSpriteCell = variationIndex;   // starting position
  
      // Calculated variables
      let h2Fac = 178/256;
      let h1Fac = 32/256;
      let spriteCels = spriteCols * spriteRows;
      let colFactor = 1/spriteCols;
      let rowFactor = 1/spriteRows;
      let currRowStart = spriteRows - Math.floor((currentSpriteCell-1)/spriteCols) - h1Fac;
      let currColStart = ((currentSpriteCell-1) % spriteCols);
  
      const A = (currColStart) * (colFactor);
      const B = (currColStart+1) * (colFactor);
      const C = (currRowStart-1) * (rowFactor) + h2Fac*rowFactor;
      const D = (currRowStart) * (rowFactor) ;
  
      return [
        0,0,0,0,0,0,0,0,
  
        B, //b
        C, //c
        A, //a
        C, //c
  
        A, //a
        D, //d
        B, //b 
        D, //d
      ];
    }
}