const  express = require ("express");
const { SignupUser } = require("../controllers/authController");

const router = express.Router();

router.post ('/signup', SignupUser );

module.exports = router;
