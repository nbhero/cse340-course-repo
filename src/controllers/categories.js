import { getCategories, getCategoryDetails, updateCategoryAssignments } from "../models/categories.js";
import { getProjectDetails, getProjectCategories } from "../models/projects.js";

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

export const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getCategories();
    const assignedCategories = await getProjectCategories(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

export const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};