function createAdminService({ userRepository, reviewRepository, gameRepository }) {
  async function getStats() {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const [userCount, reviewCount, gameCount, reviewsByGame, recentReviews] =
      await Promise.all([
        userRepository.count(),
        reviewRepository.count(),
        gameRepository.count(),
        reviewRepository.groupCountByGameId(),
        reviewRepository.findCreatedAtSince(sixMonthsAgo)
      ]);

    const gameIds = reviewsByGame.map((r) => r.gameId);
    const games = await gameRepository.findByIds(gameIds);
    const gameMap = new Map(games.map((g) => [g.id, g]));

    const genreCounts = new Map();
    for (const row of reviewsByGame) {
      const g = gameMap.get(row.gameId);
      if (!g) continue;
      const name = g.genre.name;
      genreCounts.set(name, (genreCounts.get(name) || 0) + row._count.id);
    }

    const reviewsByGenre = Array.from(genreCounts.entries()).map(([genre, count]) => ({
      genre,
      count
    }));

    const monthKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const monthBuckets = new Map();
    for (const r of recentReviews) {
      const key = monthKey(new Date(r.createdAt));
      monthBuckets.set(key, (monthBuckets.get(key) || 0) + 1);
    }
    const reviewsByMonth = Array.from(monthBuckets.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => ({ month, count }));

    return {
      totals: { users: userCount, reviews: reviewCount, games: gameCount },
      reviewsByGenre,
      reviewsByMonth
    };
  }

  return { getStats };
}

module.exports = { createAdminService };
