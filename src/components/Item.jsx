import { useContext, useState } from "react"
import Image from "./Image"
import ItemsContext from "../context/Items"
import ItemEdit from "./ItemEdit"
import Button from "./Button"


function Item(item) {
  const {deleteItemById, editBoughtById} = useContext(ItemsContext)

  const [showEdit, setShowEdit] = useState(false)

  const handleDelete = (event) => {
    event.preventDefault()
    deleteItemById(item.id)
  }

  const handleEdit = () => {
    setShowEdit(!showEdit)
  }

  const handleCheckmark = () => {
    const checkmarkValue = !item.bought
    editBoughtById(item.id, checkmarkValue)
  }

  let content = (
    <div className="flex flex-row ">
      <Image src={item.photo} alt="No photo" input={showEdit}/>
      <div className="flex flex-col w-full p-1 flex-wrap">
        <p className="text-3xl border-b-2 border-gray-300">{item.name}</p>
        <p>{item.description}</p>
      </div>
          <p>{item.quantity}</p>
          <p>{item.unit}</p> 
      <input type="checkbox"  checked={item.bought} className="w-20 h-20 self-end" onChange={handleCheckmark}/>
    </div>
  )
  if(showEdit) content = <ItemEdit item={item} onSubmit={handleEdit}/>

  return (
    <div className={"w-xl border-2 border-gray-300 rounded m-2 p-2 bg-green-100 " + (item.bought ? "opacity-40" : "")}>
      <div className="flex flex-row gap-2 mb-2">
        <Button onClick={handleEdit}>edit</Button>
        <Button onClick={handleDelete}>del</Button>
      </div>
      {content}
    </div>
  )


}

export default Item