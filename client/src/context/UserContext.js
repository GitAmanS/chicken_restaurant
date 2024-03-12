// UserContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : null;
  });

  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0)
  const addToCart = async (item) => {
    if (!userData) {
      navigate("/auth");
    } else {
      const existingItem = cart.find((cartItem) => cartItem._id === item._id);
      console.log(cart)
      console.log(item)
      try {
        const response = await axios.post(
          `http://localhost:5000/api/cart/add/${item._id}`,
          { quantity: 1 },
          { withCredentials: true }
        );

        console.log(response)
        setCartTotal(response.data.total)

        if (existingItem) {
          setCart((prevCartItems) =>
            prevCartItems.map((cartItem) =>
              cartItem._id === item._id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          );
        } else {
          console.log(cart)
          setCart((prevCartItems) => [...prevCartItems, { ...item, quantity: 1 }]);
        }
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
  };

  const removeFromCart = async (itemToDelete) => {
    const response = await axios.delete(
      `http://localhost:5000/api/cart/remove/${itemToDelete._id}`,
      { withCredentials: true }
    );
    setCartTotal(response.data.total)

    console.log(response)
    setCart((prevCartItems) => {
      return prevCartItems.filter((item) => item._id !== itemToDelete._id);
    });
  };

  const loginUser = (data, authToken) => {
    localStorage.setItem('userData', JSON.stringify(data));
    setUserData(data);
  };

  const logoutUser = () => {
    localStorage.removeItem('userData');
    setUserData(null);
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      loginUser(JSON.parse(storedUserData));
    }

    const fetchData = async () => {
      try {
        const cartData = await axios.get('http://localhost:5000/api/cart', {
          withCredentials: true,
        });
        const data = cartData.data.formattedCart;
        console.log(cartData.data)
        
        if (data) {
          setCart(data);
          setCartTotal(cartData.data.total)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (userData) {
      fetchData();
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, loginUser, logoutUser, addToCart, removeFromCart, cart, cartTotal }}>
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
