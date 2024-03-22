import { useMemo, useState } from "react"

const BudgetForm = () => {
  const [budget, setBudget] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber)
  }

  const isValidateBudget = useMemo(() => budget > 0, [budget])

  return (
    <form className="space-y-5">
      <div className="flex flex-col space-y-5">
        <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
          Definir Presupuesto
        </label>
        <input
          type="number"
          className="w-full bg-white border border-gray-200 p-2 rounded-md"
          name="budget"
          value={budget}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        value='Guardar Presupuesto'
        disabled={!isValidateBudget}
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-bold disabled:opacity-50"
      />
    </form>
  )
}

export default BudgetForm