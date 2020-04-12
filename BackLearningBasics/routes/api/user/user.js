var express =  require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

function initUser (db) {

var userModel = require('./user.model')(db);

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

router.get('/mycourses/:id/:page/:items',(req, res)=>{
  var id =  req.params.id ;
  var page = parseInt(req.params.page);
  var items = parseInt(req.params.items);
  userModel.getMyCoursesById(id, page, items, (err, doc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(doc);
  });
}); //Gestionar Mis Cursos


router.post('/register', (req, res)=>{
  var edad = parseInt(req.body.edad);
  var data = {
    "userage": edad,
    ...req.body
  };
  userModel.addNew(data, (err, addedDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({error:'error'});
    }
    return res.status(200).json(addedDoc);
    }); 
}); //Registrarse como Usuario


router.put('/upd/:id', (req, res)=>{
  var id = req.params.id;
  var edad = parseInt(req.body.edad);
  var data = {
    "_id": id,  
    "userage": edad,
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
      return res.status(200).json({"msg":"Credenciales No Validas. Porfavor intentelo nuevamente."});
    }
      if(!user.userActive|| user.userActive==null){
        console.log(err);
        return res.status(200).json({"msg":"Su usuario ha sido desabilitado. Que tenga un buen dia"});
      }
      if (userModel.comparePswd(user.userPassword, userPassword)){
        delete user.userPassword;
        var token =  jwt.sign(user,
        'ProtossTerranZergEasyGG',
        {expiresIn:'60m'}
        )
        return res.status(200).json({"user":user, "jwt":token,"userType":user.userType});
      }
      console.log({ userEmail, userPassword, ...{ "msg":"Contraseñas No Coinciden"}});
      return res.status(200).json({"msg": "Credenciales No Validas. Porfavor intentelo nuevamente."});
  });
});// Reingresar como usuario ya existente


router.post('/updatepswd', (req, res)=>{
  var id =  req.body.id ;
  var oldpassword = req.body.oldpass;
  var password = req.body.newpass;
  userModel.getById(id, (err, doc)=>{
    if(err){
      console.log(err);
      return res.status(200).json({"msg":"Error inesperado. Intente nuevamente"});
    }
      if (!userModel.comparePswd(doc.userPassword, oldpassword)){
        return res.status(200).json({"msg":"La contraseña actual no es correcta"});
      }
        console.log("Si pasa");
        userModel.updatepass({_id:id, password}, (err, upd)=>{
          if(err){
            console.log(err);
            return res.status(200).json({"msg":"Error inesperado. Intente nuevamente"});
          }
          return res.status(200).json({"msg":"Se ha completado el cambio de contraseña con éxito"});
        }); 
  });
});// Cambiar Contraseña


router.post('/courses/add', (req, res)=>{
  var userID = req.body.userID;
  var courseID = req.body.courseID;
  userModel.RegisterToCourse(userID, courseID, (err, info)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(info);
  });
});//Añadir Curso a usuario

router.get('/course/nodes/:idu/:idc', (req, res)=>{
  var id = req.params.idc;
  var userID = req.params.idu;
  userModel.getCourseNodes(id, userID, (err, nodes)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"No se ha podido confirmar el nodo. Intente nuevamente"});
    }
    return res.status(200).json(nodes);
  });
});

router.put('/course/class/:id', (req, res)=>{
  var id = req.params.id;
  var answer = req.body.answer;
  var userID = req.body.userid;
  var nodeNumber = parseInt(req.body.NodeNumber);
  userModel.getCourseNodes(id, (err, nodes)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"No se ha podido confirmar el nodo. Intente nuevamente"});
    }
      var correctAnswer = userModel.extractCorrectAnswer(nodes, nodeNumber);
      if(!((nodes[correctAnswer.index].completionType === "Regex" && (answer.match(correctAnswer.correctAnswer))) ||
      (correctAnswer.correctAnswer === answer))){
        return res.status(200).json({"Resultado":"La respuesta es incorrecta"});
      }
      userModel.completeNode(userID, id, nodeNumber, (err, completed)=>{
        if(err){
          console.log(err);
          return res.status(500).json({"error":"ERROR. Intente nuevamente el nodo"});
        }
        console.log(completed);
        return res.status(200).json({"Resultado":"La respuesta es correcta"});
      });
  });//si existe el nodo
});//cambia estado de nodo a completado


router.post('/forgot',(req,res)=>{
  var mailOptions = {
    from: 'learningbasicshn@gmail.com',
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.htmlBody
  }
  userModel.sendEmail(mailOptions,(err,result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"No se pudo enviar el correo"});
    }
    return res.status(200).json({"mensaje":"EL correo fue enviado satisfactoriamente"});
  });
});//Forgot


 return router;
}
module.exports = initUser;
