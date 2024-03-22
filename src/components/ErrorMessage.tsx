import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const ErrorMessage = ({children}: Props) => {
  return (
    <div className="bg-red-500 text-white text-center py-2 font-bold rounded-md">{children}</div>
  )
}

export default ErrorMessage