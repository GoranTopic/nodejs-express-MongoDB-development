module.exports = (req, res) =>{
		var title = ""; // empy var for title
		var body = ""; // empty var for body
		const data = req.flash('data')[0];
		if(typeof data != "undefined"){
				title = data.title;
				body = data.body;
		}
		return res.render( 'create', { 
				errors: req.flash('validationErrors'),
				title: title,
				body: body,
		} );
}
