import { getCategories } from "../models/categories.js";

export const categoriesPage = async (req, res) => {
    const title = 'Categories';
    const categories = await getCategories();

    res.render('categories', { title, categories });
};