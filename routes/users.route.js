const express= require("express");
const { allUsers, postUser, userDetail, updateUser, deleteUser } = require("../controllers/users.controller");
const router= express.Router();
router.route('/all').get(allUsers);
router.route('/post').post(postUser);
router.route('/:id').get(userDetail);
router.route('/update/:id').patch(updateUser);
router.route('/delete/:id').delete(deleteUser)
module.exports= router