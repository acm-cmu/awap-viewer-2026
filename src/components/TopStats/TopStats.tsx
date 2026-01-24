import './TopStats.css'
import { useContext, useMemo } from 'react';
import {ViewerStateContext } from "../pages/Viewer";
import OrderCard from '../OrderCard/OrderCard.tsx';


const TopStats = () => {
    const stateContext = useContext(ViewerStateContext);
    
    if (!stateContext) {
        throw new Error('useViewer must be used within a ViewerProvider');
    }

    const turnInfo = useMemo(() => {
        return stateContext.replay!.replay[stateContext.round]
    }, [stateContext.replay, stateContext.round])
    

    const redOrders = useMemo(() => {
        return turnInfo.orders.RED || [];
    }, [turnInfo]);

    const blueOrders = useMemo(() => {
        return turnInfo.orders.BLUE || [];
    }, [turnInfo]);

    return (
        <div className="top-stats-container">
            {/* RED Team Section */}
            <div className="team-section team-section-red">
                <div className="team-header">
                    <h2 className="team-name">RED TEAM</h2>
                    <div className="team-money">${turnInfo.team_money.RED}</div>
                </div>
                <div className="orders-container">
                    {redOrders.map((order) => (
                        <OrderCard 
                            key={order.order_id}
                            order={order}
                            teamSide="RED"
                            currentTurn={turnInfo.turn}
                        />
                    ))}
                </div>
            </div>

            {/* BLUE Team Section */}
            <div className="team-section team-section-blue">
                <div className="team-header">
                    <h2 className="team-name">BLUE TEAM</h2>
                    <div className="team-money">${turnInfo.team_money.BLUE}</div>
                </div>
                <div className="orders-container">
                    {blueOrders.map((order) => (
                        <OrderCard 
                            key={order.order_id}
                            order={order}
                            teamSide="BLUE"
                            currentTurn={turnInfo.turn}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopStats
