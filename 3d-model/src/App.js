import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
OBJLoader(THREE)
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// class App extends Component{

//   componentDidMount() {
//     // === THREE.JS CODE START ===
//     var scene = new THREE.Scene();
//     var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
//     var renderer = new THREE.WebGLRenderer();
//     renderer.setSize( window.innerWidth, window.innerHeight );
//     document.body.appendChild( renderer.domElement );
//     var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//     var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//     var cube = new THREE.Mesh( geometry, material );
//     scene.add( cube );
//     camera.position.z = 5;
//     renderer.render( scene, camera );
//     var animate = function () {
//       requestAnimationFrame( animate );
//       cube.rotation.x += 0.01;
//       cube.rotation.y += 0.01;
//       renderer.render( scene, camera );
//     };
//   //  animate();
//     // === THREE.JS EXAMPLE CODE END ===
//   }

//   render(){
//     return(
//       <div/>
//     )
//   }
// }


const style = {
  height: 600 // we can control scene size by setting container dimensions
};

class App extends Component {
  componentDidMount() {
      this.sceneSetup();
      this.addCustomSceneObjects();
      
      this.startAnimationLoop();
      
      window.addEventListener('resize', this.handleWindowResize);
      
  }

  componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowResize);
      window.cancelAnimationFrame(this.requestID);
      this.controls.dispose();
  }

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
      // get container dimensions and use them for scene sizing
      const width = this.mount.clientWidth;
      const height = this.mount.clientHeight;

      this.scene = new THREE.Scene();
      console.log("Scene defined")
      this.camera = new THREE.PerspectiveCamera(
          75, // fov = field of view
          width / height, // aspect ratio
          0.1, // near plane
          1000 // far plane
      );
      this.camera.position.z = 9; // is used here to set some distance from a cube that is located at z = 0
      // OrbitControls allow a camera to orbit around the object
      // https://threejs.org/docs/#examples/controls/OrbitControls
      this.controls = new OrbitControls( this.camera, this.mount );
//       var loader = new OBJLoader(); 
// loader.load(

//  'cube.obj',

//  function ( object ) {
//      this.scene.add( object );
//     // this.renderer.render( this.scene, this.camera );
//  });
// console.log(loader)
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize( width, height );
      this.mount.appendChild( this.renderer.domElement ); // mount using React ref
  };

  // Here should come custom code.
  // Code below is taken from Three.js BoxGeometry example
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  addCustomSceneObjects = () => {
    //   const geometry = new THREE.BoxGeometry(2, 2, 2);
    //   const material = new THREE.MeshPhongMaterial( {
    //       color: 0x156289,
    //       emissive: 0x072534,
    //       side: THREE.DoubleSide,
    //       flatShading: true
    //   } );
    //   this.cube = new THREE.Mesh( geometry, material );
    //   this.scene.add( this.cube );

    //   const lights = [];
    //   lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    //   lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    //   lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

    //   lights[ 0 ].position.set( 0, 200, 0 );
    //   lights[ 1 ].position.set( 100, 200, 100 );
    //   lights[ 2 ].position.set( - 100, - 200, - 100 );

    //   this.scene.add( lights[ 0 ] );
    //   this.scene.add( lights[ 1 ] );
    //   this.scene.add( lights[ 2 ] );
       var loader = new OBJLoader();
       var scene = this.scene
       var render = this.renderer
      // console.log(loader) 
//     //   loader.setPath('/public/assets/meshes/')
//     //   loader.setResourcePath('/public/assets/meshes/')
loader.load('/public/IronMan.obj',

 function ( object ) {
     console.log("Loaded object")
     console.log(object)
     object.position.y -= 60
     //this.scene.add(object)
     scene.add( object );
     //render.render( this.scene, this.camera );
 },
 
 function ( error ) {
     //console.log(loader)
  console.log(error)
  console.log( 'An error happened' );

}
 );
 //this.scene.add(loader.object)
 this.startAnimationLoop();
  };

  startAnimationLoop = () => {
      // this.cube.rotation.x += 0.01;
      // this.cube.rotation.y += 0.01;

      this.renderer.render( this.scene, this.camera );

      // The window.requestAnimationFrame() method tells the browser that you wish to perform
      // an animation and requests that the browser call a specified function
      // to update an animation before the next repaint
      this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
    
      const width = this.mount.clientWidth;
      const height = this.mount.clientHeight;

      this.renderer.setSize( width, height );
      this.camera.aspect = width / height;

      // Note that after making changes to most of camera properties you have to call
      // .updateProjectionMatrix for the changes to take effect.
      this.camera.updateProjectionMatrix();
  };

  render() {
      return <div style={style} ref={ref => (this.mount = ref)} />;
  }
}



export default App;
