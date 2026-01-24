import type { ReactNode } from 'react';
import type { MapTile, Item, Food } from '../../Types';
import { useMemo, useState } from 'react';
import { OrbitControls } from '@react-three/drei'
import Grid from '../grid/Grid';
import { useContext } from 'react';
import { ViewerStateContext } from '../pages/Viewer';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import MapTileModel from '../grid/MapTileModel';
import FoodHolder from '../grid/FoodHolder';
import "./PlayCanvas.css"

interface CanvasType {
  side: "RED" | "BLUE"
}

const counterBoxGroundOffset = 0.42;
const cookerGroundOffset = 0.43;
const sinkGroundOffset = 0.35;
const sinkTableGroundOffset = 0.43;
const sinkZOffset = 0.07;
const botGroundOffset = 0.34;
const botZOffset = 0.15;

const PlayerCanvas = ({side} : CanvasType) => {
  const stateContext = useContext(ViewerStateContext);
  const [hideWalls, setHideWalls] = useState<boolean>(true);
      
  if (!stateContext) {
    throw new Error('useViewer must be used within a ViewerProvider');
  }
  
  const turnInfo = useMemo(() => {
    return stateContext.replay!.replay[stateContext.round]
  }, [stateContext.replay, stateContext.round])

  const initCameraY = Math.max(turnInfo.red_map.length, turnInfo.red_map[0].length) / 2;

  const map = useMemo(() => {
    return side == "RED" ? turnInfo.red_map : turnInfo.blue_map
  }, [turnInfo])

  const grid = useMemo(() => {
    const tempArr: ReactNode[][] = []
    // Basic Map
    for (let row = 0; row < map.length; row++) {
      tempArr.push([] as ReactNode[]);
      for (let col = 0; col < map[0].length; col++) {
        tempArr[row]?.push(
          (
            <Grid i={row} j={col} side={side}/>
          ) as ReactNode
        );
      }
    }
    return [tempArr];
  }, [stateContext.replay]);

  const gaps = useMemo(() => {
    const w_gap = (map.length * 0.51 - 0.02) / 2;
    const h_gap = (map[0].length * 0.51 - 0.02) / 2;
    return [w_gap, h_gap]
  }, [stateContext.replay]);

  const plane = useMemo(() => {
    const width = (map.length * 0.51 - 0.02) * 1.1;
    
    const height = (map[0].length * 0.51 - 0.02) * 1.2;

    return (
      <mesh position={[gaps[0] - 0.25, -0.15, gaps[1] - 0.25]}>
        <boxGeometry args={[width,0.05,height]}/>
        <meshStandardMaterial color={side == "RED" ? "#8F3441" : "#2E6AA6"}/>
      </mesh>)
  }, [stateContext.replay])

  const tiles = useMemo(() => {
    const tempArr: ReactNode[][] = []
    // Tile Models 
    for (let row = 0; row < map.length; row++) {
      tempArr.push([] as ReactNode[]);
      for (let col = 0; col < map[0].length; col++) {
        tempArr[row]?.push(
          (
            <MapTileModel i={row} j={col} side={side} 
                          type={map[row][col].tile_name}
                          hideWalls={hideWalls}
                          ></MapTileModel>
          ) as ReactNode
        );
      }
    }
    return [tempArr];
  }, [turnInfo, hideWalls])

  const bots = useMemo(() => {
    const tempArr: ReactNode[] = []
    // Getting bots from map
    for (let k = 0; k < turnInfo.bots.length; k++) {
      if (turnInfo.bots[k].map_team == side) {
          tempArr.push(
          (
            <MapTileModel i={turnInfo.bots[k].x} j={turnInfo.bots[k].y} 
                          side={turnInfo.bots[k].team} 
                          type={"BOT"}
                          hideWalls={hideWalls}
                          ></MapTileModel>
          ) as ReactNode
        );
      }
    }
    return [tempArr];
  }, [turnInfo])

  const foods = useMemo(() => {
    const tempArr: ReactNode[] = []
    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[0].length; col++) {
        let info : MapTile = map[row][col];

        if (info.tile_name == "SINK" || info.tile_name == "SINKTABLE") {
          let num_plates = 0;
          if (info.tile_name == "SINK" &&  info.num_dirty_plates != undefined) {
            num_plates = info.num_dirty_plates;
          } else if (info.tile_name == "SINKTABLE" &&  info.num_clean_plates != undefined) {
            num_plates = info.num_clean_plates;
          }
          tempArr.push(
            (
              <FoodHolder i={row} j={col} side={side} 
                          type={"Plate"}
                          groundOffset={info.tile_name == "SINK" ? sinkGroundOffset : sinkTableGroundOffset}
                          foods={[]}
                          count={num_plates}
                          zOffset={info.tile_name == "SINK" ? sinkZOffset : 0}
              />
            ) as ReactNode
          );
        } if (info.tile_name == "COUNTER" || info.tile_name == "COOKER" || info.tile_name == "BOX") {
          let item : Item | null | undefined = info.item;
          if (item == null || item == undefined) continue;

          let count = 1;
          if (info.tile_name == "BOX" && info.count != undefined) {
            count = info.count;
          }
          
          let foods : Food[] = []; 
          if (item.type == "Food") {
            foods.push(item);
          }
          if(item.type == "Pan" && item.food) {
            foods.push(item.food);
          }
          if(item.type == "Plate" && item.food) {
            foods.push(...item.food);
          }
          tempArr.push(
            (
              <FoodHolder i={row} j={col} side={side} 
                          type={item.type}
                          groundOffset={info.tile_name == "COOKER" ? 
                                        cookerGroundOffset 
                                      : counterBoxGroundOffset}
                          foods={foods}
                          count={count}
              />
            ) as ReactNode
          );
        } 
      }
    }
    // bots holding food
    for (let k = 0; k < turnInfo.bots.length; k++) {
      if (turnInfo.bots[k].map_team == side) {
        let item = turnInfo.bots[k].holding;
        if (item == null) continue;
        let foods : Food[] = []; 
        if (item.type == "Food") {
          foods.push(item);
        }
        if(item.type == "Pan" && item.food) {
            foods.push(item.food);
          }
        if(item.type == "Plate" && item.food) {
          foods.push(...item.food);
        }
        tempArr.push(
          (
            <FoodHolder i={turnInfo.bots[k].x} j={turnInfo.bots[k].y} 
                          side={turnInfo.bots[k].map_team} 
                          type={item.type}
                          groundOffset={botGroundOffset}
                          zOffset={botZOffset}
                          foods={foods}
                          count={1}
                          />
          ) as ReactNode
        );
      }
    }
    return [tempArr];
  }, [turnInfo])

  return (
    <>
      <div className='canvas-controls-container'>
        <button className='canvas-controls' onClick={() => setHideWalls(!hideWalls)} >
        {hideWalls ? "Show Walls" : "Hide Walls"}
        </button>
      
        <Canvas camera={{position: [0,initCameraY,0]}}>
          <OrbitControls />
          <directionalLight position={[2, 4, 3]} intensity={0.5}/>
          <ambientLight color={"white"} intensity={1}/>
          <group position={[-gaps[0], 0, -gaps[1]]}>
            <>{grid}</>
            <>{plane}</>
            <Suspense>
              {tiles} 
            </Suspense>
            <Suspense>
              {bots}
            </Suspense>
            {/* <Suspense>
              <FoodModel i={2} j={2} height={0} type='ONIONS' chopped={false} cookedStage={0}/>
              <FoodModel i={2} j={1} height={0} type='SAUCE' chopped={false} cookedStage={0}/>
              <FoodModel i={2} j={3} height={0} type='EGG' chopped={false} cookedStage={2}/>
              <FoodModel i={2} j={4} height={0} type='NOODLES' chopped={false} cookedStage={0}/>
              <FoodModel i={2} j={5} height={0} type='MEAT' chopped={false} cookedStage={2}/>
            </Suspense> */}
            {/* <FoodHolder i={1} j={2} type={"Plate"} side={side} />
            <FoodHolder i={2} j={2} type={"Pan"} side={side} /> */}
            <Suspense>
              {foods}
            </Suspense>
          </group>
        </Canvas>
      </div>
    </>
  )
}

export default PlayerCanvas