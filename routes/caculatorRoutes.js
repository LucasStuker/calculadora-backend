const express = require("express");
const router = express.Router();
const { calculateCommission } = require("../controllers/calculatorController");

router.post("/calculate", calculateCommission);

module.exports = router;
