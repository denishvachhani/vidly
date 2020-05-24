module.exports = function (handler) {
      try {
        await handler(req, res)
      } catch (ex) {
        next(ex);
      }
    }
  }