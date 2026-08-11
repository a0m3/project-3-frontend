const moneyPool = [
    100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000,
    250000, 500000, 1000000
]

function moneyAmount(amount) {
    return "$" + amount.toLocaleString()
}


function MoneyLadder({ ladder = moneyLadder, currentIndex }) {
    return(
        <div className="money-ladder">
        {ladder.map((amount, index) => {
            const level = index + 1
            const isCurrent = index === currentIndex
            const isReached = index < currentIndex
            return (
                <div key={level} className={"ladder-row" + (isCurrent ? 'is-current' : isReached ? 'is-reached' : '')}>
                    <span className="ladder-level">{level}</span>
                    <span className="ladder-amount">{money(amount)}</span>
                </div>
            )
        })}
    </div>
)
}


export default {MoneyLadder, moneyAmount}
