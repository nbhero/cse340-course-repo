import db from './db.js';

export const getCategories = async () => {
    const query = `
    SELECT category_id, name
    FROM public.category;
    `;
    const result = await db.query(query);
    return result.rows;
}

export const getCategoryDetails = async (categoryId) => {
    const query = `
        SELECT
            c.category_id,
            c.name,
            sp.project_id,
            sp.title
        FROM public.category AS c
        LEFT JOIN public.project_category AS pc
            ON c.category_id = pc.category_id
        LEFT JOIN public.service_project AS sp
            ON pc.project_id = sp.project_id
        WHERE c.category_id = $1
        ORDER BY sp.title;
    `;

    const result = await db.query(query, [categoryId]);

    const rows = result.rows;

    return {
        category_id: rows[0]?.category_id,
        name: rows[0]?.name,
        projects: rows
            .filter(row => row.project_id)
            .map(row => ({
                project_id: row.project_id,
                title: row.title
            }))
    };
};