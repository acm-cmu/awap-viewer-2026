import { useMemo, useState, type ReactNode } from "react";
import type { FoodName, TileName } from "../../Types";
import './MapMaker.css';
import MapTile from "./MapTile";
import Map3DPreview from "./Map3DPreview";

type TogglePageType = {
  togglePage: () => void
}

type MapOrder = {
  start: number;
  duration: number;
  required: FoodName[];
  reward: number;
  penalty: number;
}

export const mapToTile : Record<string, TileName | "BOT"> = {
    '.': "FLOOR",
    '#': "WALL",
    'C': "COUNTER",
    'K': "COOKER",
    'S': "SINK",
    'T': "SINKTABLE",
    'R': "TRASH",
    'U': "SUBMIT", 
    '$': "SHOP",
    'B': "BOX",
    'b': "BOT"
}

const MapMaker = ({togglePage} : TogglePageType) => {

  const [fileName, setFileName] = useState<string>('map.txt');
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(10);
  const [switchStart, setSwitchStart] = useState<number>(10);
  const [switchDuration, setSwitchDuration] = useState<number>(5);
  const [orders, setOrders] = useState<MapOrder[]>([]);
  const [brush, setBrush] = useState<string>(".");
  const [click, setClick] = useState<boolean>(true);

  const map : string[][] = useMemo(() => {
    const tempArray : string[][] = [];
    for (let r = 0; r < height; r++) {
      const row : string[] = [];
      for (let c = 0; c < width; c++) {
        row.push('.');
      }
      tempArray.push(row);
    }
    return tempArray;
  }, [width, height]);

  const mapDisplay = useMemo(() => {
    const tempArray : ReactNode[][] = [];
    for (let r = 0; r < height; r++) {
      const row : ReactNode[] = [];
      for (let c = 0; c < width; c++) {
        row.push(<MapTile r={r} c={c} map={map} brush={brush} type={mapToTile[map[r][c]]}
                          setClick={() => setClick(!click)}/>);
      }
      tempArray.push(row);
    }
    return tempArray;
  }, [map, brush, click]);


  const downloadMap = () => {
    let mapString = '';
    // tiles
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        mapString += map[r][c];
      }
      mapString += "\n";
    }
    // switch
    mapString += `\nSWITCH: turn=${switchStart} duration=${switchDuration}\n\n`;
    // order
    mapString += "ORDERS:"
    for (let i=0; i < orders.length; i++) {
      let o = orders[i];
      mapString += `\nstart=${o.start}  duration=${o.duration}  required=${o.required.join(",")}           reward=${o.reward} penalty=${o.penalty}`;
    }

    const blob = new Blob([mapString], { type: 'text/plain;charset=utf-8' });

    const url = URL.createObjectURL(blob);

    // Create a temporary link to download
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName; 
    link.style.display = 'none'; 

    // Append the link to the document body, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Revoke the object URL to free up browser memory
    URL.revokeObjectURL(url);
  }

  return (
    <>
        <div className="controls">
          <h1>Map Maker</h1>
          <div>
            <label htmlFor="fileName">File Name: </label>
          <input type="text" name="fileName" id="fileName" defaultValue={fileName} onChange={(event) => setFileName(event.target.value)} />
          </div>
          <div>
            <label htmlFor="switchStart">Switch Start: </label>
              <input type="number" id="switchStart" name="switchStart" min="1" max="10000" defaultValue={switchStart} step="1"
                    onChange={(event) => setSwitchStart(parseInt(event.target.value))}/>
              <label htmlFor="switchDuration">Switch Duration: </label>
                <input type="number" id="switchDuration" name="switchDuration" min="0" max="10000" defaultValue={switchDuration} step="1"
                      onChange={(event) => setSwitchDuration(parseInt(event.target.value))} />
          </div>
          <div>
            <label htmlFor="width">Width: </label>
              <input type="number" id="width" name="width" min="1" max="100" defaultValue={width} step="1"
                    onChange={(event) => setWidth(parseInt(event.target.value))}/>
              <label htmlFor="height">Height: </label>
                <input type="number" id="height" name="switchDuration" min="1" max="100" defaultValue={height} step="1"
                      onChange={(event) => setHeight(parseInt(event.target.value))} />
              <label htmlFor="tileType">Tile Type: </label>
              <select name="tileType" id="tileType" onChange={(event) => setBrush(event.target.value)}>
                <option value="." selected>FLOOR</option>
                <option value="#">WALL</option>
                <option value="C">COUNTER</option>
                <option value="K">COOKER</option>
                <option value="S">SINK</option>
                <option value="T">SINKTABLE</option>
                <option value="R">TRASH</option>
                <option value="U">SUBMIT</option>
                <option value="$">SHOP</option>
                <option value="B">BOX</option>
                <option value="b">BOT</option>
              </select>
          </div>
          <div className="TileDisplay" style={{gridTemplateColumns: `repeat(${width}, 1fr)`,
                                          gridTemplateRows: `repeat(${height}, 1fr)`}} >
              {mapDisplay}
          </div>
          <div>
            <button onClick={togglePage}>Viewer</button>
            <button onClick={downloadMap}>Download Map</button>
          </div>
        </div>
        <div className="preview">
          <Map3DPreview width={width} height={height} map={map}/>
        </div>
    </>
  )
}

export default MapMaker