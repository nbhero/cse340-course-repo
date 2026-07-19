import { getCategories } from "../models/categories.js";
import { getProjects, getUpcomingProjects, getProjectDetails, getProjectCategories } from "../models/projects.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

export const projectsPage = async (req, res) => {
    const title = 'Upcoming Service Projects';
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

    res.render('projects', { title, projects });
};

export const projectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getProjectCategories(projectId);
    const title = 'Project Details';

    res.render('project', { title, projectDetails, categories });
};