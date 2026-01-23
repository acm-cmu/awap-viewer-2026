import './Viewer.css';
import BottomPanel from '../BottomPanel/BottomPanel';
import PlayerCanvas from '../Canvas/PlayerCanvas';

type TogglePageType = {
  togglePage: () => void
}

const ViewerReplay = ({togglePage} : TogglePageType) => {
  return (
    <div className='layout'>
        <div className='layout-top'></div>
        <div className='layout-center'>
            <PlayerCanvas side='RED'></PlayerCanvas>
            <PlayerCanvas side='BLUE'></PlayerCanvas>
        </div>
        <div className='layout-bottom'>
            <BottomPanel togglePage={togglePage}></BottomPanel>    
        </div>
    </div>
  )
}

export default ViewerReplay