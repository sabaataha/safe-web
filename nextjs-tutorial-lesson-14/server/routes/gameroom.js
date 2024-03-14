const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const gameController = require("../controllers/gameController");

const auth = require("../middlewares/auth")

router.post("/", auth, catchErrors(gameController.createGameroom));

module.exports = router;
