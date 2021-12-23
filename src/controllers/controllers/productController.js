const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');

const productController = {

    /*cart: (req, res) => {
        res.render('products/cart');
    },*/


   /* detail: (req, res) => {
        res.render('products/detail');
    },*/


    newProductView: (req, res) => {
        res.render('products/create');
    },


    /*productSave: (req, res) => {

        let productListJSON = fs.readFileSync(path.resolve(__dirname, "../db/products.json"), { encoding: "utf-8" });
        let productList = [];

        if (productListJSON == "") {
            productList = [];
        } else {
            productList = JSON.parse(productListJSON);
        };

        let product = {
            id: productList.length + 1,
            name: req.body.productName,
            price: req.body.productPrice,
            category: req.body.productCategory,
            desc: req.body.productDescription,
            img: req.body.productFile,
        };*/

       /* productList.push(product);
        productJSON = JSON.stringify(productList);
        fs.writeFileSync(path.resolve(__dirname, "../db/products.json"), productJSON);
        res.redirect('/products/list');
    },*/

    /*productList: (req, res) => {
        let productListJSON = fs.readFileSync(path.resolve(__dirname, "../db/products.json"), { encoding: "utf-8" });

        if (productListJSON != "") {
            let productList = JSON.parse(productListJSON);

            res.render('products/list', { "productList": productList });
        } else {

            res.render('products/list', { "productList": "" });
        }
    },*/


    productDelete: (req, res) => {

        let productListJSON = fs.readFileSync(path.resolve(__dirname, "../db/products.json"), { encoding: "utf-8" });
        let productList = JSON.parse(productListJSON);

        for (let i = 0; i < productList.length; i++) {
            if (productList[i].id == req.params.id) {
                for (j = i; j < productList.length; j++) {
                    productList[j].id = productList[j].id - 1
                }
                productList.splice(i, 1);

            }
        };
        productListJSON = JSON.stringify(productList)
        fs.writeFileSync(path.resolve(__dirname, "../db/products.json"), productListJSON);

        res.redirect('/products/list');
    },


    productUpdateView: (req, res) => {
        let productListJSON = fs.readFileSync(path.resolve(__dirname, "../db/products.json"), { encoding: "utf-8" });
        let boxValue = JSON.parse(productListJSON);
        for (i = 0; i < boxValue.length; i++) {
            if (boxValue[i].id == req.params.id) {
                let id = boxValue[i].id - 1;
                res.render("products/edit", { "boxValue": boxValue, "id": id, });
            }
        }
    },

    /*productUpdate: (req, res) => {
        let product = {
            id: productList.length + 1,
            name: req.body.productName,
            price: req.body.productPrice,
            category: req.body.productCategory,
            desc: req.body.productDescription,
            img: req.body.productFile,
        };*/
        /*let productListJSON = fs.readFileSync(path.resolve(__dirname, "../db/products.json"), { encoding: "utf-8" });

        let productList = JSON.parse(productListJSON);

        for (let i = 0; i < productList.length; i++) {
            if (productList[i].id == product.id) {
                productList.splice(i, 1, product);
            }
        };
        productListJSON = JSON.stringify(productList);
        fs.writeFileSync(path.resolve(__dirname, "../db/products.json"), productListJSON);
        res.redirect('/products/list');

    },

}*/
    productDetail: (req,res) => {
        const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
        const IdProduct = req.params.id;
        const product = products.find(article => article.id == IdProduct);
        res.render('./products/productDetail', {product: product, user: req.session.user ? req.session.user : undefined });     
    },
    detail: (req, res) => {
        res.render('products/detail');
    },
    productCart : (req, res) => {
        res.render('./products/productCart')
    },
    cart : (req, res) => {
        res.render('./products/cart', {user: req.session.user ? req.session.user : undefined});
    },
    sinflor : (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
        const rings = products.filter(product => product.category == 'sinflor')
        res.render('./products/sinflor', {products: rings, user: req.session.user ? req.session.user : undefined});
    },
    conflor : (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
        const braceletes = products.filter(product => product.category == 'conflor');
        res.render('./products/conflor', {products: braceletes, user: req.session.user ? req.session.user : undefined });
    },
    
    create: (req,res) => {
        res.render('./admin/addProduct', {user: req.session.user ? req.session.user : undefined });
    },
    //Pantalla de creacion de productos + logica de guardado en backup
    newProductView: (req, res) => {
        res.render('products/create');
    },
    productSave: (req, res) => {

        let productListJSON = fs.readFileSync(path.resolve(__dirname, "../data/products.json"), { encoding: "utf-8" });
        let productList = [];
        if (productListJSON == "") {
            productList = [];
        } else {
            productList = JSON.parse(productListJSON);
        };
        let product = {
            id: productList.length + 1,
            name: req.body.productName,
            desc: req.body.productDescription,
            img: req.body.productFile,
            category: req.body.productCategory,
            size: req.body.productSize,
            price: req.body.productPrice,

        };
        productList.push(product);
        productJSON = JSON.stringify(productList);
        fs.writeFileSync(path.resolve(__dirname, "../data/products.json"), productJSON);
        res.redirect('/products/list');
    },
    //Listado de los productos existentes en backup
    productList: (req, res) => {
        let productListJSON = fs.readFileSync(path.resolve(__dirname, "../data/products.json"), { encoding: "utf-8" });
        if (productListJSON != "") {
            let productList = JSON.parse(productListJSON);
            res.render('products/list', { "productList": productList });
        } else {

            res.render('products/list', { "productList": "" });
        }

    },
    store: (req,res) =>{
        //Lógica para almacenar informacion y crear producto
        const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
        let productImages;
        const productName = req.body.name,
        productDescription = req.body.description,
        productPrice = parseFloat(req.body.price),
        productDiscount = parseFloat(req.body.discount),
        productCategory = req.body.category,
        productMaterial = req.body.materials,
        productQuantS = parseInt(req.body.quantityS) || 0,
        productQuantM = parseInt(req.body.quantityM) || 0,
        productQuantL = parseInt(req.body.quantityL) || 0;

        switch(req.files.length){
            case 0:
                productImages = ["default-image.svg","default-image.svg"];
                break;
            case 1:
                if(req.files[0].fieldname == "image1"){
                    productImages = [req.files[0].filename, "default-image.svg"];
                } else {
                    productImages = ["default-image.svg", req.files[0].filename];
                }
                break;
            case 2:
                productImages = [req.files[0].filename, req.files[1].filename];
                break;
        }

        const newProduct ={
            id: products[products.length -1].id + 1,
            name: productName,
            description: productDescription,
            price: productPrice,
            discount: productDiscount,
            category: productCategory,
            size: {
                S: productQuantS,
                M: productQuantM,
                L: productQuantL
            },
            images: productImages,
            material: productMaterial
        }
        products.push(newProduct)
                //Reescribiendo productos
                fs.writeFileSync(productsPath, JSON.stringify(products, null, ' '));
                res.redirect('/products');
    },
    edit: (req,res) => {
        const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
        const productID = req.params.id;
        const productToEdit = products.find( product => product.id == productID)
        res.render('./admin/editProduct', {product: productToEdit, user: req.session.user ? req.session.user : undefined });
    },
    update: (req,res) => {
        const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
        const productID = req.params.id;
        let productToEdit = products.find( product => product.id == productID)
        let productImages;

        // Ordenamos la info recibida en el formulario
        const productName = req.body.name,
                productDescription = req.body.description,
                productPrice = parseFloat(req.body.price),
                productDiscount = parseFloat(req.body.discount),
                productCategory = req.body.category,
                productMaterial = req.body.materials,
                productQuantS = parseInt(req.body.quantityS) || 0,
                productQuantM = parseInt(req.body.quantityM) || 0,
                productQuantL = parseInt(req.body.quantityL) || 0;
        
        switch(req.files.length){
            case 0:
                productImages = productToEdit.images;
                break;
            case 1:
                if(req.files[0].fieldname == "image1"){
                    productImages = [req.files[0].filename, productToEdit.images[1]];
                } else {
                    productImages = [productToEdit.images[0], req.files[0].filename];
                }
                break;
            case 2:
                productImages = [req.files[0].filename, req.files[1].filename];
                break;
        }

        //Lógica para almacenar informacion y editar producto
        productToEdit ={
            id: productToEdit.id,
            name: productName,
            description: productDescription,
            price: productPrice,
            discount: productDiscount,
            category: productCategory,
            size: {
                S: productToEdit.size.S + productQuantS,
                M: productToEdit.size.M + productQuantM,
                L: productToEdit.size.L + productQuantL
            },
            images: productImages,
            material: productMaterial
        }
        const newProducts = products.map( product => {
            if(product.id === productToEdit.id) {
                return product = {...productToEdit}
            } else {
                return product
            }
        })

        //Reescribiendo productos
        fs.writeFileSync(productsPath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/products');
    },
    delete: (req,res) => {
        const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

        //Lógica para borrar producto
         let id = req.params.id;
        let finalProducts = products.filter(product => product.id != id);
        fs.writeFileSync(productsPath, JSON.stringify(finalProducts, null, ' '));
        res.redirect('/');

    },
    finalizaCompra : (req, res) => {
        res.render('./products/finalizaCompra', {user: req.session.user ? req.session.user : undefined});
    },
    productos: (req,res) => {
        const allProducts = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
        res.render('./products/products', { products: allProducts, user: req.session.user ? req.session.user : undefined });
    }
}

    //Actualizar producto en backup
    productUpdateView: (req, res) => {
        let productListJSON = fs.readFileSync(path.resolve(__dirname, "../data/products.json"), { encoding: "utf-8" });
        let boxValue = JSON.parse(productListJSON);
        for (i = 0; i < boxValue.length; i++) {
            if (boxValue[i].id == req.params.id) {
                let id = boxValue[i].id - 1;
                res.render("products/edit", { "boxValue": boxValue, "id": id, });
            }
        }
    },
    /*productUpdate: (req, res) => {
        let product = {
            name: req.body.productName,
            desc: req.body.productDescription,
            img: req.body.productFile,
            category: req.body.productCategory,
            size: req.body.productSize,
            price: req.body.productPrice,
            id: req.body.id,
        };
        let productListJSON = fs.readFileSync(path.resolve(__dirname, "../data/products.json"), { encoding: "utf-8" });


        let productList = JSON.parse(productListJSON);

        for (let i = 0; i < productList.length; i++) {
            if (productList[i].id == product.id) {
                productList.splice(i, 1, product);
            }
        };
        productListJSON = JSON.stringify(productList);
        fs.writeFileSync(path.resolve(__dirname, "../data/products.json"), productListJSON);
        res.redirect('/products/list');

    },*/







module.exports = productController;