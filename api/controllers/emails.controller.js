const Email = require('../models/email.model');

module.exports.sendEmail = (req, res, next) => {
    Email.create({
        email: req.body.email,
    })
    .then(email => res.status(201).json(email))
    .catch(next)
}

