var OrderModel = require('../models/order').model;
var moment = require('moment');

module.exports = function HomeController(req, res, next) {
    OrderModel.find({})
        .populate("dishes")
        .populate("subscriber")
        .populate("subscriber.dishes")
        .exec(function (err, orders) {
            if (err) {
                return next(err);
            }
            var orders = orders.filter(function(order) {              
                return order.time.getTime() > Date.now();
            });

            function isSubscriber(subscribers){
                return subscribers.some(function(subscriber){
                    return subscriber.person.id == req.user.id;
                });
            }
            if (req.user) {
                orders = orders.sort( function (a, b){
                    if (a.owner.id == req.user.id) {
                        return -1;
                    }
                    if (b.owner.id == req.user.id) {
                        return 1;
                    }
                     if (isSubscriber(a.subscriber)) {
                        return -1;
                     }
                     if (isSubscriber(b.subscriber)) {
                        return 1;
                    }
                    return 0;
                });
            }
            res.render('index', {orders: orders, user: req.user});
        });
};
