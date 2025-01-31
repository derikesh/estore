import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface FAQ {
  question: string
  answer: string
}

interface AddFAQProps {
  addFaq: (faq: FAQ) => void
  setActiveTab: (tab: string) => void
}

const AddFAQ: React.FC<AddFAQProps> = ({ addFaq, setActiveTab }) => {
  const initialValues: FAQ = { question: "", answer: "" }

  const validationSchema = Yup.object({
    question: Yup.string().required("Question is required"),
    answer: Yup.string().required("Answer is required"),
  })

  const handleSubmit = (values: FAQ, { resetForm }: { resetForm: () => void }) => {
    addFaq(values)
    resetForm()
    setActiveTab("view") 
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New FAQ</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                Question
              </label>
              <Field
                id="question"
                name="question"
                as={Input}
                className="w-full"
                placeholder="Enter the question"
              />
              <ErrorMessage name="question" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
                Answer
              </label>
              <Field
                id="answer"
                name="answer"
                as={Textarea}
                className="w-full"
                placeholder="Enter the answer"
                rows={4}
              />
              <ErrorMessage name="answer" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add FAQ"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddFAQ