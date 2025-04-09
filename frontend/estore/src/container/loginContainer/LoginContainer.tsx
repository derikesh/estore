"use client"

import { useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useLoginMutation } from "@/src/store/rtkQuery"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { RESPOINSE_INTERFACE } from "@/src/utils/Interface/Interface"

export default function LoginContainer() {
  const router = useRouter()
  const initialValues = { email: "", password: "" }

  const [postLogin, { isSuccess, isError, error: loginError }] = useLoginMutation()

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await postLogin(values).unwrap()
    } catch (err: any) {
      console.log("Login Error:", err)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("User logged in successfully")
      router.push("/admin/dashboard")
    }
    if (isError) {
      const errorResponse = loginError as RESPOINSE_INTERFACE
      toast.error(`Error Hook: ${(errorResponse as any)?.data?.message || "Unknown error"}`)
    }
  }, [isSuccess, isError, loginError, router])

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left side - Image */}
      <div className="hidden md:flex md:w-1/2 bg-blue-50 items-center justify-center">
        <Image
          src="/images/ll.jpg"
          alt="Login illustration"
          width={1200}
          height={1200}
          className="object-cover max-w-full max-h-full"
          priority
        />
      </div>

      {/* Right side - Login Form */}
      <div className="flex flex-col justify-center w-full md:w-1/2 px-6 py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Login to your account</h2>
            <p className="mt-2 text-gray-600 text-sm">Enter your credentials </p>
          </div>

          <Formik initialValues={initialValues} onSubmit={(values) => handleSubmit(values)}>
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage name="email" component="div" className="mt-1 text-red-500 text-sm" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                 
                  </div>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage name="password" component="div" className="mt-1 text-red-500 text-sm" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-fit py-2 px-4 border border-transparent shadow-sm text-white bg-purple-800 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Log In
                </button>

                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-50 text-gray-500">Or</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-3 w-fit  flex justify-center items-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                        fill="#EA4335"
                      />
                      <path
                        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                        fill="#34A853"
                      />
                    </svg>
                    Sign in with Google
                  </button>
                </div>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
