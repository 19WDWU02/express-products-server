const express = require('express');
const app = express();
const port = 3000;

const allProducts = require('./data/products');

app.use(function(req, res, next){
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/', function(req, res){
    res.send('Welcome to our Products API. Use endpoints to filter out the data');
});

app.get('/all', function(req, res){
    res.json(allProducts);
})

app.get('/instock=:instock', function(req, res){
    const inStockParam = req.params.instock;
    let filteredData = [];
    let avail
    if(inStockParam === 'yes'){
         avail = true;
    } else if(inStockParam === 'no'){
        avail = false;
    }
    for (var i = 0; i < allProducts.length; i++) {
        if(avail == allProducts[i].in_stock){
            filteredData.push(allProducts[i]);
        }
    }
    res.send(filteredData);
});

app.listen(port, () => console.log(`application is running on port ${port}`));
