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
}

const FoodHolder = ({i, j, type, side, groundOffset, foods } : FoodHolderProps) => {
    const height = type == "Food" ? 0.1 : PlateInfo[type].height;
    
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
  
    return (
        type == "Food" ?
        <></> :
        (<group position={[0.51 * i, 0.25 + PlateInfo[type].yOffset + groundOffset, 0.51 * j] }>
            <Gltf 
                src={side == "RED" ? PlateInfo[type].redSrc : PlateInfo[type].blueSrc} />
            {foodModels}
            {/* <FoodModel height={PlateInfo[type].height} type='MEAT' chopped={false} cookedStage={0}/>
            <FoodModel height={PlateInfo[type].height + 0.01} type='ONIONS' chopped={false} cookedStage={0}/>
            <FoodModel height={PlateInfo[type].height + 0.02} type='NOODLES' chopped={false} cookedStage={0}/>
            <FoodModel height={PlateInfo[type].height + 0.03} type='EGG' chopped={false} cookedStage={1}/>
            <FoodModel height={PlateInfo[type].height + 0.06} type='SAUCE' chopped={false} cookedStage={0}/>
            <FoodModel height={PlateInfo[type].height + 0.05} type='ONIONS' chopped={true} cookedStage={0}/>
            <FoodModel height={PlateInfo[type].height+ 0.04} type='MEAT' chopped={false} cookedStage={1}/> */}
        </group>)
  )
}

export default FoodHolder