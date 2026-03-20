const express = require('express');
const { userInfo } = require('os');
const app =express();
const path = require('path');

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//middleware to parse data
app.use(express.urlencoded({extended:true}));


let posts = [
    {   id:1,
        username:'vineeth',
        content:'This is my first post'
    },
    {   id:2,
        username:'john',
        content:'Hello everyone!'
    },
    {   id:3,
        username:'alice',
        content:'Excited to be here!'
    }
];
app.get('/',(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get('/posts',(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post('/posts',(req,res)=>{
    let {username,content} = req.body;
    posts.push({username,content});
    res.redirect('/posts');
});

app.get('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let post = posts.find(p=>p.id === parseInt(id));
    if(post){
        res.render("show.ejs",{post});
    }else{
        res.status(404).send("Post not found");
    }
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});