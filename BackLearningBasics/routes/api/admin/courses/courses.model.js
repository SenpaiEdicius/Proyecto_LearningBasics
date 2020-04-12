var ObjectID = require('mongodb').ObjectID;

module.exports = (db) =>{
    var coursesModel = {};
    var coursesCollection = db.collection("courses");
    var userCollection = db.collection("user");
    var courseTemplate = {
        courseName: "",
        courseDesc: "",
        courseHours: "",
        courseRequirements: "",
        courseActive: null,
        courseNodes: []
    };
    var nodeTemplate = {
        nodeNumber: null,
        nodeName: "",
        nodeDesc: "",
        nodeDialogue: "",
        completionType: "",
        rightAnswer: "",
        nodeCompletion: null
    };

    coursesModel.showCourses = (handler) =>{
        coursesCollection.find({}).toArray(handler);
    }

    coursesModel.getById = (id, handler) => {
        var query = { "_id": new ObjectID(id) };
        coursesCollection.findOne(
          query,
          (err, doc) => {
            if (err) {
              return handler(err, null);
            }
            return handler(null, doc);
          }
        ); 
      }//Gesitonar un Usuario

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
                var query2 = {"userCourses": {"$elemMatch":{"_id": new ObjectID(_id)}}};
                var updateCommand2 = {
                    "$set":{
                        "userCourses.$[course].courseName": name,
                        "userCourses.$[course].courseDesc": desc,
                        "userCourses.$[course].courseHours": hours,
                        "userCourses.$[course].courseRequirements": req,
                        "userCourses.$[course].courseActive": active,
                        "userCourses.$[course].lastUpdate": new Date().getTime()
                    },
                    "$inc":{
                        "userCourses.$[course].updates":1 
                    }
                };
                var filters = {
                    arrayFilters:[
                        {"course._id":new ObjectID(_id)}
                    ]
                };
                userCollection.updateMany(
                    query2,
                    updateCommand2,
                    filters,
                    (err, userUpd)=>{
                        if(err){
                            return handler(err, null);
                        }
                        console.log("Si pasa por aqui");
                        return handler(null, userUpd);
                    });
            });
    }


    //Nodos
    coursesModel.showNodes = (_id, handler) =>{
        var id = new ObjectID(_id);
        var query = {"_id":id};
        var projection = {"courseNodes": 1, "_id":0};
        coursesCollection.findOne(
            query,
            {"projection": projection},
            (err, nodes)=>{
                if(err){
                    return handler(err, null);
                }
                return handler(null, nodes);
            }
        )
    }

    coursesModel.addNode = (data, handler) =>{
        var {_id, number, name, desc, dialogo, tipo, respuesta} = data;
        var query = {"_id":new ObjectID(_id)};
        var a = Object.assign(
            {},
            nodeTemplate,
            {
                nodeNumber: number,
                nodeName: name,
                nodeDesc: desc,
                nodeDialogue: dialogo,
                completionType: tipo,
                rightAnswer: respuesta,
                nodeCompletion: false
            }
        );
        var updateCommand = {
            "$addToSet":{
                courseNodes : a
            },
            "$inc":{
                "nodes":1
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

    coursesModel.updateNode = (data, handler)=>{
        var {_id, _nodeNumber, name, desc, dialogo, tipo, respuesta} = data;
        var query = {"_id": new ObjectID(_id), "courseNodes": {"$elemMatch":{"nodeNumber": _nodeNumber}}};
        var updateCommand = {
            "$set":{
              "courseNodes.$.nodeName": name,
              "courseNodes.$.nodeDesc": desc,
              "courseNodes.$.nodeDialogue": dialogo,
              "courseNodes.$.completionType": tipo,
              "courseNodes.$.rightAnswer": respuesta,
              "courseNodes.$.nodeCompletion": false
            }
          };
          coursesCollection.findOneAndUpdate(
            query,
            updateCommand,
            (err, course)=>{
              if(err){
                return handler(err, null);
              }
              return handler(null, course.value.courseNodes); 
            }
          );
    }



    return coursesModel;
}