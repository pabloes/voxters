import {createVoxter} from "../../common/voxter/voxter";

const root = new Entity();
engine.addEntity(root);

const voxter = createVoxter({
  position:new Vector3(8,1,8),
  rotation:Quaternion.Zero(),
  dna:0
});

voxter.setParent(root);