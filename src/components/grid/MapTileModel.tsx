import type { ModelName } from "../../Types";
import { Gltf } from "@react-three/drei";
// import Shop from "../../assets/models/shop.glb";
import { TileInfo } from "./MapTileConst";

type TileProps = {
  i: number;
  j: number;
  side: "RED" | "BLUE"
  type: ModelName
  hideWalls: boolean
};

const MapTileModel = (props: TileProps) => {
  return (
    (props.hideWalls && props.type == "WALL") ? <></> :
    <group position={[0.51 * props.i, 0.25 + TileInfo[props.type].yOffset, 0.51 * props.j] } >
      <Gltf 
        src={props.side == "RED" ? TileInfo[props.type].redSrc : TileInfo[props.type].blueSrc} 
        scale-x={TileInfo[props.type].scaleX} 
        scale-y={TileInfo[props.type].scaleY}
        scale-z={TileInfo[props.type].scaleZ}
        rotation={[0,TileInfo[props.type].rotationY * Math.PI / 180,0]}
         />
    </group>
  )
}

export default MapTileModel