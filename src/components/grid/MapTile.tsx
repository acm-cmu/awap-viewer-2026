import type { TileName, MapTile } from "../../Types";
import SliceFish from "../../assets/models/Egg.glb";
import { Gltf } from "@react-three/drei";

type TileProps = {
  i: number;
  j: number;
  side: "RED" | "BLUE"
};

const MapTile = (props: TileProps) => {
  return (
    <group position={[0, 1, 0]} >
      <Gltf src={SliceFish} />
    </group>
  )
}

export default MapTile