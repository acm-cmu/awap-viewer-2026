import type { FoodName } from "../../Types";
import { Gltf } from "@react-three/drei";
import { FoodTileInfo } from "./FoodModelConst";

type FoodProps = {
  i: number;
  j: number;
  xOffset?: number;
  zOffset?: number;
  height: number;
  type: FoodName;
  cookedStage: number;
  chopped: boolean;
}

const FoodModel = ({i, j, xOffset=0, zOffset=0, height, type, cookedStage, chopped}: FoodProps) => {
  return (
    <group position={[0.51 * i + xOffset, 0.25 + height + FoodTileInfo[type][cookedStage].yOffset, 0.51 * j + zOffset]}>
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