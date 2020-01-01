const express = require('express');
const userRoutes = require('../../services/user/user.route');
const authRoutes = require('../../services/auth/auth.route');
const articleRoutes = require('../../services/articles/article.route');
const insCommentRoutes = require('../../services/instructor_comments/instructor_comment.route');
const settingsRoute = require('../../services/settings/settings.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/articles', articleRoutes);
router.use('/ins_comments', insCommentRoutes);
router.use('/settings', settingsRoute);

module.exports = router;
