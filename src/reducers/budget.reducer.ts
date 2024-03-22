import { Expense, ExpenseWithId } from "../types"
import { v4 as uuid } from 'uuid'

export type BudgetActions = 
  { type: 'add-budget', payload: { budget: number } } |
  { type: 'show-modal' } |
  { type: 'close-modal' } |
  { type: 'add-expense', payload: {expense: Expense }}

export type BudgetState = {
  budget: number,
  modal: boolean,
  expenses: ExpenseWithId[]
}

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: []
}

const createExpenseWithId = (expense: Expense): ExpenseWithId => {
  return {
    ...expense,
    id: uuid()
  }
}

export const budgetReducer = (state: BudgetState = initialState, action: BudgetActions) => {
  if (action.type === 'add-budget') {
    return  {
      ...state,
      budget: action.payload.budget
    }
  }

  if (action.type === 'show-modal') {
    return {
      ...state,
      modal: true
    }
  }

  if (action.type === 'close-modal') {
    return {
      ...state,
      modal: false
    }
  }

  if (action.type === 'add-expense') {
    return {
      ...state,
      expenses: [...state.expenses, createExpenseWithId(action.payload.expense)],
      modal: false
    }
  }
  return state
}