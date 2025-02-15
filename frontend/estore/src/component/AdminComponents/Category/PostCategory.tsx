"use client"

import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useAddCategoryMutation, useUpdateCategoryMutation } from "@/src/store/rtkQuery"
import { toast } from "react-toastify"
import dynamic from "next/dynamic"
import * as Yup from "yup"
import type { CATEGORY_INTERFACE } from "@/app/admin/dashboard/category/page"
const ReactSelectNoSSR = dynamic(() => import("../SelectDropdown/ReactSelect"), { ssr: false })
import { useRouter } from "next/navigation"
import DropBox from "../imageDrop/DropBox"
import { FaFolder, FaTag, FaImage, FaList, FaEdit } from "react-icons/fa"
import { MdDescription } from "react-icons/md"

interface POST_CATEGORY_PROP {
  type: string
  sinlgeCategory: CATEGORY_INTERFACE
  category: CATEGORY_INTERFACE[]
  id?: any
  categoryRefetch: () => void
}

export default function PostCategory({
  type = "add",
  sinlgeCategory,
  category,
  id,
  categoryRefetch,
}: POST_CATEGORY_PROP) {
  const [AddCategory, { isSuccess: addSuccess, isError: addError, error: addErrorData }] = useAddCategoryMutation()
  const [updateCategory, { isSuccess: updateSuccess, isError: updateError, error: updateErrorData }] =
    useUpdateCategoryMutation()

  const router = useRouter()

  const dataValue = {
    name: sinlgeCategory ? sinlgeCategory?.name : "",
    slug: sinlgeCategory ? sinlgeCategory?.slug : "",
    parent: sinlgeCategory ? sinlgeCategory?.parent : "",
    image: sinlgeCategory
      ? sinlgeCategory?.image
      : {
          imageUrl: "",
          publicKey: "",
        },
    description: sinlgeCategory ? sinlgeCategory?.description : "",
  }

  const [slug, setSlug] = useState(sinlgeCategory?.slug || "")

  useEffect(() => {
    if (sinlgeCategory) {
      setSlug(sinlgeCategory?.slug)
    }
  }, [sinlgeCategory])

  useEffect(() => {
    if (addSuccess) {
      toast.success("Category added successfully")
      categoryRefetch()
      router.push("/admin/dashboard/category")
    } else if (addError) {
      toast.error(`Error adding category: ${JSON.stringify(addErrorData)}`)
    }
  }, [addSuccess, addError, addErrorData, categoryRefetch, router])

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Category updated successfully")
      categoryRefetch()
      router.push("/admin/dashboard/category")
    } else if (updateError) {
      toast.error(`Error updating category: ${updateErrorData}`)
    }
  }, [updateSuccess, updateError, updateErrorData, categoryRefetch, router])

  const validationSchema = Yup.object({
    name: Yup.string().required("Category name is required"),
    slug: Yup.string().required("Slug is required"),
    description: Yup.string().optional(),
  })

  const handleSubmit = async (values: CATEGORY_INTERFACE) => {
    try {
      if (type === "edit") {
        await updateCategory({ id, updatedCategory: values }).unwrap()
      } else {
        await AddCategory(values).unwrap()
        console.log("submitted values ", values)
      }
    } catch (err: any) {
      console.error("Error adding/updating category:", err)
    }
  }

  const handleSlugValue = (e: any, setFieldValue: any) => {
    const value = e.target.value
    const generatedSlug = value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
    setSlug(generatedSlug)
    setFieldValue("name", value)
    setFieldValue("slug", generatedSlug)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
            {type === "edit" ? <FaEdit className="mr-2" /> : <FaFolder className="mr-2" />}
            {type === "edit" ? "Edit Category" : "Add Category"}
          </h2>
        </div>
        <Formik
          initialValues={
            type === "edit"
              ? dataValue
              : { name: "", slug: "", parent: null, image: { imageUrl: "", publicKey: "" }, description: "" }
          }
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values: any) => handleSubmit(values)}
        >
          {({ setFieldValue, isSubmitting, values }) => (
            <Form className="space-y-6 px-4 py-5 sm:p-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 flex items-center">
                  <FaFolder className="mr-2" /> Category Name
                </label>
                <Field
                  onChange={(e: any) => handleSlugValue(e, setFieldValue)}
                  id="name"
                  name="name"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="name" component="div" className="mt-1 text-red-500 text-xs" />
              </div>
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 flex items-center">
                  <FaTag className="mr-2" /> Slug
                </label>
                <Field
                  id="slug"
                  name="slug"
                  type="text"
                  value={slug}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="slug" component="div" className="mt-1 text-red-500 text-xs" />
              </div>
              <div>
                <label htmlFor="cateogry_image" className="block text-sm font-medium text-gray-700 flex items-center">
                  <FaImage className="mr-2" /> Category Image
                </label>
                <DropBox
                  name="image"
                  setFieldValue={setFieldValue}
                  type={type}
                  values={values}
                  key={"category_image"}
                />
                <ErrorMessage name="image" component="div" className="mt-1 text-red-500 text-xs" />
              </div>
              <div>
                <label htmlFor="parent" className="block text-sm font-medium text-gray-700 flex items-center">
                  <FaList className="mr-2" /> Parent Category
                </label>
                <ReactSelectNoSSR
                  dynamicValue={dataValue?.parent}
                  dataValue={category}
                  setFieldValue={setFieldValue}
                  name="parent"
                />
                <ErrorMessage name="parent" component="div" className="mt-1 text-red-500 text-xs" />
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
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isSubmitting}
                >
                  {type === "edit" ? "Update Category" : "Add Category"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

