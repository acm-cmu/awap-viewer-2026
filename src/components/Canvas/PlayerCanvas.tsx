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
            <Grid i={row-4.5} j={col-4.5}/>
          ) as ReactNode
        );
      }
    }
    return [tempArr];
  }, [])

  return (
    <Canvas camera={{position: [0,8,11]}}>
      <OrbitControls />
      <directionalLight position={[2, 4, 3]} intensity={3}/>
      <ambientLight intensity={1}/>
      <>{grid}</>
      {/* <mesh position={[0, -0.49, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[10.5,10.5]}/>
        <meshStandardMaterial color="#000000"/>
      </mesh> */}
      {/* <mesh position={[0, -0.5, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[50,20]}/>
        <meshStandardMaterial color="#54663f"/>
      </mesh> */}
    </Canvas>
  )
}

export default PlayerCanvas