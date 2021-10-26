import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogin, fetchToken } from '../redux/actions';
import './Login.css';
import logo from '../trivia.png';
import image from '../images/2296268.jpg';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gravatarEmail: '',
      name: '',
      assertions: 0,
      score: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.formElement = this.formElement.bind(this);
    this.savePlayerAndToken = this.savePlayerAndToken.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  savePlayerAndToken() {
    const { code } = this.props;
    localStorage.setItem('token', JSON.stringify(code));
    localStorage.setItem('state', JSON.stringify({ player: { ...this.state } }));
  }

  handleClick() {
    const { dispatchLogin, history, startFetching } = this.props;
    startFetching();
    dispatchLogin({ ...this.state });
    this.savePlayerAndToken();
    history.push('/game');
  }

  handleValidation(email, name) {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexName = /^[a-zA-Z0-9 ]{3,}$/;
    return regexEmail.test(email) && regexName.test(name);
  }

  formElement() {
    const { gravatarEmail, name } = this.state;
    return (
      <section className="content-hero">
        <img className="img-hero" src={ image } alt="logo" />

        <section className="center">
          <div className="form-login">
            <img src={ logo } alt="logo" />
            <label htmlFor="name" className="form-label">
              Nome:
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                onChange={ this.handleChange }
                value={ name }
                placeholder="Insira seu Nome"
                data-testid="input-player-name"
              />
            </label>
            <label htmlFor="email" className="form-label">
              E-mail:
              <input
                className="form-control"
                type="text"
                name="gravatarEmail"
                id="email"
                onChange={ this.handleChange }
                value={ gravatarEmail }
                placeholder="Insira seu E-mail"
                data-testid="input-gravatar-email"
              />
            </label>
            { this.renderButtons() }
          </div>
        </section>
      </section>
    );
  }

  renderButtons() {
    const { gravatarEmail, name } = this.state;
    const isValid = this.handleValidation(gravatarEmail, name);

    return (
      <div className="form-buttons">
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
          disabled={ !isValid }
          className="settings btn btn-success"
        >
          Jogar
        </button>
        <Link to="/settings" className="settings">
          <button
            type="button"
            data-testid="btn-settings"
            className="btn-settings btn btn-dark"
          >
            Configurações

          </button>
        </Link>
      </div>
    );
  }

  render() {
    return (
      this.formElement()
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (state) => dispatch(userLogin(state)),
  startFetching: () => dispatch(fetchToken()),
});

const mapStateToProps = (state) => ({
  redirect: state.token.redirect,
  code: state.token.code,
  isFetching: state.token.isFetching,
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatchLogin: PropTypes.func,
  code: PropTypes.string,
  startFetching: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
