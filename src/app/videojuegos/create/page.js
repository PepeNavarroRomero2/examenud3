'use client'
import { useState, useEffect } from "react";


export default function CreateVideojuego(){

    const [titulo, setTitulo]=useState("")
    const [plataforma, setPlataforma]=useState("")
    const [genero, setGenero]=useState("")
    const [fechaLanzamiento, setFechaLanzamiento]=useState("")
    const [completado, setCompletado]=useState(false)

    async function agregarItem(e) {
        e.preventDefault();
        const response = await fetch("/api/videojuegos", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                video: {
                    titulo: titulo,
                    plataforma: plataforma,
                    genero: genero,
                    fecha_lanzamiento: fechaLanzamiento,
                    completado: completado
                },
            }), 
        });
        if (response.ok) {
            alert("Producto añadido exitosamente.");
            setTitulo("")
            setPlataforma("")
            setGenero("")
            setFechaLanzamiento("")
            setCompletado(false)
            window.location.href = "/videojuegos/"
          } else {
            alert("Hubo un error al añadir el contacto.");
          }
        
    }


    return(
        <div>
            <form onSubmit={agregarItem}>
                <label>
                    Titulo
                    <input type="text" required onChange={(e)=>{setTitulo(e.target.value)}} value={titulo}/>
                </label>
                <label>
                    Plataforma
                    <input type="text" required onChange={(e)=>{setPlataforma(e.target.value)}} value={plataforma}/>
                </label>
                <label>
                    Genero
                    <input type="text" required onChange={(e)=>{setGenero(e.target.value)}} value={genero}/>
                </label>
                <label>
                    Fecha de lanzamiento
                    <input type="date" required onChange={(e)=>{setFechaLanzamiento(e.target.value)}} value={fechaLanzamiento}/>
                </label>
                <label>
                    Completado
                    <input type="checkbox" onChange={(e)=>setCompletado(!completado)}/>
                </label>
                <br></br>
                <input type="submit" value={"Enviar"}/>
            </form>
        </div>
    )
}
