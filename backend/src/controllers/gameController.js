function createGameController({ gameService }) {
  async function list(req, res, next) {
    try {
      const games = await gameService.listGames();
      res.json(games);
    } catch (e) {
      next(e);
    }
  }

  return { list };
}

module.exports = { createGameController };
