import ItemList from './components/ItemList';
import { useEffect, useContext } from 'react';
import ItemsContext from './context/Items';
import Navbar from './components/Navbar';
import "react-widgets/styles.css";

function App() {

  const {Items, getItems, filterItems, filter } = useContext(ItemsContext)

  useEffect(() => {
    getItems()
  }, [])
  useEffect(() => {
    filterItems();
  }, [Items, filter])

  return (
    <div className="App">
      <Navbar/>
      <ItemList/>
    </div>
  )
}

export default App;
