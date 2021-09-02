var Kafka = require('no-kafka');
const express = require('express');
var router = express.Router();
var lisD = require('../../models/device');
const http = require('http').createServer(express);
const io = require('socket.io')(http);

let kafka = require("kafka-node");
var list = new lisD();



http.listen(5000, () => {
    console.log("listning to port bb 3000");
    vv();

});

io.on('connection', (socket) => {
    console.log("Client Connected");

})


const client = new kafka.KafkaClient({ kafkaHost: '193.95.76.211:9092' });
msg = [];
console.log("Initialised..");
const topics = [{
    topic: 'AS.Treetronix.v1',
    offset: 0, //default 0
    partition: 0 // default 0
}];


const options = {
    autoCommit: true
};

const consumer = new kafka.Consumer(client, topics, options);

consumer.setMaxListeners(11);

consumer.on("ready", function(message) {
    console.log("I am ready");
});


console.log('rrrrrrrrrrrrr', msg);
consumer.on("error", function(err) {
    console.log("error", err);
});

consumer.on("message", function(message) {
    console.log("Hey got message");
    console.log(JSON.parse(message.value));
    vv(message);

});

async function vv(x) {
    var y = JSON.parse(x.value);

    // console.log(message);
    msg.push(y);

    list = msg;
    console.log('rrrrrr', list[(list.length - 1)].DevEUI_uplink.DevEUI);
    //if (list[(list.length - 1)].DevEUI_uplink.DevEUI === '4444444444444444' || list[(list.length - 1)].DevEUI_uplink.DevEUI === '7777777777777777') {
    // list[(list.length - 1)].DevEUI_uplink.DevEUI === 'CCCCCCCCCCCCCCCC'
    // var output = list.filter(function(value) { return value.DevEUI_uplink.DevEUI == "004A77012404D36E"; })

    lisD.create(list[(list.length - 1)], function(err, temps) {

        if (err) {
            console.log(err);
            // terminate request/response cycle
            return res.send('Error saving');
        }
    });

    décryptage(list[(list.length - 1)]);



    //}
}


async function décryptage(x) {
    if (x.length != 10) {
        var y = x.DevEUI_uplink.payload_hex[2] + x.DevEUI_uplink.payload_hex[3];
        console.log('y', y);
        var k = (parseInt(y, 16).toString(2)).padStart(8, '0').toString();
        var m = k[1] + k[2] + k[3] + k[4] + k[5] + k[6] + k[7]
        console.log('m', m)
        console.log('biiin', (parseInt(y, 16).toString(2)).padStart(8, '0'))
        if (k[0] == '1') {
            var digit = parseInt(m, 2) / 10.0;
            console.log('mmmm', digit)
            io.emit('vv', Array.from({ length: 1 }, () => [x.DevEUI_uplink.DevEUI, x.DevEUI_uplink.Time, 'true', digit, 'red']));
            setTimeout(() => {}, 2000)
        } else {
            var digit = parseInt(m, 2) / 10.0;
            console.log('mmmm', digit)
            io.emit('vv', Array.from({ length: 1 }, () => [x.DevEUI_uplink.DevEUI, x.DevEUI_uplink.Time, 'false', digit, 'green']));
            setTimeout(() => {}, 2000)
        }

    }

}

// router.route('/:devices').get(function(req, res) {
//     let devices = req.params.matricule;
//     lis.find({ devices }, function(err, listRes) {
//         if (err) {
//             console.log("err");
//         } else {
//             res.json(listRes);
//         }
//     });
// });


module.exports = router;