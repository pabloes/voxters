import {createEyes} from './eyes';
import { createMouth } from "./mouth";
import {createHead} from "./head";
import {propertySizes, decode} from '../lib/decoder';

const colors = [
    `#ff0000`,
    `#ff00ff`, 
    `#ffff00`,
    `#ffffff`,
    `#00ff00`,
    `#00ffff`,
    `#0000ff`,  
  ];

const texture = new Texture(`images/sprites2048.png`, {samplingMode:1, hasAlpha:true});
export type VoxterCreationOptions = {
  position:Vector3,
  dna:number,
  rotation:Quaternion
};

export const createVoxter = ({position, dna, rotation}:VoxterCreationOptions) => {   
    const [eyeIndex, mouthIndex, eyeColorIndex, headIndex] = decode(dna, propertySizes);
    const eyeColor = colors[eyeColorIndex];
    const entity = new Entity();
    const skin = new Material();
    skin.albedoColor = new Color3(0,0,0);
    const boxterShape = new BoxShape();
    entity.addComponent(boxterShape);
    entity.addComponent(skin);  
    
    const boxterTransform = new Transform({
      position,
      scale:new Vector3(1,1,1),
      rotation:rotation||Quaternion.Zero()
    });
    entity.addComponent(boxterTransform);
    
    const eyes = createEyes(entity, eyeIndex, eyeColor, texture);
    const mouth = createMouth(entity, mouthIndex, `#ff00ff`, texture);
    const head = createHead(entity, headIndex);    
    
    return {      
      applyDna:(dna:number)=>{
        const [eyeIndex, mouthIndex, colorIndex, headIndex] = decode(dna, propertySizes);

        eyes.applyIndex(eyeIndex);
        eyes.applyColor(colors[colorIndex]);
        mouth.applyIndex(mouthIndex);     
        head.applyIndex(headIndex);
      },
      getEntity:()=>entity,
      setParent:(parent:Entity)=>entity.setParent(parent)
    };
  };
