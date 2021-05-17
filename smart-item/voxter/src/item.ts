import {createVoxter} from "./common/voxter/voxter";
export type Props = {
    tokenId?: number    
  }
   
export default class Voxter implements IScript<Props> {
  init() { 
    new GLTFShape('models/accesories/acc1.glb');
    new GLTFShape('models/accesories/acc2.glb');
    new GLTFShape('models/accesories/acc3.glb');
    new GLTFShape('models/accesories/acc4.glb');
    new GLTFShape('models/accesories/acc5.glb');
    new GLTFShape('models/accesories/acc6.glb');
    new GLTFShape('models/accesories/acc7.glb');
    new GLTFShape('models/accesories/acc8.glb');
  }

  spawn(host: Entity, props: Props, channel: IChannel) {    
    const voxter = createVoxter({
          position:new Vector3(0,0.5,0),
          rotation:Quaternion.Zero(),
          dna:Number(props.tokenId)||32771
    });
    voxter?.setParent(host)

    channel.request<number>('tokenId', (tokenId:number) => (voxter.applyDna(tokenId) && tokenId))
    channel.reply<number>('tokenId', () => voxter.getDna())
  }
}
  