import logo from './logo.svg';
import './App.css';
import Card from './Components/Card'
import Seleccionado from './Components/Seleccionado'
import { useEffect, useState } from 'react';

import ContextoApp from './Contextos/ContextoApp'

import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom'

import axios from 'axios'
function App() {
  const [pokemons, setPokemons] = useState([])
  const [nombre, setNombre] = useState("")
  const [noEncontrado, setNoEncontrado] = useState("")
  const [esBusqueda, setEsBusqueda] = useState(false)
  const [pokeSeleccionado, setPokeSeleccionado] = useState(null)
  const [indice, setIndice] = useState(null)

  const url =  "https://pokeapi.co/api/v2/pokemon?limit=7" 
  useEffect(async ()=>{
    obtenerPokemons()
  },[])

  function obtenerPokemons(){
    axios(url).then((response)=>{
      let data = response.data.results;
      setPokemons(data)
    }).catch(error=>{
      console.log(error)
    })
  }


  function buscar(){
    const urlNombre = "https://pokeapi.co/api/v2/pokemon/"+nombre;

    axios(urlNombre).then((response)=>{
      setEsBusqueda(true)
      setNoEncontrado("")
      let data = response.data;
      console.log(data)
      setPokemons([data])
    }).catch(error=>{
      console.log(error)
      setNoEncontrado("No se ha encontrado a ningún Pokemon con ese nombre")
    })

  }

  function volver(){
    setNoEncontrado("")
    setEsBusqueda(false)
    obtenerPokemons()
  }

  return (
    <div className="App">
      <ContextoApp.Provider value={{pokemons, setPokemons, indice, setIndice, pokeSeleccionado, setPokeSeleccionado}}>
        <div className="input_button">
          <input type="text" placeholder="Busca Pokémon" onChange={(e)=>{setNombre(e.target.value)}}/>
          <button onClick={buscar}>🔎</button>
        </div>

        {
          noEncontrado!=="" && <h2>{noEncontrado}</h2>
        }

        <Router>
          <Switch>
            <Route exact path="/">
              <div className="container">
              {
                pokemons.map((pokemon,i)=>
                  <Card key={i} pokemon={pokemon} indice={i} esBusqueda={esBusqueda}/>
                )
              }
              </div>
            </Route>

            <Route path="/seleccionado">
              <Seleccionado pokemons={pokemons}/>
            </Route>
          </Switch>
        </Router>
        {
          esBusqueda===true && <button onClick={volver}>Volver inicio</button>
        }
      </ContextoApp.Provider>
    </div>
  );
}

export default App;
