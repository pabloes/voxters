import { VoxtersPet } from "../metas/voxterspet/voxterspet";
import { getUserData } from "@decentraland/Identity";
import { getCurrentRealm } from "@decentraland/EnvironmentAPI";

export type Props = {
}
   
export default class Voxter implements IScript<Props> {
  init() { 
      
  }

  spawn(host: Entity, props: Props, channel: IChannel) {    
    log("spawning voxter")
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
    new VoxtersPet({
      getUserData,
      getCurrentRealm,
    },landOwnerData);

  }
}
  