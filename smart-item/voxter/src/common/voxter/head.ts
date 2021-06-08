
export const createHead = (boxter:Entity, index:number) => {  
    const shapes = [
        new GLTFShape(`models/accessories/acc1.glb`),
        new GLTFShape(`models/accessories/acc2.glb`),
        new GLTFShape(`models/accessories/acc3.glb`),
        new GLTFShape(`models/accessories/acc4.glb`),
        new GLTFShape(`models/accessories/acc5.glb`),
        new GLTFShape(`models/accessories/acc6.glb`),
        new GLTFShape(`models/accessories/acc7.glb`),
        new GLTFShape(`models/accessories/acc8.glb`)
    ];    
    const head = new Entity();
    head.addComponent(new Transform({position:new Vector3(0,0,0)}))
    head.getComponent(Transform).rotate(Vector3.Up(), 180)
    if(index) head.addComponent(shapes[index-1]);
    head.setParent(boxter);

    return {
        applyIndex:(index:number)=>{      
            if(index){
                head.addComponentOrReplace(shapes[index-1]);
            }      else{
                head.removeComponent(GLTFShape);
            }
            
            
        }
    }
}