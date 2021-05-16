import {createVoxter} from "./common/voxter/voxter";
export type Props = {
    tokenId?: number    
  }
   
export default class Voxter implements IScript<Props> {
  init() { }

  spawn(host: Entity, props: Props, channel: IChannel) {
    
    const voxter = createVoxter({
          position:Vector3.Zero(),
          rotation:Quaternion.Zero(),
          dna:props.tokenId||1
    });
    voxter?.setParent(host)

    channel.request<number>('tokenId', (tokenId:number) => (voxter.applyDna(tokenId) && tokenId))
    channel.reply<number>('tokenId', () => voxter.getDna())
  }
}
  