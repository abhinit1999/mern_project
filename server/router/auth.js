const express = require("express");
const router = express.Router();
const User = require("../model/user");
require("../db/conn");
// const { hash } = require("bcryptjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



// middleWare
const Middlewar = (req, res, next) => {
  console.log(`Hello from Middleware`);

  next();
};
// //////////////

router.get("/", (req, res) => {
  res.send("Hello From Router JS");
});

// add data POST
// With the help of Promises
// router.post("/user", (req, res) => {
//   const { name, email, phone, password, cpassword } = req.body;
//   if (!name || !email || !phone || !password || !cpassword) {
//     return res.status(422).json({
//       error: "All fields are required...",
//     });
//   }
//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({
//           error: "Email already Exist",
//         });
//     }
//         const newUser = new User({ name, email, phone, password, cpassword });
//         newUser.save()
//           .then(() => {
//             res.status(201).json({
//               message: "Registration done !",
//             });
//           }).catch((err) => {
//             res.status(500).json({
//               error: "Failed to registered",
//             });
//           });

//     })
//     .catch((e) => {
//       console.log(e);
//     });
// });

// Now with the help of async await;

router.post("/user", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({
      error: "All fields are required...",
    });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({
        error: "Email already Exist",
      });
    }else if(password !== cpassword)
    {
        return res.status(422).json({
            error: "Confirm passwrod should be same",
          });

    }
    const user = new User({ name, email, phone, password, cpassword });
    
    // Now Password Bcrypt / hash;
    // In the User Schem File///
    
    
    const user_reg = await user.save();
    if (user_reg) {
      res.status(201).json({
        message: "Registration done !",
      });
    } 
  } catch (e) {
    console.log(e);
  }
});

// display user
router.get("/userdata", async (req, res) => {
  const data = await User.find();
  res.send(data);
  console.log(`\n\n${data}`);
});


// Login / Signin Route

router.post("/login",async(req,res)=>
{
    try
    {
        const {email,password} = req.body;
        if(!email || !password)
        {
            return res.status(400).json({error:"Fill all Fields"})
        }
        const user_log = await User.findOne({email:email})
        // console.log(user_log)
        if(user_log)
        {
              // compairing password for login

            const isMath = await bcrypt.compare(password,user_log.password);
        

            // Generating JWT token (in USer.js file)

            const token =await user_log.generateAuthToken();
            console.log(token);
            
            // Storing the JWT token into the cookies
            res.cookie('jwtoken',token,{
                expires:new Date(Date.now()+25892000000) // it tells when it will be logged out auto
                ,httpOnly:true,

            });


        if(!isMath)
        {
            res.status(400).send("invalid credential")
        }
        else
        {
            res.status(200).send(`\nLoged in successfully !!!`)
        }
        }
        else
        {
            res.status(400).send("invalid credential")

        }

      
    }catch(e)
    {
        console.log(e);
    }
})







module.exports = router;
