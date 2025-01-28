"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { use } from "react";

export default function ItemVideojuego({ params }) {
  const { id } = use(params);
  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [genero, setGenero] = useState("");
  const [fechaLanzamiento, setFechaLanzamiento] = useState("");
  const [completado, setCompletado] = useState(false);

  async function fetchItems() {
    const url = "/api/videojuegos/videojuegosuser?id=" + id;
    const response = await fetch(url);
    const cont = await response.json();
    setTitulo(cont.titulo);
    setPlataforma(cont.plataforma);
    setGenero(cont.genero);
    setFechaLanzamiento(cont.fecha_lanzamiento);
    setCompletado(cont.completado);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function updateItem(e) {
    e.preventDefault();

    const response = await fetch("/api/videojuegos", {
      method: "PUT",
      headers: { "content-Type": "application.json" },
      body: JSON.stringify({
        id: id,
        update: {
          titulo: titulo,
          plataforma: plataforma,
          genero: genero,
          fecha_lanzamiento: fechaLanzamiento,
          completado: completado,
        },
      }),
    });
    window.location.href = "/videojuegos/" + id;
    fetchItems();
  }

  return (
    <div>
      <form onSubmit={updateItem}>
        <label>
          Titulo
          <input
            type="text"
            required
            onChange={(e) => {
              setTitulo(e.target.value);
            }}
            value={titulo}
          />
        </label>
        <label>
          Plataforma
          <input
            type="text"
            required
            onChange={(e) => {
              setPlataforma(e.target.value);
            }}
            value={plataforma}
          />
        </label>
        <label>
          Genero
          <input
            type="text"
            required
            onChange={(e) => {
              setGenero(e.target.value);
            }}
            value={genero}
          />
        </label>
        <label>
          Fecha de lanzamiento
          <input
            type="date"
            required
            onChange={(e) => {
              setFechaLanzamiento(e.target.value);
            }}
            value={fechaLanzamiento}
          />
        </label>
        <label>
          Completado
          <input type="checkbox" onChange={(e) => setCompletado(!completado)} />
        </label>
        <br></br>
        <input type="submit" value={"Enviar"} />
      </form>
    </div>
  );
}
