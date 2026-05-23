const config = require("./config");
const { prisma } = require("./lib/prisma");
const { UserRepository } = require("./repositories/userRepository");
const { GameRepository } = require("./repositories/gameRepository");
const { ReviewRepository } = require("./repositories/reviewRepository");
const { createAuthService } = require("./services/authService");
const { createGameService } = require("./services/gameService");
const { createReviewService } = require("./services/reviewService");
const { createAdminService } = require("./services/adminService");
const { createAuthController } = require("./controllers/authController");
const { createGameController } = require("./controllers/gameController");
const { createReviewController } = require("./controllers/reviewController");
const { createAdminController } = require("./controllers/adminController");
const { createAuthMiddleware } = require("./middleware/auth");

function createContainer() {
  const userRepository = new UserRepository(prisma);
  const gameRepository = new GameRepository(prisma);
  const reviewRepository = new ReviewRepository(prisma);

  const authService = createAuthService({
    userRepository,
    jwtSecret: config.jwtSecret
  });
  const gameService = createGameService({ gameRepository });
  const reviewService = createReviewService({ reviewRepository, gameRepository });
  const adminService = createAdminService({ userRepository, reviewRepository, gameRepository });

  const authController = createAuthController({ authService });
  const gameController = createGameController({ gameService });
  const reviewController = createReviewController({ reviewService });
  const adminController = createAdminController({ adminService });

  const { authenticate, requireAdmin } = createAuthMiddleware({
    userRepository,
    jwtSecret: config.jwtSecret
  });

  return {
    authController,
    gameController,
    reviewController,
    adminController,
    authenticate,
    requireAdmin
  };
}

module.exports = { createContainer };
