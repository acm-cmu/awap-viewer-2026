import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

type GridProps = {
  i: number;
  j: number;
};

const Grid = (props: GridProps) => {
  const ref = useRef()
  // delta is difference in time between frames
  useFrame((state, delta) => {
    // ref.current.rotation.x += delta
  })
  return (
    <mesh position={[1.01 * props.i,0, 1.01 * props.j]} ref={ref}>
        <boxGeometry args={[1,1,1]}/>
        <meshStandardMaterial color="#874e16"/>
    </mesh>
  )
}

export default Grid