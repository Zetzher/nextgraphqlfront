import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

const OBTENER_CLIENTES_VENDEDOR = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

export default function Index() {
  const router = useRouter();
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_VENDEDOR);
  if (loading) return "Cargando...";
  if (!data.obtenerClientesVendedor) return router.push("/login");
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
        <Link href="/nuevocliente">
          <h3 className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">
            Nuevo Cliente
          </h3>
        </Link>
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">Empresa</th>
            <th className="w-1/5 py-2">Email</th>
          </thead>
          <tbody className="bg-white">
            {!loading &&
              data.obtenerClientesVendedor.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="border px-4 py-2 text-zinc-200">
                    {cliente.nombre} {cliente.apellido}
                  </td>
                  <td className="border px-4 py-2 text-zinc-200">
                    {cliente.empresa}
                  </td>
                  <td className="border px-4 py-2 text-zinc-200">
                    {cliente.email}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}
