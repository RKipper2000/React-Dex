import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import Logo from "../images/pkdxLogo.png"
import ErrorImage from "../images/pokeball_pixels.png"
import './api.css'

function BasicInfo({pokemon}){
    const [nombre, setNombre] = useState(pokemon.name)
    const [dexNo, setDexNo] = useState(pokemon.id)
    const [types, setTypes] = useState("null")
    const [altura, setAltura] = useState(pokemon.height/10)
    const [abilities, setAbilities] = useState("null")
    const [weight, setWeight] = useState(pokemon.weight/10)


    function changeTypes(){
        var tipos = "";
        if ('types' in pokemon){
            if (pokemon.types.length === 1){
            tipos += pokemon.types[0].type.name;
        } else if (pokemon.types.length > 1){
            tipos += pokemon.types[0].type.name + "/" + pokemon.types[1].type.name;
        }
        setTypes(tipos)
        }
        
    }

    function changeAbilities(){
        var abil = "";
        if ('abilities' in pokemon){
            for(let i=0; i< pokemon.abilities.length; i++){
                abil += pokemon.abilities[i].ability.name + ", "
            }
            setAbilities(abil.substring(0, abil.length-2))
        }
    }

    useEffect(() => {
        setNombre(pokemon.name)
        setDexNo(pokemon.id)
        changeTypes()
        setAltura(pokemon.height/10)
        setWeight(pokemon.weight/10)
        changeAbilities()
    },[pokemon])

    return(<div id="basic-info">
        <h2>{nombre}</h2>
        <p># {dexNo}<br/>Type:<br/>{types}<br/>
        Height: {altura}m<br/>
        Weight: {weight} kg<br/>
        Abilities: {abilities}</p>
    </div>)
}

function AddlInfo({pokemon}){
    const [normalSprite, setNormalSprite] = useState("null")
    const [shinySprite, setShinySprite] = useState("null")

    function changeSprites(){
        if ('sprites' in pokemon){
            if (pokemon.sprites.front_default !== null) {
                setNormalSprite(pokemon.sprites.front_default)
            } else {
                setNormalSprite({ErrorImage})
            }
            if (pokemon.sprites.front_shiny !== null) {
                setShinySprite(pokemon.sprites.front_shiny)
            } else {
                setShinySprite(ErrorImage)
            }
            /*
            setNormalSprite(pokemon.sprites.front_default)
            setShinySprite(pokemon.sprites.front_shiny)
            */
        }
    }

    useEffect(() => {
        changeSprites()
    }, [pokemon])
    return(
        <div id='addl-info'>
            <h2>Sprites</h2>
            <div className="image-container">
                <img src={normalSprite} className="sprite" alt="normal sprite"></img>
                <img src={shinySprite} className="sprite" alt="shiny sprite"></img>
            </div>
            <div className="image-container">
                <p className="sprite-tag">Normal</p>
                <p className="sprite-tag">Shiny</p>
            </div>
        </div>
    )
}



function Pokemon(){
    const [search, setSearch] = useState("ditto")
    const [poke, setPoke] = useState([])
    const ogURL = "https://pokeapi.co/api/v2/pokemon/"

    useEffect(() => {
        const fetchData = async() =>{
            const response = await fetch(ogURL+search)
            if(response.ok){
                const newPoke= await response.json()
            setPoke(newPoke)
            console.log(poke)
            } else {
                alert("Error: Pokemon not found")
            }
        }
        fetchData()
    }, [search])

    function clickHandler(){
        const pkmn = document.getElementById("poke-name").value
        console.log(pkmn)
        setSearch(pkmn.toLowerCase())
    }

    return (
        <div>
            <div id="header">
                <img src={Logo} id="pokedex-logo" alt="logo"></img>
                <input type="text" id="poke-name" name="usuario" defaultValue="ditto"></input>
                <Button variant='danger' onClick={clickHandler}>Find Pokemon</Button>
            </div>
            
            <div id='data-container'>
                {poke && <BasicInfo pokemon={poke} />}
                {poke && <AddlInfo pokemon={poke} />}
            </div>
            
        </div>
    )
    
} export default Pokemon