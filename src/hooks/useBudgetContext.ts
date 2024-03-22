import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

export const useBudgetContext = () => {
  return useContext(BudgetContext)
}