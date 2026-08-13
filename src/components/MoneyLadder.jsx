import {moneyPool, moneyAmount} from "../utils/moneyLadder"
function MoneyLadder({ ladder = moneyPool, currentIndex }) {
    return(
        <div className="ladder">
        {ladder.map((amount, index) => {
            const level = index + 1
            const isCurrent = index === currentIndex
            const isReached = index < currentIndex
            return (
                <div key={level} className={"ladder-row" + (isCurrent ? ' current' : isReached ? ' reached' : '')}>

                    <span className="amount">{moneyAmount(amount)}</span>
                </div>
            )
        })}
    </div>
)
}


export default MoneyLadder
