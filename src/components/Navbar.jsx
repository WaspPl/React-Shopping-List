import { useContext } from 'react';
import Additem from './Additem';
import Toggle from './Toggle';
import { FiEye, FiEyeOff } from "react-icons/fi";
import ItemsContext from '../context/Items';

function Navbar() {

  const { filter, setFilter} = useContext(ItemsContext)

  const handleClickHistory = () => {
    setFilter(!filter)
  }

  return (
    <div className='flex flex-row justify-around border-3 border-teal-200 bg-teal-100'>
       <Toggle value={filter} onChange={handleClickHistory} valueOn={<FiEye size={50}/>} valueOff={<FiEyeOff size={50}/>}/>
       <Additem/>
    </div>
  )
}

export default Navbar