const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');

const mainController = {
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
        let catProducts =[];
        for(let i = 0; i<=3; i++){
            catProducts[i]= products[i]
        }
        res.render('index', {products: catProducts, user: req.session.user ? req.session.user : undefined});        
    },
    sobrenosotros: (req, res) => {
        res.render('sobrenosotros', {user: req.session.user ? req.session.user : undefined});
    },
 
    service: (req, res) => {
        res.render('service', {user: req.session.user ? req.session.user : undefined});
    },
    
}

module.exports = mainController;