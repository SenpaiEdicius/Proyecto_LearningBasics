var ObjectID = require('mongodb').ObjectID;

module.exports = (db) =>{
    var coursesModel = {};
    var coursesCollection = db.collection("courses");
    var courseTemplate = {
        courseName: "",
        courseDesc: "",
        courseHours: "",
        courseRequirements: "",
        courseActive: null,
        courseNodes: []
    }
    var nodeTemplate = {
        nodeNumber: null,
        nodeName: "",
        nodeDesc: "",
        nodeDialogue: "",
        completionType: "",
        rightAnswer: "",
        nodeCompletion: null
    }

    coursesModel.showCourses = (handler) =>{
        coursesCollection.find({}).toArray(handler);
    }

    coursesModel.addNewCourse = (dataToAdd, handler) =>{
        var {name, desc, hours, req, active} = dataToAdd;
        var courseToAdd = Object.assign(
            {},
            courseTemplate,
            {
                courseName: name,
                courseDesc: desc,
                courseHours: hours,
                courseRequirements: req,
                courseActive: active
            }
        );
        coursesCollection.insertOne(courseToAdd, (err, newCourse)=>{
            if(err){
                return handler(err, null);
            }
            console.log(newCourse);
            return handler(null, newCourse.ops[0]);
        });
    }

    coursesModel.update = (dataToUpdate, handler)=>{
        var {_id, name, desc, hours, req, active} = dataToUpdate;
        var query = {"_id":new ObjectID(_id)};
        var updateCommand = {
            "$set":{
                courseName: name,
                courseDesc: desc,
                courseHours: hours,
                courseRequirements: req,
                courseActive: active,
                lastUpdate: new Date().getTime()
            },
            "$inc":{
                "updates":1
            }
        };
        coursesCollection.findOneAndUpdate(
            query,
            updateCommand,
            {returnNewDocument: true},
            (err, rslt)=>{
                if(err){
                    return handler(err, null);
                }
                console.log(rslt);
                return handler(null, rslt.value);
            });
    }

    return coursesModel;
}