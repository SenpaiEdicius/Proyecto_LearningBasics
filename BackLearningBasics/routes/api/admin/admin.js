var express = require('express');
var router = express.Router();

function initAdmin(db){
    var coursesRouter = require('./courses/courses')(db);
    var payment = require('./payment/payment')(db);

    router.use('/courses', coursesRouter);
    router.use('/payment',payment);
    return router;

}
module.exports = initAdmin;