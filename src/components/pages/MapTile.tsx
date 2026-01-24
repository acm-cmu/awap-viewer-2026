type MapTileProps = {
    r : number;
    c : number;
    type: string;
    map: string[][];
    brush: string;
    setClick: () => void;
}

const MapTile = ({r, c, map, type, brush, setClick} : MapTileProps) => {
    return (
        <button className={`mapTile ${type}`} 
        onClick={() => {
            map[r][c] = brush; ;
            setClick()}
        }>{type}</button>
    )
}

export default MapTile