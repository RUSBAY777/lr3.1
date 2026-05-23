const jwt = require("jsonwebtoken");

function extractToken(req) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");
  if (type === "Bearer" && token) {
    return token;
  }
  return null;
}

function createAuthMiddleware({ userRepository, jwtSecret }) {
  function authenticate(required = true) {
    return async (req, res, next) => {
      const token = extractToken(req);
      if (!token) {
        if (required) {
          return res.status(401).json({ error: "Требуется авторизация" });
        }
        req.user = null;
        return next();
      }

      try {
        const payload = jwt.verify(token, jwtSecret);
        const user = await userRepository.findById(payload.sub);
        if (!user) {
          return res.status(401).json({ error: "Пользователь не найден" });
        }
        req.user = user;
        return next();
      } catch {
        return res.status(401).json({ error: "Недействительный токен" });
      }
    };
  }

  function requireAdmin(req, res, next) {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Доступ только для администратора" });
    }
    return next();
  }

  return { authenticate, requireAdmin, extractToken };
}

module.exports = { createAuthMiddleware, extractToken };
