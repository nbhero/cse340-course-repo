import db from './db.js';

export const volunteerForProject = async (userId, projectId) => {
    const query = `
        INSERT INTO volunteer (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id) DO NOTHING;
    `;
    await db.query(query, [userId, projectId]);

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('User', userId, 'volunteered for project', projectId);
    }
};

export const removeVolunteerFromProject = async (userId, projectId) => {
    const query = `
        DELETE FROM volunteer
        WHERE user_id = $1 AND project_id = $2;
    `;
    await db.query(query, [userId, projectId]);

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('User', userId, 'removed as volunteer for project', projectId);
    }
};

export const isUserVolunteering = async (userId, projectId) => {
    const query = `
        SELECT 1
        FROM volunteer
        WHERE user_id = $1 AND project_id = $2;
    `;
    const result = await db.query(query, [userId, projectId]);

    return result.rows.length > 0;
};

export const getVolunteeredProjects = async (userId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date
        FROM volunteer AS v
        INNER JOIN service_project AS sp ON v.project_id = sp.project_id
        WHERE v.user_id = $1
        ORDER BY sp.project_date;
    `;
    const result = await db.query(query, [userId]);

    return result.rows;
};
