import type { TileName, MapTile } from "../../Types";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import SliceFish from "../../assets/models/anchovies_Slice_Fish_0.glb";

type TileProps = {
  i: number;
  j: number;
  side: "RED" | "BLUE"
};

const MapTile = (props: TileProps) => {
  const gltf = useLoader(GLTFLoader, SliceFish)
  return (
    <group position={[0, 1, 0]} >
      <primitive object={gltf.scene}></primitive>
    </group>
  )
}

export default MapTile