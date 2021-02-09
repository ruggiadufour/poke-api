import React,{useEffect, useState, useContext} from 'react'
import axios from 'axios'
import ContextoApp from '../Contextos/ContextoApp'
import {useHistory} from 'react-router-dom'

const Card = ({pokemon, indice, esBusqueda}) => {
  const [datos, setDatos] = useState({})
  const {setIndice, setPokeSeleccionado} = useContext(ContextoApp);
  const history = useHistory();

  useEffect(async ()=>{
    console.log(esBusqueda)
    if(!esBusqueda){
      axios(pokemon.url).then((response)=>{
        let data = response.data;
        console.log(data)
        setDatos(data)
  
      }).catch(error=>{
        console.log(error)
      })
    }else{
      setDatos(pokemon);
      console.log(pokemon)
    }
  },[pokemon])

  function seleccionar(){
    setIndice(indice)
    setPokeSeleccionado(datos)
    history.push("/seleccionado")
  }

  return (
    <div className="card" onClick={seleccionar}>
      <img src={datos.sprites && datos.sprites.front_default} alt="pokemon" width="100%"/>
      <h2>{pokemon.name}</h2>
      <p>#{indice+1}</p>
    </div>
  );
}
export default Card;