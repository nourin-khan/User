/**
 * ProductController
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
  deleteProduct: function(req, res, next){
  	res.set('Access-Control-Allow-Origin', '*');
  	Product.destroy({id: req.param('product_id')}).fetch().exec(function(err, removed){
  		if(err) return res.status(400).send(err);
  		if(removed) return res.status(200).send(removed);
  	})
  }
};

