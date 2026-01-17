import '../TopStats/TopStats.css'
import { useContext, useMemo } from 'react';
import {ViewerStateContext } from "../pages/Viewer";


const TopStats = () => {
    const stateContext = useContext(ViewerStateContext);
    
    if (!stateContext) {
        throw new Error('useViewer must be used within a ViewerProvider');
    }

    const turnInfo = useMemo(() => {
        return stateContext.replay!.replay[stateContext.round]
    }, [stateContext.replay, stateContext.round])

    return (
        <>
            <h1>Stats</h1>
            <div>{turnInfo.team_money.RED}</div>
        </>
    )
}

export default TopStats