export const createMouth = (boxter, variationIndex, color, texture) => {

    const eyes = new Entity();
    eyes.setParent(boxter);
    const mat = new Material();
    const eyeShape = new PlaneShape();
    eyeShape.withCollisions = false;

    eyeShape.uvs = getUvs(variationIndex+1);
   
    eyes.addComponent(eyeShape);
    const EYE_HEIGHT = 78/256;
    const MOUTH_HEIGHT = 114/256;
    const EYEBROWN_HEIGHT = 32/256;
    const NECK_HEIGHT = 32/256;

    eyes.addComponent(new Transform({
      //position:new Vector3(0,-((1/3)/2),0.5001), 
      position:new Vector3(0,-((1/3)/2),0.5009), 
      scale:new Vector3(1-0.05,2/3-0.05, 1)
    }));
    eyes.getComponent(Transform).rotate(Vector3.Up(), 180)
   // mat.albedoColor = Color3.Yellow();
    mat.specularIntensity = 0;
    mat.roughness = 1;
    mat.albedoTexture = texture;
    mat.alphaTexture = texture;
    mat.emissiveTexture = texture;
    mat.emissiveIntensity = 1.2;
    mat.emissiveColor = new Color3(1,1,1); 

    eyes.addComponent(mat);
    return {
      applyIndex:(variationIndex)=>{
        eyeShape.uvs = getUvs(variationIndex+1)
      }
    }
    function getUvs(variationIndex){
      let spriteCols = 8   // number of columns
      let spriteRows = 8   // number of rows
      let currentSpriteCell = variationIndex;   // starting position
  
      // Calculated variables
      let h2Fac = 63/128;
      let h1Fac = 55/128;
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