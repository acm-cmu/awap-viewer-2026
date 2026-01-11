import "./BottomPanel.css"
import { useState, useContext } from "react";
import { ViewerActionContext, ViewerStateContext } from "../Pages/Viewer";
import type { Replay } from "../../Types";

type TogglePageType = {
  togglePage: () => void
}

const BottomPanel = ({togglePage} : TogglePageType) => {
  const actionContext = useContext(ViewerActionContext);
  const stateContext = useContext(ViewerStateContext);

  if (!actionContext || !stateContext) {
      throw new Error('useViewer must be used within a ViewerProvider');
  }

  const [wrongFile, setWrongFile] = useState<boolean>(false);

  const showFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileInput = document.getElementById('fileobj') as HTMLInputElement;
      const filePath = fileInput!.value;
      const ext = filePath.slice(filePath.length - 5, filePath.length);
      if (ext !== '.json') {
          setWrongFile(true);
          actionContext.setReplay(null);
          return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
          const replay_text = e.target!.result;
          try {
              const replay: Replay = JSON.parse(replay_text as string);
              setWrongFile(false);
              actionContext.setReplay(replay);
          } catch (error) {
              const err = error as Error;
              console.log(err.message);
          }
      };
      const f = event.target.files as FileList;
      reader.readAsText(f[0] as Blob);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    handleTurnChange(parseInt(event.target.value))
  }
    
  const handleTurnChange = (i : number) => {
    actionContext.setRound(i);
  }
  
  return (
    <div className="container flex-column full-height">
      {stateContext.replay ? 
        <>
          <div className="container-grid">
            <div className="container-left">
              <button>Play</button>
              <button onClick={() => actionContext.setShowCreditScreen(true)}>Credits</button>
            </div>
            <div className="container-center">
              <span>Frame {stateContext.round + 1} of {stateContext.replay.turns}</span>
            </div>
            <div className="container-right">
              <button onClick={togglePage}>Map Maker</button>
              <input id="fileobj" type="file" className="file-upload" onChange={showFile} />
            </div>
          </div>
          <div className="container">
            <input id="slider" className="slider" type="range" min="0" max={stateContext.replay.turns-1}
            value={stateContext.round}
            onChange={handleSliderChange}></input>
          </div>
        </>
      : 
        <>
          <h1>AWAP 2026 Viewer</h1>
          <div className="container">
            <button onClick={togglePage}>Map Maker</button>
            <input id="fileobj" type="file" className="file-upload file-upload-small" onChange={showFile} />
          </div>
          {wrongFile ? (
            <h2 className="info">Please upload replay files with the correct extensions only. </h2>
          ) : (
            <div></div>
          )}
      </>}
  </div>
  )
}

export default BottomPanel