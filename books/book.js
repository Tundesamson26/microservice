// Load express
    const  express = require("express");
    const app = express();
    const bodyParser = require("body-parser")

    app.use(bodyParser.json());

//Load mongoose
    const mongoose = require("mongoose");

    require("./Books")
    const Books = mongoose.model("Books")
    
// Connect
     mongoose.connect("mongodb+srv://samtech:odewole28@cluster0.q93c1.mongodb.net/test", ()=>{
         console.log("Database connected")
     });

app.get('/', (req, res) =>{
     res.send("This is our books service");
})   

 // Create function
app.post("/book", (req, res)=>{
    var newBook ={
        title: req.body.title,
        author: req.body.author,
        numberPage: req.body.numberPage,
        publisher: req.body.publisher
    }
    
    // Create a new book
    var book = new Books(newBook)

    book.save().then(()=>{
        console.log("New book created")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
    res.send("A new book created successfully!")
})

app.get("/books", (req,res)=>{
    Books.find().then((books)=>{
        res.json(books)
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
    
})

app.get("/book/:id", (req, res)=>{
    Books.findById(req.params.id).then((book)=>{

        if(book){
            // Book Data
            res.json()
        }else{
            res.sendStatus(404)
        }
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})

app.delete("/book/:id", (req, res)=>{
    Books.findOneAndRemove(req.params.id).then(()=>{
        res.send("Book removed successfully")
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})

app.listen(4545, ()=>{
    console.log("Up and Running! --- This is the books service");
})