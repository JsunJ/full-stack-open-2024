import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
};

const StatisicLine = ({ text, stat }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (((good * 1) + (neutral * 0) + (bad * (-1))) / total).toFixed(2);
  const positive = ((good / total) * 100).toFixed(2);

  if (total === 0) {
    return (<p>No feedback given</p>);
  }

  return (
    <table>
      <tbody>
        <StatisicLine text="good" stat={good} />
        <StatisicLine text="neutral" stat={neutral} />
        <StatisicLine text="bad" stat={bad} />
        <StatisicLine text="all" stat={total} />
        <StatisicLine text="average" stat={average} />
        <StatisicLine text="positive" stat={`${positive}%`} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  );
};

export default App