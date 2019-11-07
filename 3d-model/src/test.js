import React, { Suspense,useRef, Component } from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame,useThree, extend, useLoader } from "react-three-fiber";
// import { unstable_createResource as createResource } from 'react-cache';
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
// import delay from 'delay';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import * as THREE from "three";
extend({ OrbitControls })
// import './styles.css';

function Thing() {
  const ref = useRef();
//   useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));
  return (
    <mesh
      ref={ref}
      onClick={e => console.log("click")}
      onPointerOver={e => console.log("hover")}
      onPointerOut={e => console.log("unhover")}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
}

function Asset({url}){
  let mat = useLoader(MTLLoader,'/public/IronMan.mtl')
    const objec = useLoader(OBJLoader,url, object =>
      {
        
        object.setMaterials(mat)
        console.log(object)
      })
    const loader = new OBJLoader();
       loader.load(url,
        function(obj)
        {
          console.log("loaded")
         // console.log(obj)
        });
       // const objec = useLoader(OBJLoader,url)
    console.log(objec)
    
    loader.setMaterials(mat)
   // console.log(loader)
    //console.log(mat)
    //objec.setMaterials(mat)

    //let mtlLoader = new MTLLoader();

    //let objLoader = new OBJLoader();
    
    // mtlLoader.load('/public/IronMan.mtl', (materials) => {
    //   materials.preload()
    //   objLoader.setMaterials(materials)
    //   objLoader.load('./test.obj', (object) => {
    //     scene.add(object)
    //   })
    // })

    return (
    <mesh material-color='red'>
      <primitive object={objec}/>
      <meshBasicMaterial attach="material" color="yellow" transparent />
      </mesh>
    )
    
}



// Creates a cached async resource
// const resource = createResource(
//     file =>
//       new Promise(
//         async res => (
//           await delay(1000), new OBJLoader().load(file, res)
//         )
//       )
//   )
  
//   function Model({ file }) {
//     // Read from cache ... this will throw an exception which will be caught by <Suspense />
//     const { scene } = resource.read(file)
//     console.log(scene)
//     // It won't come to this point until the resource has been fetched
//     return <primitive object={scene} position={[0, -5, 0]} />
//   }


export function Controls() {
    const ref = useRef()
    const { camera, gl } = useThree()
    useFrame(() => ref.current.update())
    return <orbitControls ref={ref} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} rotateSpeed={0.5} />
  }

export default class Test extends Component {
  render() {
    return (
      <Canvas>
        {/* <Thing /> */}
        <Controls />
        {/* <meshBasicMaterial attach='material'></meshBasicMaterial>
        <Suspense fallback={<Thing />}>{<Asset url='/public/IronMan.obj' />}</Suspense> */}
        {/* <mesh visible userData={{ test: 'hello' }} position={[1, 2, 3]} rotation={[0, 0, 0]}> */}
  {/* <sphereGeometry attach="geometry" args={[1, 16, 16]} /> */}
<Suspense fallback={<Thing />}>{<Asset url='/public/IronMan.obj' />}</Suspense> 
  {/* <meshBasicMaterial attach="material" color="red" transparent /> */}
{/* </mesh> */}
      </Canvas>
    );
  }
}
