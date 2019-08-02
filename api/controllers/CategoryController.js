/**
 * CategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  _config: {
		actions: false,
		rest: false,
		shortcuts: false
	},
  deleteCategory: function(req, res, next){
  	res.set('Access-Control-Allow-Origin', '*');
  	var user_id = req.param('user_id');
		if(!user_id){
  		return res.status(400).send('Pass user_id');
  	}
  	Category.destroy({id: req.param('category_id')}).fetch().exec(function(err, removed){
  		if(err) return res.status(400).send(err);
  		if(removed && user_id){
				if(user.isAdmin){
	  			User.find({id: user_id}).exec(function(errr, user){
		  			Product.destroy({category_id: req.param('category_id')}).fetch().exec(function(error, removedProducts){
		  				if(error) return res.status(400).send('Failed at deleting products');
			  			return res.status(200).send(removed);
		  			});
	  			})
				} else {
					return res.status(200).send(removed);
				}
  		}
  	})
  },
  listCategories: function(req, res, next){
  	res.set('Access-Control-Allow-Origin', '*');
  	Category.find({}).exec(async function(err, categories){
  		if(err) return res.status(400).send(err);
			categories = await Promise.all(categories.map(async function(c){
				c.products = (await Product.find({category_id: c.id})).length;
				return c;
			}));
			return res.status(200).send(categories);
  	});
  }

};

