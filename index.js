const express=require("express");
const path =require("path");
const port=8000;

const db=require("./config/mongoose");
const Contact=require("./models/contact");
const app=express(); //this app has a functionality which are needed to run this server

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded());  //this reads only form data which we have submitted not params.
app.use(express.static("assests"));
var contactList=[
    {
        name:"Israil",
        phone:"888888888",
    },
    {
        name:"Sameer",
        phone:"777777777",
    }
]
app.get("/",function(req,res){
            // console.log(__dirname);
        // res.send("<h1> Hello! motherFuckers</h1>");
        Contact.find({},function(err,contacts){
             if(err){
                 console.log("Error in fetching contacts from DB");
                 return;
             }
             return res.render('home',{
                title:'contacts List',
                Contact_list:contacts,
             });

        });
    // return res.render('home',{
    //     title:'contacts List',
    //     Contact_list:contactList,
    // })
});
app.get("/practice",function(req,res){
    return res.render('practice',{title:"PlayGround"})
})
app.post("/create-contacts",function(req,res){
//    return res.redirect("./practice");
//    contactList.push({
//        name:req.body.name,
//        phone:req.body.phone,
//    });
    // contactList.push(req.body);
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
          if(err){
              console.log("error in creating a contact");
          return;
           }
           console.log("*******",newContact);
           return res.redirect("back");
    });
//    return res.redirect("/");
 
});
//for deleting Contact
app.get("/delete-contacts/",function(req,res){
    // console.log(req.params);
    // let phone=req.params.phone;
    // console.log(req.query);

    //get the query from the url
    //query read the data after (? in url)
    let id=req.query.id;
    //find the contact from the database using ID
    Contact.findByIdAndDelete(id,function(err){
              if(err){
                  console.log("Error in deleting an object from the database");
                  return;
              }
              return res.redirect('back');
    });

    



});
app.listen(port,function(err){
    if(err){
        console.log("Error in the runnning server",err);
    }
    console.log("Yup!!,The sever is Running on port:",port);
});