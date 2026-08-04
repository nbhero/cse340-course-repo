import { volunteerForProject, removeVolunteerFromProject } from '../models/volunteers.js';

export const addVolunteer = async (req, res) => {
    const projectId = req.params.projectId;
    const userId = req.session.user.user_id;

    await volunteerForProject(userId, projectId);

    req.flash('success', 'You have volunteered for this project!');
    res.redirect(`/project/${projectId}`);
};

export const removeVolunteer = async (req, res) => {
    const projectId = req.params.projectId;
    const userId = req.session.user.user_id;

    await removeVolunteerFromProject(userId, projectId);

    req.flash('success', 'You have removed yourself as a volunteer.');

    const redirectTo = req.query.redirect === 'dashboard' ? '/dashboard' : `/project/${projectId}`;
    res.redirect(redirectTo);
};
