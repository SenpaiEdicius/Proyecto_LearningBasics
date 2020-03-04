var express = require('express');
var router = express.Router();

function initAdmin(db){
    var payment = require('./payment/payment')(db);
    var adminRouter = require('./courses/courses')(db);

    router.use('/courses', adminRouter);
    router.use('/payment',payment);
    
    return router;

}
module.exports = initAdmin;