import { useMemo } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useBudgetContext } from "../hooks/useBudgetContext"
import AmountDisplay from "./AmountDisplay"
import 'react-circular-progressbar/dist/styles.css'

const BudgetTracker = () => {
  const {state, dispatch} = useBudgetContext()
  const spent = useMemo(() => state.expenses.reduce((total, expense) => total + expense.amount, 0), [state.expenses])
  const available = useMemo(() => state.budget - spent, [state.expenses])
  const percentage = +((spent / state.budget) * 100).toFixed(2)
  
   return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar value={percentage} styles={buildStyles({
          pathColor: percentage === 100 ? '#dc2626':'#3b82f6',
          trailColor: '#f5f5f5',
          textSize: 8,
          textColor: percentage === 100 ? '#dc2626':'#3b82f6',
        })} text={`${percentage}% Gastado`}/>
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white font-bold rounded-lg"  
          onClick={() => dispatch({type: 'reset-app'})}
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