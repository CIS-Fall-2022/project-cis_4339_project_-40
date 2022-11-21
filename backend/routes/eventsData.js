const express = require("express");
const router = express.Router();

//importing data model schemas
let { eventdata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    eventdata.find( 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => { 
    eventdata.find({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//GET entries based on search query
//Ex: '...?eventName=Food&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = {
            date:  req.query["eventDate"]
        }
    };
    eventdata.find( 
        dbQuery, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET events for which a client is signed up
router.get("/client/:id", (req, res, next) => { 
    eventdata.find( 
        { attendees: req.params.id }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//POST
router.post("/", (req, res, next) => { 
    eventdata.create( 
        req.body,
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
    console.log(eventdata.createdAt);
    console.log(eventdata.updatedAt);
    console.log(eventdata.createdAt instanceof Date);
});

//PUT
router.put("/:id", (req, res, next) => {
    eventdata.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            }  else {
                res.json(data);
            }
        }
    );
});

//PUT add attendee to event
router.put("/addAttendee/:id", (req, res, next) => {
    //only add attendee if not yet signed uo
    eventdata.find( 
        { _id: req.params.id, attendees: req.body.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length == 0) {
                    eventdata.updateOne(
                        { _id: req.params.id }, 
                        { $push: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                consol
                                return next(error);
                            } else {
                                res.json(data);
                            }
                        }
                    );
                }
                
            }
        }
    );
    
});

// ADD DELETE API  // we used the mongoosejs document we used to get a better way to find and delete https://mongoosejs.com/docs/api/model.html 
 router.delete("/deleteBy/:id",(req,res,next) =>{
    eventdata.findByIdAndRemove
    ({ _id: req.params.id },
         (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json({
                msg: data
            });
        }
    });
});

// API TO GET ATTENDEES OF EVENTS OVER LAST 2 MONTHS
// We have used https://mongoosejs.com/docs/api.html#mongoose_Mongoose-Aggregate to use proper route and to use aggregate function
router.get("/eventAttendees", (req, res, next) => {  // https://www.geeksforgeeks.org/mongodb-greater-than-equals-to-operator-gte/  and  // https://www.geeksforgeeks.org/mongodb-less-than-operator-lt/?ref=rp
    var past2Date = new Date(); // 
    eventdata.aggregate([
            {$match: {
                date: {
                        $gt : new Date(past2Date.setMonth(past2Date.getMonth() - 2)), // we have 3 months of previous just as an example but I am changing it back to 2
                        $lt : new Date() 
                }
            }}
            
        ], 
            (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.json(data);
                }
            }
        )
});



module.exports = router;