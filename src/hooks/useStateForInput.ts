import { useState } from "react"

const useStateForInput = (initialState: any) => {
  const [data, setData] = useState(initialState)

  return [
    data,
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      setData(e.target.value),
  ]
}

export default useStateForInput
