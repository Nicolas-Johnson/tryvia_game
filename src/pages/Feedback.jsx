import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import getProfile from '../services/gravatar';
import './Feedback.css';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: {},
      loading: true,
    };
    this.saveState = this.saveState.bind(this);
  }

  componentDidMount() {
    const { player } = JSON.parse(localStorage.getItem('state'));

    if (player) {
      this.saveState(player);
    }
  }

  saveState(player) {
    this.setState({ player, loading: false });
  }

  renderButton() {
    const { player } = this.state;
    return (
      <div className="feedback-buttons">
        <Link
          to={ {
            pathname: '/ranking',
            userInfos: {
              name: player.name,
              score: player.score,
              gravatarImage: getProfile(player.gravatarEmail),
            },
          } }
        >
          <button type="button" data-testid="btn-ranking" className="btn btn-warning">
            Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button type="button" data-testid="btn-play-again" className="btn btn-success">
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }

  render() {
    const { player, loading } = this.state;
    const magicNumber = 3;
    return (
      <section className="content-feedback ">
        <div className="feedback">
          <Header />
          <section className="feedback-text shadow p-3 rounded">
            <h3 data-testid="feedback-text">
              { !loading && player.assertions < magicNumber
                ? 'Podia ser melhor...' : 'Mandou bem!' }
            </h3>
            <h3>
              Você acertou
              {' '}
              <span data-testid="feedback-total-question">{player.assertions}</span>
              {' '}
              questões!
            </h3>
            <h3>
              Um total de
              {' '}
              <span data-testid="feedback-total-score">{player.score}</span>
              {' '}
              pontos
            </h3>
            { this.renderButton() }
          </section>
        </div>
      </section>
    );
  }
}

export default Feedback;
