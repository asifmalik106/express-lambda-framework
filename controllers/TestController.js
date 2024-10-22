let Test = require("../services/Test");
let { getLanguage, getMessage } = require("../config/language");
let firebaseAdmin = require("../config/dbConfig");
module.exports = class TestController {
  // Read operation (GET all tests)
  static async getAllTests(req, res) {
    try 
    {
      let test = await Test.getAllTest();
      res.status(200).json(test);
    } 
    catch (error) {
      res.status(500).json({ status: "error", msg: "Something went wrong" });
    }
  }

  // Read operation (GET a test by ID)
  static async getTestById(req, res) {
    try {
      let testId = req.params.id;
      let test = new Test();
      let data = await test.getTestById(testId);
      if(data)
      {
        res.status(200).json( data );
      }
      else
      {
        res.status(404).json({ status: "error", msg: "Test Now Found"});
      }
    } catch (error) {
      res.status(500).json({ status: "error", msg: "Something went wrong" });
    }
  }
 // Create New user (POST)
  static async createNewUser(req, res) {
    try {
console.log("Auth Activity Triggered!")

      firebaseAdmin.getAuth().createUser({
        email: 'user@example.com',
        emailVerified: false,
        phoneNumber: '+11234567890',
        password: 'secretPassword',
        displayName: 'John Doe',
        photoURL: 'http://www.example.com/12345678/photo.png',
        disabled: false,
      })
          .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            res.status(200).json('Successfully created new user:', userRecord.uid);
          })
          .catch((error) => {
            res.status(500).json('Error creating new user:', error);
          });



    }catch (error){
      res.status(500).json(error)
    }

  }

  // Verify ID Token (POST)
  static async verifyIDToken(req, res) {
    try {
      firebaseAdmin.getAuth()
          .verifyIdToken(req.body.idToken)
          .then((decodedToken) => {
            res.status(200).json(decodedToken);
            // ...
          })
          .catch((error) => {
            res.status(500).json("Inside verify token: "+error);
          });
    }catch (e){
      res.status(500).json("Outside verify token: "+e);

    }
  }



  // Login Function
static async loginTest(req, res) {
  try {
    let { email, password } = req.body;
    firebaseAdmin.getAuth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    return res.status(201).json({ status: "success", msg: "Test added successfully"});
  } catch (error) {
    res.status(500).json({ status: "error", msg: "Something went wrong" });
  }
}

  // Create operation (POST)
  static async createTest(req, res) {
    try {
      let { testName, age } = req.body;
      let  newTest = new Test(testName, age);
      await newTest.create();
      return res.status(201).json({ status: "success", msg: "Test added successfully"});
    } catch (error) {
      res.status(500).json({ status: "error", msg: "Something went wrong" });
    }
  }

  // Update operation (PUT)
  static async updateTest(req, res) {
    try {
      if(!req.body.id || req.body.id.trim() == '')
      {
        return res.status(400).json({ status: "error", msg: "Bad request. ID is mandatory." });
      }
      let test = new Test();
      await test.updateTestById(req.body.id, req.body);
      return res.status(202).json({ status: "success", msg: "Test updated successfully." });
    } catch (error) {
      res.status(500).json({ status: "error", msg: "Something went wrong" });
    }
  }

  // Delete operation (DELETE)
  static async deleteTest(req, res) {
    try {
      let test = new Test();
      await test.deleteById(req.params.id);
      res.status(200).json({ status: "success", msg: "Test deleted successfully" });
    } catch (error) {
      res.status(500).json({ status: "error", msg: "Something went wrong" });
    }
  }
};
