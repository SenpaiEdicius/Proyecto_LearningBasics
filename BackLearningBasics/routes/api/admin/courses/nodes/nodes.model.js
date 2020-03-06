var ObjectID = require('mongodb').ObjectID;

module.exports = (db) =>{
    var nodesModel = {};
    var nodesCollection = db.collection("nodos");
    var nodeTemplate = {
        nodeNumber: null,
        nodeName: "",
        nodeDesc: "",
        nodeDialogue: "",
        completionType: "",
        rightAnswer: "",
        nodeCompletion: null
    };

    nodesModel.showNodes = (handler)=>{
        nodesCollection.find({}).toArray(handler);
    }

    nodesModel.addNode = (dataToAdd, handler)=>{
        var {number, name, desc, dialogo, tipo, respuesta, completado} = dataToAdd;
        var nodeToAdd = Object.assign(
            {},
            nodeTemplate,
            {
                nodeNumber: number,
                nodeName: name,
                nodeDesc: desc,
                nodeDialogue: dialogo,
                completionType: tipo,
                rightAnswer: respuesta,
                nodeCompletion: completado
            }
        );
        nodesCollection.insertOne(nodeToAdd, (err, newNode)=>{
            if(err){
                return handler(err, null);
            }
            console.log(newNode);
            return handler(null, newNode.ops[0]);
        });
    }

    return nodesModel;
}
