
import { Spawner } from '../node_modules/decentraland-builder-scripts/spawner'
import Voxter, { Props } from './item'

const button = new Voxter()
const spawner = new Spawner<Props>(button)

spawner.spawn(
  'screen',
  new Transform({
    position: new Vector3(4, 0, 8),
  }),
  {
    tokenId: 888,
    followActive: true,
    followLockAxis: false,
    followSpeed: 2,
    clickable: true,
    onClickText: "What are you looking at motal?"
  }
)

