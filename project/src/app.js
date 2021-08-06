const express = require("express");
const bcrypt  = require("bcryptjs");
//const fileUpload = require("express-fileupload");
const path = require("path");
const app  = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");

const port = process.env.PORT || 4000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res) => {
    res.render("index");
    });
    
app.get("/register",(req,res) => {
	res.render("register")
});


app.get("/login",(req,res) => {
	res.render("login");
	
})

app.post("/register", async (req,res) => {
	try{
		const Password = req.body.Password;
		const cpassword = req.body.RepeatPassword;
		if(Password === cpassword)
		{
			const registerEmployee = new Register({
				Firstname : req.body.firstname,
				Lastname : req.body.lastname,
				Gender : req.body.gender,
				Phone : req.body.phone,
				address : req.body.Address,
				DOB : req.body.DOB,
			        Email : req.body.Email,
			        Password: Password,
			        RepeatPassword:cpassword
			        
			})
		
		  //password Hash
		  
		//const token = await registerEmployee.generateAuthToken();
		const registered = await registerEmployee.save();
		res.status(201).render("register");
		}
		else{
			res.send("password are not matching");
		    }
		//console.log(req.body.email);
		//res.send(req.body.email);
	
	 }catch(err){
	      res.status(400).send(err);
	      }
	
})
//login check
app.post("/login", async (req,res) => {
		try {
		    const Email = req.body.uname;
		    const Password = req.body.psw;
		    
		   const Useremail = await Register.findOne({Email : Email});
			
		   const isMatch =  await bcrypt.compare(Password ,Useremail.Password);	
			
		   if(isMatch)
		   {
		   
		       res.status(201).send("Successfully loged In ");
		   }
		    else{
		     res.send("Password are not matching");
		     }
		
		}
		catch(err){
		res.status(409).send("Invalid Email");
		}

	
})
	



//create a new user in db    
app.listen(port, () => {
		console.log(`Server is Running at port no ${port}`);
})
