import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateExpensesList } from '../actions';
import './ExpensesTable.css';

class ExpensesTable extends Component {
  handleClick = ({ target }) => {
    const { id } = target.parentElement.parentElement;
    const { expenses, saveRemainingExpenses } = this.props;
    const remainingExpenses = expenses
      .filter((expense) => expense.id !== Number(id));

    saveRemainingExpenses(remainingExpenses);
  }

  render() {
    const { expenses, openEditForm, editingData: { isEditingAnExpense } } = this.props;

    return (
      <section className="table-wrapper">
        <table className="expenses-container">
          {expenses.length > 0 && (
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Tag</th>
                <th>Método de pagamento</th>
                <th>Valor</th>
                <th>Moeda</th>
                <th>Câmbio utilizado</th>
                <th>Valor convertido</th>
                <th>Moeda de conversão</th>
                <th>Editar/Excluir</th>
              </tr>
            </thead>
          )}
          <tbody>
            {expenses.length > 0 && expenses.map(({ id, value, currency,
              method, tag, description, exchangeRates }) => {
              const { name, ask } = exchangeRates[currency];
              const convertedValue = Number(value) * Number(ask);

              return (
                <tr key={ id } id={ id } className="row">
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td className="number">{ Number(value).toFixed(2) }</td>
                  <td>{ name }</td>
                  <td className="number">{ Number(ask).toFixed(2) }</td>
                  <td className="number">{ convertedValue.toFixed(2) }</td>
                  <td>Real</td>
                  <td className="buttons-panel">
                    <button
                      data-testid="edit-btn"
                      type="button"
                      onClick={ (e) => openEditForm(e) }
                      disabled={ isEditingAnExpense }
                    >
                      Editar
                    </button>

                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ (e) => this.handleClick(e) }
                      disabled={ isEditingAnExpense }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  saveRemainingExpenses: PropTypes.func.isRequired,
  openEditForm: PropTypes.func.isRequired,
  editingData: PropTypes.shape({
    editingExpense: PropTypes.instanceOf(Object).isRequired,
    isEditingAnExpense: PropTypes.bool.isRequired,
  }),
};

ExpensesTable.defaultProps = {
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
  saveRemainingExpenses: (expense) => dispatch(updateExpensesList(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
