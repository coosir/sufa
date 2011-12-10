var usersImpl = require('../service/users'),
	worksImpl = require('../service/works');
	
module.exports = [{
	url : ['/work/:id'],
	view : 'show',
	methods : ['get'],
	excute : function(req, res  , next ) {	
		
		var id = parseInt(req.param('id',10));
		worksImpl.genWork(id , function(err , work){
			if(err || !work) {
				res.render('404');
				return;
			}		
			res.render({
				work : work ,
				user:req.session.curUser,
				sortType : 3
			});			
		});	
	}
}];
