const express = require('express');
const { userInfo } = require('os');
const app =express();
const path = require('path');
const { v4 : uuidv4 } = require('uuid');
const methodOverride = require('method-override');


app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//middleware to parse data
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


let posts = [
    {   id:uuidv4(),
        username:'vineeth',
        content:'This is my first post'
    },
    {   id:uuidv4(),
        username:'john',
        content:'Hello everyone!'
    },
    {   id:uuidv4(),
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
    let id = uuidv4();
    posts.push({id ,username,content});
    res.redirect('/posts');
});

app.get('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id);
    
    if(post){
        res.render("show.ejs",{post});
    }else{
        res.status(404).send("Post not found");
    }
});

app.patch('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>id === p.id);
    post.content = newContent;
    res.redirect('/posts');
    
});

app.get('/posts/:id/edit',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id);
    res.render('edit.ejs',{post}); 
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});