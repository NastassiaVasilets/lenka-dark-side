var ServiceModel = require('../models/service').model;

module.exports = function ServiceController(req, res, next) {
    ServiceModel.findOne({_id: req.body.serviceId}, function(err, service){
        var orderInfo = {time: req.body.orderTime, 'service': service};
        res.render('menuPage', {'orderInfo': orderInfo});
    });
}
