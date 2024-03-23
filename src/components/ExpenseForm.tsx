import { categories } from "../data"
import DatePicker from 'react-date-picker'
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import React, { useEffect, useMemo, useState } from "react"
import { Expense, Value } from "../types"
import ErrorMessage from "./ErrorMessage"
import { useBudgetContext } from "../hooks/useBudgetContext"

const initialState: Expense = {
  expenseName: '',
  amount: 0,
  category: '',
  date: new Date()
}

const ExpenseForm = () => {
  const [expense, setExpense] = useState<Expense>(initialState)
  const [error, setError] = useState('')
  const [previousAmount, setPreviousAmount] = useState(0)
  const { state, dispatch } = useBudgetContext()

  const spent = useMemo(() => state.expenses.reduce((total, expense) => total + expense.amount, 0), [state.expenses])
  const available = useMemo(() => state.budget - spent, [state.expenses])

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.find(expense => expense.id === state.editingId)
      const { id, ...values } = editingExpense!
      setExpense(values)
      setPreviousAmount(editingExpense?.amount!)
    }
  }, [state.editingId])

  const handleChangeDate = (date: Value) => {
    setExpense({
      ...expense,
      date
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const isAmountField = ['amount'].includes(e.target.name)
    setExpense({
      ...expense,
      [e.target.name]: isAmountField ? Number(e.target.value) : e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios')
      setTimeout(() => {
        setError('')
      }, 3000)
      return
    }

    if ((expense.amount - previousAmount) > available) {
      setError('Saldo no disponible')
      setTimeout(() => {
        setError('')
      }, 3000)
      return
    }

    if (state.editingId) {
      dispatch({ type: 'update-expense', payload: {
        expense: {
          ...expense,
          id: state.editingId
        }
      }})
    } else {
      dispatch({ type: 'add-expense', payload: { expense }})
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <legend className="text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        { state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'}
      </legend>

      {error && (<ErrorMessage>{error}</ErrorMessage>)}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">Nombre Gasto:</label>
        <input
          type="text"
          id="expenseName"
          placeholder="Ejm: Cine"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">Cantidad:</label>
        <input
          type="number"
          id="amount"
          placeholder="Ejm: 150"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl">Fecha Gasto:</label>
        <DatePicker className='bg-slate-100 p-2 border-0' value={expense.date} onChange={handleChangeDate}/>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">Categoría:</label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          defaultValue={expense.category}
          onChange={handleChange}
        >
          <option value="" disabled>--Seleccione--</option>
          {categories.map(category => (
            <option
              key={category.id}
              value={category.id}
              selected={category.id === expense.category}
            >{category.name}</option>
          ))}
        </select>
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white font-bold rounded-lg"
        value={state.editingId ? 'Guardar Cambios' : 'Guardar Gasto'}
      />
    </form>
  )
}

export default ExpenseForm