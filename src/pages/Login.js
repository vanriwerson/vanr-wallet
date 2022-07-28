import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { confirmLogin } from '../actions';
import './Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isButtonDisabled: true,
  }

  validateFormData = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const isValidEmail = email.includes('@') && email.includes('.com');
    const isValidPassword = password.length >= minLength;

    const isButtonDisabled = !(isValidEmail && isValidPassword);
    this.setState({
      isButtonDisabled,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }), this.validateFormData);
  }

  handleClick = () => {
    const { doLogin, history } = this.props;
    const { email } = this.state;

    doLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isButtonDisabled } = this.state;

    return (
      <form className="login-form">
        <h1>Faça login em VanRpay</h1>

        <label htmlFor="email-input">
          E-mail:
          <input
            type="text"
            data-testid="email-input"
            id="email-input"
            name="email"
            onChange={ this.handleChange }
            value={ email }
          />
        </label>

        <label htmlFor="password-input">
          Senha:
          <input
            type="password"
            data-testid="password-input"
            id="password-input"
            name="password"
            onChange={ this.handleChange }
            value={ password }
          />
        </label>

        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ isButtonDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  doLogin: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  doLogin: (email) => dispatch(confirmLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
