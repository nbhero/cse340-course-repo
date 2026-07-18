export const homepage = async (req, res) => {
    const title = 'Home';
    
    res.render('home', { title });
}