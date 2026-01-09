type TogglePageType = {
  togglePage: () => void
}

const MapMaker = ({togglePage} : TogglePageType) => {
  return (
    <>
        <h1>Map Maker</h1>
        <button onClick={togglePage}>Viewer</button>
    </>
  )
}

export default MapMaker