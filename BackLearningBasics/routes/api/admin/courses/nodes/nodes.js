var express = require('express');
var router = express.Router();

function initNodes(db){
    var nodesModel =  require('./nodes.model')(db);

    router.get('/test',(req, res)=>{
        return res.status(200).json({"status":"A-OK"});
    });

    router.get('/all', (req, res)=>{
        nodesModel.showNodes((err, nodes)=>{
            if(err){
                console.log(err);
                return res.status(500).json({"error":"error"});
            }
            return res.status(200).json(nodes);
        });
    });

    router.post('/new', (req, res)=>{
        var data = req.body;
        nodesModel.addNode(data, (err, newNode)=>{
            if(err){
                console.log(err);
                return res.status(500).json({"error":"error"});
            }
            return res.status(200).json(newNode);
        });
    });


    return router;
}

module.exports = initNodes;