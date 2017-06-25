const express = require('express')
const app = express()
var bodyparser = require("body-parser")
var sessions = require("client-sessions");
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/leave-app';

// Use connect method to connect to the server
/*MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  db.close();
});
*/
app.use(sessions({
    cookieName: 'session', // cookie name dictates the key name added to the request object
    secret: 'blargadeeblargblarg', // should be a large unguessable string
    duration: 30 * 60 * 1000, // how long the session will stay valid in ms
    activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ type: "application/json" }));

app.use(express.static('public'))



/*  
    "/login" is a post request used for initial authentication and 
    to set session if successfully authenticated
    "/login" takes json data in the form of
    { username: 'user', role: 'manager' } or { username: 'user', role: 'employee' }
    response in the form of {result:"successful"}/{result:"unsuccessful"}
*/
app.post("/login", function (req, res) {
    var login = req.body;
    var obj = new Object();
    if (login.hasOwnProperty('username') && login.hasOwnProperty('role')) { //validating data paramerters
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            db.collection("user").find(login).toArray(function (err, r) { //querying the database
                if (r.length == 0) {
                    obj.result = "unsuccessful";
                    res.send(obj);
                }
                else {
                    req.session.username = login.username;  //setting session
                    req.session.role = login.role;
                    obj.result = "successful";
                    res.send(obj);
                }

            })
            db.close();
        });
    }
    else {
        obj.result = "invalid data parameters";
        res.status(400).send(obj);
    }
})
/*
    "/createLeave" is a post request to create leave by the employees
    "/createLeave" takes json data in the form of {"startDate":ddmmyyyy, "endDate":ddmmyyyy, "leaveType":"","reason":""}
    here leaveType can be "sick leave","maternity leave", "vacation leave" or "study leave"
*/
app.post("/createLeave", function (req, res) {
    var obj = new Object();
    var leave = req.body;
    if (req.session.role == "employee") {   //validating authentication and role
        if (leave.hasOwnProperty("startDate") && leave.hasOwnProperty("endDate") && leave.hasOwnProperty("leaveType") && leave.hasOwnProperty("reason")) {
            if (leave.leaveType == "sick leave" || leave.leaveType == "maternity leave" || leave.leaveType == "study leave" || leave.leaveType == "vacation leave") {   //validating leaveType
                leave.requestBy = req.session.username;
                leave.requestedAt = Date();
                leave.approvalStatus = "pending";
                MongoClient.connect(url, function (err, db) {
                    assert.equal(null, err);
                    db.collection("leave").insertOne(leave, function (err, r) {
                        assert.equal(null, err);
                        assert.equal(1, r.insertedCount);
                        if (r.insertedCount == 1) {
                            obj.result = "successful";
                            res.send(obj);
                        }
                        else {
                            obj.result = "error";
                            res.send(obj);
                        }
                    });
                    db.close();
                });
            }
            else {
                obj.result = "invalid leaveType";
                res.send(obj);
            }
        }
        else {
            obj.result = "invalid data parameters";
            res.status(400).send(obj);
        }
    }
    else {
        obj.result = "unauthorized access"
        res.status(401).send(obj);
    }
})

app.listen(3000, function () {
    console.log('App listening on port 3000')
})