import { createContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"
const ItemsContext = createContext()

function Provider({children}){
    const [Items, setItems] = useState([])
    const [ItemsRendered, setItemsRendered] = useState([])
    const [filter, setFilter] = useState(true)
    
const getItems = async () => {
    try {
        const response = await axios.get("https://localhost:7107/api/Items", {
            headers: { Authorization: `Bearer ${Cookies.get('token')}` },
        });
        const items = response.data;

        setItems(items.reverse());
    } catch (error) {
        console.error("Error fetching items:", error);
    }
};


const filterItems = () => {
    const rendered = filter ? Items.filter(item => !item.bought) : Items;
    console.log("first")
    setItemsRendered(rendered);
};

    const getItemsUnique = async () => {
        const response = await axios.get("https://localhost:7107/api/Items/unique", { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
        return response.data
    
    }

    const createItem = async (name, description, quantity, unit, photo) => {
        try {
            const response = await axios.post("https://localhost:7107/api/Items", { name, description, quantity, unit, photo, bought: false }, { headers: { Authorization: `Bearer ${Cookies.get('token')}` } });

            const updatedItems = [{id: response.data.id, name, description, quantity, unit, photo, bought: false},...Items,]
            setItems(updatedItems)
        }
        catch(error){
            console.log(error)
        }
    }

    const editItemById = async (id, name, description, quantity, unit, photo, bought) => {
        const response = await axios.put(
        `https://localhost:7107/api/Items/${id}`,
            {id, name, description, quantity, unit, photo, bought },
            { headers: { Authorization: `Bearer ${Cookies.get('token')}` } }
            );

        console.log(response)

        const updatedItems = Items.map((item) =>{
            if(item.id === id){
            return {...item,...response.data}
            }
            return item
        })
        setItems(updatedItems)
    }

    const editBoughtById = async (id, bought) => {
        const response = await axios.put(
        `https://localhost:7107/api/Items/${id}/bought?bought=${bought}`,
            {},
            { headers: { Authorization: `Bearer ${Cookies.get('token')}` } }
            );

        console.log(response)

        const updatedItems = Items.map((item) =>{
            if(item.id === id){
            return {...item,...response.data}
            }
            return item
        })
        setItems(updatedItems)
    }

    const deleteItemById = async (id) => {
        console.log(id)
        const response = await axios.delete(
            `https://localhost:7107/api/Items/${id}`,
            { headers: { Authorization: `Bearer ${Cookies.get('token')}` } }
            );

        const updatedItems = Items.filter((item) => item.id !== id)
        setItems(updatedItems)
    }

    const valueToShare = {
        Items,
        ItemsRendered,
        filter, 
        setFilter,
        setItemsRendered,
        getItems,
        getItemsUnique,
        filterItems,
        createItem,
        editItemById,
        editBoughtById,
        deleteItemById
        }

    return (<ItemsContext.Provider value={valueToShare}>
        {children}
    </ItemsContext.Provider>
    )
}

export {Provider}
export default ItemsContext