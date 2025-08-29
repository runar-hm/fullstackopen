import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteFilter from "./components/AnecdoteFilter";
import Notification from "./components/Notification";

import anecdotesService from "./services/anecdotes";
import anecdoteReducer, { setAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdotesService.getAll().then((a) => dispatch(setAnecdotes(a)));
  });

  return (
    <div>
      <Notification />
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
