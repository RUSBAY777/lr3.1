class GameRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findAllWithGenreOrderByTitle() {
    return this.prisma.game.findMany({
      orderBy: { title: "asc" },
      include: { genre: true }
    });
  }

  findById(id) {
    return this.prisma.game.findUnique({ where: { id } });
  }

  findByIds(ids) {
    if (!ids.length) return Promise.resolve([]);
    return this.prisma.game.findMany({
      where: { id: { in: ids } },
      include: { genre: true }
    });
  }

  count() {
    return this.prisma.game.count();
  }
}

module.exports = { GameRepository };
