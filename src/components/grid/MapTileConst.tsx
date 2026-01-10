import { useGLTF } from "@react-three/drei";
import Shop from "../../assets/models/shop.glb";
import type { TileInfoType } from "../../Types";

export const TileInfo : TileInfoType = {
    "SHOP": {
        src: Shop,
        scaleX: 0.2,
        scaleZ: 0.1,
        scaleY: 0.2
    }
}

Object.keys(TileInfo).forEach((tile) => {
    useGLTF.preload(TileInfo[tile].src)
});