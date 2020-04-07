var ObjectId = require('mongodb').ObjectID;
module.exports = (db)=>{
    var courseModel = {};
    var coursesCollection = db.collection('courses');

    courseModel.getActiveCourses = async (_page, _itemsPerPage, handler)=>{
        var page = _page || 1;
        var itemsPerPage = _itemsPerPage||10;
        var filter = {"courseActive":true};
        var options = {
            "limit": itemsPerPage,
            "skip": ((page-1)*itemsPerPage),
            "projection":{
                "courseName":1, "courseHours":1
            }
        }
        let cursor = coursesCollection.find(filter, options);
        let totalCourses = await cursor.count();
        cursor.toArray((err, docs)=>{
            if(err){
                console.log(err);
                return handler(err, null);
            }
            return handler(null, {total: totalCourses, courses: docs});
        });
    }
    
    return courseModel;
}