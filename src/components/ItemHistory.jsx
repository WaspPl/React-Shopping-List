import { useContext, useState } from "react"
import ItemsContext from "../context/Items"
import Button from "./Button"

function ItemHistory() {

  
  const { filter, setFilter} = useContext(ItemsContext)

  const handleClick = () => {
    setFilter(!filter)
  }

  return (
    <Button onClick={handleClick} type="button">
      History {filter ? "off" : "on"}
    </Button>
  )
}

export default ItemHistory