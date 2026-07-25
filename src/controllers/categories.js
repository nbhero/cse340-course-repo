import { getCategories, getCategoryDetails, updateCategoryAssignments, createCategory, updateCategory } from "../models/categories.js";
import { getProjectDetails, getProjectCategories } from "../models/projects.js";
import { body, validationResult } from "express-validator";

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

export const showNewCategoryForm = async (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', { title });
};

export const processNewCategoryForm = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new category form
        return res.redirect('/new-category');
    }

    const { name } = req.body;

    const categoryId = await createCategory(name);

    req.flash('success', 'Category added successfully!');
    res.redirect(`/category/${categoryId}`);
};

export const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryDetails(categoryId);

    const title = 'Edit Category';
    res.render('edit-category', { title, categoryDetails });
};

export const processEditCategoryForm = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the edit category form
        return res.redirect('/edit-category/' + req.params.id);
    }

    const categoryId = req.params.id;
    const { name } = req.body;

    await updateCategory(categoryId, name);

    req.flash('success', 'Category updated successfully!');
    res.redirect(`/category/${categoryId}`);
};

export const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required!')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters')
];