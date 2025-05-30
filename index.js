express = require("express");
const app = express();
const cors = require("cors");
const { json } = require("express");

const corsOptions = {
  origin: ["https://croma-frontend.vercel.app", "http://localhost:5173"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
const mongoose = require("mongoose");
main().catch((err) => console.log(err));

// y5RyhCvsgZRG7g8S
async function main() {
  await mongoose.connect(
    "mongodb+srv://vsamrat274:y5RyhCvsgZRG7g8S@cluster0.hhezy3r.mongodb.net/cROMA?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("DATABASE CONNECT");
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
});
const user = mongoose.model("user", userSchema);

app.post("/creatuser", async (req, res) => {
  const findemail = await user.findOne({ email: req.body.email });
  if (findemail) {
    res.json({
      data: findemail,
      status: true,
      message: "Email is already registered",
    });
  } else {
    const newuser = await new user({
      mobile: req.body.mobile,
      email: req.body.email,
      password: req.body.password,
      number: req.body.number,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      middlename: req.body.middlename,
      gender: req.body.gender,
      dob: req.body.dob,
      doa: req.body.doa,
    });
    const saveuser = await newuser.save();
    res.json({ data: saveuser, message: "newemail" });
  }
});

app.post("/Profile", async (req, res) => {
  console.log(req.body)
  //  const findAAAA2 = await user.findOne({ mobile: req.body.number })
  const updateuser = await user.findOneAndUpdate(
    { mobile: req.body.number },
    req.body,
    { new: true }
  );
  
  res.json({ status: true, data: updateuser ,message:"yyyy" });
});

app.post("/allUser", async (req, res) => {
  let contact = req.body.contact;
  try {
    const finduser = await user.findOne({ mobile: contact });
    if (finduser) {
      res.json({ data: finduser, status: true });
    } else {
      res.json({ data: finduser, status: false });
    }
  } catch (error) {
    res.json(error);
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "Api run",
    status: true,
  });
});

app.listen(8080, () => {
  console.log("server run");
});
