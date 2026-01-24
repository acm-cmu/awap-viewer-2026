import './OrderCard.css';

interface Order {
  order_id: number;
  required: string[];
  created_turn: number;
  expires_turn: number;
  reward: number;
  penalty: number;
  claimed_by: number | null;
  completed_turn: number | null;
}

interface OrderCardProps {
  order: {
    order_id: number;
    required: string[];
    created_turn: number;
    expires_turn: number;
    reward: number;
    penalty: number;
    claimed_by: number | null;
    completed_turn: number | null;
  };
  teamSide: "RED" | "BLUE";
  currentTurn: number;
}

const EXPIRING_SOON_THRESHOLD = 30;

const OrderCard = ({ order, teamSide, currentTurn }: OrderCardProps) => {
  const remainingTurns = order.expires_turn - currentTurn;


  const getOrderStatus = () => {
    if (order.completed_turn !== null) {
      return 'COMPLETED';
    }
    if (remainingTurns <= 0) {
      return 'EXPIRED';
    }
    if (remainingTurns < EXPIRING_SOON_THRESHOLD) {
      return 'EXPIRING_SOON';
    }
    return 'ACTIVE';
  };

  const status = getOrderStatus();

  return (
    <div className={`order-card order-card-${teamSide.toLowerCase()} order-card-${status.toLowerCase()}`}>

      <div className="order-card-header">
        <span className="order-id">Order #{order.order_id}</span>
        {status === 'COMPLETED' && <span className="status-badge completed">✓</span>}
        {status === 'EXPIRED' && <span className="status-badge expired">✗</span>}
        {status === 'EXPIRING_SOON' && <span className="status-badge expiring">!</span>}
      </div>

 
      <div className="order-card-body">
        <div className="required-items">
          <p className="required-label">Required:</p>
          <ul className="items-list">
            {order.required.map((item, index) => (
              <li key={index} className="item">{item}</li>
            ))}
          </ul>
        </div>
      </div>

   
      <div className="order-card-footer">
        <div className="reward-penalty">
          <span className="reward">+${order.reward}</span>
          <span className="penalty">-${order.penalty}</span>
        </div>
        <div className="timer">
          {status === 'COMPLETED' ? (
            <span className="completed-turn">Done: Turn {order.completed_turn}</span>
          ) : status === 'EXPIRED' ? (
            <span className="expired-turn">Expired</span>
          ) : (
            <span className={remainingTurns < EXPIRING_SOON_THRESHOLD ? 'timer-warning' : ''}>
              {remainingTurns} turns left
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
