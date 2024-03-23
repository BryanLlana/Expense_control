import { useMemo } from "react"
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import { formatDate } from "../helpers"
import { ExpenseWithId } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data"
import 'react-swipeable-list/dist/styles.css'
import { useBudgetContext } from "../hooks/useBudgetContext"

type Props = {
  expense: ExpenseWithId
}

const ExpenseDetail = ({ expense }: Props) => {
  const { dispatch } = useBudgetContext()
  const { id, category, expenseName, date, amount } = expense
  const categoryInfo = useMemo(() => categories.find(cat => cat.id === category), [expense])

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => dispatch({ type: 'get-expense-by-id', payload: {id}})}>
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => dispatch({type: 'delete-expense', payload: {id}})} destructive={true}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem maxSwipe={1} leadingActions={leadingActions()} trailingActions={trailingActions()}>
        <div className="bg-white shadow-lg py-10 w-full border-b border-gray-200 flex gap-5 items-center">
          <div>
            <img src={`/img/icono_${categoryInfo?.icon}.svg`} alt="Icono Gasto" className="w-20" />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo?.name}</p>
            <p>{expenseName}</p>
            <p className="text-slate-600 text-sm">{ formatDate(date?.toString()!) }</p>
          </div>
          <AmountDisplay amount={amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default ExpenseDetail