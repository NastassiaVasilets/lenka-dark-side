var DishModel = require('../models/dish').model;

module.exports = function(req, res) {
    DishModel.findOne({_id: req.body.dishId}, function(err, dish){
        if (err) {
            return next(err);
        }
        if (req.body.removeOne = "true") {
        	req.session.dishes.forEach(function(sessionDish, i) {
        		if (sessionDish._id == req.body.dishId) {
        			req.session.dishes.splice(i,1);
        		}
        	});
        }
        req.session.dishes.push(dish);
        res.send(dish);
    });
};
