import { useContext, useState } from "react"
import Image from "./Image"
import ItemsContext from "../context/Items"
import ItemEdit from "./ItemEdit"
import Button from "./Button"
import Toggle from "./Toggle"
import { FiTrash2, FiEdit3, FiCheck, FiSquare } from "react-icons/fi";


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
      <div className="w-1/4">
      <Image src={item.photo} input={showEdit}/>
      </div>
      <div className="flex flex-col w-1/2 p-1 flex-wrap">
        <p className="text-3xl border-b-2 border-teal-300">{item.name}</p>
        <p>{item.description}</p>
      </div>
      <div className="flex flex-col w-1/4 justify-around items-center">
        <div className="flex flex-row flex-wrap">  
          <p>{item.quantity}</p>
          <p>{item.unit}</p>
        </div>
        <Toggle onChange={handleCheckmark} value={item.bought} valueOn={<FiSquare size={50}/>} valueOff={<FiCheck size={50}/>}/>
      </div>
    </div>
  )
  if(showEdit) content = <ItemEdit item={item} onSubmit={handleEdit}/>

  return (
    <div className={"w-xl border-2 border-teal-300 rounded-xl m-2 p-2 bg-teal-100 " + (item.bought ? "opacity-40" : "")}>
      <div className="flex flex-row gap-2 mb-2">
        <Button onClick={handleEdit}><FiEdit3/></Button>
        <Button onClick={handleDelete}><FiTrash2/></Button>
      </div>
      {content}
    </div>
  )


}

export default Item