var express = require('express');
var router = express.Router();

function initCourses(db){
    var coursesModel = require('./courses.model')(db);

    router.get('/all',(req,res)=>{
        coursesModel.showCourses((err, courses)=>{
            if(err){
                console.log(err);
                return res.status(500).json({"error":"error"});
            }
            return res.status(200).json(courses);
        });
    });

    router.post('/new', (req, res)=>{
        var data = req.body;
        coursesModel.addNewCourse(data, (err, newCourse)=>{
            if(err){
                console.log(err);
                return res.status(500).json({"error":"error"});
            }
            return res.status(200).json(newCourse);
        });//addNewCourse
    });//post

    router.put('/update/:id', (req, res)=>{
        var id = req.params.id;
        var data = {
            "_id": id,
            ...req.body
        };
        coursesModel.update(data, (err, updatedDoc)=>{
            if(err){
                console.log(err);
                return res.status(500).json({"error":"error"});
            }
            return res.status(200).json(updatedDoc);
        });
    });//put

    return router;
}
module.exports = initCourses;