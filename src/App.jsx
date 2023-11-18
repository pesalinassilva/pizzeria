import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

import PizzaContext from "./context/PizzaContext";
import Home from './views/Home'
import Carrito from './views/Carrito'
import DetallePizza from './components/DetallePizza'
import NavBar from './components/NavBar'

function App() {
  const [pizzas, setPizzas] = useState([])
  const [carrito, setCarrito] = useState([])

  const updatePizzas = (pizzas) => {
    setPizzas(pizzas)
  }

  const updateCarrito = (newCarrito) => {
    setCarrito(newCarrito)
  }

  const añadirPizza = (pizzaId) => {
    const auxiliar = [...carrito]
    const pizzaSeleccionada = pizzas.find(pizza => pizza.id == pizzaId)
    const indicePizzaAñadida = carrito.findIndex((itemCarrito) => pizzaSeleccionada.id === itemCarrito.id)
    if (indicePizzaAñadida === -1){
        setCarrito([...carrito, {
          id: pizzaSeleccionada.id,
          nombre: pizzaSeleccionada.name,
          precio: pizzaSeleccionada.price,
          img: pizzaSeleccionada.img,
          cantidad: 1,
        }])
    }else {
        auxiliar[indicePizzaAñadida].cantidad += 1
        setCarrito([...auxiliar])
    }
  }

  //console.log(carrito)

  const getPizzas = async() => {
    const response = await fetch('/pizzas.json')
    const data = await response.json()
    updatePizzas(data)
  }

  useEffect(() => {
    getPizzas()
  }, [])

  const globalState = { pizzas, carrito, añadirPizza, updateCarrito }

  return (
    <>
      <PizzaContext.Provider value={globalState}>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/carrito' element={<Carrito />}/>
            <Route path='/pizza/:id' element={<DetallePizza />}/>
          </Routes>
        </BrowserRouter>
      </PizzaContext.Provider>
    </>
  )
}

export default App
