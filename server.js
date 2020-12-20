const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const { request, response } = require("express");
const CONNECTION_URL ="mongodb://localhost:27017" ;
const DATABASE_NAME = "football";


var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.listen(8001, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true,useUnifiedTopology:true }, (error, client) => {
      
        database = client.db(DATABASE_NAME);
        collection = database.collection("myteam");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});
app.get("/myteam", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.post("/myteam", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.delete("/myteam/:id", (request, response) => {
    collection.remove(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});


MongoClient.connect(CONNECTION_URL, function(err, db) {
    if (err) throw err;
    var dbo = db.db("football");
    var myquery = { rushing_yard: "123" };
    var newvalues = { $set: {rushing_yard: "1000" } };
    dbo.collection("myteam").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("updated");
      db.close();
    });
  });

 