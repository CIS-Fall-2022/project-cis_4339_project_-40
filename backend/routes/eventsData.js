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
            } else if (data.length == null ) {
                res.status(400).send("Event not added");                 
            } else {
                res.status(200).send("Event added");
            }
        }
    );
});

//PUT
router.put("/:id", (req, res, next) => {
    eventdata.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else if (data.length == null ) {
                res.status(400).send("Event not updated");                 
            } else {
                res.status(200).send("Event updated");
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

// ADD DELETE API 
 router.delete("/deleteBy/:id",(req,res,next) =>{
    eventdata.findByIdAndRemove
    ({ _id: req.params.id },
         (error, data) => {
        if (error) {
            return next(error);
        } else if (data.length == null ) {
            res.status(400);
            res.send("Client not added");                 
        } else {
            res.status(200).send("Client added");
            res.json({
                msg: data
            });
        }
    });
});

// API TO GET ATTENDEES OF EVENTS OVER LAST 2 MONTHS

router.get("/eventAttendees", (req, res, next) => { 
    var past2Date = new Date(); // 
    eventdata.aggregate([
            {$match: {
                date: {
                        $gt : new Date(past2Date.setMonth(past2Date.getMonth() - 2)),
                        $lt : new Date() 
                }
            }},
            {$event: 
                {total: { $sum: { $size:"$attendees"}}}}
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