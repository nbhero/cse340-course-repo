import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getOrganizations } from './src/models/organizations.js';
import { getProjects } from './src/models/projects.js';
import { getCategories } from './src/models/categories.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
  * Configure Express middleware
  */
// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


// ------------------ Pages ---------------------------
// Home
app.get('/', async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});
// Organizations
app.get('/organizations', async (req, res) => {
    const title = 'Organizations';
    const organizations = await getOrganizations();
    res.render('organizations', { title, organizations });
});
// Projects
app.get('/projects', async (req, res) => {
    const title = 'Projects';
    const projects = await getProjects();
    res.render('projects', { title, projects });
});
// Categories
app.get('/categories', async (req, res) => {
    const title = 'Categories';
    const categories = await getCategories();
    res.render('categories', { title, categories });
});


app.listen(PORT, async () => {
    try {
        await testConnection();
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error('Failed to connect to database:', error);
    }
});