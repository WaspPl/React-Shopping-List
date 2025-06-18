import Input from "./Input"
import Image from "./Image"
import { useContext, useState } from "react"
import ItemsContext from "../context/Items"
import Button from "./Button"

function ItemEdit({item, onSubmit}) {
    const [photo, setPhoto] = useState(item.photo)
    const [name, setName] = useState(item.name)
    const [description, setDescription] = useState(item.description)
    const [quantity, setQuantity] = useState(item.quantity)
    const [unit, setUnit] = useState(item.unit)

    const {editItemById} = useContext(ItemsContext)

  const handleChangeName = (event) => {
    setName(event.target.value)
  }
  const handleChangeDesc = (event) => {
    setDescription(event.target.value)
  }
  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value)
  }
  const handleChangeUnit = (event) => {
    setUnit(event.target.value)
  }
  const handleChangePhoto = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result; 
      setPhoto(base64);           
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    editItemById(item.id, name, description, quantity, unit, photo, item.bought)
    onSubmit()

  }

  return (
    <form className="flex flex-row" onSubmit={handleSubmit}>
      <div className="w-1/4">
      <Image src={photo} alt="No photo" input={true} onChange={handleChangePhoto}/>
      </div>
      <div className="flex flex-col w-1/2 p-1 flex-wrap">
        <Input value={name} onChange={handleChangeName}/>
        <Input value={description} onChange={handleChangeDesc}/>
      </div>
      <div className="flex flex-col w-1/4 justify-around items-center">
        <div className="flex flex-row flex-wrap">  
          <Input value={quantity} onChange={handleChangeQuantity}/>
          <Input value={unit} onChange={handleChangeUnit}/> 
        </div>
       <Button square type="submit">Submit</Button>
      </div>
    </form>
  )
}
    
export default ItemEdit