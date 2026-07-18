import { getOrganizations, getOrganizationDetails } from "../models/organizations.js";
import { getProjectsByOrganizationId } from "../models/projects.js";

export const organizationsPage = async (req, res) => {
    const title = 'Our Partner Organizations';
    const organizations = await getOrganizations();

    res.render('organizations', { title, organizations });
}

export const organizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', { title, organizationDetails, projects });
};