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
    for (var i = 0; i < allProducts.length; i++) {
        if(allProducts[i].in_stock.toString() === inStockParam){
            filteredData.push(allProducts[i]);
        }
    }
    res.send(filteredData);
});

app.get('/minPrice=:min', function(req, res){
    const minParam = req.params.min;
    let filteredData = [];
    for (var i = 0; i < allProducts.length; i++) {
        if(minParam <= allProducts[i].product_price){
            filteredData.push(allProducts[i]);
        }
    }
    res.send(filteredData);
});


app.get('/maxPrice=:max', function(req, res){
    const maxParam = req.params.max;
    let filteredData = [];
    for (var i = 0; i < allProducts.length; i++) {
        if(maxParam >= allProducts[i].product_price){
            filteredData.push(allProducts[i]);
        }
    }
    res.send(filteredData);
});

app.get('/minPrice=:min/maxPrice=:max', function(req, res){
    const minParam = req.params.min;
    let filteredMinData = [];
    for (var i = 0; i < allProducts.length; i++) {
        if(minParam <= allProducts[i].product_price){
            filteredMinData.push(allProducts[i]);
        }
    }
    const maxParam = req.params.max;
    let filteredData = [];
    for (var i = 0; i < filteredMinData.length; i++) {
        if(maxParam >= filteredMinData[i].product_price){
            filteredData.push(filteredMinData[i]);
        }
    }
    res.send(filteredData);
});

app.get('/search=:term', function(req, res){
    const termParam = req.params.term;
    let filteredData = [];
    for (var i = 0; i < allProducts.length; i++) {
        let name = allProducts[i].product_name.toLowerCase();
        if(name.match(termParam)){
            filteredData.push(allProducts[i]);
        }
    }
    res.send(filteredData);
});

app.get('/instock=:instock/minPrice=:min/maxPrice=:max/search=:term', function(req, res){
    const inStockParam = req.params.instock;
    const minParam = req.params.min;
    const maxParam = req.params.max;
    const termParam = req.params.term;

    let filteredStockData = [];
    for (var i = 0; i < allProducts.length; i++) {
        if(allProducts[i].in_stock.toString() === inStockParam){
            filteredStockData.push(allProducts[i]);
        }
    }

    let filteredMinData = [];
    for (var i = 0; i < filteredStockData.length; i++) {
        if(minParam <= filteredStockData[i].product_price){
            filteredMinData.push(filteredStockData[i]);
        }
    }

    let filteredMaxData = [];
    for (var i = 0; i < filteredMinData.length; i++) {
        if(maxParam >= filteredMinData[i].product_price){
            filteredMaxData.push(filteredMinData[i]);
        }
    }

    let filteredData = [];
    for (var i = 0; i < filteredMaxData.length; i++) {
        let name = filteredMaxData[i].product_name.toLowerCase();
        if(name.match(termParam)){
            filteredData.push(filteredMaxData[i]);
        }
    }

    res.send(filteredData);
    
});

app.listen(port, () => console.log(`application is running on port ${port}`));
