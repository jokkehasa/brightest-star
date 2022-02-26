import { useState, useRef } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { Vector3, MathUtils, BackSide } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

function generateStars() {
  const coords = Array(12*9);
  for (var i = 0; i<9; i++)
    for (var j = 0; j<12; j++)
      coords[i*12 + j] = {
        id: (i*12 + j).toString(),
        alt: i*10,
        az: j*30,
        mag: Math.floor(Math.sqrt(Math.random()) * 6),
      }
  return coords;
}

const distanceToStars = 1000;

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls
            ref={controls}
            args={[camera, domElement]}
            enableZoom={false}
            target={[ 0, 1.5, 0 ]} />;
};

function SkyView(props) {
//  const [stars, setStars] = useState(generateStars());
  const [direction, setDirection] = useState({
    az: 0,
    alt: 0,
  });

//  console.log(props.stars.slice(0, 5));

  return (
    <Canvas style={{width: 1000, height: 600, background: "black"}} camera={{ far: distanceToStars+100, position: [ 0, 1.7, 3 ] }}>
      <CameraControls />
      <mesh>
        <boxBufferGeometry
          attach="geometry"
          args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          attach="material"
          color={0xf95b3c}
          emissive={0x151005}
          metalness={0.7}
          roughness={0.8} />
      </mesh>
      <mesh>
        <sphereBufferGeometry
          attach="geometry"
          args={[ distanceToStars+10, 100, 50 ]}
        />
        <meshBasicMaterial
          attach="material"
          color={0x100030}
//          emissive=
          side={BackSide}
        />
      </mesh>
      <mesh rotation={[ -Math.PI/2, 0, 0 ]}>
        <circleBufferGeometry
          attach="geometry"
          args={[ distanceToStars+10, 100 ]}
        />
        <meshStandardMaterial
          attach="material"
          color={0x442211}
        />
      </mesh>
      {props.stars.filter(({ alt, mag } ) => (
        alt > 0 & mag <= 5
      )).map(({ id, alt, az, mag }) => (
        <mesh
          key={id}
          position={new Vector3().setFromSphericalCoords(
            distanceToStars,
            MathUtils.degToRad(90-alt),
            MathUtils.degToRad(az)
          )}
        >
          <sphereBufferGeometry
            attach="geometry"
            args={[ 7-mag, 4, 2 ]}
          />
          <meshBasicMaterial
            attach="material"
            color="white"
          />
        </mesh>
      ))}
      <group position={new Vector3().setFromSphericalCoords(
              distanceToStars/2,
              MathUtils.degToRad(40),
              MathUtils.degToRad(95)
            )}
      >
        <mesh>
          <sphereBufferGeometry
            attach="geometry"
            args={[ 20, 40, 20 ]}
          />
          <meshBasicMaterial
            attach="material"
            color="white"
          />
        </mesh>
        <pointLight intensity={1.0} />
      </group>
    </Canvas>
  );
}

export default SkyView;
