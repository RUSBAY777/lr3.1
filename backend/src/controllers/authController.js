const { ERROR_CODES } = require("../constants/errorCodes");

function createAuthController({ authService }) {
  async function register(req, res, next) {
    try {
      const { user, token } = await authService.register(req.body.email, req.body.password);
      res.status(201).json({ user, token });
    } catch (e) {
      if (e.code === ERROR_CODES.EMAIL_TAKEN) {
        return res.status(409).json({ error: "Этот email уже зарегистрирован" });
      }
      next(e);
    }
  }

  async function login(req, res, next) {
    try {
      const { user, token } = await authService.login(req.body.email, req.body.password);
      res.json({ user, token });
    } catch (e) {
      if (e.code === ERROR_CODES.INVALID_CREDENTIALS) {
        return res.status(401).json({ error: "Неверный email или пароль" });
      }
      next(e);
    }
  }

  function me(req, res) {
    res.json({ user: req.user });
  }

  return { register, login, me };
}

module.exports = { createAuthController };
