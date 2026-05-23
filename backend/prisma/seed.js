const path = require("path");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("demo123456", 12);
  const adminHash = await bcrypt.hash("admin123456", 12);

  const genres = await Promise.all([
    prisma.genre.upsert({
      where: { name: "RPG" },
      update: {},
      create: { name: "RPG" }
    }),
    prisma.genre.upsert({
      where: { name: "Action" },
      update: {},
      create: { name: "Action" }
    }),
    prisma.genre.upsert({
      where: { name: "Adventure" },
      update: {},
      create: { name: "Adventure" }
    })
  ]);

  const genreByName = Object.fromEntries(genres.map((g) => [g.name, g]));

  const admin = await prisma.user.upsert({
    where: { email: "admin@gameportal.local" },
    update: {},
    create: {
      email: "admin@gameportal.local",
      password: adminHash,
      role: "ADMIN"
    }
  });

  const user = await prisma.user.upsert({
    where: { email: "user@gameportal.local" },
    update: {},
    create: {
      email: "user@gameportal.local",
      password: passwordHash,
      role: "USER"
    }
  });

  const gamesData = [
    { title: "Cyberpunk 2077", releaseYear: 2020, genreName: "RPG" },
    { title: "The Witcher 3", releaseYear: 2015, genreName: "RPG" },
    { title: "Elden Ring", releaseYear: 2022, genreName: "Action" }
  ];

  const gameRecords = [];
  for (const g of gamesData) {
    const genre = genreByName[g.genreName];
    let game = await prisma.game.findFirst({ where: { title: g.title } });
    if (!game) {
      game = await prisma.game.create({
        data: {
          title: g.title,
          releaseYear: g.releaseYear,
          genreId: genre.id
        }
      });
    }
    gameRecords.push(game);
  }

  const [cp, witcher, elden] = gameRecords;

  const existingReviews = await prisma.review.count();
  if (existingReviews === 0) {
    await prisma.review.createMany({
      data: [
        {
          gameId: cp.id,
          userId: user.id,
          reviewText:
            "Атмосферный киберпанк с сильным сюжетом после патчей. Рекомендую фанатам жанра.",
          rating: 4
        },
        {
          gameId: witcher.id,
          userId: admin.id,
          reviewText: "Эталонный RPG с открытым миром и запоминающимися персонажами.",
          rating: 5
        },
        {
          gameId: elden.id,
          userId: user.id,
          reviewText: "Сложный но честный souls-like с огромным миром для исследования.",
          rating: 5
        }
      ]
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
