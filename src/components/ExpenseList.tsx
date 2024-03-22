import { useBudgetContext } from "../hooks/useBudgetContext"
import ExpenseDetail from "./ExpenseDetail"

const ExpenseList = () => {
  const { state } = useBudgetContext()

  return (
    <div className="mt-10">
      {state.expenses.length === 0 ?
        <p className="text-gray-600 text-2xl font-bold">No hay gastos</p> :
        (
          <>
            <p className="text-gray-600 text-2xl font-bold mb-3">Listado de Gastos</p>
            { state.expenses.map(expense => (
              <ExpenseDetail key={expense.id} expense={expense} />
            ))}
          </>
        )
      }
    </div>
  )
}

export default ExpenseList