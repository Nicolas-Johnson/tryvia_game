import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../redux/actions/index';
import Header from '../components/Header/Header';
import Questions from '../components/Questions';
import timer from '../images/6678.jpg';
import './Game.css';

export default function Game() {
  const token = useSelector((state) => state.token.code);
  const questions = useSelector((state) => state.question.questions.results);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuestions(token));
  }, []);

  return (
    <section className="content-game">
      <img src={ timer } alt="timer" className="img-game" />
      <section className="content-questions">
        <Header />
        {questions && <Questions />}
      </section>
    </section>
  );
}
