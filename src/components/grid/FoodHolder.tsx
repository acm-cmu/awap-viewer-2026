import { Suspense } from "react";
import FoodModel from "./FoodModel"
import { PlateInfo } from "./FoodModelConst";
import { Gltf } from "@react-three/drei";
import type { Food } from "../../Types";

type FoodHolderProps = {
  i: number;
  j: number;
  type: "PLATE" | "PAN" | "NONE"
}

const FoodHolder = ({i, j, type} : FoodHolderProps) => {
  return (
    <Suspense>
        { type == "NONE" ?
        <></> :
        <group position={[0.51 * i, 0.25 + PlateInfo[type].yOffset, 0.51 * j] }>
            <Gltf 
                src={PlateInfo[type].redSrc} />
            <FoodModel height={PlateInfo[type].height} type='MEAT' chopped={false} cookedStage={0}/>
            <FoodModel height={PlateInfo[type].height + 0.01} type='ONIONS' chopped={false} cookedStage={0}/>
            <FoodModel height={PlateInfo[type].height + 0.02} type='NOODLES' chopped={false} cookedStage={0}/>
            <FoodModel height={PlateInfo[type].height + 0.03} type='EGG' chopped={false} cookedStage={1}/>
            <FoodModel height={PlateInfo[type].height + 0.06} type='SAUCE' chopped={false} cookedStage={0}/>
            <FoodModel height={PlateInfo[type].height + 0.05} type='ONIONS' chopped={true} cookedStage={0}/>
            <FoodModel height={PlateInfo[type].height+ 0.04} type='MEAT' chopped={false} cookedStage={1}/>
        </group>
        }
    </Suspense>
  )
}

export default FoodHolder