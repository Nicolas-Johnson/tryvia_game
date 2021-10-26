import React, { Component } from 'react';
import './Header.css';
import getProfile from '../../services/gravatar';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      gravatarImage: '',
      score: 0,
    };
    this.saveInfosPlayer = this.saveInfosPlayer.bind(this);
  }

  componentDidMount() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    if (player !== null) {
      this.saveInfosPlayer(player);
    }
  }

  saveInfosPlayer(player) {
    const { gravatarEmail, name, score } = player;
    const gravatarImage = getProfile(gravatarEmail);
    this.setState({
      name,
      gravatarImage,
      score,
    });
  }

  render() {
    const { gravatarImage, name, score } = this.state;
    return (
      <header className="content-info shadow p-3 rounded">
        <div className="content-title">
          <img
            src={ gravatarImage }
            alt="avatar-player"
            data-testid="header-profile-picture"
            className="image-title"
          />
          <h3 data-testid="header-player-name">{name}</h3>
        </div>
        <div className="content-score">
          <span className="score-title">Score: </span>
          <span data-testid="header-score" className="score-title">
            {score}
          </span>
        </div>
      </header>
    );
  }
}

export default Header;
