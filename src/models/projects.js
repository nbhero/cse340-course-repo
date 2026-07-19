import db from './db.js';

export const getProjects = async () => {
  const query = `
    SELECT project_id, organization_id, title, description, location, project_date
    FROM public.service_project;
    `;
  const result = await db.query(query);
  return result.rows;
}

export const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM public.service_project
        WHERE organization_id = $1
        ORDER BY project_date;
      `;

  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  return result.rows;
};

export const getUpcomingProjects = async (numberOfProjects) => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.project_date,
      sp.location,
      sp.organization_id,
      o.name AS organization_name
    FROM public.service_project AS sp
    INNER JOIN public.organization AS o
      ON sp.organization_id = o.organization_id
    WHERE sp.project_date >= CURRENT_DATE
    ORDER BY sp.project_date ASC
    LIMIT $1;
  `;

  const queryParams = [numberOfProjects];
  const result = await db.query(query, queryParams);

  return result.rows;
};

export const getProjectDetails = async (projectId) => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.project_date,
      sp.location,
      sp.organization_id,
      o.name AS organization_name
    FROM public.service_project AS sp
    INNER JOIN public.organization AS o
      ON sp.organization_id = o.organization_id
    WHERE sp.project_id = $1;
  `;

  const queryParams = [projectId];
  const result = await db.query(query, queryParams);

  return result.rows[0];
};

export const getProjectCategories = async (projectId) => {
  const query = `
    SELECT
        c.category_id,
        c.name
    FROM public.project_category AS pc
    INNER JOIN public.category AS c
        ON pc.category_id = c.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name;
  `;

  const queryParams = [projectId];
  const result = await db.query(query, queryParams);

  return result.rows;
};