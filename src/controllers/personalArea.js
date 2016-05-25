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
		//доделать вывод в историю тех заказов на которые я была подписана и сортировку их по времени
		var my = [];
		var me = [];
		//высчитываем сколько мне должны
		for (var i = 0; i < allOrders.length; i++) {
			if (allOrders[i].owner.id == req.user.id) {
				for (var j = 0; j < allOrders[i].subscriber.length; j++) {
					if (allOrders[i].subscriber[j].paid == false) {
						var dept = {};
						dept.person = allOrders[i].subscriber[j].person.name;
						var sum = 0;
						for (var k = 0; k < allOrders[i].subscriber[j].dishes.length; k++) {
							sum += allOrders[i].subscriber[j].dishes[k].price;
						}
						dept.sum = sum;
						me.push(dept);
					}
				}
			}
		}
		//высчитываем сколько я должна
		for (var i = 0; i < allOrders.length; i++) {
			for (var j = 0; j < allOrders[i].subscriber.length; j++) {
				if (allOrders[i].subscriber[j].person.id == req.user.id) {
					var dept = {};
					dept.person = allOrders[i].owner.name;
					var sum = 0;
					for (var k = 0; k < allOrders[i].subscriber[j].dishes.length; k++) {
						sum += allOrders[i].subscriber[j].dishes[k].price;
					}
					dept.sum = sum;
					my.push(dept);
				}
			}
		}
		console.log('me',me);
		console.log('my',my);
		res.render('personalArea', {orders: orders,user:req.user, my: my, me: me});
	});
}
