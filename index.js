// const axios = require('axios').default;
// const fetch = require("node-fetch");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
 

var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const express = require("express");
const app = express();
const db = admin.firestore();

const cors = require("cors");
app.use( cors({origin: true} ) );



//Routes
app.get('/', (req,res) =>{
    return res.status(200).send('Hello World');
});

//Create
//Post
app.post('/api/create', (req,res) =>{
    (async () => {

        try 
        {
            await db.collection('products').doc('/' + req.body.id + '/')
            .create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
            })

            return res.status(200).send();

        }
        catch (error)
        {
            console.log(error);
            return res.status(500).send(error);
        }



    })();
});




//Read a specific product based on id
//Get
app.get('/api/read/:id', (req, res) =>{
    (async () => {

        try 
        {
            const document = db.collection('products').doc(req.params.id);
            let product = await document.get();
            let response = product.data();
            

            return res.status(200).send(response);

        }
        catch (error)
        {
            console.log(error);
            return res.status(500).send(error);
        }



    })();
});

//Read all products
//Get
app.get('/api/read', (req, res) =>{
    (async () => {

        try 
        {
            let query = db.collection('products');
            let response = [];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs; //result of the query

                for (let doc of docs)
                {
                    const selectedItem = {
                        id: doc.id,
                        name: doc.data().name,
                        description: doc.data().description,
                        price: doc.data().price
                    };
                    response.push(selectedItem);
                }
                return response; //each then should return a value

            })
            return res.status(200).send(response);

        }
        catch (error)
        {
            console.log(error);
            return res.status(500).send(error);
        }



    })();
});



//Update
//Put
app.put('/api/update/:id', (req,res) =>{
    (async () => {

        try 
        {
            const document = db.collection('products').doc(req.params.id);

            await document.update({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
            });

            return res.status(200).send();

        }
        catch (error)
        {
            console.log(error);
            return res.status(500).send(error);
        }



    })();
});


//Delete
//Delete
app.delete('/api/delete/:id', (req,res) =>{
    (async () => {

        try 
        {
            const document = db.collection('products').doc(req.params.id);
            await document.delete();

            return res.status(200).send();

        }
        catch (error)
        {
            console.log(error);
            return res.status(500).send(error);
        }



    })();
});


//Export the api to Firebase cloud functions
exports.app = functions.https.onRequest(app);



// fetch("http://localhost:5001/fir-crud-restapi-34d27/us-central1/app/api/read/2")
// .then(res => {
//     if (res.ok)
//     {
//         console.log("SUCCESS")
//     } else{
//         console.log("Not successful")
//     }


// })

// fetch("http://localhost:5001/fir-crud-restapi-34d27/us-central1/app/api/read/2",{
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         name: 'User 1'
//     })
// }).then(res => {
//     return res.json()
// })
// .then(data => console.log(data))
// .catch(error => console.log('ERROR'))



// fetch('http://localhost:5001/fir-crud-restapi-34d27/us-central1/app/api/read/2')
//   .then(response => response.json())
//   .then(data => console.log(data));


// axios.get("http://localhost:5001/fir-crud-restapi-34d27/us-central1/app/api/read/2").then(
//     (response)=>{
//         console.log(response.data);
//         alert("hehehe")

//     }
// ).catch(error=>{
//     console.log(error);
//     alert("error")
// })


