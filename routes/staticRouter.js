const express = require('express');
const router = express.Router();
const URL = require('../models/url');

// ✅ Main Landing Page — no auth required
router.get("/", (req, res) => {
  res.render("main");
});

// ✅ Signup Page
router.get('/signup', (req, res) => {
  res.render('signup', { error: null });
});

// ✅ Login Page
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// ✅ Authenticated User Home (URL dashboard)
router.get('/home', async (req, res) => {
  if (!req.user) return res.redirect('/login');

  const allUrls = await URL.find({ createdBy: req.user._id });
  res.render('home', {
    urls: allUrls,
    id: null,
    error: null
  });
});

module.exports = router;
