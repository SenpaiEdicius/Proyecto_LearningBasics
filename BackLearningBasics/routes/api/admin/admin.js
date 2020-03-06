var express = require('express');
var router = express.Router();

function initAdmin(db){

    var coursesRouter = require('./courses/courses')(db);

    router.use('/courses', coursesRouter);

    return router;

}
module.exports = initAdmin;