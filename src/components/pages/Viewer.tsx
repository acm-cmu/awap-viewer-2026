import './Viewer.css';
import { useState, createContext } from 'react';
import type {Replay} from '../../Types';
import BottomPanel from '../BottomPanel/BottomPanel';
import PlayerCanvas from '../Canvas/PlayerCanvas';
import TopStats from '../TopStats/TopStats';
import CreditScreen from './CreditScreen';

interface TogglePageType {
  togglePage: () => void
}

interface ViewerState {
  replay: Replay | null
  round: number
  isPlaying: boolean
  speed: number
}

interface ViewerAction {
  setReplay: (r: Replay | null) => void
  setRound: (r: number) => void
  setIsPlaying: (v: boolean) => void
  setSpeed: (s: number) => void
  setShowCreditScreen: (b: boolean) => void 
}

export const ViewerActionContext = createContext<ViewerAction | null>(null)

export const ViewerStateContext = createContext<ViewerState | null>(null)

const Viewer = ({togglePage} : TogglePageType) => {

  const [replay, setReplay] = useState<Replay | null>(null);
  const [round, setRound] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1.0);
  const [showCreditScreen, setShowCreditScreen] = useState<boolean>(false);

  return (
    <ViewerActionContext.Provider value={{setReplay, setRound, setIsPlaying, setSpeed, setShowCreditScreen}}>
      <ViewerStateContext.Provider value={{replay, round, isPlaying, speed}}>
        {showCreditScreen ? <CreditScreen/> : <></>}
        {replay ?
            <div className='layout'>
                <div className='layout-top'>
                  <TopStats></TopStats>
                </div>
                <div className='layout-center'>
                  <PlayerCanvas side='RED'></PlayerCanvas>
                  <PlayerCanvas side='BLUE'></PlayerCanvas>
                </div>
                <div className='layout-bottom'>
                    <BottomPanel togglePage={togglePage}></BottomPanel>    
                </div>
            </div>
          : 
            <div className='loading'>
              <BottomPanel togglePage={togglePage}></BottomPanel>    
            </div>
        }
      </ViewerStateContext.Provider>
  </ViewerActionContext.Provider>) 
}

export default Viewer