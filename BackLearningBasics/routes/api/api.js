var express = require('express');
var router = express.Router();

function initApi(db){

    var adminRouter = require('./admin/admin')(db);
    router.use('/admin', adminRouter);

    return router;

}
module.exports = initApi;