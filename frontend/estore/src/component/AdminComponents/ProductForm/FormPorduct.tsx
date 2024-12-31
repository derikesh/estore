import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAddProductMutation } from '@/src/store/rtkQuery';
import { toast } from 'react-toastify';
import DropBox from '../imageDrop/DropBox';

export default function FormProduct() {
    const [addProduct, { isSuccess, isError, error }] = useAddProductMutation();

    const initialValues = {
        name: '',
        price: '',
        category: '',
        description: '',
        images: '',
        size: '',
        color: ''
    };

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            // await addProduct(values).unwrap();
            console.log( "from the add product",values );
        } catch (err: any) {
            console.error('Error adding product:', err);
            toast.error(`error: ${err.data.message}`)
        }
    };


    useEffect( ()=>{
      if (isSuccess) {
        console.log('Product added successfully');
        toast.success("product has been added")
    }
    },[isSuccess,addProduct] )

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Add Product</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={ (values)=>handleSubmit(values) }
                >
                    {({ setFieldValue,isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">Product Name</label>
                                <Field
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-gray-700">Price</label>
                                <Field
                                    id="price"
                                    name="price"
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                                <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="category" className="block text-gray-700">Category</label>
                                <Field
                                    id="category"
                                    name="category"
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                                <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700">Description</label>
                                <Field
                                    id="description"
                                    name="description"
                                    as="textarea"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="images" className="block text-gray-700">Images</label>
                                <DropBox name="images" setFieldValue={setFieldValue}  />
                                <ErrorMessage name="images" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="size" className="block text-gray-700">Size</label>
                                <Field
                                    id="size"
                                    name="size"
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                                <ErrorMessage name="size" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="color" className="block text-gray-700">Color</label>
                                <Field
                                    id="color"
                                    name="color"
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                                <ErrorMessage name="color" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    disabled={isSubmitting}
                                >
                                    Add Product
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}