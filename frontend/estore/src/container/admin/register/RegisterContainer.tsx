"use client"

import { baseUrl } from "@/src/config/baseUrl";
import { useEffect } from "react";
import { usePostUserMutation } from "@/src/store/rtkQuery";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginPage = () => {

  const router = useRouter();
  const [postUser, { isLoading, isSuccess, isError, error:postingError }] = usePostUserMutation();

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('estoreToken')) {
      // router.push('/admin/dashboard');
    }
  }, [router]);


  console.log(`${baseUrl}/your-endpoint`);

  useEffect(() => {
    if (isSuccess) {
      toast.success('User registered successfully');
      router.push('/login');
    }

    if (isError) {
      toast.error(`Error occurred: ${postingError}`);
      console.log(`Error occurred: ${postingError}`)
    }
  }, [isSuccess, isError, postingError, router]);

  const initialValues = {
    name: "",
    email: "",
    password: ""
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required")
  });

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("from the form ", values);
    try {
      const response = await postUser(values).unwrap();
      console.log("This is response from the server", response);
    } catch (err: any) {
      console.log("Error payload message", err);
      toast.error(`Something went wrong: ${err.error}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Register User</h2>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Full Name</label>
                <Field
                  id="name"
                  type="text"
                  name="name"
                  className="mt-1 block w-full rounded-md border border-l-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email Address</label>
                <Field
                  id="email"
                  type="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border border-l-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <Field
                  id="password"
                  type="password"
                  name="password"
                  className="mt-1 block w-full rounded-md border border-l-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                disabled={isSubmitting || isLoading}
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;