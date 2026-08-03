import express from 'express';

// --------------------------- Homepage Routes ---------------------------
import { homepage } from './controllers/index.js';
// --------------------------- Organization Routes ---------------------------
import {
    organizationsPage,
    organizationDetailsPage,
    newOrganizationForm,
    processFormSubmission,
    organizationValidation,
    editOrganizationForm,
    editOrganizationSubmission
} from './controllers/organizations.js';
// --------------------------- Project Routes ---------------------------
import {
    projectsPage,
    projectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation,
    showEditProjectForm,
    processEditProjectForm
 } from './controllers/projects.js';
// --------------------------- Category Routes ---------------------------
import {
    categoriesPage,
    categoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
} from './controllers/categories.js';
// --------------------------- Error Routes ---------------------------
import { testErrorPage } from './controllers/errors.js';
// --------------------------- User Routes ---------------------------
import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout
} from './controllers/users.js';


export const router = express.Router();

// --------------------------- Pages ---------------------------

// Home
router.get('/', homepage);

// Organizations
router.get('/organizations', organizationsPage);
router.get('/organization/:id', organizationDetailsPage); // Route for organization details page
router.get('/new-organization', newOrganizationForm);
router.post('/new-organization', organizationValidation, processFormSubmission);
router.get('/edit-organization/:id', editOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, editOrganizationSubmission);

// Projects
router.get('/projects', projectsPage);
router.get('/project/:id', projectDetailsPage);
// Route for new project page
router.get('/new-project', showNewProjectForm);
// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);
// Routes for the edit project form and its submission
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// Categories
router.get('/categories', categoriesPage);
router.get('/category/:id', categoryDetailsPage);
// Route for new category page
router.get('/new-category', showNewCategoryForm);
// Route to handle new category form submission
router.post('/new-category', categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);
// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Test route for 500 errors
router.get('/test-error', testErrorPage);