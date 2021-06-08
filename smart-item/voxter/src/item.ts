import {createVoxter} from "./common/voxter/voxter";
import { TrackUserFlag } from './common/faceUerSystem'
export type Props = {
    tokenId?: number,
    followActive?: boolean,
    followLockAxis?: boolean,
    followSpeed?: number,
    clickable?: boolean,
    onClick? : Actions,
    onClickText?: string,
    clickButton?: ActionButton,
    showBody?: boolean
  }
   
declare enum ActionButton {
  POINTER = 'POINTER',
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  ANY = 'ANY'
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
          dna:Number(props.tokenId)||32771,
          showBody: props.showBody===undefined || props.showBody
    });
    voxter?.setParent(host)

    let turningSpeed:number = Number(props.followSpeed)||2;
    let isActive:boolean = props.followActive;
    let lockXZRotation:boolean = props.followLockAxis;
    
    host.addComponent(new TrackUserFlag(lockXZRotation, turningSpeed ? turningSpeed : undefined,isActive))

    if(props.clickable){
      voxter.getEntity().addComponent(
            new OnPointerDown(
              () => {
                //if (this.active[host.name]) {
                  channel.sendActions(props.onClick)
                //}
              },
              {
                button: props.clickButton,
                hoverText: props.onClickText,
                distance: 6
              }
            )
          )
    }

    channel.request<number>('tokenId', (tokenId:number) => (voxter.applyDna(tokenId) && tokenId))
    channel.reply<number>('tokenId', () => voxter.getDna())

    channel.handleAction('changeTokenId', (action) => {
      voxter.applyDna(action.values.tokenId)
    })
    channel.handleAction('changeRandomTokenId', (action) => {
      voxter.applyDna(Math.ceil(Math.random()*258047))
    })
    channel.handleAction('activateFollow', (action) => {
      voxter.getEntity().getParent().getComponent(TrackUserFlag).active=true
    })
    channel.handleAction('deactivateFollow', (action) => {
      voxter.getEntity().getParent().getComponent(TrackUserFlag).active=false
    })
    channel.handleAction('putOnItem', (action) => {
      //to enable, must keep track of original host to put back when done
      //do to host or //voxter.getEntity()?
      //host.setParent(Attachable.FIRST_PERSON_CAMERA)
      //host.addComponentOrReplace(new Transform({position:new Vector3(0,0,0)}))
      //voxter.getEntity().setParent(null);
      voxter.getEntity().getComponent(Transform).position=new Vector3(0,0,0)
      voxter.getEntity().setParent(Attachable.FIRST_PERSON_CAMERA);
    })
    channel.handleAction('takeOffItem', (action) => {
      //voxter.getEntity().getParent().getComponent(TrackUserFlag).active=false
      //voxter.getEntity().setParent(null);
      voxter.getEntity().setParent(host);
      voxter.getEntity().getComponent(Transform).position=new Vector3(0,0.5,0)
      //put down where? where standing on ground? in space? etc. where last left?

      //voxter.getEntity().setParent(Attachable.FIRST_PERSON_CAMERA);
    })
                

  }
}
  