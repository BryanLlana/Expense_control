import { useMemo } from "react"
import { formatDate } from "../helpers"
import { ExpenseWithId } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data"

type Props = {
  expense: ExpenseWithId
}

const ExpenseDetail = ({ expense }: Props) => {
  const { category, expenseName, date, amount } = expense
  const categoryInfo = useMemo(() => categories.find(cat => cat.id === category), [expense])
  return (
    <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
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
  )
}

export default ExpenseDetail