import { VoxtersPet } from "../metas/voxterspet/voxterspet";
import { getUserData } from "@decentraland/Identity";
import { getCurrentRealm } from "@decentraland/EnvironmentAPI";

export type Props = {
}
   
export default class Voxter implements IScript<Props> {
  init() { 
    
    new GLTFShape('metas/voxterspet/accesories/acc1.glb');
    new GLTFShape('metas/voxterspet/accesories/acc2.glb');
    new GLTFShape('metas/voxterspet/accesories/acc3.glb');
    new GLTFShape('metas/voxterspet/accesories/acc4.glb');
    new GLTFShape('metas/voxterspet/accesories/acc5.glb');
    new GLTFShape('metas/voxterspet/accesories/acc6.glb');
    new GLTFShape('metas/voxterspet/accesories/acc7.glb');
    new GLTFShape('metas/voxterspet/accesories/acc8.glb');
    new Texture('metas/voxterspet/images/sprites2048.png',{samplingMode:1, hasAlpha:true});
    console.log("VERSION 5");
  }

  spawn(host: Entity, props: Props, channel: IChannel) {    
    log("spawning voxter v5")
    const landOwnerData = {
      host_data: `{
      "voxterspet": {
        "position": {
          "x": 8,
          "y": 0.8,
          "z": 8
        },
        "rotation": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "scale": {
          "x": 1,
          "y": 1,
          "z": 1
        },
        "serverWs":"wss://mana-fever.com/voxters-pet/"
      }
    }`
    };
    engine.addSystem(new VoxtersPet({
      getUserData,
      getCurrentRealm,
    },landOwnerData));
    console.log("voxterspet system instantiated")
  }
}
  