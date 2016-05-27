var PersonModel = require('../models/person').model;

module.exports = function savePersonalArea(req, res) {
    if (req.body.action == 'editPerson') {
        PersonModel.findOne({_id : req.user._id}, function(err, person){
            if(err) {
                next(err)
            }
            person.name = req.body.name;
            person.phone = req.body.phone;
            person.email = req.body.email;
            person.save();
            res.redirect('back');
        });
    }
}
