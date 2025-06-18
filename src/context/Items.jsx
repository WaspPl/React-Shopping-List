import { createContext, useState } from "react";
import axios from "axios";

const ItemsContext = createContext()

function Provider({children}){
    const [Items, setItems] = useState([])
    const [ItemsRendered, setItemsRendered] = useState([])
    const [filter, setFilter] = useState(true)
    
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3RyaW5nIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3RyaW5nIiwiZXhwIjozMzI4NTY0OTQ3NCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzEwNyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcxMDcifQ.oieEkpXrhPZ5z3SR9xzaCOFboI6K-2_5KFbGMMr6AYg"
    // test token, to be replaced later with a login screen handling

const getItems = async () => {
    try {
        const response = await axios.get("https://localhost:7107/api/Items", {
            headers: { Authorization: `Bearer ${token}` },
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
        const response = await axios.get("https://localhost:7107/api/Items/unique", { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    
    }

    const createItem = async (name, description, quantity, unit, photo) => {
        try {
            const response = await axios.post("https://localhost:7107/api/Items", { name, description, quantity, unit, photo, bought: false }, { headers: { Authorization: `Bearer ${token}` } });

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
            { headers: { Authorization: `Bearer ${token}` } }
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
            { headers: { Authorization: `Bearer ${token}` } }
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
            { headers: { Authorization: `Bearer ${token}` } }
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