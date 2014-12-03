;(function() {

  function pageExpressMapper(params) {
    var app, res;

    // renderMethod param
    if (params.renderMethod && typeof params.renderMethod == 'function') {

      res = {
        render: params.renderMethod, // template, model
        redirect: function(route) {
          page.redirect(route);
        }
      };

      // overload page.js route prototype
      page.Route.prototype.middleware = function(fn) {
        var self = this;
        return function(ctx, next) {
          if (self.match(ctx.path, ctx.params)) return fn(ctx, res, next); // new
          next();
        };
      };
    }

    // customRouter param
    if (params.customRouter) {
      app = params.customRouter;
    }
    else {
      app = {
        route: function(route) {
          return {
            get: function(callback) {
              page(route, callback);
            },
            post: function(callback) {
              page(route, callback);
            },
            all: function(callback) {
              page(route, callback);
            }
          }
        }
      };
    }

    // expressAppName param
    if (params.expressAppName && typeof params.expressAppName == 'string') {
      window[params.expressAppName] = app;
    }
    else {
      window.app = app;
    }
  }
  
  // expose pageExpressMapper
  if ('undefined' == typeof module) {
    window.pageExpressMapper = pageExpressMapper;
  }
  else {
    module.exports = pageExpressMapper;
  }
})();