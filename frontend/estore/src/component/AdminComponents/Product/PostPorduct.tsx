import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAddProductMutation, useUpdateProductMutation, useReadSingleProductQuery } from '@/src/store/rtkQuery';
import { toast } from 'react-toastify';
import DropBox from '../imageDrop/DropBox';
import TagComponent from '../tagComponent/TagComponent';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const ReactSelectNoSSR = dynamic(() => import('../SelectDropdown/ReactSelect'), { ssr: false });
import { SINGLE_PRODUCT } from './ReadProduct';
import { CATEGORY_INTERFACE } from '@/app/admin/dashboard/category/page';
import { useReadallProductQuery } from '@/src/store/rtkQuery';
import MultipleImages from '../imageDrop/MultpleImages';

interface PRODUCT_PROPS {
    type: string
    singleProduct?: SINGLE_PRODUCT,
    categories: CATEGORY_INTERFACE[]
    refetchSingle?:any
}


export default function FormProduct({ type, singleProduct, categories }: PRODUCT_PROPS) {
    const { id } = useParams();
    const [addProduct, { isSuccess: addSuccess, isError: addIsError, error: addError }] = useAddProductMutation();
    const [updateProduct, { isSuccess: updateSuccess, isError: updateIsError, error: updateError }] = useUpdateProductMutation();
    const { data, refetch } = useReadallProductQuery({});

    console.log("single prodict", singleProduct);

    const router = useRouter();

    const initialValues = {
        name: '',
        price: '',
        category: '',
        description: '',
        images: {
            imageUrl: '',
            publicKey: ''
        },
        productImages: [ { imageUrl: '', publickey: '' } ],
        sizes: [""],
        color: [""]
    };

    useEffect(() => {
        if (addSuccess) {
            toast.success("Product has been added successfully");
            refetch();
            router.push('/admin/dashboard/product')
        } else if (addIsError) {
            toast.error(`Error adding product: ${JSON.stringify(addError)}`);
        }
    }, [addSuccess, addIsError, addError]);

    useEffect(() => {
        if (updateSuccess) {
            toast.success("Product has been updated successfully");
            refetch();
            router.push('/admin/dashboard/product')
        } else if (updateIsError) {
            toast.error(`Error updating product: ${JSON.stringify(updateError)}`);
        }
    }, [updateSuccess, updateIsError, updateError]);


    const handleSubmit = async (values: typeof initialValues) => {
        try {
            if (type === "add") {
                await addProduct(values).unwrap();
            } else if (type === "edit" && id) {
                await updateProduct({ id, updatedBody: values }).unwrap();

            }
        } catch (err: any) {
            console.error('Error submitting product:', err);
            toast.error(`Error: ${err.data.message}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">{type === "add" ? "Add Product" : "Edit Product"}</h2>
                <Formik
                    initialValues={singleProduct || initialValues}
                    enableReinitialize={true}
                    onSubmit={(values: any) => handleSubmit(values)}
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
                                <ReactSelectNoSSR dynamicValue={singleProduct?.category} dataValue={categories} setFieldValue={setFieldValue} name='category' />
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
                                <label htmlFor="images" className="block text-gray-700">Banner Image</label>
                                <DropBox type={type} name="images" values={values} setFieldValue={setFieldValue} />
                                <ErrorMessage name="images" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="images" className="block text-gray-700">Product Images</label>
                                <MultipleImages type={type} name="productImages" values={values} setFieldValue={setFieldValue} />
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
                                    {type === "add" ? "Add Product" : "Update Product"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}