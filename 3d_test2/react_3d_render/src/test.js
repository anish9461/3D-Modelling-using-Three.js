import React, { Suspense,useRef, Component } from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame,useThree, extend, useLoader } from "react-three-fiber";
import { unstable_createResource as createResource } from 'react-cache';
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import delay from 'delay';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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
    const objec = useLoader(OBJLoader,url)
    console.log(objec)
    return <primitive object={objec.scene}/>
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
        <Suspense fallback={<Thing />}>{<Asset url='cube.obj' />}</Suspense>
      </Canvas>
    );
  }
}
