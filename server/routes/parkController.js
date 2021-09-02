var express = require('express');
var router = express.Router();
var lisP = require('../models/parking');
const multer = require('multer');

var ObjectId = require('mongoose').Types.ObjectId;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, `FunOfHeuristic_${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


/* ------------------------------------------ traja3lik list ta3 les parking l kol -------------------------*/
router.get('/list/parking', function(req, res) {
    lisP.find({})
        .populate('reservation')
        .exec(function(err, listRes) {
            if (err) {
                console.log("err");
            } else {
                res.json(listRes);
            }
        });
});
router.route('/list/parking/:name').get(function(req, res) {
    let name = req.params.name;

    lisP.find({ name }, function(err, listRes) {
        if (err) {
            console.log("err");
        } else {
            res.json(listRes);
        }
    });
});
/*----------------------------------------------------------bch tzid parking--------------------------------------*/

router.post('/addParking', upload.single('image'), (req, res) => {
    console.log(req.file);
    var list = new lisP();
    list.name = req.body.name;
    list.longitude = req.body.longitude;
    list.latitude = req.body.latitude;
    list.price = req.body.price;
    list.nbplace = req.body.nbplace;
    list.capteur = req.body.capteur;
    list.image = req.body.image;

    list.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {

            res.send(list)
        }
    })
})

/*-------------------------------------------------bch tfasa5 parking-------------------------------------------*/
router.delete('/list/p/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    lisP.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in park Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});


/*----------------------------------------------- bch tmodifi parking khw mrigle ----------------------------------------*/
router.put('/list/m/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var park = {
        name: req.body.name,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        price: req.body.price,
        nbplace: req.body.nbplace,
        capteur: req.body.capteur,
        image: req.body.image
    };
    lisP.findByIdAndUpdate(req.params.id, { $set: park }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Message Update :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.put('/list/m/:name', (req, res) => {


    var park = {
        name: req.body.name,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        price: req.body.price,
        nbplace: req.body.nbplace,
        capteur: req.body.capteur,
        image: req.body.image
    };
    lisP.findOneAndUpdate({ "name": req.params.name }, { $set: park }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Message Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router