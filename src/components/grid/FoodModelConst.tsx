import { useGLTF } from "@react-three/drei";
import SAUCE from "../../assets/models/food/BBQ_Sauce.glb";
import NOODLE from "../../assets/models/food/noodle.glb";
import RAW_EGG from "../../assets/models/food/Raw_Egg.glb";
import COOKED_EGG from "../../assets/models/food/Egg.glb";
import BURNT_EGG from "../../assets/models/food/Egg.glb";
import ONION from "../../assets/models/food/green_onion.glb";
import CHOPPED_ONION from "../../assets/models/food/chopped_onions.glb";

import RAW_MEAT_U from "../../assets/models/food/Raw_Meat.glb";
import COOKED_MEAT_U from "../../assets/models/food/cooked_meat.glb";
import BURNT_MEAT_U from "../../assets/models/food/burnt_meat.glb";
import RAW_MEAT_C from "../../assets/models/food/raw_meat_C.glb";
import COOKED_MEAT_C from "../../assets/models/food/cooked_meat_C.glb";
import BURNT_MEAT_C from "../../assets/models/food/burnt_meat_C.glb";

import PAN from "../../assets/models/Burnt_Egg.glb";
import BLUE_BOWL from "../../assets/models/food/blue_bowl.glb";
import RED_BOWL from "../../assets/models/food/red_bowl.glb";

export const FoodTileInfo = {
    "SAUCE" : {
        src: SAUCE,
        scaleX: 0.15,
        scaleZ: 0.09,
        scaleY: 0.2,
        yOffset: 0.07
    }
}

export const PlateInfo = {
    "PLATE" : {
        redSrc: RED_BOWL,
        blueSrc: BLUE_BOWL,
        scaleX: 0.15,
        scaleZ: 0.09,
        scaleY: 0.2,
        yOffset: 0.07,
        placeOffset: 0.2,
        rotation: 0
    },
    "PAN" : {
        redSrc: PAN,
        blueSrc: PAN,
        scaleX: 0.15,
        scaleZ: 0.09,
        scaleY: 0.2,
        yOffset: 0.1,
        placeOffset: 0.2,
        rotation: 0
    }
}


Object.keys(FoodTileInfo).forEach((tile) => {
    useGLTF.preload(FoodTileInfo[tile].src);
});

useGLTF.preload(PAN);
useGLTF.preload(RED_BOWL);
useGLTF.preload(BLUE_BOWL);
