import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesThunk, toggleEditMode } from '../actions';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpensesTable from '../components/ExpensesTable';
import './Wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrenciesList } = this.props;
    getCurrenciesList();
  }

  openEditForm = ({ target }) => {
    const { id } = target.parentElement.parentElement;
    const { walletData: { expenses }, openEditMode } = this.props;
    const editingExpense = expenses.find((expense) => expense.id === Number(id));

    const editingData = {
      editingExpense,
      isEditingAnExpense: true,
      startEdition: true,
    };

    openEditMode(editingData);
  }

  render() {
    const { walletData: { currencies, expenses } } = this.props;

    return (
      <div className="wallet-container">
        <Header />
        <ExpenseForm
          currencies={ currencies }
          expenses={ expenses }
        />
        <ExpensesTable
          expenses={ expenses }
          openEditForm={ this.openEditForm }
        />
      </div>
    );
  }
}

Wallet.propTypes = {
  walletData: PropTypes.instanceOf(Object).isRequired,
  getCurrenciesList: PropTypes.func.isRequired,
  openEditMode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  walletData: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesList: () => dispatch(fetchCurrenciesThunk()),
  openEditMode: (editingData) => dispatch(toggleEditMode(editingData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
