import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAddCategoryMutation, useReadCategoriesQuery, useUpdateCategoryMutation, useReadSingleCategoriesQuery } from '@/src/store/rtkQuery';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import * as Yup from 'yup';
import { useParams } from 'next/navigation';

const ReactSelectNoSSR = dynamic(() => import('../SelectDropdown/ReactSelect'), { ssr: false });

export interface CATEGORY_INTERFACE {
    _id:string,
    name: string;
    slug: string;
    parent: number | string | any;
    description?: string;
}

export default function PostCategory({ type = "add" }) {
    const { id } = useParams();

    const [AddCategory, { isSuccess, isError, error }] = useAddCategoryMutation();
    const { data: readSingle, isSuccess: singleSuccess, isError: singleIsError, error: singleError } = useReadSingleCategoriesQuery(id, {
        skip: !id,
    });
    const { data: categories, isSuccess: categorySuccess, isLoading: categoryLoading, isError: iscategoryError, error: categoryError } = useReadCategoriesQuery({});
    const [updateCategory] = useUpdateCategoryMutation();

    // To handle category data and notification
    const dataValue = {
        name: singleSuccess && readSingle ? readSingle?.data?.name : '',
        slug: singleSuccess && readSingle ? readSingle?.data?.slug : '',
        parent: singleSuccess && readSingle ? readSingle?.data?.parent : '',
        description: singleSuccess && readSingle ? readSingle?.data?.description : '',
    };

    // Slug state
    const [slug, setSlug] = useState(readSingle?.slug || '');

  useEffect( ()=>{
    if(singleSuccess){
        setSlug(readSingle?.slug);        
    }
  } ,[singleSuccess])


    // Validation schema
    const validationSchema = Yup.object({
        name: Yup.string().required('Category name is required'),
        slug: Yup.string().required('Slug is required'),
        // parent: Yup.string().required('Parent category is required'),
        description: Yup.string().optional(),
    });

    // Handling the submit
    const handleSubmit = async (values: CATEGORY_INTERFACE) => {
        try {
            if (type === 'edit') {
                await updateCategory({id,updatedCategory:values}).unwrap(); 
                toast.success('Category updated successfully');
            } else {
                await AddCategory(values).unwrap();
                toast.success('Category added successfully');
            }
            
        } catch (err: any) {
            console.error('Error adding category:', err);
            toast.error(`Error: ${err.data.message}`);
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
                    onSubmit={(values) => handleSubmit(values)}
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
                                    // value={slug || ""} 
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                />
                                <ErrorMessage name="slug" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="parent" className="block text-gray-700">Parent Category</label>
                                <ReactSelectNoSSR dynamicValue={dataValue?.parent} dataValue={categories?.data} setFieldValue={setFieldValue} name='parent' />
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
