import { Spawner } from '../node_modules/decentraland-builder-scripts/spawner'
import Voxter, { Props } from './item'

const post = new Voxter()
const spawner = new Spawner<Props>(post)

spawner.spawn(
  'voxter', 
  new Transform({ position: new Vector3(8, 1, 8) }), {
  tokenId: 32771  
})
