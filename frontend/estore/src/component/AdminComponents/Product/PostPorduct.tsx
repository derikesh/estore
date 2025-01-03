import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { useAddProductMutation } from '@/src/store/rtkQuery';
import { toast } from 'react-toastify';
import DropBox from '../imageDrop/DropBox';
import TagComponent from '../tagComponent/TagComponent';
import ReactSelect from '../SelectDropdown/ReactSelect';


export default function FormProduct() {
    const [addProduct, { isSuccess, isError, error }] = useAddProductMutation();

    const initialValues = {
        name: '',
        price: '',
        category: '',
        description: '',
        images: {
            imageUrl:'',
            publicKey:''
        },
        sizes: [""],
        color: [""]
    };

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            await addProduct(values).unwrap();
            console.log("from the add product", values);
        } catch (err: any) {
            console.error('Error adding product:', err);
            toast.error(`error: ${err.data.message}`)
        }
    };


    useEffect(() => {
        if (isSuccess) {
            console.log('Product added successfully');
            toast.success("product has been added")
        }
    }, [isSuccess, addProduct]);

    console.log( "form rerndereed" )

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Add Product</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({ setFieldValue, isSubmitting, values }) => (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">Product Name</label>
                                <Field
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-gray-700">Price</label>
                                <Field
                                    id="price"
                                    name="price"
                                    type="text"
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                />
                                <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="category" className="block text-gray-700">Category</label>
                                <ReactSelect dataValue={[]} setFieldValue={setFieldValue} name='category' />
                                <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700">Description</label>
                                <Field
                                    id="description"
                                    name="description"
                                    as="textarea"
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="images" className="block text-gray-700">Images</label>
                                <DropBox name="images" values={values} setFieldValue={setFieldValue} />
                                <ErrorMessage name="images" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="sizes" className="block text-gray-700">Size</label>
                                <TagComponent name='sizes' type="text" values={values} />
                                <ErrorMessage name="sizes" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="color" className="block text-gray-700">Color</label>
                                <TagComponent name='color' type="color" values={values} />
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