import { ErrorMessage, Field, Form, Formik, FieldArray } from "formik"
import type React from "react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useAddFeaturesMutation } from "@/src/store/rtkQuery"
import { toast } from "react-toastify"
import type { PRODUCT_INTERFACE } from "@/app/admin/dashboard/product/page"
import { FaTrash } from "react-icons/fa"
import * as Yup from "yup"

interface DETAIL_FORM_INTERFACE {
  positions: [number, number][]
  id: string
  data: PRODUCT_INTERFACE
  setPositions: React.Dispatch<React.SetStateAction<[number, number][]>>
}

const validationSchema = Yup.object().shape({
  features: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Feature name is required"),
    }),
  ),
})

export default function DetailForm({ positions, id, data, setPositions }: DETAIL_FORM_INTERFACE) {
  const [addFeatures, { isSuccess, isError, error }] = useAddFeaturesMutation()

  useEffect(() => {
    if (isSuccess) {
      toast.success("Features added successfully")
    } else if (isError) {
      toast.error(`Error: ${JSON.stringify(error)}`)
    }
  }, [isSuccess, isError, error])

  const initialValues = {
    features: data?.features?.length
      ? data.features.map((f) => ({
          name: f.name || "",
          x: f.x || 0,
          y: f.y || 0,
        }))
      : [{ name: "", x: 0, y: 0 }],
  }



  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        addFeatures({ newFeatures: values.features, id })
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => {
        function handleRemove(index: number) {
          const newPositions = [...positions]
          newPositions.splice(index, 1)
          setPositions(newPositions)
        }

        useEffect(() => {
            if (positions.length <= 5) {
              setFieldValue(
                "features",
                positions.map((p, index) => ({ name: data?.features?.[index]?.name || "", x: p[0], y: p[1] })),
              )
            }
          }, [positions, setFieldValue, data?.features])

        return (
          <Form className="space-y-4">
            <FieldArray name="features">
              {({ remove }) => (
                <div>
                  {values.features.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 mb-4">
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">{idx + 1}</span>
                      <Field
                        name={`features.${idx}.name`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter feature name"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          remove(idx)
                          handleRemove(idx)
                        }}
                      >
                        <FaTrash />
                      </Button>
                      <ErrorMessage name={`features.${idx}.name`} component="div" className="text-red-500 text-sm" />
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
            <Button
              type="submit"
              disabled={isSubmitting || positions.length === 0}
              variant="default"
              className="w-full"
            >
              Submit Features
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

