const jwt = require('jsonwebtoken');

/**
 * Generates a JWT and sets it as an HttpOnly cookie on the response object.
 * 
 * @param {import('express').Response} res Express response object
 * @param {string|import('mongoose').Types.ObjectId} customerId Customer database ID
 * @returns {string} The signed JWT
 */
const generateToken = (res, customerId) => {
  const token = jwt.sign(
    { id: customerId },
    process.env.JWT_SECRET || 'shopkart_jwt_secret_key_default',
    { expiresIn: '1d' }
  );

  const cookieOptions = {
    httpOnly: true, // Prevents XSS attacks by blocking JavaScript access
    secure: true,   // Mandatory for cross-domain HTTPS (Render <-> Vercel)
    sameSite: 'none', // Mandatory to allow cross-site cookies between Vercel and Render[cite: 1, 3, 5]
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  };

  res.cookie('token', token, cookieOptions);

  return token;
};

module.exports = generateToken;