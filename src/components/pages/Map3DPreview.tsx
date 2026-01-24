import type { ReactNode } from 'react';
import { mapToTile } from './MapMaker';
import { OrbitControls } from '@react-three/drei'
import Grid from '../grid/Grid';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import MapTileModel from '../grid/MapTileModel';

type Map3DPreviewProps = {
    width: number;
    height: number;
    map: string[][];
}

const Map3DPreview = ({width, height, map} : Map3DPreviewProps) => {
  
    const initCameraY = Math.max(width, height) / 2;

    const grid : ReactNode[][] = []
    // Basic Map
    for (let row = 0; row < height; row++) {
      grid.push([] as ReactNode[]);
      for (let col = 0; col < width; col++) {
        grid[row]?.push(
          (
            <Grid i={col} j={row} side={"RED"}/>
          ) as ReactNode
        );
      }
    }

    const w_gap = (width * 0.51 - 0.02) / 2;
    const h_gap = (height * 0.51 - 0.02) / 2;
  
    const p_width = (width * 0.51 - 0.02) * 1.1;
    const p_height = (height * 0.51 - 0.02) * 1.2;

    const plane = 
      <mesh position={[w_gap - 0.25, -0.15, h_gap - 0.25]}>
        <boxGeometry args={[p_width,0.05,p_height]}/>
        <meshStandardMaterial color="#8F3441"/>
      </mesh>;

    const tiles: ReactNode[][] = []
    // Tile Models 
    for (let row = 0; row < height; row++) {
        tiles.push([] as ReactNode[]);
        for (let col = 0; col < width; col++) {
            tiles[row]?.push(
            (
                <MapTileModel i={col} j={row} side={"RED"} 
                            type={mapToTile[map[row][col]]}
                            hideWalls={true}
                            ></MapTileModel>
            ) as ReactNode
            );
        }
    }

    return (
    <Canvas camera={{position: [0,initCameraY,0]}}>
        <OrbitControls />
        <directionalLight position={[2, 4, 3]} intensity={0.5}/>
        <ambientLight color={"white"} intensity={1}/>
        <group position={[-w_gap, 0, -h_gap]} >
            <>{grid}</>
            <>{plane}</>
            <Suspense>
                {tiles} 
            </Suspense>
        </group>
    </Canvas>
    )
}

export default Map3DPreview