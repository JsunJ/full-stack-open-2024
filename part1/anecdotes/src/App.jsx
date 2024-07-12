import { useState } from 'react'

const Heading = ({ text }) => <h1>{text}</h1>

const Anecdote = ({ selected, votes = 0 }) => {
  return (
    <div>
      <p>{selected}</p>
      <p>has {votes} votes</p>
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length));
  const [votes, setVotes] = useState({});

  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVoteClick = () => {
    const votesCopy = { ...votes };
    votesCopy[selected] = votesCopy[selected] + 1 || 1;
    setVotes(votesCopy);
  };

  const mostVotedIndex = Object.keys(votes).reduce(
    (keyA, keyB) => votes[keyA] > votes[keyB] ? keyA : keyB
  );

  return (
    <div>
      <Heading text="Anecdote of the day"/>
      <Anecdote selected={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleNextClick} text="next anecdote" />
      <Heading text="Anecdote with most votes"/>
      <Anecdote selected={anecdotes[mostVotedIndex]} votes={votes[mostVotedIndex]} />
    </div>
  );
};

export default App