
export const createHead = (boxter, index) => {

    const shape = index && new GLTFShape(`models/accesories/acc${index}.glb`);
    const head = new Entity();
    head.addComponent(new Transform({position:new Vector3(0,0,0)}))
    if(index) head.addComponent(shape);
    head.setParent(boxter);

    return {
        applyIndex:(index)=>{
            console.log("head ondex", index);
            const shape = new GLTFShape(`models/accesories/acc${index}.glb`);
            head.addComponentOrReplace(shape);
        }
    }
}