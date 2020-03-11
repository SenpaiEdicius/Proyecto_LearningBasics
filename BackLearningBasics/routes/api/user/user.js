var express =  require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

function initUser (db) {

var userModel = require('./user.model')(db);

router.get('/all', (req, res)=>{
    userModel.getAll((err, users)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(users);
    });
} ); //Ver todos los usuarios


router.get('/:id',(req, res)=>{
    var id =  req.params.id ;
    userModel.getById(id, (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });
}); //Gestionar Usuario

router.get('/mycourses/:id',(req, res)=>{
    var id =  req.params.id ;
    userModel.getMyCoursesById(id, (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });
}); //Gestionar Mis Cursos


router.post('/register', (req, res)=>{
  var datosEnviados = req.body;
  userModel.addNew(datosEnviados, (err, addedDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({error:'error'});
    }
    return res.status(200).json(addedDoc);
    }); 
}); //Registrarse como Usuario

router.put('/upd/:id', (req, res)=>{
  var id = req.params.id;
  var data = {
    "_id": id,
    ...req.body
  };
  userModel.update(data, (err, updatedDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(updatedDoc);
  });
});//Modificar Caracteristicas de Usuario

router.post('/login', (req, res)=>{
  var {userEmail, userPassword} = req.body;
  userModel.getByEmail(userEmail, (err,user)=>{
    if(err){
      console.log(err);
      return res.status(400).json({"msg":"Credenciales No Validas. Porfavor Intente denuevo."});
    }
    if (userModel.comparePswd(user.userPassword, userPassword)){
      delete user.userPassword;
      var token =  jwt.sign(user,
      'ProtossTerranZergEasyGG',
      {expiresIn:'60m'}
      )
      return res.status(200).json({"user":user, "jwt":token});
    }
    console.log({ userEmail, userPassword, ...{ "msg":"Contraseñas No Coinciden"}});
    return res.status(400).json({ "msg": "Credenciales No Validas. Porfavor Intente denuevo." });
  });
});// Reingresar como usuario ya existente

router.post('/courses/add', (req, res)=>{
  var userID = req.body.userID;
  var courseID = req.body.courseID;
  userModel.RegisterToCourse(userID,courseID, (err, info)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(info);
  });
});

router.put('/courses/:id', (req, res)=>{
  var id = req.params.id;
  var {nodeNumber, answer} = req.body;
  userModel.getCourseNodes(id, (err, nodes)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"No se ha podido confirmar el nodo. Intente nuevamente"});
    }
      var correctAnswer = userModel.extractCorrectAnswer(nodes, nodeNumber);
      if(nodes[correctAnswer.index].completionType === "Regex"){
        if(!(answer.match(correctAnswer.correctAnswer))){
          return res.status(200).json({"Resultado":"La respuesta es incorrecta"});
        }
        return res.status(200).json({"Resultado":"La respuesta es correcta"});
      }
      if(!(correctAnswer.correctAnswer === answer)){
        return res.status(200).json({"Resultado":"La respuesta es incorrecta"});  
      }{
        userModel.completeNode(id, nodeNumber, (err, completed)=>{
          if(err){
            console.log(err);
            return res.status(500).json({"error":"ERROR. Intente nuevamente el nodo"});
          }
          console.log(completed);
          return res.status(200).json({"Resultado":"La respuesta es correcta"});
        });
      }  
  });//si existe el nodo
});//cambia estado de nodo a completado

 return router;
}
module.exports = initUser;
