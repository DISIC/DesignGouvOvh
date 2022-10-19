'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const server = require('http').createServer(app);
const os = require('os');
const ifaces = os.networkInterfaces();

const PORT = process.env.SERVER_PORT || 8085;
const DB_URL = process.env.DB_URL;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

/**
 * GET 
 * /
 */
app.get('/', function(req, res) {
    console.log('Get /');
    res.send({
        status: "success",
        message: "Hola todos"
    });
});

/**
 * GET 
 * /users
 */
app.get('/users', function(req, res) {
    console.log('Get /users');
    res.send({
        status: "success",
        users: ["toto", "titi", "tata"]
    });
});

/**
 * GET 
 * /infos
 */
app.get('/infos', function(req, res) {
    console.log('Get /infos');

    var interfaces = []

    Object.keys(ifaces).forEach(function(ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function(iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            } else {
                // this interface has only one ipv4 adress
                var net_interface = {
                    name: ifname,
                    address: iface.address
                }
                interfaces.push(net_interface)
            }
            ++alias;
        });
    });

    res.send({
        status: "success",
        data: interfaces
    });
});


// server seting
app.use('/', router);
server.listen(PORT);
console.log('Running on port:' + PORT);