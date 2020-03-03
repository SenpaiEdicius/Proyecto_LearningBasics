var express = require('express');
var router = express.Router();

function initAdmin(db){

    var adminRouter = require('./courses/courses')(db);

    router.use('/courses', adminRouter);

    return router;

}
module.exports = initAdmin;