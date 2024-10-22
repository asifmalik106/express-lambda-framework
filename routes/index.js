const express = require("express");
const router = express.Router();
const TestController = require("../controllers/TestController");
const authCheck = require("../middleware/authenticateToken")

// POST route to create a new test
router.post("/api/test", TestController.createTest);

// GET route to retrieve all tests
router.get("/api/test",authCheck,  TestController.getAllTests);
router.get("/api/test/new",  TestController.createNewUser);
router.post("/api/test/verify",  TestController.verifyIDToken);

// GET route to retrieve a single test by ID
router.get("/api/test/:id", TestController.getTestById);

// PUT route to update a test by ID
router.put("/api/test", TestController.updateTest);

// DELETE route to delete a test by ID
router.delete("/api/test/:id", TestController.deleteTest);

module.exports = router;
