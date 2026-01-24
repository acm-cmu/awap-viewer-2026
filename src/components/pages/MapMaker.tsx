import { useMemo, useState, type ReactNode } from "react"
import type { FoodName } from "../../Types"
import './MapMaker.css'
import { div } from "three/tsl"
import Map3DPreview from "./Map3DPreview"

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

const MapMaker = ({togglePage} : TogglePageType) => {

  const [fileName, setFileName] = useState<string>('map.txt');
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(10);
  const [switchStart, setSwitchStart] = useState<number>(10);
  const [switchDuration, setSwitchDuration] = useState<number>(5);
  const [orders, setOrders] = useState<MapOrder[]>([]);

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
        row.push(<div className="mapTile">1</div>);
      }
      tempArray.push(row);
    }
    return tempArray;
  }, [map]);


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
          <button onClick={togglePage}>Viewer</button>
          <button onClick={downloadMap}>Download Map</button>
          <div>
            <label htmlFor="fileName">File Name: </label>
          <input type="text" name="fileName" id="fileName" defaultValue={fileName} onChange={(event) => setFileName(event.target.value)} />
          </div>
        <div>
          <div>
          <label htmlFor="switchStart">Switch Start: </label>
            <input type="number" id="switchStart" name="switchStart" min="1" max="10000" defaultValue={switchStart} step="1"
                  onChange={(event) => setSwitchStart(parseInt(event.target.value))}/>
          </div>
          <div>
            <label htmlFor="switchDuration">Switch Duration: </label>
              <input type="number" id="switchDuration" name="switchDuration" min="0" max="10000" defaultValue={switchDuration} step="1"
                    onChange={(event) => setSwitchDuration(parseInt(event.target.value))} />
          </div>
        </div>
        <div>
          <div>
          <label htmlFor="width">Width: </label>
            <input type="number" id="width" name="width" min="1" max="100" defaultValue={width} step="1"
                  onChange={(event) => setWidth(parseInt(event.target.value))}/>
          </div>
          <div>
            <label htmlFor="height">Height: </label>
              <input type="number" id="height" name="switchDuration" min="1" max="100" defaultValue={height} step="1"
                    onChange={(event) => setHeight(parseInt(event.target.value))} />
          </div>
        </div>
          <div id="TileDisplay" style={{gridTemplateColumns: `repeat(${width}, 1fr)`,
                                        gridTemplateRows: `repeat(${height}, 1fr)`}} >
            {mapDisplay}
          </div>
        </div>
        <div className="preview">
          <Map3DPreview width={width} height={height} map={map}/>
        </div>
    </>
  )
}

export default MapMaker