    const { log } = require('console')
    const express = require('express')
    const app = express()
    const mongoose = require('mongoose')
    const path = require('path')
    const router = require('./router/expenses')

    mongoose.connect('mongodb+srv://admin:154Qawsedrf@cluster0.ljo0j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .then(() => {
            console.log("conected to Database");
        }).catch((err)=>{
            console.log(err);
        })
    
    app.set('views',path.join(__dirname,'views'))
    app.set('view engine','ejs')
    
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))

    app.use('/',router)



    app.listen(8080,()=>{
        console.log('Sever Startd port 8080');
    })