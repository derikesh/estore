export interface CATEGORY_INTERFACE {
    _id: string;
    name: string;
}

export const getCategoryName = (categoryId: string, categories: CATEGORY_INTERFACE[] | null): string => {
    const category = categories?.find(cat => cat._id === categoryId);
    return category ? category.name : 'unknow';
};