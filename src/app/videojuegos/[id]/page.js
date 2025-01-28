'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { use } from "react";


export default function ItemVideojuego({params}){
    const { id } = use(params);
    const [titulo, setTitulo]=useState("")
    const [plataforma, setPlataforma]=useState("")
    const [genero, setGenero]=useState("")
    const [fechaLanzamiento, setFechaLanzamiento]=useState("")
    const [completado, setCompletado]=useState(false)

    async function fetchItems() {
        const url = "/api/videojuegos/videojuegosuser?id=" + id;
        const response = await fetch(url);
        const cont = await response.json();
        setTitulo(cont.titulo);
        setPlataforma(cont.plataforma);
        setGenero(cont.genero);
        setFechaLanzamiento(cont.fechaLanzamiento);
        setCompletado(cont.completado);
    }

    useEffect(() => {
        fetchItems();
    }, []);

    return(
        <div>
            <Link href={"/videojuegos/"}><h3>Regresar</h3></Link>
            <br></br>
            <h4>{titulo}</h4>
            <p>{plataforma}</p>
            <p>{genero}</p>
            <p>{fechaLanzamiento}</p>
            <p>{completado?"Si":"No"}</p>
            <br></br>
            <Link href={"/videojuegos/edit/"+id}><button>Editar</button></Link>

        </div>
    )
}
