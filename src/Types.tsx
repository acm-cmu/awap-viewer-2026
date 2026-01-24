export type FoodName = "EGG" | "ONIONS" | "MEAT" | "NOODLES" | "SAUCE";

export type Food = {
    type: "Food";
    food_name: FoodName;
    food_id: number;
    chopped: boolean;
    cooked_stage: 0 | 1 | 2
}

export type Plate = {
    type: "Plate";
    dirty: boolean;
    food: Food[];
}

export type Order = {
    order_id: number,
    required: FoodName[];
    created_turn: number;
    expires_turn: number;
    reward: number;
    penalty: number;
    claimed_by: null | number;
    completed_turn: null | number;
}

export type Pan = {
    type: "Pan";
    food: null | Food
}

export type Item = Pan | Food | Plate;

export interface BotInfo {
    bot_id: number;
    team: "RED" | "BLUE";
    x: number;
    y: number;
    holding: null | Item;
    map_team: "RED" | "BLUE";
}

export type TileName = "FLOOR" | "WALL" | "COUNTER" |"BOX" |"SINK" | "SINKTABLE"
    | "COOKER" | "TRASH" | "SUBMIT" | "SHOP"

export type ModelName = TileName | "BOT"

export type TileProperties = 
{
    redSrc: string
    blueSrc: string
    scaleX: number
    scaleZ: number
    scaleY: number
    yOffset: number
    rotationY: number
}

export type TileInfoType = Record<ModelName, TileProperties>

export type MapTile = {
    tile_name: TileName;
    is_walkable: boolean;
    item?: null | Item;
    cook_progress?: number;
    count?: number;
    num_dirty_plates?: number;
    curr_dirty_plate_progress?: number;
    num_clean_plates?: number
    using?: boolean;
}

export type Map = MapTile[][]

export type FoodProperties = 
{
    unchoppedSrc: string
    choppedSrc: string
    scaleX: number
    scaleZ: number
    scaleY: number
}

export type FoodInfoType = Record<FoodName, FoodProperties[]>

export type PlateProperties =
{
    redSrc: string;
    blueSrc: string;
    yOffset: number;
    height: number;
    stackHeight: number;
}

export type PlateInfoType = Record<"Plate" | "Pan", PlateProperties>

export interface Turn {
    turn: number;
    team_money: {RED: number; BLUE: number};
  bots: BotInfo[];
    orders: {
        RED: Order[];
        BLUE: Order[];
    };
    red_map: Map;
    blue_map: Map;
}

export interface Replay {
  winner: string;
  turns: number;
  switch_turn_start: number;
  switch_turn_end: number;
  replay: Turn[];
}