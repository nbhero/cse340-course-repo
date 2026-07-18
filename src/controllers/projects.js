import { getProjects } from "../models/projects.js";

export const projectsPage = async (req, res) => {
    const title = 'Projects';
    const projects = await getProjects();

    res.render('projects', { title, projects });
};