import { getOrganizations } from "../models/organizations.js";

export const organizationsPage = async (req, res) => {
    const title = 'Our Partner Organizations';
    const organizations = await getOrganizations();

    res.render('organizations', { title, organizations });
}