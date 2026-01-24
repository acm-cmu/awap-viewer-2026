import type { ReactNode } from 'react';
import FoodModel from "./FoodModel"
import { PlateInfo } from "./FoodModelConst";
import { Gltf } from "@react-three/drei";
import type { Food } from "../../Types";

type FoodHolderProps = {
  i: number;
  j: number;
  groundOffset: number;
  side: "RED" | "BLUE";
  type: "Plate" | "Pan" | "Food";
  foods: Food[]
  count: number
}

const FoodHolder = ({i, j, type, side, groundOffset, foods, count } : FoodHolderProps) => {
    const height = type == "Food" ? 0 : PlateInfo[type].height;
    const yOffset = type == "Food" ? -0.1 : PlateInfo[type].yOffset;
    const singleHeight = (type == "Food" ? 0 : PlateInfo[type].stackHeight) + 0.01 * foods.length;
    
    const itemModels: ReactNode[] = [];
    for (let c=0; c < count; c++) {
        const foodModels: ReactNode[] = [];
        for (let k=0; k < foods.length; k++) {
            let currFood : Food = foods[k];
            let cookStage : number = 0;

            if (currFood.food_name == "MEAT" || currFood.food_name == "EGG") {
                cookStage = currFood.cooked_stage;
            }

            foodModels.push(
                (
                    <FoodModel height={height + 0.01 * k} type={currFood.food_name} 
                            chopped={currFood.chopped} cookedStage={cookStage}/>
                )
            );
        }
        itemModels.push(
            <group position={[0.51 * i, 0.25 + singleHeight * c + yOffset + groundOffset, 0.51 * j] }>
                {type == "Food" ? <></>
                : <Gltf 
                    src={side == "RED" ? PlateInfo[type].redSrc : PlateInfo[type].blueSrc} />
                }
                {foodModels}
            </group>
        )
    }
  
    return (
        <>
            {itemModels}
        </>
  )
}

export default FoodHolder