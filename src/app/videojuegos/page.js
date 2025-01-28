"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ListVideojuego() {
  const [videojuego, setVideojuego] = useState([]);

  async function fetchVideojuegos() {
    try {
      const response = await fetch("/api/videojuegos");
      if (!response.ok) {
        throw new Error("Error al cargar los eventos");
      }
      const body = await response.json();
      setVideojuego(body);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchVideojuegos();
  }, []);

  async function deleteItem(deleteID) {
    if (window.confirm("¿Seguro que quieres eliminarlo permanentemente?")) {
      const response = await fetch("/api/videojuegos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteID }),
      });
      if (response.ok) {
        fetchVideojuegos();
      } else {
        console.error("Error al eliminar el videojuego");
      }
    }
  }

  return (
    <div>
      <h1>Listado de Videojuegos</h1>
      {videojuego.length === 0 ? (
        <p>No disponible</p>
      ) : (
        videojuego.map((videojuegos) => (
          <div key={videojuegos.id}>
            <Link href={"/videojuegos/" + videojuegos.id}>
              <h3>{videojuegos.titulo}</h3>
              <p>{videojuegos.plataforma}</p>
            </Link>
            <button onClick={() => deleteItem(videojuegos.id)}>
              Eliminar {videojuegos.titulo}
            </button>
            <br />
          </div>
        ))
      )}
      <Link href={"/videojuegos/create"}>
        <h4>Agregar VideoJuego</h4>
      </Link>
    </div>
  );
}
