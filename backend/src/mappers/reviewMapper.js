function toPublicReviewDto(review) {
  return {
    id: review.id,
    rating: review.rating,
    reviewText: review.reviewText,
    createdAt: review.createdAt,
    game: {
      id: review.game.id,
      title: review.game.title,
      genre: review.game.genre.name
    },
    author: { id: review.user.id, email: review.user.email }
  };
}

function toOwnReviewDto(review) {
  return {
    id: review.id,
    rating: review.rating,
    reviewText: review.reviewText,
    createdAt: review.createdAt,
    game: {
      id: review.game.id,
      title: review.game.title,
      genre: review.game.genre.name
    }
  };
}

function toReviewDto(review) {
  if (review.user) {
    return toPublicReviewDto(review);
  }
  return toOwnReviewDto(review);
}

module.exports = { toPublicReviewDto, toOwnReviewDto, toReviewDto };
