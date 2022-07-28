import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  calculateTotalExpense = () => {
    const { expenses } = this.props;
    const totalExpense = expenses.reduce((acc, curr) => {
      const { value, currency, exchangeRates } = curr;
      const { ask } = (exchangeRates[currency]);

      return acc + Number(value) * Number(ask);
    }, 0).toFixed(2);

    return totalExpense;
  }

  render() {
    const { email } = this.props;
    const totalExpense = this.calculateTotalExpense();

    return (
      <header className="header">
        <p>
          Boas vindas,
          {' '}
          <span data-testid="email-field">{ email }</span>
        </p>
        <p data-testid="total-field">
          { totalExpense }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
