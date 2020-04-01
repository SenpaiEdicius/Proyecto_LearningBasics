var ObjectID = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');
var hasIndexEmail = false;

function pswdGenerator( pswdRaw ){
  var hashedPswd = bcrypt.hashSync(pswdRaw, 10);
  return hashedPswd;
}


module.exports = (db)=>{
  var userModel = {}
  var userCollection = db.collection("user");
  var mycoursesCollection = db.collection("user.userCourses");

  var coursesCollection = db.collection("courses");

  if(!hasIndexEmail) {
    userCollection.indexExists("userEmail_1", (err, rslt)=>{
        if(!rslt){
            userCollection.createIndex(
            { userEmail: 1 },
            { unique: true, name:"userEmail_1"},
            (err, rslt)=>{
              console.log(err, rslt);
              hasIndexEmail = true;
            });
        } else {
          hasIndexEmail = true;
        }
    });
  }

  var userTemplate = {
    userCompleteName: "",
    userAge: "",
    userGender: "",
    userEmail: "",
    userPassword: "",
    userCourses: [],
    userRoles: [],
    userActive: false,
    userDateCreated: null
  }

  userModel.addNew = (dataToAdd, handler)=>{
    var { usernames, userage, usergender,useremail,userpassword} = dataToAdd;
    var userToAdd = Object.assign(
      {},
      userTemplate,
      {
        userCompleteName:usernames,
        userAge:userage,
        userGender:usergender,
        userEmail:useremail,
        userPassword: pswdGenerator(userpassword),
        userCourses: [],
        userRoles: ["user"],
        userActive: true,
        userDateCreated: new Date().getTime()
      }
    );
    userCollection.insertOne(userToAdd, (err, rslt)=>{
      if(err){
        return handler(err, null);
      }
      console.log(rslt);
      return handler(null, rslt.ops[0]);
    }); 
  } //Registrar un Usuario

  userModel.update = ( dataToUpdate , handler )=>{
    var { _id, usernames, userage, usergender, userpassword} = dataToUpdate;
    var query = { "_id": new ObjectID(_id)};
    var updateCommad = {
      "$set":{
        userPassword: pswdGenerator(userpassword),
        userCompleteName: usernames,
        userAge:userage,
        userGender:usergender,
        lastUpdated: new Date().getTime()
      },
      "$inc" :{
        "updates": 1
      }
    };
    userCollection.updateOne(
      query,
      updateCommad,
      (err, rslt)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    );
  }//Modificar Caracteristicas de un Usuario

  userModel.getById = (id, handler) => {
    var query = { "_id": new ObjectID(id) };
    userCollection.findOne(
      query,
      (err, doc) => {
        if (err) {
          return handler(err, null);
        }
        return handler(null, doc);
      }
    ); 
  }//Gesitonar un Usuario

  userModel.getMyCoursesById = (id, handler) => {
    var query = { "_id": new ObjectID(id) };
    var projection = { "userCourses": 1, "_id": 0};
    userCollection.findOne(
      query,
      {"projection":projection},
      (err, doc) => {
        if (err) {
          return handler(err, null);
        }
        return handler(null, doc);
      }
    ); 
  }//Gesitonar los cursos de un Usuario

  userModel.comparePswd = (hash, raw)=>{
    return bcrypt.compareSync(raw, hash);
  }

  userModel.getByEmail = (email, handler)=>{
    var query = {"userEmail":email};
    var projection = { "userEmail": 1, "userPassword": 1, "userCompleteName":1, "userActive":1};
    userCollection.findOne(
      query,
      {"projection":projection},
      (err, user)=>{
        if(err){
          return handler(err,null);
        }
        return handler(null, user);
      }
    )
  }

  userModel.RegisterToCourse = (userID, courseID, handler)=>{
    var query1 = {"_id": new ObjectID(courseID)};

    var query2 = {"_id": new ObjectID(userID)};

    var courseJSON = {};

    coursesCollection.findOne(query1, (err, course)=>{
      if(err){
        console.log(err);
        return handler(err,null);
      }
      courseJSON = course;
      console.log(courseJSON);

      var updateCommand = {
        "$push" :{
          "userCourses": [courseJSON]
        }
      };//updateCommand

      userCollection.updateOne(
        query2,
        updateCommand,
        (err, rslt)=>{  
          if(err){
            return handler(err, null);
          }
          return handler(null, rslt.result);
        }
      );//UpdateOne
    });//findOne
  }

  //Used for Complete Node
  userModel.getCourseNodes = (courseID, handler) =>{
    var query = {"_id": new ObjectID(courseID)};
    var projection = {"courseNodes":1, "_id":0};
    coursesCollection.findOne(
      query,
      {"projection": projection},
      (err, course)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, course.courseNodes);
      }
    );
  }

  //Used for Complete Node
  userModel.extractCorrectAnswer = (nodes, nodeNumber)=>{
    for (var x=0;x<nodes.length;x++){
      if(nodes[x].nodeNumber === nodeNumber){
        return {"correctAnswer":nodes[x].rightAnswer, "index":x};
      }
    }
  }

  userModel.completeNode = (id, nodeNumber, handler)=>{
    var query = {"_id": new ObjectID(id), "courseNodes": {"$elemMatch":{"nodeNumber": nodeNumber}}};
    var updateCommand = {
      "$set":{
        "courseNodes.$.nodeCompletion": true
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


  return userModel;
}
