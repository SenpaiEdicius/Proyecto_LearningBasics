var ObjectId = require('mongodb').ObjectID;
module.exports = (db)=>{
    var courseModel = {};
    var coursesCollection = db.collection('courses');

    courseModel.getActiveCourses = (handler)=>{
        coursesCollection.find({"courseActive":true}).toArray(handler);
    }
    
    return courseModel;
}