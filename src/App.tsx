import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import Header from "./components/Header"
import { useBudgetContext } from "./hooks/useBudgetContext"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"

function App() {
  const { state } = useBudgetContext()
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
    localStorage.setItem('budget', String(state.budget))
  }, [state.expenses, state.budget])
  
  return (
    <>
      <Header />

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        { isValidBudget ? <BudgetTracker /> : <BudgetForm /> }
      </div>

      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  )
}

export default App
