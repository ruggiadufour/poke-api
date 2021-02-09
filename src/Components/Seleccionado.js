import React,{useEffect, useState, useContext} from 'react'
import axios from 'axios'
import ContextoApp from '../Contextos/ContextoApp'
import {useHistory} from 'react-router-dom'

const Seleccionado = ({pokemons}) => {
  const {indice, setIndice, pokeSeleccionado, setPokeSeleccionado} = useContext(ContextoApp);
  const history = useHistory();
  

  function buscar(cual){
      console.log(cual)
    axios(pokemons[cual].url).then((response)=>{
        let data = response.data;
        setPokeSeleccionado(data)
  
      }).catch(error=>{
        console.log(error)
    })
  }

  function siguiente(){
    let i = indice+1;

    if(i<pokemons.length){
        buscar(i)
        setIndice(i)
    }
  }
  function anterior(){
    let i = indice-1;
    console.log(i)
    if(i>=0){
        buscar(i)
        setIndice(i)
    }
  }

  function irInicio(){
    setPokeSeleccionado(null)
    setIndice(null)

    history.push("/")
  }

  return pokeSeleccionado!==null?(
    <div className="container">
        {indice!==0 &&<button id="b1" onClick={anterior}>#{indice}</button>}
        {indice<=pokemons.length-2 &&<button id="b2" onClick={siguiente}>#{indice+2}</button>}
        <div className="imagen">
            <img src={pokeSeleccionado.sprites.front_default}  alt="pokemon" width="100%"/> 
        </div>
        <div className="datos">
            <div style={{textAlign:"left", width:"300px"}}>
                <h2 style={{textTransform:"capitalize", display:"inline"}} >{`${pokeSeleccionado.name} `}</h2>
                <p style={{textTransform:"capitalize", display:"inline"}}>#{indice+1}</p>
            </div>
            <div className="container_datos">
                <div className="elemento">
                    <p>Height</p>
                    <p>{`${pokeSeleccionado.height/10*3.28}'' (${pokeSeleccionado.weight/10}m)`}</p>
                </div>
                <div className="elemento">
                    <p>Type</p>
                    {
                        pokeSeleccionado.types.map((typ,i)=>(
                            <span key={i} style={{color:"white",padding:"5px",borderRadius:"5px",backgroundColor:"orange",margin:"5px"}}>{typ.type.name}</span>
                        ))
                    }
                </div>
                <div className="elemento">
                    <p>Weight</p>
                    <p>{`${pokeSeleccionado.weight/10*2.204}lbs (${pokeSeleccionado.weight/10}kg)`}</p>
                </div>
                <div className="elemento" >
                    <p >Abilities</p>
                    {
                        pokeSeleccionado.abilities.map((hab)=>(
                            <p key={hab.ability.name}>{hab.ability.name}</p>
                        ))
                    }
                </div>
            </div>
        </div>
     
      <button onClick={irInicio}>Volver</button>
    </div>
  ):<div>
      <h2>No seleccionó ningun Pokemon.</h2>
      <button onClick={irInicio}>Volver</button>
  </div>
}
export default Seleccionado;