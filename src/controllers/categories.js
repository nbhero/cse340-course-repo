import { getCategories, getCategoryDetails } from "../models/categories.js";

export const categoriesPage = async (req, res) => {
    const title = 'Categories';
    const categories = await getCategories();

    res.render('categories', { title, categories });
};

export const categoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryDetails(categoryId);
    const title = 'Category Details';

    res.render('category', { title, categoryDetails });
};