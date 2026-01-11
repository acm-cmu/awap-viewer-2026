import type { TileName, MapTile } from "../../Types";
import { Gltf } from "@react-three/drei";
// import Shop from "../../assets/models/shop.glb";
import { TileInfo } from "./MapTileConst";

type TileProps = {
  i: number;
  j: number;
  side: "RED" | "BLUE"
};

const MapTileModel = (props: TileProps) => {
  return (
    <group position={[0, 0.25, 0]} >
      <Gltf 
        src={TileInfo["SHOP"].src} 
        scale-x={TileInfo["SHOP"].scaleX} 
        scale-y={TileInfo["SHOP"].scaleY}
        scale-z={TileInfo["SHOP"].scaleZ}  />
    </group>
  )
}

export default MapTileModel