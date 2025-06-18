import { useContext } from 'react';
import Additem from './Additem';
import Toggle from './Toggle';
import { FiEye, FiEyeOff, FiLogOut  } from "react-icons/fi";
import ItemsContext from '../context/Items';
import Button from './Button';
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const { filter, setFilter} = useContext(ItemsContext)

  const {logout} = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleClickHistory = () => {
    setFilter(!filter)
  }

  return (
    <div className='flex flex-row justify-between border-3 border-teal-200 bg-teal-200'>
      <div>
       <Button color='danger' onClick={handleLogout}><FiLogOut size={30}/></Button>
      </div>
       <Toggle value={filter} onChange={handleClickHistory} valueOn={<FiEye size={50}/>} valueOff={<FiEyeOff size={50}/>}/>
       <Additem/>
    </div>
  )
}

export default Navbar