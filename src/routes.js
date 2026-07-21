import express from 'express';

// --------------------------- Homepage Routes ---------------------------
import { homepage } from './controllers/index.js';
// --------------------------- Organization Routes ---------------------------
import {
    organizationsPage,
    organizationDetailsPage,
    newOrganizationForm
} from './controllers/organizations.js';
// --------------------------- Project Routes ---------------------------
import {
    projectsPage,
    projectDetailsPage
 } from './controllers/projects.js';
// --------------------------- Category Routes ---------------------------
import {
    categoriesPage,
    categoryDetailsPage
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
// Projects
router.get('/projects', projectsPage);
router.get('/project/:id', projectDetailsPage);
// Categories
router.get('/categories', categoriesPage);
router.get('/category/:id', categoryDetailsPage);
// Test route for 500 errors
router.get('/test-error', testErrorPage);