import { useMemo } from "react"
import { useBudgetContext } from "../hooks/useBudgetContext"
import ExpenseDetail from "./ExpenseDetail"

const ExpenseList = () => {
  const { state } = useBudgetContext()

  const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses

  return (
    <div className="bg-white shadow-lg rounded-lg p-10 mt-10">
      {filteredExpenses.length === 0 ?
        <p className="text-gray-600 text-2xl font-bold">No hay gastos</p> :
        (
          <>
            <p className="text-gray-600 text-2xl font-bold mb-3">Listado de Gastos</p>
            { filteredExpenses.map(expense => (
              <ExpenseDetail key={expense.id} expense={expense} />
            ))}
          </>
        )
      }
    </div>
  )
}

export default ExpenseList