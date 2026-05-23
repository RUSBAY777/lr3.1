function toGameDto(game) {
  return {
    id: game.id,
    title: game.title,
    releaseYear: game.releaseYear,
    genre: { id: game.genre.id, name: game.genre.name }
  };
}

module.exports = { toGameDto };
