const express = require("express"); 
const { org_id } = require("../app");
const router = express.Router(); 

//importing data model schemas
let { organizationdata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    organizationdata.find( 
        (error, data) => {
            if (error) {
                return next(error);
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
            }  else {
                res.json(data);
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
        dbQuery = { _id: { $regex: `^${req.query["_id"]}`, $options: "i" }}
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

//GET single entry by ID for the organization name
router.get("/orgName", (req, res, next) => {
    organizationdata.find( 
        { _id:org_id }, 
        (error, data) => {
            if (error) {
                return next(error);
            }  else {
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
            } else {
                res.json(data);
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
            }  else {
                res.json(data);
                res.send("Organization updated");
            }
        }
    );
});


// ADD DELETE API  // we used the mongoosejs document we used to get a better way to find and delete https://mongoosejs.com/docs/api/model.html
router.delete("/:id",(req,res,next) =>{ 
    organizationdata.findByIdAndRemove 
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


module.exports = router;