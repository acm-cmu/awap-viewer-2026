import type { FoodName } from "../../Types";
import { Gltf } from "@react-three/drei";
import { FoodTileInfo } from "./FoodModelConst";

type FoodProps = {
  xOffset?: number;
  zOffset?: number;
  height: number;
  type: FoodName;
  cookedStage: number;
  chopped: boolean;
}

const FoodModel = ({xOffset=0, zOffset=0, height, type, cookedStage, chopped}: FoodProps) => {
  return (
    <group position={[xOffset, height + FoodTileInfo[type][cookedStage].yOffset, zOffset]}>
      <Gltf 
        src={chopped ?
            FoodTileInfo[type][cookedStage].choppedSrc
          : FoodTileInfo[type][cookedStage].unchoppedSrc
        } 
        scale-x={FoodTileInfo[type][cookedStage].scaleX} 
        scale-y={FoodTileInfo[type][cookedStage].scaleY}
        scale-z={FoodTileInfo[type][cookedStage].scaleZ}
         />
    </group>
  )
}

export default FoodModel