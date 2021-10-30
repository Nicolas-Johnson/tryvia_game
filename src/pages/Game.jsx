import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../redux/actions/index';
import Header from '../components/Header/Header';
import Questions from '../components/Questions';
import timer from '../images/6678.jpg';
import './Game.css';
import Loading from '../components/Loading';

function Game() {
  const token = useSelector((state) => state.token.code);
  const questions = useSelector((state) => state.question.questions.results);
  const loading = useSelector((state) => state.question.isFetching);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuestions(token));
  }, []);

  return (
    <section className="content-game">
      <img src={ timer } alt="timer" className="img-game" />
      { loading ? <Loading /> : (
        <section className="content-questions">
          <Header />
          {questions && <Questions />}
        </section>
      )}
    </section>
  );
}

export default Game;
