const express = require("express");
const { body, param, validationResult } = require("express-validator");

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

function createApiRouter(container) {
  const router = express.Router();
  const {
    authController,
    gameController,
    reviewController,
    adminController,
    authenticate,
    requireAdmin
  } = container;

  router.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  router.get("/games", gameController.list.bind(gameController));
  router.get("/reviews", reviewController.list.bind(reviewController));

  router.post(
    "/auth/register",
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    handleValidation,
    authController.register.bind(authController)
  );

  router.post(
    "/auth/login",
    body("email").isEmail().normalizeEmail(),
    body("password").notEmpty(),
    handleValidation,
    authController.login.bind(authController)
  );

  router.get("/auth/me", authenticate(true), authController.me.bind(authController));

  router.get(
    "/me/reviews",
    authenticate(true),
    reviewController.listMine.bind(reviewController)
  );

  router.post(
    "/reviews",
    authenticate(true),
    body("gameId").isInt(),
    body("reviewText").trim().isLength({ min: 10, max: 5000 }),
    body("rating").isInt({ min: 1, max: 5 }),
    handleValidation,
    reviewController.create.bind(reviewController)
  );

  router.patch(
    "/reviews/:id",
    authenticate(true),
    param("id").isInt(),
    body("reviewText").optional().trim().isLength({ min: 10, max: 5000 }),
    body("rating").optional().isInt({ min: 1, max: 5 }),
    handleValidation,
    reviewController.update.bind(reviewController)
  );

  router.delete(
    "/reviews/:id",
    authenticate(true),
    param("id").isInt(),
    handleValidation,
    reviewController.remove.bind(reviewController)
  );

  router.get(
    "/admin/stats",
    authenticate(true),
    requireAdmin,
    adminController.stats.bind(adminController)
  );

  return router;
}

module.exports = { createApiRouter };
