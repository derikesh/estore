import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAddCategoryMutation } from '@/src/store/rtkQuery';
import { toast } from 'react-toastify';
import ReactSelect from '../SelectDropdown/ReactSelect';

interface CATEGORY_INTERFACE {
    name: string;
    slug: string;
    parent: number | string | any;
    description?: string;
}

export default function PostCategory() {
    const [AddCategory, { isSuccess, isError, error }] = useAddCategoryMutation();

    const initialValues: CATEGORY_INTERFACE = {
        name: '',
        slug: '',
        parent: '',
        description: '',
    };

    const handleSubmit = async (values: CATEGORY_INTERFACE) => {
        try {
            await AddCategory(values).unwrap();
            console.log("Category added:", values);
        } catch (err: any) {
            console.error('Error adding category:', err);
            toast.error(`Error: ${err.data.message}`);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            console.log('Category added successfully');
            toast.success("Category has been added");
        }
    }, [isSuccess]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Add Category</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({ setFieldValue, isSubmitting, values }) => (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">Category Name</label>
                                <Field
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="slug" className="block text-gray-700">Slug</label>
                                <Field
                                    id="slug"
                                    name="slug"
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                                <ErrorMessage name="slug" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="parent" className="block text-gray-700">Parent Category</label>
                                <ReactSelect values={values} setFieldValue={setFieldValue} name='parent' />
                                <ErrorMessage name="parent" component="div" className="text-red-500 text-sm" />
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
                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    disabled={isSubmitting}
                                >
                                    Add Category
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}