
import Header from './components/Header';
import  Guitar  from './components/Guitar';
import { useCart } from './hooks/useCart';

function App() {

  const {data, cart, addToCart, removeFromCart, decrementarBoton, incrementarBoton, ClearCart, cartTotal} = useCart();

  return (

    <>

    <Header
      cart = {cart}
      removeFromCart = {removeFromCart}
      incrementarBoton = {incrementarBoton}
      decrementarBoton = {decrementarBoton}
      ClearCart = {ClearCart}
      cartTotal = {cartTotal}
     />  

    <main className="container-xl mt-5">
        <h2 className="text-center">Escoge tus Productos</h2>

        <div className="row mt-5">
          {data.map((guitar) =>(
             <Guitar 
                key={guitar.id}
                guitar={guitar}
                addToCart = {addToCart}
                // nombre = {guitar.name}
                // imagen = {guitar.image}
                // descripcion = {guitar.description}
                // price = {guitar.price}
             />
          ))}
        
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">Kadhir Avila Gallardo - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
