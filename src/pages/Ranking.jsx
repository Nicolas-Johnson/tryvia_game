import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Ranking.css';

class Ranking extends Component {
  constructor(props) {
    super(props);


    this.handleLocalStorage = this.handleLocalStorage.bind(this);
    this.createRankingElements = this.createRankingElements.bind(this);
  }

  componentDidMount() {

  }

  handleLocalStorage() {
    const {
      location: { state: { userObject } },
    } = this.props;

    let output = [];

    if (localStorage.getItem('ranking') === null) {
      output = [userObject];
      localStorage.setItem('ranking', JSON.stringify(output));
    } else {
      const savedRanking = JSON.parse(localStorage.getItem('ranking'));
      const increasedRanking = [...savedRanking, userObject];
      const sortedRanking = increasedRanking.sort((a, b) => b.score - a.score);
      output = sortedRanking;
      localStorage.setItem('ranking', JSON.stringify(output));
    }

    return output;
  }

  createRankingElements(rankingArray) {
    return rankingArray.map(({ name, score, gravatarImage }, index) => (
      <tr key={ index }>
        <th scope="row">{ index + 1 }</th>
        <td>
          <div className="ranking">
            <img className="image-ranking" src={ gravatarImage } alt={ name } />
            <h4 data-testid={ `player-name-${index}` }>{ name }</h4>
          </div>
        </td>
        <td><p data-testid={ `player-score-${index}` }>{ score }</p></td>
      </tr>
    ));
  }

  render() {
    const {
      createRankingElements,
    } = this;

    return (
      <section className="content-ranking">
        <div className="info-ranking">
          <h1 data-testid="ranking-title">Ranking</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Ranking</th>
                <th scope="col">Jogador</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              { createRankingElements(this.handleLocalStorage()) }
            </tbody>
          </table>
          <div className="title-ranking">
            <Link to="/" className="btn-ranking">
              <button
                type="button"
                className="btn-ranking btn btn-success"
                data-testid="btn-go-home"
              >
                Início
              </button>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

Ranking.propTypes = {
  userObject: PropTypes.object,
}.isRequired;

export default Ranking;
