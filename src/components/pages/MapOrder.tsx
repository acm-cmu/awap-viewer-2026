type MapOrderProps = {
    id: number;
    start: number;
    duration: number;
    required: string;
    reward: number;
    penalty: number;
    removeOrder: (id: number) => void;
}

const MapOrder = (props : MapOrderProps) => {
  return (
    <div className="order">
        <span>{`start: ${props.start}`}</span>
        <span>{`duration: ${props.duration}`}</span>
        <span>{`required: ${props.required}`}</span>
        <span>{`reward: ${props.reward}`}</span>
        <span>{`penalty: ${props.penalty}`}</span>
        <button className="delete-button"
                onClick={() => props.removeOrder(props.id)}>X</button>
    </div>
  )
}

export default MapOrder