// const express = require("express");
// const router = express.Router();
// const { saveResume, getAISuggestion } = require("../controllers/resumeController");

// router.post("/", saveResume);
// router.post("/suggest", getAISuggestion);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { getAISuggestion } = require("../openai/suggest");

router.post("/suggest", getAISuggestion);

module.exports = router;
