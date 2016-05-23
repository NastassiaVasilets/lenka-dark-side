var OrderModel = require('../models/order').model;

module.exports = function personalArea(req, res) {
	OrderModel.find({}).populate("dishes").populate("subscriber").populate("subscriber.dishes").exec(function(err, allOrders){
		var orders = [];
		if(err) {
			next(err)
		}
		for (var i = 0; i < allOrders.length; i++) {
			if (allOrders[i].owner.id == req.user.id) {
				orders.push(allOrders[i]);
			}
		}
		res.render('personalArea', {orders: orders,user:req.user})
	});
}
