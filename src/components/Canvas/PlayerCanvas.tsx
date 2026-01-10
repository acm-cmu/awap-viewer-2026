import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { OrbitControls } from '@react-three/drei'
import Grid from '../grid/Grid';
import { useContext } from 'react';
import { ViewerStateContext } from '../Pages/Viewer';
import { Canvas } from '@react-three/fiber';

interface CanvasType {
  side: "RED" | "BLUE"
}

const PlayerCanvas = ({side} : CanvasType) => {
  const stateContext = useContext(ViewerStateContext);
      
  if (!stateContext) {
    throw new Error('useViewer must be used within a ViewerProvider');
  }
  
  const turnInfo = useMemo(() => {
    return stateContext.replay!.replay[stateContext.round]
  }, [stateContext.replay, stateContext.round])

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
  }, [stateContext.replay])

  const plane = useMemo(() => {
    const width = (map.length * 0.51 - 0.02) * 1.1;
    const w_gap = (map.length * 0.51 - 0.02) / 2 - 0.25;
    const height = (map[0].length * 0.51 - 0.02) * 1.2;
    const h_gap = (map[0].length * 0.51 - 0.02) / 2 - 0.25;
    return (
      <mesh position={[w_gap, -0.15, h_gap]}>
        <boxGeometry args={[width,0.05,height]}/>
        <meshStandardMaterial color={side == "RED" ? "#8F3441" : "#2E6AA6"}/>
      </mesh>)
  }, [stateContext.replay])

  return (
    <Canvas camera={{position: [0,8,11]}}>
      <OrbitControls />
      <directionalLight position={[2, 4, 3]} intensity={1}/>
      <ambientLight intensity={1}/>
      <>{grid}</>
      <>{plane}</>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1,5,0.1]}/>
        <meshStandardMaterial color={side == "RED" ? "#8F3441" : "#2E6AA6"}/>
      </mesh>)
    </Canvas>
  )
}

export default PlayerCanvas