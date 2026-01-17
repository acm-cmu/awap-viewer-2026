import { useGLTF } from "@react-three/drei";
import Shop from "../../assets/models/shop2.glb";
import Cooker from "../../assets/models/cooker.glb";
import Counter from "../../assets/models/counter.glb";
import Sink from "../../assets/models/basic_sink.glb";
import RedFlag from "../../assets/models/flag.glb";
import BlueFlag from "../../assets/models/blue_flag.glb";
import RedCube from "../../assets/models/cube.glb";
import BlueCube from "../../assets/models/blue_cube.glb";
import RedFloor from "../../assets/models/floor.glb";
import BlueFloor from "../../assets/models/floor_blue.glb";
import Trashcan from "../../assets/models/trashcan.glb";
import SinkTable from "../../assets/models/sink_table.glb";
import Box from "../../assets/models/stylized_wooden_crate.glb";

import RedCat from "../../assets/models/cat.glb";
import BlueCat from "../../assets/models/cat_blue.glb";
import type { TileInfoType } from "../../Types";

export const TileInfo : TileInfoType = {
    "SHOP": {
        redSrc: Shop,
        blueSrc: Shop,
        scaleX: 0.18,
        scaleZ: 0.25,
        scaleY: 0.18,
        yOffset: -0.12,
        rotationY: 0
    },
    "COOKER": {
        redSrc: Cooker,
        blueSrc: Cooker,
        scaleX: 0.25,
        scaleZ: 0.25,
        scaleY: 0.3,
        yOffset: -0.12,
        rotationY: 0
    },
    "COUNTER": {
        redSrc: Counter,
        blueSrc: Counter,
        scaleX: 0.25,
        scaleZ: 0.25,
        scaleY: 0.3,
        yOffset: -0.12,
        rotationY: 0
    },
    "SINK": {
        redSrc: Sink,
        blueSrc: Sink,
        scaleX: 0.5,
        scaleZ: 0.5,
        scaleY: 0.25,
        yOffset: -0.05,
        rotationY: -90
    },
    "SUBMIT": {
        redSrc: RedFlag,
        blueSrc: BlueFlag,
        scaleX: 0.1,
        scaleZ: 0.1,
        scaleY: 0.1,
        yOffset: -0.15,
        rotationY: 0
    },
    "WALL": {
        redSrc: RedCube,
        blueSrc: BlueCube,
        scaleX: 0.25,
        scaleZ: 0.25,
        scaleY: 0.62,
        yOffset: 0.5,
        rotationY: 0
    },
    "TRASH": {
        redSrc:Trashcan,
        blueSrc: Trashcan,
        scaleX: 0.25,
        scaleZ: 0.25,
        scaleY: 0.22,
        yOffset: -0.12,
        rotationY: 0
    },
    "SINKTABLE": {
        redSrc:SinkTable,
        blueSrc: SinkTable,
        scaleX: 0.25,
        scaleZ: 0.25,
        scaleY: 0.3,
        yOffset: -0.12,
        rotationY: 0
    },
    "BOX": {
        redSrc:Box,
        blueSrc: Box,
        scaleX: 0.2,
        scaleZ: 0.2,
        scaleY: 0.19,
        yOffset: -0.12,
        rotationY: 0
    },
    "FLOOR": {
        redSrc: RedFloor,
        blueSrc: BlueFloor,
        scaleX: 0.5,
        scaleZ: 0.51,
        scaleY: 0.2,
        yOffset: -0.11,
        rotationY: 0
    },
    "BOT": {
        redSrc: RedCat,
        blueSrc: BlueCat,
        scaleX: 0.22,
        scaleZ: 0.22,
        scaleY: 0.25,
        yOffset: 0.15,
        rotationY: 90
    }
}

Object.keys(TileInfo).forEach((tile) => {
    useGLTF.preload(TileInfo[tile].redSrc);
    if (TileInfo[tile].blueSrc != TileInfo[tile].redSrc) {
        useGLTF.preload(TileInfo[tile].blueSrc);
    }
});