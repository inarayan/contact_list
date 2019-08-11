let ejs = require('ejs');
let express = require('express');
let port = 8000;
let path = require('path');
let parser = require('body-parser');
let app = express();

//Setting up ejs for the application
app.set('view engine', 'ejs');
//var view = path.join(__dirname+"/views");
app.set('views', path.join(__dirname, '/views'));
//console.log(view);


app.use(parser.urlencoded({ extended: false }))
app.use(express.static('static'));
var contact_list=[
    {
        name:"indra",
        phone:"12324325"
    }
]
app.get('/', function(req, resp){
    resp.render('contactlist',{
        title:'Contact List',
        contact_list:contact_list
    });
    
});

app.post('/create_contact', function(req, res){
    //console.log(req);
    contact_list.push({
        name:req.body.name,
        phone:req.body.phone
    });
    res.redirect('/');
});

app.get('/profile', function(req, resp){
    console.log("inside profile");
    resp.render('profile',{
        tagline:"indra"
    });
    
});

app.get('/delete-contact/:phone', function(req, resp){

    console.log(req.params);
    let phoneIndex = contact_list.findIndex(contact=> contact.phone==req.params.phone);

    if(phoneIndex>=0){
        contact_list.splice(phoneIndex,1);
        
    }
    resp.redirect('/');
});

app.listen(port, function(err){
    if(err){
        console.log("Error while server start up");
    }
    else{
        console.log("Server started at port :",port);
        console.log(__dirname);
    }
})

