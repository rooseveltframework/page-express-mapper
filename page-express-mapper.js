const page = require('page')

function pageExpressMapper (params) {
  let router, res

  // renderMethod param
  if (params.renderMethod && typeof params.renderMethod === 'function') {
    res = {
      render: params.renderMethod, // template, model
      redirect: function (route) {
        page.redirect(route)
      }
    }

    // overload page.js route prototype
    page.Route.prototype.middleware = function (fn) {
      const self = this
      return function (ctx, next) {
        if (self.match(ctx.path, ctx.params)) return fn(ctx, res, next) // the method is the same except this line was modified
        next()
      }
    }
  }

  // customRouter param
  if (params.customRouter) {
    router = params.customRouter
  } else {
    router = {
      route: function (route) {
        return {
          get: function (callback) {
            page(route, callback)
          },
          post: function (callback) {
            page(route, callback)
          },
          all: function (callback) {
            page(route, callback)
          }
        }
      }
    }
  }

  return router
}

module.exports = pageExpressMapper
