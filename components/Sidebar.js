import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black">CRM Clientes</p>
      </div>
      <nav className="mt-5 list-none">
        <li className={router.pathname === "/" ? "bg-blue-800 p-2" : "p-2"}>
          <Link href="/">
            <h3 className="text-white block">Clientes</h3>
          </Link>
        </li>
        <li className={router.pathname === "/pedidos" ? "bg-blue-800 p-2" : "p-2"}>
          <Link href="/pedidos">
            <h3 className="text-white block">Pedidos</h3>
          </Link>
        </li>
        <li className={router.pathname === "/productos" ? "bg-blue-800 p-2" : "p-2"}>
          <Link href="/productos">
            <h3 className="text-white block">Productos</h3>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
