export default function IncDec({ glovalDiv, innerDiv, quentity, handleDecrease, handleIncrease }) {
    return (
        <div className={glovalDiv}>
            <div className={innerDiv}>
                <button onClick={handleDecrease} className="text-white text-lg px-1">-</button>
                <span className="text-white px-2">{quentity}</span>
                <button onClick={handleIncrease} className="text-white text-lg px-1">+</button>
            </div>
        </div>
    );
}
