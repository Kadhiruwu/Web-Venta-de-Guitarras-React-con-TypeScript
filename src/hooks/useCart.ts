import {useState, useEffect} from 'react';
import {db} from '../data/db';
import type { TGuitar,TCartItem } from '../types/types';
  export function useCart(){
    
    const initialCart = () : TCartItem[] => {
      const localStorageCart = localStorage.getItem('cart');
      return localStorageCart ? JSON.parse(localStorageCart) : []; //tmb convertir de arreglo a string
    }
  
    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);
  
    const max_items = 9;
    const min_items = 1;
  
    //Para que se guarde el historial del carrito
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])
  
    function addToCart(item : TGuitar){
      const itemExist = cart.findIndex((guitar) => guitar.id === item.id) // para comprobar si existe, no existe es 0, si existe es +0
      if(itemExist >= 0 ){ //existe en el carrito
        if(cart[itemExist].quantity >= max_items) return;
        const updateCart = [...cart];
        updateCart[itemExist].quantity ++ //itemExist es para aumentar en el id q ya existe
        setCart(updateCart);
      }else{
        const newItem : TCartItem = {...item, quantity: 1} 
    
        setCart([...cart, newItem]);
      }
      //saveLocalStorage();
    }
  
    function removeFromCart(id : TGuitar['id']){
      setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
    }
  
    function incrementarBoton(id : TGuitar['id']){
      const updateCart = cart.map(item => {
        if(item.id === id && item.quantity < max_items) {
          // return {
          //   ...item,
          //   quantity: item.quantity +1
          // }
          item.quantity ++
        }
        return item
      })
      setCart(updateCart)
    }
  
    function decrementarBoton(id : TGuitar['id']){
      const updateCart = cart.map(item => {
        if(item.id === id && item.quantity > min_items) {
           return {
            ...item,
             quantity: item.quantity - 1
           }
          //item.quantity -1
        }
        return item
      })
      setCart(updateCart)
    }
  
    function ClearCart(){
      setCart([])
    }
  
    const cartTotal = () => cart.reduce((total, item) => total + (item.quantity * item.price), 0);

    return{
       data,
       cart,
       addToCart,
       removeFromCart,
       decrementarBoton,
       incrementarBoton,
       ClearCart,
       cartTotal
    }
  }