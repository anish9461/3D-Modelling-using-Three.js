import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Test from './test';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Test />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// import React, { useRef } from 'react'
// import ReactDOM from 'react-dom'
// import { Canvas, useFrame } from 'react-three-fiber'
// // import './styles.css'

// function Thing() {
//   const ref = useRef()
//   useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))
//   return (
//     <mesh
//       ref={ref}
//       onClick={e => console.log('click')}
//       onPointerOver={e => console.log('hover')}
//       onPointerOut={e => console.log('unhover')}>
//       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
//       <meshNormalMaterial attach="material" />
//     </mesh>
//   )
// }

// ReactDOM.render(
//   <Canvas>
//     <Thing />
//   </Canvas>,
//   document.getElementById('root')
// )