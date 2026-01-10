import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

type GridProps = {
  i: number;
  j: number;
  side: "RED" | "BLUE"
};

const Grid = (props: GridProps) => {
  return (
    <mesh position={[0.51 * props.i,0, 0.51 * props.j]}>
        <boxGeometry args={[0.5,0.25,0.5]}/>
        <meshStandardMaterial color={props.side == "RED" ? "#B85664" : "#4190D4"}/>
    </mesh>
  )
}

export default Grid