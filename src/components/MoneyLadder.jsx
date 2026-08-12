import {moneyPool, moneyAmount} from "../utils/moneyLadder"
function MoneyLadder({ ladder = moneyPool, currentIndex }) {
    return(
        <div className="money-ladder">
        {ladder.map((amount, index) => {
            const level = index + 1
            const isCurrent = index === currentIndex
            const isReached = index < currentIndex
            return (
                <div key={level} className={"ladder-row" + (isCurrent ? 'is-current' : isReached ? 'is-reached' : '')}>

                    <span className="ladder-amount">{moneyAmount(amount)}</span>
                </div>
            )
        })}
    </div>
)
}


export default MoneyLadder
