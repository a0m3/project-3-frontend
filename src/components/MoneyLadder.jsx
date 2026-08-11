const moneyLadder = [
    100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000,
    250000, 500000, 1000000
]

function money(amount) {
    return "$" + amount
}


function MoneyLadder({ ladder, currentIndex }) {
    {
        ladder.map((amount, index) => {
            const level = index + 1
            const isCurrent = index === currentIndex
            const isReached = index < currentIndex
            return (
                <div key={level}>
                    <span>{level}</span>
                    <span>{money(amount)}</span>
                </div>
            )
        })
    }
}


export default MoneyLadder
