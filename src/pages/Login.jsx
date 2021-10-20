import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';
import './Login.css';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { dispatchLogin, history } = this.props;
    dispatchLogin({ ...this.state });
    history.push('/play');
  }

  handleValidation(email, name) {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexName = /^[a-zA-Z0-9 ]{3,}$/;
    return regexEmail.test(email) && regexName.test(name);
  }

  render() {
    const { email, name } = this.state;
    const isValid = this.handleValidation(email, name);

    return (
      <section className="center">
        <div>
          <img src={ logo } alt="logo" />
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              name="name"
              id="name"
              onChange={ this.handleChange }
              value={ name }
              placeholder="Insira seu Nome"
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              id="email"
              onChange={ this.handleChange }
              value={ email }
              placeholder="Insira seu Email"
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.handleClick }
            disabled={ !isValid }
          >
            Jogar
          </button>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (state) => dispatch(userLogin(state)) });

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatchLogin: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
