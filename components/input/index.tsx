import { useState } from "react"

export const Input = () => {
  const [editMode, setEditMode] = useState(false);
  return(
    <input type="text" />
  )
}