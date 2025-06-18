import ItemList from '../ItemList';
import { useEffect, useContext } from 'react';
import ItemsContext from '../../context/Items';
import Navbar from '../Navbar';
import "react-widgets/styles.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/Auth';

function Home() {

  const {Items, getItems, filterItems, filter } = useContext(ItemsContext)

    const {setError} = useAuth()
    const navigate = useNavigate()  

    useEffect(() => {
    const interceptor = axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response?.status === 401) {
                navigate("/login");
                setError("Credentials expired, you need to log in again")
            }
            return Promise.reject(error);
        }
    );
        return () => {
        axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);


  useEffect(() => {
    getItems()
  }, [])
  useEffect(() => {
    filterItems();
  }, [Items, filter])

  return (
    <div className="App bg-teal-50 h-screen">
      <Navbar/>
      <ItemList/>
    </div>
  )
}

export default Home;
