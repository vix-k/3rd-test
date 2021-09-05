const { response } = require('express');
const Datastore = require('nedb');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const express = require('express');
const { request } = require('http');
require("dotenv").config();

const app = express();

app.listen(3000, ()=> console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

// database.insert({
//     name : 200,
//     color : "blue",
//     background : "solid"
// });
app.get('/search/:id', async (request, response)=>{
    var id =  parseInt(request.params.id);
    console.log(id);
    
    database.find({name:id}, function (err,docs){ response.json(docs); });
});
const apikey = process.env.API_KEY;
const pid = process.env.PROJECT_ID;

app.get('/mint/:quantity', async (request, response)=>{
    const quantity = request.params.quantity;
    console.log(quantity);
    const ada = quantity*25;
    const api_url = 'https://api.nft-maker.io/GetAddressForRandomNftSale/'+apikey+'/'+pid+'/'+quantity+'/'+ada+'000000';
    const fetch_response = await fetch(api_url);
    const reply = await fetch_response.json();
    response.json(reply)

});

