function createAdminController({ adminService }) {
  async function stats(req, res, next) {
    try {
      const data = await adminService.getStats();
      res.json(data);
    } catch (e) {
      next(e);
    }
  }

  return { stats };
}

module.exports = { createAdminController };
