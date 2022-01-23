
import React,{ useState} from 'react';
import {Container} from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import init from './components/init'
import back from "./components/yellow.png"

const nr=4
const cards=init(nr)

function App() {
  const [flipped, setFlipped] = useState([])//2-nél több kártyat nem lehet megfordítani,itt tároljuk el az elsőnek megfordítottat
  const [solved, setSolved] = useState([])//itt tároljuk el a sikeresen megoldott kártyákat
  const [disabled, setDisabled] = useState(false) //hogy a felhasznalo ne kattinthasson tobbszor ugyanarra a kartyara, a megoldottakat disabledre tesszük

  const handleClick = (id) => {
    setDisabled(true)
    if (flipped.length === 0) {
        setFlipped([parseInt(id)])
        setDisabled(false)
    } else {
        if ( flipped.includes(id))
           return
        setFlipped([...flipped, id])
        if (isMatch(id)) {
            setSolved([...solved, flipped[0], id])
            resetCards()
        } else 
            setTimeout(resetCards, 1000)
    }
  }

  const resetCards = () => {
    setFlipped([])
    setDisabled(false)
  }

  const isMatch = (id) => {
      const clickedCard = cards.find(card => card.id == id)
      const flippedCard = cards.find(card => card.id == flipped[0])
      return clickedCard.url === flippedCard.url
  }

  return (
    <div className="container bg-info p-1 shadow">
      <h1 className="text-center text-white">Memory game</h1>
      <div className="row p-1 m-2">
      {cards.map((obj,i)=>
         <div className={`col-${Math.floor(12/nr)} border border-info myCol`} key={obj.id}>
            <img  className="img-fluid"  
                  src={flipped.includes(obj.id) || solved.includes(obj.id) ? obj.url : back} 
                  onClick={()=>disabled ? null : handleClick(obj.id)}  
                  disabled={disabled || solved.includes(obj.id)}/>
        </div>
        )}
    </div>
  </div>
  )
}

export default App;
