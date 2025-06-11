import { useContext } from "react"
import Item from "./Item"
import ItemsContext from "../context/Items"

function ItemList() {
  const {ItemsRendered} = useContext(ItemsContext);
  const renderedItems = ItemsRendered.map(item => <Item id={item.id} name={item.name} description={item.description} quantity={item.quantity} unit={item.unit} photo={item.photo} bought={item.bought} key={item.id}/>);

  return (
    <div className="flex flex-row flex-wrap justify-center align-middle">
      {renderedItems}
    </div>
  );
}


export default ItemList