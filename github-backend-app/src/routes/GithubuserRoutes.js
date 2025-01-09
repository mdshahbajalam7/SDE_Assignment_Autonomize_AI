const express = require("express");
const { saveUser, deleteUser, updateUser, searchUsers, getAllUsers } = require("../controllers/GithubuserController");
// const {
//   saveUser,
//   deleteUser,
//   updateUser,
//   searchUsers,
//   getAllUsers,
// } = require("../controllers/userController");

const router = express.Router();

router.post("/saveUsers", saveUser);
router.delete("/users/:username", deleteUser);
router.put("/users/:username", updateUser);
router.get("/users/search", searchUsers);
router.get("/users", getAllUsers);

module.exports = router;
