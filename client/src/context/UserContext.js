// UserContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(() => {
        const storedData = localStorage.getItem('userData');
        return storedData ? JSON.parse(storedData) : null;
    });
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
  
    const addToCart = (item) => {
        if (!userData) {
        navigate("/auth");
        } else {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    
        if (existingItem) {
            setCart((prevCartItems) =>
            prevCartItems.map((cartItem) =>
                cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
            );
        } else {
            setCart((prevCartItems) => [...prevCartItems, { ...item, quantity: 1 }]);
        }
        }
    };

  const removeFromCart = (itemToDelete) => {
    setCart((prevCartItems) => {
      return prevCartItems.filter((item) => item.id !== itemToDelete.id);
    });
  };

  const loginUser = (data, authToken) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setUserData(data);

  };

  const logoutUser = () => {
    localStorage.removeItem('userData');
    setUserData(null);

  };

  useEffect(() => {
    // Check for the stored user data when the component mounts
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      loginUser(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData,setUserData, loginUser, logoutUser, addToCart, removeFromCart, cart }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
