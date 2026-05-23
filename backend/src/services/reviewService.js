const { ERROR_CODES, createAppError } = require("../constants/errorCodes");
const { toPublicReviewDto, toOwnReviewDto } = require("../mappers/reviewMapper");

function createReviewService({ reviewRepository, gameRepository }) {
  async function listAll() {
    const reviews = await reviewRepository.findAllWithGameAndUser();
    return reviews.map(toPublicReviewDto);
  }

  async function listByUserId(userId) {
    const reviews = await reviewRepository.findByUserId(userId);
    return reviews.map(toOwnReviewDto);
  }

  async function create({ userId, gameId, reviewText, rating }) {
    const game = await gameRepository.findById(gameId);
    if (!game) {
      throw createAppError(ERROR_CODES.GAME_NOT_FOUND);
    }
    const review = await reviewRepository.create({
      gameId,
      userId,
      reviewText,
      rating
    });
    return toOwnReviewDto(review);
  }

  async function update({ id, userId, userRole, reviewText, rating }) {
    const review = await reviewRepository.findById(id);
    if (!review) {
      throw createAppError(ERROR_CODES.REVIEW_NOT_FOUND);
    }
    if (review.userId !== userId && userRole !== "ADMIN") {
      throw createAppError(ERROR_CODES.FORBIDDEN);
    }
    const data = {};
    if (reviewText !== undefined) data.reviewText = reviewText;
    if (rating !== undefined) data.rating = rating;
    if (Object.keys(data).length === 0) {
      throw createAppError(ERROR_CODES.NO_FIELDS_TO_UPDATE);
    }
    const updated = await reviewRepository.update(id, data);
    return toOwnReviewDto(updated);
  }

  async function remove({ id, userId, userRole }) {
    const review = await reviewRepository.findById(id);
    if (!review) {
      throw createAppError(ERROR_CODES.REVIEW_NOT_FOUND);
    }
    if (review.userId !== userId && userRole !== "ADMIN") {
      throw createAppError(ERROR_CODES.FORBIDDEN);
    }
    await reviewRepository.delete(id);
  }

  return { listAll, listByUserId, create, update, remove };
}

module.exports = { createReviewService };
