export type Category = {
  id: string,
  name: string,
  icon: string
}

type ValuePiece = Date | null
export type Value = ValuePiece | [ValuePiece, ValuePiece]

export type Expense = {
  expenseName: string,
  amount: number,
  category: string,
  date: Value
}

export type ExpenseWithId = Expense & {
  id: string
}