import { Suspense } from "react";
import FoodModel from "./FoodModel"
import { PlateInfo } from "./FoodModelConst";
import { Gltf } from "@react-three/drei";
import type { Food } from "../../Types";

type FoodHolderProps = {
  i: number;
  j: number;
  type: "PLATE" | "PAN"
}

const FoodHolder = ({i, j} : FoodHolderProps) => {
  return (
    <Suspense>
        <group position={[0.51 * i, 0.25 + PlateInfo[type].yOffset, 0.51 * j] }>
            <Gltf 
                src={PlateInfo[type].blueSrc} />
        </group>
    </Suspense>
  )
}

export default FoodHolder