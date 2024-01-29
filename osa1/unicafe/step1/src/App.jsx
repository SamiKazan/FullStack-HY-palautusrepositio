import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticsLine = (props) => {
  if (props.text == "positive") {
    return (
  <tr>
    <td>{props.text}</td>
    <td>{props.stats} %</td>
  </tr>
    )
  }
    return (
    <tr>
      <td>{props.text}</td>
      <td>{props.stats}</td>
    </tr>
    )
  }

const Statistics = (props) => {
  if (props.all == 0) {
    return(
    <tbody>
      <tr>
        <td>No feedback given</td>
      </tr>
    </tbody>
    )
  }
  return(
    <tbody>
      <StatisticsLine stats={props.good} text="good"/>
      <StatisticsLine stats={props.neutral} text="neutral"/>
      <StatisticsLine stats={props.bad} text="bad"/>
      <StatisticsLine stats={props.all} text="all"/>
      <StatisticsLine stats={(props.good-props.bad)/props.all} text="average"/>
      <StatisticsLine stats={(props.good/props.all)*100} text="positive"/>
    </tbody>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good +1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral +1)} text="neutral"/>
      <Button handleClick={() => setBad(bad +1)} text="bad"/>

      <h2>statistics</h2>
      <table>
        <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
      </table>
    </div>
  )
}

export default App