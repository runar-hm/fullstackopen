import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )}

const Statisticline = ({text, number}) => <tr><td>{text}</td><td>{number}</td></tr>

const Statistics = ({clicks, votes}) => {
  if (votes == 0){
    return (<p>no feedback given</p>)
  }
  else{
    return (
      <>
        <h2>statistics</h2>
        <table>
          <tbody>
          <Statisticline text='good' number={clicks.good} />
          <Statisticline text='neutral' number={clicks.neutral} />
          <Statisticline text='bad' number={clicks.bad} />
          <Statisticline text='all' number={clicks.bad + clicks.good + clicks.neutral} />
          <Statisticline text='average' number={((clicks.bad * -1 + clicks.good) / (votes))} />
          <Statisticline text='positive' number={((clicks.good) / (votes) * 100) + "%"} />
          </tbody>
        </table>
      </>
    )
  }

}

const App = () => {

  const [ clicks, setClicks ] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGoodClick = () => setClicks({...clicks, good : clicks.good +1})
  const handleBadClick = () => setClicks({...clicks, bad : clicks.bad +1 })
  const handleNeutralClick = () => setClicks({...clicks, neutral : clicks.neutral +1 })

  const votes = clicks.bad + clicks.good + clicks.neutral

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad'/>

      <Statistics clicks={clicks} votes={votes} />

    </div>
  )
}

export default App