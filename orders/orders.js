const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const axios = require("axios")

app.use(bodyParser.json())

mongoose.connect("mongodb+srv://orders:odewole25@cluster0.q93c1.mongodb.net/order", ()=>{
    console.log("Database connected - Orders")
})

//Modal loaded
require("./Order")
const Order = mongoose.model("Order")

//create new order
app.post("/order", (req, res)=>{

    var newOrder = {
        CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    }

    var order = new Order(newOrder)

    order.save().then(()=>{
        res.send("Order created successfully")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})

  app.get("/orders", (req, res)=>{
      Order.find().then((book)=>{
          res.json(book)
      }).catch((err)=>{
          if(err){
              throw err;
          }
      })
  })

app.get("/order/:id", (req, res)=>{

    Order.findById(req.params.id).then((order)=>{
        if(order){
           axios.get("http://localhost:5555/customer/" + order.CustomerID).then((response)=>{

               var orderObject = {customerName: response.data.name, bookTitle: ''}

               axios.get("http://localhost:4545/book/" + order.BookID).then((response)=>{

                  orderObject.bookTitle = response.data.title
                  res.json(orderObject)
               })
           })
        }else{
            res.send("Invalid order")
        }
    })
})  


app.listen(7777, ()=>{
    console.log("Up and running - Orders services")
})