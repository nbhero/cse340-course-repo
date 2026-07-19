import express from 'express';

import { homepage } from './controllers/index.js';
import { organizationsPage } from './controllers/organizations.js';
import { categoriesPage } from './controllers/categories.js';
import { projectsPage } from './controllers/projects.js';
import { testErrorPage } from './controllers/errors.js';
import { organizationDetailsPage } from './controllers/organizations.js';
import { projectDetailsPage } from './controllers/projects.js';
import { categoryDetailsPage } from './controllers/categories.js';

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