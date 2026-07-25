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
    projectValidation
 } from './controllers/projects.js';
// --------------------------- Category Routes ---------------------------
import {
    categoriesPage,
    categoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from './controllers/categories.js';
// --------------------------- Error Routes ---------------------------
import { testErrorPage } from './controllers/errors.js';

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

// Categories
router.get('/categories', categoriesPage);
router.get('/category/:id', categoryDetailsPage);
// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Test route for 500 errors
router.get('/test-error', testErrorPage);