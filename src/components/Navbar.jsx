import Additem from './Additem';
import ItemHistory from './ItemHistory';
function Navbar() {
  return (
    <div className='flex flex-row justify-around border-3 border-gray-200 bg-teal-100'>
       <ItemHistory/>
       <Additem/>
    </div>
  )
}

export default Navbar