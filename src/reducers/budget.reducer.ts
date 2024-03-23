import { Category, Expense, ExpenseWithId } from "../types"
import { v4 as uuid } from 'uuid'

export type BudgetActions = 
  { type: 'add-budget', payload: { budget: number } } |
  { type: 'show-modal' } |
  { type: 'close-modal' } |
  { type: 'add-expense', payload: {expense: Expense }} |
  { type: 'delete-expense', payload: {id: ExpenseWithId['id']}} |
  { type: 'get-expense-by-id', payload: {id: ExpenseWithId['id']}} |
  { type: 'update-expense', payload: {expense: ExpenseWithId}} |
  { type: 'reset-app' } |
  { type: 'add-filter-category', payload: {id: Category['id']}}

export type BudgetState = {
  budget: number,
  modal: boolean,
  expenses: ExpenseWithId[],
  editingId: ExpenseWithId['id'],
  currentCategory: Category['id']
}

const getLocalStorageExpenses = () => {
  const expenses = localStorage.getItem('expenses')
  return expenses ? JSON.parse(expenses) : []
}

const getLocalStorageBudget = () => {
  const budget = localStorage.getItem('budget')
  return budget ? parseInt(budget) : 0
}

export const initialState: BudgetState = {
  budget: getLocalStorageBudget(),
  modal: false,
  expenses: getLocalStorageExpenses(),
  editingId: '',
  currentCategory: ''
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
      modal: false,
      editingId: ''
    }
  }

  if (action.type === 'add-expense') {
    return {
      ...state,
      expenses: [...state.expenses, createExpenseWithId(action.payload.expense)],
      modal: false
    }
  }

  if (action.type === 'delete-expense') {
    return {
      ...state,
      expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
    }
  }

  if (action.type === 'get-expense-by-id') {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true
    }
  }

  if (action.type === 'update-expense') {
    return {
      ...state,
      editingId: '',
      modal: false,
      expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense)
    }
  }

  if (action.type === 'reset-app') {
    return {
      ...state,
      budget: 0,
      expenses: []
    }
  }

  if (action.type === 'add-filter-category') {
    return {
      ...state, 
      currentCategory: action.payload.id
    }
  }
  return state
}