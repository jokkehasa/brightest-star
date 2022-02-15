import { useState } from 'react';
/*import { Stage, Layer, Star, Text, Circle, Rect } from 'react-konva';*/
import { Canvas } from '@react-three/fiber';
import {BackSide } from 'three';

function generateObjects() {
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

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}

function SkyView() {
  const [stars, setStars] = useState(generateShapes());
  const [objects, setObjects] = useState(generateObjects());
  const [direction, setDirection] = useState({
    az: 0,
    alt: 0,
  });

  const deg = (rad) => Math.PI / 180 * rad;
  const D = 700;  /* Screen distance in pix */

  const translate = (obj) => {
   /* No rotation yet (z -> viewing direction)*/
      const phi = obj.az;
      const theta = 90 - obj.alt;
   /* Projection */
      const r = D * Math.tan(deg(theta));
      const r1 = r * Math.cos(deg(theta));
      const xi = r1 * Math.cos(Math.PI / 180 * phi);
      const upsilon = r1 * Math.sin(Math.PI / 180 * phi);
   /* Translate to screen coordinates and return */
    return ({
      x: xi + window.innerWidth / 2,
      y: -upsilon + window.innerHeight / 2,
    });
  }

  const handleDragStart = (e) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e) => {
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      })
    );
  };

  return (

    <Canvas>
      <mesh>
        <sphereBufferGeometry attach="geometry" args={[10,10,5]} />
        <meshStandardMaterial
          attach="material"
          color={"black"}
          emissive={0x100030}
          side={BackSide}
        />
      </mesh>
      <mesh rotation={[0.5,0.5,0]}>
        <boxBufferGeometry attach="geometry" args={[1.5, 1.5, 1.5]}/>
        <meshStandardMaterial attach="material" color={0xf95b3c} />
      </mesh>
      <pointLight intensity={1.0} position={[4,5,3]} />
    </Canvas>

/*    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
      <Rect
        x={0}
        y={0}
        width={window.innerWidth}
        height={window.innerHeight}
        fill={"black"}
      />
        <Text text="Try to drag a star" />
        {objects.map((obj) => (
          <Circle
            key={obj.id}
            id={obj.id}
            x={translate(obj).x}
            y={translate(obj).y}
            radius={6 - obj.mag}
            fill={"white"}
          />
        ))}
        {stars.map((star) => (
          <Star
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            numPoints={5}
            innerRadius={20}
            outerRadius={40}
            fill="#89b717"
            opacity={0.8}
            draggable
            rotation={star.rotation}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={star.isDragging ? 10 : 5}
            shadowOffsetY={star.isDragging ? 10 : 5}
            scaleX={star.isDragging ? 1.2 : 1}
            scaleY={star.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
    </Stage>*/
  );
}

export default SkyView;
