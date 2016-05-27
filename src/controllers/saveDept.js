var OrderModel = require('../models/order').model;

module.exports = function saveDept(req, res, err) {
	var dept = req.body.dept;
	OrderModel.findOne({_id: dept.id})
	.populate("dishes")
	.populate("subscriber")
	.exec(function(err, order) {
		order.subscriber.forEach(function(subscriber, i) {
			if (subscriber.person.name == dept.name) {
				order.subscriber[i].paid = true;
				order.save();
			}
		})
		res.send();
	});
}
