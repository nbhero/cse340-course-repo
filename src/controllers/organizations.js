import {
    getOrganizations,
    getOrganizationDetails,
    createOrganization
} from "../models/organizations.js";
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

export const newOrganizationForm = async (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title });
};

export const processFormSubmission = async (req, res) => {
    const { name, description, contactEmail } = req.body;
    const logoFilename = 'placeholder-logo.png'; // Placeholder logo to all new organizations

    const organizationId = await createOrganization(name, description, contactEmail, logoFilename);

    req.flash('success', 'Organization added successfully!');
    res.redirect(`/organization/${organizationId}`);
};