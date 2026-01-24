import type { FoodInfoType, PlateInfoType } from "../../Types";
import { useGLTF } from "@react-three/drei";
import SAUCE from "../../assets/models/food/BBQ_Sauce.glb";
import NOODLE from "../../assets/models/food/noodle.glb";
import RAW_EGG from "../../assets/models/food/Raw_Egg.glb";
import COOKED_EGG from "../../assets/models/food/Egg.glb";
import BURNT_EGG from "../../assets/models/food/Burnt_Egg.glb";
import ONION from "../../assets/models/food/onion.glb";
import CHOPPED_ONION from "../../assets/models/food/chopped_onions.glb";

import RAW_MEAT_U from "../../assets/models/food/Raw_Meat.glb";
import COOKED_MEAT_U from "../../assets/models/food/cooked_meat.glb";
import BURNT_MEAT_U from "../../assets/models/food/burnt_meat.glb";
import RAW_MEAT_C from "../../assets/models/food/raw_meat_C.glb";
import COOKED_MEAT_C from "../../assets/models/food/cooked_meat_C.glb";
import BURNT_MEAT_C from "../../assets/models/food/burnt_meat_C.glb";

import BLUE_PAN from "../../assets/models/food/cat_pan_blue.glb";
import RED_PAN from "../../assets/models/food/cat_pan_red.glb";
import BLUE_BOWL from "../../assets/models/food/blue_bowl.glb";
import RED_BOWL from "../../assets/models/food/red_bowl.glb";

// each food type can have up to 6 stages (cooked stage 0, 1, 2 and chopped/unchopped)
export const FoodTileInfo : FoodInfoType = {
    "EGG" : [
        {
            unchoppedSrc: RAW_EGG,
            choppedSrc: RAW_EGG,
            scaleX: 0.8,
            scaleZ: 0.8,
            scaleY: 2,
            yOffset: -0.1
        },
        {
            unchoppedSrc: COOKED_EGG,
            choppedSrc: COOKED_EGG,
            scaleX: 0.6,
            scaleZ: 0.6,
            scaleY: 1,
            yOffset: -0.1
        },
        {
            unchoppedSrc: BURNT_EGG,
            choppedSrc: BURNT_EGG,
            scaleX: 0.6,
            scaleZ: 0.6,
            scaleY: 1,
            yOffset: -0.1
        }
    ],
    "SAUCE" : [
        {
            unchoppedSrc: SAUCE,
            choppedSrc: SAUCE,
            scaleX: 0.65,
            scaleZ: 0.65,
            scaleY: 0.7,
            yOffset: -0.1
        }
    ],
    "ONIONS" : [
        {
            unchoppedSrc: ONION,
            choppedSrc: CHOPPED_ONION,
            scaleX: 0.2,
            scaleZ: 0.2,
            scaleY: 0.12,
            yOffset: -0.1
        }
    ],
    "NOODLES" : [
        {
            unchoppedSrc: NOODLE,
            choppedSrc: NOODLE,
            scaleX: 0.12,
            scaleZ: 0.12,
            scaleY: 0.12,
            yOffset: -0.1
        }
    ],
    "MEAT" : [
        {
            unchoppedSrc: RAW_MEAT_U,
            choppedSrc: RAW_MEAT_C,
            scaleX: 0.6,
            scaleZ: 0.6,
            scaleY: 0.6,
            yOffset: -0.1
        },
        {
            unchoppedSrc: COOKED_MEAT_U,
            choppedSrc: COOKED_MEAT_C,
            scaleX: 0.6,
            scaleZ: 0.6,
            scaleY: 0.6,
            yOffset: -0.1
        },
        {
            unchoppedSrc: BURNT_MEAT_U,
            choppedSrc: BURNT_MEAT_C,
            scaleX: 0.6,
            scaleZ: 0.6,
            scaleY: 0.6,
            yOffset: -0.1
        }
    ]
} as const

export const PlateInfo : PlateInfoType = {
    "Plate" : {
        redSrc: RED_BOWL,
        blueSrc: BLUE_BOWL,
        yOffset: -0.1,
        height: 0.17,
    },
    "Pan" : {
        redSrc: RED_PAN,
        blueSrc: BLUE_PAN,
        yOffset: -0.1,
        height: 0.11,
    }
}



useGLTF.preload(BLUE_PAN);
useGLTF.preload(RED_BOWL);
useGLTF.preload(BLUE_BOWL);
useGLTF.preload(SAUCE);
