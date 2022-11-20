const express = require("express"); 
const router = express.Router(); 

//importing data model schemas
let { organizationdata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    organizationdata.find( 
        (error, data) => {
            if (error) {
                return next(error);
            } else if (data.length == null ) {
                res.status(400);
                res.send("Organizations not found");                 
            } else {
                res.status(200);
                res.send("Organizations found");
        }
    }    
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => {
    organizationdata.find( 
        { _id: req.params.id }, 
        (error, data) => {
            if (error) {
                return next(error);
            } else if (data.length == null ) {
                res.status(400);
                res.send("Organization not found by ID");                 
            } else {
                res.status(200);
                res.send("Organizations found by ID");
        }
        }
    );
});

//GET entries based on search query
//Ex: '...?firstName=Bob&lastName=&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'orgname') {
        dbQuery = { orgName: { $regex: `^${req.query["orgName"]}`, $options: "i" }}
    } else if (req.query["searchBy"] === 'ID') {
        dbQuery = { orgCode: { $regex: `^${req.query["orgCode"]}`, $options: "i" }}
    };
    primarydata.find( 
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


//POST
router.post("/", (req, res, next) => { 
    organizationdata.create( 
        req.body,
        (error, data) => { 
            if (error) {
                return next(error);
            } else if (data.length == null ) {
                res.status(400);
                res.send("Organization not added");                 
            } else {
                res.status(200);
                res.send("Organization added");
            }
        }
    );
    console.log(organizationdata.createdAt);
    console.log(organizationdata.updatedAt);
    console.log(organizationdata.createdAt instanceof Date);
});

//PUT update (make sure req body doesn't have the id)
router.put("/:id", (req, res, next) => { 
    organizationdata.findOneAndUpdate( 
        { _id: req.params.id }, 
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else if (data.length == null ) {
                res.status(400);
                res.send("Organization not updated");                 
            } else {
                res.status(200);
                res.send("Organization updated");
            }
        }
    );
});


// ADD DELETE API 
router.delete("/:id",(req,res,next) =>{
    organizationdata.findOneAndRemove({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        } else if (data.length == null ) {
            res.status(400);
            res.send("Organization not deleted");                 
        } else {
            res.status(200).send("Organization deleted");
            res.json({
                msg: data
            });
        }
    });
});


module.exports = router;