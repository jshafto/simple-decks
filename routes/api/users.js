const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const UserUtils = require('../../db/user-utils');
const { authenticated, generateToken } = require('./security-utils');
const { User } = require('../../db/models');
const { handleValidationErrors } = require('./utils');
const bcrypt = require('bcryptjs');



const router = express.Router();

const email =
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail();

const username =
    check('username')
        .not().isEmpty()
        .withMessage('Please provide a username')


const password =
    check('password')
        .not().isEmpty()
        .withMessage('Please provide a password');

router.get('/', asyncHandler(async function (req, res, next) {
    const users = await User.findAll();
    res.json({ users });
}));

router.post(
    "/",
    handleValidationErrors,
    asyncHandler(async (req, res) => {
        const {
            username,
            email,
            password
        } = req.body;


        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, email, hashedPassword });

        const { jti, token } = generateToken(user);
        user.tokenId = jti;
        await user.save();
        res.cookie('token', token, { maxAge: 604800000 });
        res.status(201).json({ token, user: user.toSafeObject() });
    })
);

module.exports = router;
