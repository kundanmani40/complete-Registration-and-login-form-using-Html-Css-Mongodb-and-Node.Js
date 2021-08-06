const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const employeeSchema = new mongoose.Schema({
		     Firstname: {
                         type: String,
                         required : true,
                         default : false
                         },
                         
                      Lastname: {
                         type: String,
                         required : true,
                         default: false
                        
                         },
                      Gender: {
                         type: String,
                         required : true,
                         default:false
                         },
                      Phone: {
                         type: Number,
                         required : true,
                         unique : true,
                         default:false
                         },
			address: {
                         type: String,
                         required : true,
                         default:false
                         },
			DOB: {
                         type: Date,
                         required : true,
                         default:false
                         },
                    Email: {
                         type: String,
                         required : true,
                         unique : true,
                         default:false
                         },
                    Password :{
                        type:String,
                        required:true,
                        default:false
     
                        },
                   RepeatPassword:{
                        type:String,
                        required : true,
                        default:false
                        
                        }    
                        
                        
})
//generating tokens


/*employeeSchema.methods.generateAuthToken = async function(){
 			try{
				const token = jwt.sign({_id :this._id},"mynameiskundanmanifromheritageinstituteoftechnology");
				this.tokens = this.tokens.concat({token : token})
				await this.save();
				return token; 													
                                console.log(token);
  			   }catch(error){
					res.send("the error part" + error);
					console.log("the error part" + error);
			          }   

} 
*/
//password hashing
employeeSchema.pre("save" , async function(next) { 
	//const passwordHash = await bcrypt.hash(password , 10);
	if(this.isModified("Password")){
		//console.log(`the current password is ${this.Password}`);
		this.Password = await bcrypt.hash(this.Password , 10);
		this.RepeatPassword = await bcrypt.hash(this.Password , 10);
	 	//console.log(`the current password is ${this.Password}`);

		//this.RepeatPassword = undefined;
	}	
	next();
})

//define collection
const Register = new mongoose.model("Register",employeeSchema);
module.exports = Register;
