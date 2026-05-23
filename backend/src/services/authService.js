const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ERROR_CODES, createAppError } = require("../constants/errorCodes");

const SALT_ROUNDS = 12;

function createAuthService({ userRepository, jwtSecret }) {
  function signToken(user) {
    return jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: "7d" }
    );
  }

  async function register(email, password) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw createAppError(ERROR_CODES.EMAIL_TAKEN);
    }
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await userRepository.create({ email, passwordHash: hash });
    return { user, token: signToken(user) };
  }

  async function login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw createAppError(ERROR_CODES.INVALID_CREDENTIALS);
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      throw createAppError(ERROR_CODES.INVALID_CREDENTIALS);
    }
    const publicUser = { id: user.id, email: user.email, role: user.role };
    return { user: publicUser, token: signToken(publicUser) };
  }

  return { register, login, signToken };
}

module.exports = { createAuthService };
