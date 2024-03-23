import { useMemo } from "react"
import { useBudgetContext } from "../hooks/useBudgetContext"
import AmountDisplay from "./AmountDisplay"

const BudgetTracker = () => {
  const {state} = useBudgetContext()
  const spent = useMemo(() => state.expenses.reduce((total, expense) => total + expense.amount, 0), [state.expenses])
  const available = useMemo(() => state.budget - spent, [state.expenses])
  
   return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="/img/grafico.jpg" alt="Gráfico de gastos" />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white font-bold rounded-lg"  
        >Resetear App
        </button>
        <AmountDisplay label="Presupuesto" amount={state.budget} />
        <AmountDisplay label="Disponible" amount={available} />
        <AmountDisplay label="Gastado" amount={spent} />
      </div>
    </div>
  )
}

export default BudgetTracker