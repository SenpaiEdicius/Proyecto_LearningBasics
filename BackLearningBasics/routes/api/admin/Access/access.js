var express = require('express');
var router = express.Router();
function initAccess(db){
    var accessModel = require('./access.model')(db);
    router.post('/newPage',(req,res)=>{
        var pageData = req.body;
        accessModel.newPage(pageData,(err,addedPage)=>{
            if(err){
                console.log(err);
                return res.status(500).json({"error":err});
            }
            return res.status(200).json(addedPage);
        });
        
    });
    router.put('/give/:id',(req,res)=>{
        var type = req.body.type;
        var id = req.params.id;
        accessModel.giveAccess(id,type,(err,updatedAccess)=>{
            if(err){
                console.log(err);
                return res.status(500).json({"error":err});
            }
            return res.status(200).json(updatedAccess);
        });
    });
    router.put('/deny/:id',(req,res)=>{
        var type = req.body.type;
        var id = req.params.id;
        accessModel.removeAccess(id,type,(err,updatedAccess)=>{
            if(err){
                console.log(err);
                return res.status(500).json({"error":err});
            }
            return res.status(200).json(updatedAccess);
        });
    });
    router.get('/hasAccess/:userType',(req,res)=>{
        var userType = req.params.userType;
        
        accessModel.hasAccess(userType,(err,hasAccess)=>{
            if(err){
                console.log(err);
                return res.status(500).json({"error":err});
            }
            return res.status(200).json(hasAccess);
        });
    });
    router.get('/deniedAccess/:userType',(req,res)=>{
        var userType = req.params.userType;
        accessModel.deniedAccess(userType,(err,deniedAccess)=>{
            if(err){
                console.log(err);
                return res.status(500).json({"error":err});
            }
            return res.status(200).json(deniedAccess);
        });
    });
    router.post('/makeMenu',(req,res)=>{
        //console.log(JSON.stringify(req.body));
        var userType = req.body.userType;
        accessModel.makeMenu(userType,(err,result)=>{
          if(err){
            console.log(err);
            return res.status(500).json({"error":"Tipo de Usuario no encontrado"});
          }
          //console.log(JSON.stringify(result));
          return res.status(200).json(result);
        });
      });//Forgot
    return router;
}

module.exports = initAccess;