class ReviewRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findAllWithGameAndUser() {
    return this.prisma.review.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        game: { include: { genre: true } },
        user: { select: { id: true, email: true } }
      }
    });
  }

  findByUserId(userId) {
    return this.prisma.review.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { game: { include: { genre: true } } }
    });
  }

  findById(id) {
    return this.prisma.review.findUnique({ where: { id } });
  }

  create({ gameId, userId, reviewText, rating }) {
    return this.prisma.review.create({
      data: { gameId, userId, reviewText, rating },
      include: { game: { include: { genre: true } } }
    });
  }

  update(id, data) {
    return this.prisma.review.update({
      where: { id },
      data,
      include: { game: { include: { genre: true } } }
    });
  }

  delete(id) {
    return this.prisma.review.delete({ where: { id } });
  }

  count() {
    return this.prisma.review.count();
  }

  groupCountByGameId() {
    return this.prisma.review.groupBy({
      by: ["gameId"],
      _count: { id: true }
    });
  }

  findCreatedAtSince(since) {
    return this.prisma.review.findMany({
      where: { createdAt: { gte: since } },
      select: { createdAt: true }
    });
  }
}

module.exports = { ReviewRepository };
