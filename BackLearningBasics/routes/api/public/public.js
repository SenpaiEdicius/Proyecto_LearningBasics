var express = require('express');
var router = express.Router();
function initPublic(db){
    var coursesModel = require('./public.model')(db);
    router.get('/courses/:page/:items', (req,res)=>{
        var {page, items} = req.params;
        coursesModel.getActiveCourses(
            parseInt(page),
            parseInt(items),
            (err,courses)=>{
            if(err){
                console.log(err);
                return res.status(500).json({"error":err});
            }
            return res.status(200).json(courses);
        });//getActiveCourses
    });// /courses
    return router;
}

module.exports = initPublic;