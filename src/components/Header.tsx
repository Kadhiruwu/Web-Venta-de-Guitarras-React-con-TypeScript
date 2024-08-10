import type { TCartItem, TGuitar } from "../types/types"

type HeaderProps = {
    cart: TCartItem[];
    removeFromCart: (id: TGuitar['id']) => void;
    decrementarBoton: (id: TGuitar['id']) => void;
    incrementarBoton: (id: TGuitar['id']) => void;
    ClearCart: () => void;
    cartTotal: () => number;

}
//pasa cart en el header luego con el map crea una copia, luego lo jalamos con guitar, q contiene todo lo de cart, y podemos jalar nombre, precio etc
export default function Header({cart, removeFromCart, incrementarBoton, decrementarBoton, ClearCart, cartTotal} : HeaderProps){
 
    
    return(
        <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        className="carrito"
                    >
                        <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                            <p className="text-center">{cart.length === 0 ? 'El carrito esta vacio' : 'Articulos seleccionados'}</p>
                            <>
                            <table className="w-100 table">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {cart.map(guitar => (

                                    <tr key={guitar.id}>
                                        <td>
                                            <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                        </td>
                                        <td>{guitar.name}</td>
                                        <td className="fw-bold">
                                                ${guitar.price}
                                        </td>
                                        <td className="flex align-items-start gap-4">
                                            <button
                                                type="button"
                                                className="btn btn-dark"    
                                                onClick={() => decrementarBoton(guitar.id)}
                                            >
                                                -
                                            </button>
                                                {guitar.quantity}
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={() => incrementarBoton(guitar.id)}
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                type="button"
                                                onClick={() => removeFromCart(guitar.id)}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            {cart.length === 0 ? '' : 
                            <p className="text-end">Total pagar: <span className="fw-bold">{cartTotal()}</span></p>}

                            </>
                            <button className="btn btn-dark w-100 mt-3 p-2" onClick={ClearCart}>Vaciar Carrito</button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>


    )
}