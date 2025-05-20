express = require('express')
const app = express()
const cors = require("cors")
const { json } = require('express')

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json())
const mongoose = require('mongoose');




main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Croma');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const userSchema = new mongoose.Schema({
  mobile: String,
  email: String,
  password: String,
  number: String,
  email: String,
  firstname: String,
  middlename: String,
  lastname: String,
  gender: String,
  dob: String,
  doa: String,

})
const user = mongoose.model('user', userSchema);

app.post("/creatuser", async (req, res) => {

  const findemail = await user.findOne({ email: req.body.email })
  if (findemail) {
    res.json({ data: findemail, status: true, message: "Email is already registered" })
  } else {
    const newuser = await new user({
      mobile: req.body.mobile,
      email: req.body.email,
      password: req.body.password,
      number:req.body.number,
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      middlename:req.body.middlename,
      gender:req.body.gender,
      dob:req.body.dob,
      doa:req.body.doa,
      
    });
    const saveuser = await newuser.save()
    res.json({ status: false })
  console.log("eeee",saveuser)
  }
})

app.post("/Profile", async (req, res) => {

  //  const findAAAA2 = await user.findOne({ mobile: req.body.number })
  const updateuser = await user.findOneAndUpdate({ mobile: req.body.number }, req.body,
    { new: true })
 res.json({status:true,data:updateuser})

})

app.post("/mobile", async (req, res) => {
  console.log(req.body)
  try {
    const finduser = await user.findOne({ mobile: req.body.contact })
    if (finduser) {
      res.json({ data: finduser, status: true })
    } else {
      res.json({ data: finduser, status: false })
    }
  } catch (error) {
    console.log(error)
  }
})


app.listen(8080, () => {
  console.log("server run")
})