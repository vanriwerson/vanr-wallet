import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, updateExpensesList, toggleEditMode } from '../actions';
import fetchCurrencies from '../services/requestAPI';
import './ExpenseForm.css';

const initialExpenseState = {
  id: 0,
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class ExpenseForm extends Component {
  state = initialExpenseState;

  componentDidUpdate() {
    const { editingData: { editingExpense,
      isEditingAnExpense, startEdition }, closeEditForm } = this.props;
    if (startEdition === true) {
      this.getEditingExpense(editingExpense);

      const resetEditMode = {
        editingExpense,
        isEditingAnExpense,
        startEdition: false,
      };
      closeEditForm(resetEditMode);
    }
  }

  getEditingExpense = (expense) => {
    this.setState({ ...expense });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  resetState = () => {
    this.setState(({ id }) => ({
      ...initialExpenseState,
      id: id + 1,
    }));
  }

  handleClick = async () => {
    const exchangeRates = await fetchCurrencies();
    const { saveExpense } = this.props;

    const expense = {
      ...this.state,
      exchangeRates,
    };

    saveExpense(expense);
    this.resetState();
  }

  handleEdit = () => {
    const { editingData: { editingExpense }, expenses,
      saveEditedExpense, closeEditForm } = this.props;
    const { exchangeRates } = editingExpense;
    const index = expenses.indexOf(editingExpense);

    const editedExpense = {
      ...this.state,
      exchangeRates,
    };

    expenses[index] = editedExpense;

    saveEditedExpense(expenses);
    this.resetState();

    const resetEditMode = {
      editingExpense: {},
      isEditingAnExpense: false,
      startEdition: false,
    };
    closeEditForm(resetEditMode);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editingData: { isEditingAnExpense } } = this.props;

    return (
      <form className="expense-form">
        <h1>Adicione sua despesa:</h1>

        <label htmlFor="value-input">
          Valor:
          <input
            className="expense-value"
            type="text"
            data-testid="value-input"
            id="value-input"
            name="value"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>

        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            id="description-input"
            name="description"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            {currencies.map((curr) => (
              <option key={ curr }>{ curr }</option>
            ))}
          </select>
        </label>

        <label htmlFor="method-input">
          Forma de Pagamento:
          <select
            id="method-input"
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria:
          <select
            id="tag-input"
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={ isEditingAnExpense ? this.handleEdit : this.handleClick }
        >
          { isEditingAnExpense ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(String).isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  editingData: PropTypes.shape({
    editingExpense: PropTypes.instanceOf(Object).isRequired,
    isEditingAnExpense: PropTypes.bool.isRequired,
    startEdition: PropTypes.bool.isRequired,
  }),
  saveExpense: PropTypes.func.isRequired,
  saveEditedExpense: PropTypes.func.isRequired,
  closeEditForm: PropTypes.func.isRequired,
};

ExpenseForm.defaultProps = {
  editingData: {
    editingExpense: {},
    isEditingAnExpense: false,
  },
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editingData: state.wallet.editMode,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(addExpense(expense)),
  saveEditedExpense: (expense) => dispatch(updateExpensesList(expense)),
  closeEditForm: (reset) => dispatch(toggleEditMode(reset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
