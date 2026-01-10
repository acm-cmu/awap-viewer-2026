import type { TileName, MapTile } from "../../Types";
import Model from "../../Models/ModelLoader";

type TileProps = {
  i: number;
  j: number;
  side: "RED" | "BLUE"
};

const MapTile = (props: TileProps) => {
  return (
    <group>
      <Model/>
    </group>
  )
}

export default MapTile