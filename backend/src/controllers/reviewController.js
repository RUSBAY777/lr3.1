const { ERROR_CODES } = require("../constants/errorCodes");

const ERROR_MESSAGES = {
  [ERROR_CODES.GAME_NOT_FOUND]: { status: 404, message: "Игра не найдена" },
  [ERROR_CODES.REVIEW_NOT_FOUND]: { status: 404, message: "Обзор не найден" },
  [ERROR_CODES.FORBIDDEN]: { status: 403, message: "Недостаточно прав" },
  [ERROR_CODES.NO_FIELDS_TO_UPDATE]: { status: 400, message: "Нет полей для обновления" }
};

function handleServiceError(e, res, next, forbiddenMessage) {
  const mapped = ERROR_MESSAGES[e.code];
  if (mapped) {
    const message =
      e.code === ERROR_CODES.FORBIDDEN && forbiddenMessage ? forbiddenMessage : mapped.message;
    return res.status(mapped.status).json({ error: message });
  }
  next(e);
}

function createReviewController({ reviewService }) {
  async function list(req, res, next) {
    try {
      const reviews = await reviewService.listAll();
      res.json(reviews);
    } catch (e) {
      next(e);
    }
  }

  async function listMine(req, res, next) {
    try {
      const reviews = await reviewService.listByUserId(req.user.id);
      res.json(reviews);
    } catch (e) {
      next(e);
    }
  }

  async function create(req, res, next) {
    try {
      const review = await reviewService.create({
        userId: req.user.id,
        gameId: Number(req.body.gameId),
        reviewText: req.body.reviewText,
        rating: Number(req.body.rating)
      });
      res.status(201).json(review);
    } catch (e) {
      handleServiceError(e, res, next);
    }
  }

  async function update(req, res, next) {
    try {
      const review = await reviewService.update({
        id: Number(req.params.id),
        userId: req.user.id,
        userRole: req.user.role,
        reviewText: req.body.reviewText,
        rating: req.body.rating !== undefined ? Number(req.body.rating) : undefined
      });
      res.json(review);
    } catch (e) {
      handleServiceError(e, res, next, "Нельзя редактировать чужой обзор");
    }
  }

  async function remove(req, res, next) {
    try {
      await reviewService.remove({
        id: Number(req.params.id),
        userId: req.user.id,
        userRole: req.user.role
      });
      res.status(204).send();
    } catch (e) {
      handleServiceError(e, res, next, "Нельзя удалить чужой обзор");
    }
  }

  return { list, listMine, create, update, remove };
}

module.exports = { createReviewController };
