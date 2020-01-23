const fetch = require('node-fetch');

// express
const express = require('express');
const app = express();

// run server
require('dotenv').config()
const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("listening at " + port)
} );
app.use(express.static("public")); 
app.use(express.json({limit: '1mb'}));

// Datastore db
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

var newdate = year + "-" + month + "-" + day;

var Datastore = require('nedb');
var db = new Datastore('databes.db');
var dayDb = new Datastore('day/' + newdate + ".db");
db.loadDatabase();
dayDb.loadDatabase();

// check length

app.get('/numeber', function(request, response){
    dayDb.find({}, function(err, data){
        if(err){
            response.end();
            return;
        }
        response.json(data);
    })

});

// put
app.post('/push', function(request, response){
    dayDb.find({}, function(err, data){
        if(err){
            response.end();
            return;
        }
        if(data.length >= 100){
            console.log(data.length);
            response.json({
                status: "faild",
                kode: "brak",
            }); 
        }else{
            console.log(data.length)
            var dataR = request.body;
            var timestamp = Date.now();
            var newKode = generateCode();
            var dataP = {kode: newKode, mail: dataR.mail, used: false};
            dataP.timestamp = timestamp;
            db.insert(dataP);
            dayDb.insert(dataP);
            response.json({
                status: "sucess",
                kode: newKode,
            }); 
        }
    });
    

});

// check
app.post('/dane', function(request, response){
    var dataR = request.body;
    var kode = dataR.kod;
    db.find({kode : kode}, function(err, data){
        if(err){
            response.end();
            return;
        }
        if(data && data.length){
            response.json(data);
        }else{
            var resp = {"kode": false};
            response.json(resp); 
        }
    });
    db.update({kode : kode}, {used : true, kode: kode}, {});
});

// generateCode
function generateCode(){
    var kode = Math.random().toString(36).slice(2);
    return kode;
}



