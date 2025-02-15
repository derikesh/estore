"use client"

import { useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useAddProductMutation, useUpdateProductMutation, useReadallProductQuery } from "@/src/store/rtkQuery"
import { toast } from "react-toastify"
import DropBox from "../imageDrop/DropBox"
import TagComponent from "../tagComponent/TagComponent"
import { useParams, useRouter } from "next/navigation"
import dynamic from "next/dynamic"
const ReactSelectNoSSR = dynamic(() => import("../SelectDropdown/ReactSelect"), { ssr: false })
import type { SINGLE_PRODUCT } from "./ReadProduct"
import type { CATEGORY_INTERFACE } from "@/app/admin/dashboard/category/page"
import MultipleImages from "../imageDrop/MultpleImages"
import { FaBox, FaTag, FaPalette, FaList, FaImage, FaImages } from "react-icons/fa"
import { MdDescription } from "react-icons/md"

interface PRODUCT_PROPS {
  type: string
  singleProduct?: SINGLE_PRODUCT
  categories: CATEGORY_INTERFACE[]
  refetchSingle?: any
}

export default function FormProduct({ type, singleProduct, categories }: PRODUCT_PROPS) {
  const { id } = useParams()
  const [addProduct, { isSuccess: addSuccess, isError: addIsError, error: addError }] = useAddProductMutation()
  const [updateProduct, { isSuccess: updateSuccess, isError: updateIsError, error: updateError }] =
    useUpdateProductMutation()
  const { data, refetch } = useReadallProductQuery({})

  const router = useRouter()

  const initialValues = {
    name: "",
    price: "",
    category: "",
    description: "",
    images: {
      imageUrl: "",
      publicKey: "",
    },
    productImages: [{ imageUrl: "", publickey: "" }],
    sizes: [""],
    color: [""],
  }

  useEffect(() => {
    if (addSuccess) {
      toast.success("Product has been added successfully")
      refetch()
      router.push("/admin/dashboard/product")
    } else if (addIsError) {
      toast.error(`Error adding product: ${JSON.stringify(addError)}`)
    }
  }, [addSuccess, addIsError, addError, refetch, router])

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Product has been updated successfully")
      refetch()
      router.push("/admin/dashboard/product")
    } else if (updateIsError) {
      toast.error(`Error updating product: ${JSON.stringify(updateError)}`)
    }
  }, [updateSuccess, updateIsError, updateError, refetch, router])

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (type === "add") {
        await addProduct(values).unwrap()
      } else if (type === "edit" && id) {
        await updateProduct({ id, updatedBody: values }).unwrap()
      }
    } catch (err: any) {
      console.error("Error submitting product:", err)
      toast.error(`Error: ${err.data.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-2xl font-semibold text-gray-900">{type === "add" ? "Add Product" : "Edit Product"}</h2>
        </div>
        <Formik
          initialValues={singleProduct || initialValues}
          enableReinitialize={true}
          onSubmit={(values: any) => handleSubmit(values)}
        >
          {({ setFieldValue, isSubmitting, values }) => (
            <Form className="space-y-6 px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 flex items-center">
                    <FaBox className="mr-2" /> Product Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="name" component="div" className="mt-1 text-red-500 text-xs" />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 flex items-center">
                    <FaTag className="mr-2" /> Price
                  </label>
                  <Field
                    id="price"
                    name="price"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="price" component="div" className="mt-1 text-red-500 text-xs" />
                </div>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 flex items-center">
                  <FaList className="mr-2" /> Category
                </label>
                <ReactSelectNoSSR
                  dynamicValue={singleProduct?.category}
                  dataValue={categories}
                  setFieldValue={setFieldValue}
                  name="category"
                />
                <ErrorMessage name="category" component="div" className="mt-1 text-red-500 text-xs" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 flex items-center">
                  <MdDescription className="mr-2" /> Description
                </label>
                <Field
                  id="description"
                  name="description"
                  as="textarea"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="description" component="div" className="mt-1 text-red-500 text-xs" />
              </div>
              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700 flex items-center">
                  <FaImage className="mr-2" /> Banner Image
                </label>
                <DropBox type={type} name="images" values={values} setFieldValue={setFieldValue} />
                <ErrorMessage name="images" component="div" className="mt-1 text-red-500 text-xs" />
              </div>
              <div>
                <label htmlFor="productImages" className="block text-sm font-medium text-gray-700 flex items-center">
                  <FaImages className="mr-2" /> Product Images
                </label>
                <MultipleImages type={type} name="productImages" values={values} setFieldValue={setFieldValue} />
                <ErrorMessage name="productImages" component="div" className="mt-1 text-red-500 text-xs" />
              </div>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="sizes" className="block text-sm font-medium text-gray-700 flex items-center">
                    <FaTag className="mr-2" /> Size
                  </label>
                  <TagComponent name="sizes" type="text" values={values} />
                  <ErrorMessage name="sizes" component="div" className="mt-1 text-red-500 text-xs" />
                </div>
                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700 flex items-center">
                    <FaPalette className="mr-2" /> Color
                  </label>
                  <TagComponent name="color" type="color" values={values} />
                  <ErrorMessage name="color" component="div" className="mt-1 text-red-500 text-xs" />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isSubmitting}
                >
                  {type === "add" ? "Add Product" : "Update Product"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

