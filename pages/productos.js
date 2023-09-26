import React from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import Producto from "../components/Producto";

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      precio
      existencia
    }
  }
`;

const Productos = () => {
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

  if (loading) return "Cargando...";

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Productos</h1>
      <Link
        href="/nuevoproducto"
      >
        <h3 className="bg-blue-900 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 mb-3 rounder uppercase font-bold text-sm">Nuevo producto</h3>
      </Link>
      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <th className="w-1/5 py-2">Nombre</th>
          <th className="w-1/5 py-2">Existencia</th>
          <th className="w-1/5 py-2">Precio</th>
          <th className="w-1/5 py-2">Eliminar</th>
          <th className="w-1/5 py-2">Editar</th>
        </thead>
        <tbody className="bg-white">
          {!loading &&
            data.obtenerProductos.map((producto) => (
              <Producto id={producto.id} producto={producto} />
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Productos;
