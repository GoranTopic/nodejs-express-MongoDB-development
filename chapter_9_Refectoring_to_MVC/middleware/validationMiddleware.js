module.exports = (req, res, next) => {
		// if the post reques does not contain a title on picture
		if(req.files == null || req.body.title == null){
				// refresh current page
				return res.redirect('/post/new');
		}
		// call next middleware
		next();
}
