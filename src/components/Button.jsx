import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const {
      props: { id, answer, handleAnswersButton,
        shouldBorderColorChange, buttonBorderColor, difficulty },
    } = this;

    const color = shouldBorderColorChange ? buttonBorderColor : 'btn-light';

    return (
      <button
        type="button"
        data-testid={ id }
        onClick={ () => handleAnswersButton(answer, difficulty) }
        className={ `answers btn ${color}` }
        disabled={ shouldBorderColorChange }
      >
        <h5>{ answer }</h5>
      </button>
    );
  }
}

Button.propTypes = {
  answer: PropTypes.string,
  id: PropTypes.string,
  borderColor: PropTypes.string,
  handleAnswersButton: PropTypes.func,
  shouldBorderColorChange: PropTypes.bool,
}.isRequired;

export default Button;
