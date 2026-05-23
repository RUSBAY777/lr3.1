class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findByEmail(email) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, role: true }
    });
  }

  create({ email, passwordHash }) {
    return this.prisma.user.create({
      data: { email, password: passwordHash },
      select: { id: true, email: true, role: true }
    });
  }

  count() {
    return this.prisma.user.count();
  }
}

module.exports = { UserRepository };
