import { useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import Header from "./components/Header"
import { useBudgetContext } from "./hooks/useBudgetContext"
import BudgetTracker from "./components/BudgetTracker"

function App() {
  const { state } = useBudgetContext()
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])
  
  return (
    <>
      <Header />

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        { isValidBudget ? <BudgetTracker /> : <BudgetForm /> }
      </div>
    </>
  )
}

export default App
