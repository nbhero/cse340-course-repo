import db from './db.js';

export const getCategories = async () => {
    const query = `
    SELECT category_id, name
    FROM public.category;
    `;
    const result = await db.query(query);
    return result.rows;
}