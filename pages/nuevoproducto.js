import React from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";

const NUEVO_PRODUCTO = gql`
  mutation nuevoProducto($input: ProductoInput) {
    nuevoProducto(input: $input) {
      id
      nombre
      existencia
      precio
      creado
    }
  }
`;

const NuevoProducto = () => {
  const [nuevoProducto] = useMutation(NUEVO_PRODUCTO);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      existencia: "",
      precio: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre del producto es obligatorio"),
      existencia: Yup.number()
        .required("Agrega la cantidad disponible")
        .positive("No se aceptan números negativos")
        .integer("La existencia deben ser números enteros"),
      precio: Yup.number()
        .required("El precio es obligatorio")
        .positive("No se aceptan números negativos"),
    }),
    onSubmit: async (valores) => {
      const { nombre, existencia, precio } = valores;
      try {
        const { data } = await nuevoProducto({
          variables: {
            input: { nombre, existencia, precio },
          },
        });
        console.log(data, "data");
      } catch (error) {
        console.log(error, 'errr')
      }
    },
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">
        Crear nuevo producto
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="nombre"
                >
                  Nombre
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                  id="nombre"
                  type="text"
                  placeholder="Nombre Producto"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nombre}
                />
              </div>
              {formik.errors.nombre || formik.touched.nombre ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.nombre}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="existencia"
                >
                  Cantidad disponible
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                  id="existencia"
                  type="number"
                  placeholder="Cantidad Disponible"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.existencia}
                />
              </div>
              {formik.errors.existencia || formik.touched.existencia ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.existencia}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="precio"
                >
                  Precio
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                  id="precio"
                  type="text"
                  placeholder="Precio Producto"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.precio}
                />
              </div>
              {formik.errors.precio || formik.touched.precio ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.precio}</p>
                </div>
              ) : null}
              <input
                type="submit"
                className="bg-grey-800 w-full mt-5 p-2 text-white uppercase font-bold bg-gray-900"
                value="Agregar Nuevo Producto"
              />
            </form>
          </div>
        </div>
      </h1>
    </Layout>
  );
};

export default NuevoProducto;
