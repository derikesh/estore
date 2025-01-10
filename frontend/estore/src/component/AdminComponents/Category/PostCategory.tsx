'use client'

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAddCategoryMutation, useUpdateCategoryMutation } from '@/src/store/rtkQuery';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import * as Yup from 'yup';
import { CATEGORY_INTERFACE } from '@/app/admin/dashboard/category/page';
const ReactSelectNoSSR = dynamic(() => import('../SelectDropdown/ReactSelect'), { ssr: false });
import { useRouter } from 'next/navigation';

interface POST_CATEGORY_PROP {
    type: string;
    sinlgeCategory: CATEGORY_INTERFACE;
    category: CATEGORY_INTERFACE[];
    id?: any;
    categoryRefetch:()=>void
}

export default function PostCategory({ type = "add", sinlgeCategory, category, id ,categoryRefetch}: POST_CATEGORY_PROP) {
    const [AddCategory, { isSuccess: addSuccess, isError: addError, error: addErrorData }] = useAddCategoryMutation();
    const [updateCategory, { isSuccess: updateSuccess, isError: updateError, error: updateErrorData }] = useUpdateCategoryMutation();

    const router = useRouter();
    // To handle category data and notification
    const dataValue = {
        name: sinlgeCategory ? sinlgeCategory?.name : '',
        slug: sinlgeCategory ? sinlgeCategory?.slug : '',
        parent: sinlgeCategory ? sinlgeCategory?.parent : '',
        description: sinlgeCategory ? sinlgeCategory?.description : '',
    };

    // Slug state
    const [slug, setSlug] = useState(sinlgeCategory?.slug || '');

    useEffect(() => {
        if (sinlgeCategory) {
            setSlug(sinlgeCategory?.slug);
        }
    }, [sinlgeCategory]);

    useEffect(() => {
        if (addSuccess ) {
            toast.success('Category added successfully');
            categoryRefetch();
            router.push('/admin/dashboard/category')
        } else if (addError) {
            toast.error(`Error adding category: ${addErrorData}`);
        }
    }, [addSuccess, addError, addErrorData]);

    useEffect(() => {
        if (updateSuccess) {
            toast.success('Category updated successfully');
            categoryRefetch();
            router.push('/admin/dashboard/category')
        } else if (updateError) {
            toast.error(`Error updating category: ${updateErrorData}`);
        }
    }, [updateSuccess, updateError, updateErrorData]);

    // Validation schema
    const validationSchema = Yup.object({
        name: Yup.string().required('Category name is required'),
        slug: Yup.string().required('Slug is required'),
        description: Yup.string().optional(),
    });

    // Handling the submit
    const handleSubmit = async (values: CATEGORY_INTERFACE) => {
        try {
            if (type === 'edit') {
                await updateCategory({ id, updatedCategory: values }).unwrap();
            } else {
                await AddCategory(values).unwrap();
            }
        } catch (err: any) {
            console.error('Error adding/updating category:', err);
        }
    };

    // To generate a slug from the name
    const handleSlugValue = (e: any, setFieldValue: any) => {
        const value = e.target.value;
        const generatedSlug = value
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '');
        setSlug(generatedSlug);
        setFieldValue('name', value);
        setFieldValue('slug', generatedSlug);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">{type === 'edit' ? 'Edit Category' : 'Add Category'}</h2>
                <Formik
                    initialValues={type === 'edit' ? dataValue : { name: '', slug: '', parent: null, description: '' }}
                    validationSchema={validationSchema}
                    enableReinitialize={true}
                    onSubmit={(values: any) => handleSubmit(values)}
                >
                    {({ setFieldValue, isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">Category Name</label>
                                <Field
                                    onChange={(e: any) => handleSlugValue(e, setFieldValue)}
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="slug" className="block text-gray-700">Slug</label>
                                <Field
                                    id="slug"
                                    name="slug"
                                    type="text"
                                    value={slug}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                />
                                <ErrorMessage name="slug" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="parent" className="block text-gray-700">Parent Category</label>
                                <ReactSelectNoSSR dynamicValue={dataValue?.parent} dataValue={category} setFieldValue={setFieldValue} name='parent' />
                                <ErrorMessage name="parent" component="div" className="text-red-500 text-sm" />
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
                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    disabled={isSubmitting}
                                >
                                    {type === 'edit' ? 'Update Category' : 'Add Category'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}