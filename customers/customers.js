const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

app.use(bodyParser.json());

//Connect to our database
mongoose.connect("mongodb+srv://customer:odewole30@cluster0.q93c1.mongodb.net/customerservice", ()=>{
    console.log("Database connected - Customer service")
})

//Load model
require("./Customer")
const Customer = mongoose.model("Customer")

app.post('/customer', (req, res)=>{

    var newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }

    var customer = new Customer(newCustomer)

    customer.save().then(()=>{
        res.send("Customer created")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})

  app.get("/customers", (req, res)=>{
      Customer.find().then((customers)=>{
          res.json(customers)
      }).catch((err)=>{
          if(err){
              throw err;
          }
      })
  })

  app.get("/customer/:id", (req, res)=>{
      Customer.findById(req.params.id).then((customer)=>{
          if(customer){
              res.json(customer)
          }else{
              res.send("Invalid ID")
          }
      }).catch((err)=>{
          if(err){
              throw err;
          }
      })
  })

  app.delete("/customer/:id", (req, res)=>{
      Customer.findByIdAndRemove(req.params.id).then(()=>{
          res.send("Customer deleted successfully!")
      }).catch(err=>{
          if(err){
              throw err;
          }
      })
  })

app.listen("5555", ()=>{
    console.log("Up and Running - Customer service")
});