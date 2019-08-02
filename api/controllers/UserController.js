/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var sha256 = require('sha256');

module.exports = {
	_config: {
		actions: false,
		rest: false,
		shortcuts: false
	},
	addUser: function CreateUser(req, res, next){
		res.set('Access-Control-Allow-Origin', '*');
		var name = req.param('name');
		var password = req.param('password');
		User.find({}).exec(function(err, results){
			var isAdmin = false;
			if(results && results.length == 0){
				isAdmin = true;
			}
			User.create({name: name, password: sha256(password), isAdmin: isAdmin}).fetch().exec(function(error, user) {
				return res.status(200).send({message: "Registration successful"});
			});
		})
	},
	getUsers: function(req, res, next){
		res.set('Access-Control-Allow-Origin', '*');
		User.find({}).exec(function(err, results){
			if(err) return res.status(400).send(err);
			results.map(function(r){
				delete r.password;
			})
			return res.status(200).send(results);
		});
	},
	login: function(req, res, next){
		res.set('Access-Control-Allow-Origin', '*');
		var name = req.param('name');
		var password = req.param('password');
		User.find({name: name, password: sha256(password)}).exec(function(err, results){
			if(err) return res.status(400).send(err);
			if(results && results.length == 1){
				return res.status(200).send({
					message: "Logged in as "+name
				});
			} else {
				return res.status(200).send({
					message: "Incorrect name or password"
				});
			}
		});
	}
};
