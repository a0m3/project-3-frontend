import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getMyHistory } from '../services/historyService'

function ProfilePage() {
  const {user} = useAuth()

  const [history, setHistory] = useState([])

  useEffect(()=>{
    async function loadHistory(){
      try{
        const data = await getMyHistory()
        setHistory(data)
      }
      catch(err){
        console.log(err)
      }
    }
    loadHistory()
  }, [])

  let wins = 0
  let best = 0

    for (const game of history) {
        if (game.status === "won") {
            wins++;
        }

        if (game.moneyWon > best) {
            best = game.moneyWon;
        }
    }

  return (
    <div className='page'>
      <div>
        <h1>My Profile</h1>
      </div>

      <div>
        <p>Username: {user.username}</p>
      </div>
    
    <div>
      <h3>Stats</h3>

      <div>
        <strong>{history.length}</strong> Game Played
        <strong>{wins}</strong> Game Wons
        
      </div>
    </div>
    </div>
  )
}

export default ProfilePage