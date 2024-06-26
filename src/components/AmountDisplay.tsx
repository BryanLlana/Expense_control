import { formatNumberToPen } from "../helpers"

type Props = {
  label?: string,
  amount: number
}

const AmountDisplay = ({label, amount}: Props) => {
  return (
    <p className="text-2xl text-blue-600 font-bold">
      {label && `${label}:`}<span className="font-black text-black"> {formatNumberToPen(amount)}</span>
    </p>
  )
}

export default AmountDisplay