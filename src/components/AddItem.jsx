import { useState, useContext } from "react"
import ItemsContext from "../context/Items"
import Input from "./Input"
import ImageInput from "./Image"
import Combobox from "react-widgets/Combobox";
import Button from "./Button";


function Additem() {

  const [photo, setPhoto] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState("szt")
  const [uniqueItemNames, setUniqueItemNames] = useState([])

  const {createItem, getItemsUnique} = useContext(ItemsContext)
  // const [bought, setBought] = useState(false)


  const handleSubmit = (event) => {
    event.preventDefault()
    createItem(name, description, quantity, unit, photo)
    setName("")
    setDescription("")
    setQuantity(1)
    setUnit("szt")
    setPhoto(null)
  }

  const handleChangeName = (value) => {
    setName(value)
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

const handleSelectName = async () => {
  const response = await getItemsUnique()
  const unique = response.map(item => item.name)
  console.log(unique)
  setUniqueItemNames(unique)
}

  
  return (
    <div className="flex flex-row border-l-5 border-r-5 rounded-xl pr-3 border-teal-300 bg-teal-100">
      <form onSubmit={handleSubmit} className="flex flex-row w-full flex-wrap items-center align-middle place-content-center">
        <ImageInput src={photo} onChange={handleChangePhoto} input={true}/>
        <div className="flex flex-row">
        <div className="flex flex-col p-1">
          <label>Name</label>
          <Combobox
            value={name}
            onChange={handleChangeName}
            onFocus={handleSelectName}
            data={uniqueItemNames}
            hideCaret
            hideEmptyPopup
          />
        </div>

        <Input value={description} onChange={handleChangeDesc} label="Details"/>
        </div>
        <div className="flex flex-row">
          <Input type="number" value={quantity} onChange={handleChangeQuantity} label="Quantity"/>
          <Input value={unit} onChange={handleChangeUnit} label="Unit"/>
        </div>
        <Button square>Submit</Button>
      </form>
    </div>
  )
}

export default Additem