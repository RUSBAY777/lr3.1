const { toGameDto } = require("../mappers/gameMapper");

function createGameService({ gameRepository }) {
  async function listGames() {
    const games = await gameRepository.findAllWithGenreOrderByTitle();
    return games.map(toGameDto);
  }

  return { listGames };
}

module.exports = { createGameService };
