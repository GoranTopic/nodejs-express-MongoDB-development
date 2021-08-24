module.exports = (req, res, next) =>{
		if(req.session.userId){
				// if userlogged in, redirect to home page
				return res.redirect('/'); 
		}
		next();
}
