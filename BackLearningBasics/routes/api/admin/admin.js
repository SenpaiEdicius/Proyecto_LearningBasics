var express = require('express');
var router = express.Router();

function initAdmin(db){
    var coursesRouter = require('./courses/courses')(db);
    var payment = require('./payment/payment')(db);
    var usersRouter = require('./users/users')(db);

    router.use('/courses', coursesRouter);
    router.use('/payment',payment);
    router.use('/users', usersRouter);

    return router;

}
module.exports = initAdmin;