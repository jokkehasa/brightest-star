import { useState, useRef } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { Vector3, MathUtils, BackSide } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

function generateStars() {
  const coords = Array(12 * 9);
  for (var i = 0; i < 9; i++)
    for (var j = 0; j < 12; j++)
      coords[i * 12 + j] = {
        id: (i * 12 + j).toString(),
        alt: i * 10,
        az: j * 30,
        mag: Math.floor(Math.sqrt(Math.random()) * 6),
      }
  return coords;
}

const distanceToStars = 700;

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
    target={[0, 1.5, 0]} />;
};

function SkyView(props) {
  //  const [stars, setStars] = useState(generateStars());
  /*  const [direction, setDirection] = useState({
      az: 0,
      alt: 0,
    });*/

  //  console.log(props.stars.slice(0, 5));

  return (
    <Canvas
      style={{
        width: 1000,
        height: 600,
        background: "black",
      }}
      camera={{
        far: distanceToStars + 100,
        position: [0, 1.7, 3],
        aspect: 5 / 3,  // TODO: determine from canvas width and height
        fov: 80,  // vertical field of view in degrees
      }}>
      <CameraControls />
      <mesh name="rustycube">
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
      <mesh name="firmament"
        rotation-y={MathUtils.degToRad(15 * props.lst)}
        rotation-x={MathUtils.degToRad(90 - props.latitude)}
      >
        <sphereBufferGeometry
          attach="geometry"
          args={[distanceToStars, 100, 50]}
        />
        <meshBasicMaterial
          attach="material"
          color={0x100030}
          side={BackSide}
        />
        {props.stars.filter(({ dec, mag }) => (
          dec > 0 & mag <= (props.visibility / 10)
        )).map(({ id, dec, ra, mag }) => (
          <mesh
            key={id}
            position={new Vector3().setFromSphericalCoords(
              distanceToStars,
              MathUtils.degToRad(90 - dec),
              MathUtils.degToRad(15 * ra)
            )}
          >
            <sphereBufferGeometry
              attach="geometry"
              args={[7 - mag, 4, 2]}
            />
            <meshBasicMaterial
              attach="material"
              color="white"
            />
          </mesh>
        ))}

        <mesh name="mars"
          position={new Vector3().setFromSphericalCoords(
            distanceToStars,
            MathUtils.degToRad(90 - props.planets.mars.dec),
            MathUtils.degToRad(15 * props.planets.mars.ra)
          )}
        >
          <sphereBufferGeometry
            attach="geometry"
            args={[20-props.planets.mars.mag, 40, 20]}
          />
          <meshBasicMaterial
            attach="material"
            color="red"
          />
        </mesh>
        <mesh name="venus"
          position={new Vector3().setFromSphericalCoords(
            distanceToStars,
            MathUtils.degToRad(90 - props.planets.venus.dec),
            MathUtils.degToRad(15 * props.planets.venus.ra)
          )}
        >
          <sphereBufferGeometry
            attach="geometry"
            args={[20-props.planets.venus.mag, 40, 20]}
          />
          <meshBasicMaterial
            attach="material"
            color="blue"
          />
        </mesh>
        <mesh name="mercury"
          position={new Vector3().setFromSphericalCoords(
            distanceToStars,
            MathUtils.degToRad(90 - props.planets.mercury.dec),
            MathUtils.degToRad(15 * props.planets.mercury.ra)
          )}
        >
          <sphereBufferGeometry
            attach="geometry"
            args={[20-props.planets.mercury.mag, 40, 20]}
          />
          <meshBasicMaterial
            attach="material"
            color="#00CED1"
          />
        </mesh>
        <mesh name="jupiter"
          position={new Vector3().setFromSphericalCoords(
            distanceToStars,
            MathUtils.degToRad(90 - props.planets.jupiter.dec),
            MathUtils.degToRad(15 * props.planets.jupiter.ra)
          )}
        >
          <sphereBufferGeometry
            attach="geometry"
            args={[20-props.planets.jupiter.mag, 40, 20]}
          />
          <meshBasicMaterial
            attach="material"
            color="#800000"
          />
        </mesh>
        <mesh name="saturn"
          position={new Vector3().setFromSphericalCoords(
            distanceToStars,
            MathUtils.degToRad(90 - props.planets.saturn.dec),
            MathUtils.degToRad(15 * props.planets.saturn.ra)
          )}
        >
          <sphereBufferGeometry
            attach="geometry"
            args={[20-props.planets.saturn.mag, 40, 20]}
          />
          <meshBasicMaterial
            attach="material"
            color="orange"
          />
        </mesh>


      </mesh>
      <mesh name="ground"
        rotation={[-Math.PI / 2, 0, 0]}>
        <circleBufferGeometry
          attach="geometry"
          args={[distanceToStars + 10, 100]}
        />
        <meshStandardMaterial
          attach="material"
          color={0x442211}
        />
      </mesh>
      <group position={new Vector3().setFromSphericalCoords(
        distanceToStars / 2,
        MathUtils.degToRad(40),
        MathUtils.degToRad(95)
      )}
      >
        <mesh name="moon">
          <sphereBufferGeometry
            attach="geometry"
            args={[20, 40, 20]}
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
