page-express-mapper
===

[![npm](https://img.shields.io/npm/v/page-express-validator.svg)](https://www.npmjs.com/package/page-express-validator)

A plugin for [page.js](http://visionmedia.github.io/page.js/) which aims to provide a direct imitation of the [Express](http://expressjs.com/) API so you can write isomorphic/universal router code that can be shared on the client and the server with your Express application without modification.

With this plugin you should be able to write isomorphic/universal JavaScript apps that maximize code reuse on the client and the server, so long as you run Express on the server, page.js on the client, and use a JS-based templating system that can run on the client and server.

This module was built and is maintained by the [Roosevelt web framework](https://github.com/rooseveltframework/roosevelt) [team](https://github.com/orgs/rooseveltframework/people), but it can be used independently of Roosevelt as well.

Usage
===

- Add `page-express-validator` to your npm dependencies.
- Load `page-express-mapper.js` into your frontend JS bundle along with `page.js`.
- Then initialize it by calling `pageExpressMapper()` *before* defining any routes.

Params
===

`pageExpressMapper()` accepts the following params:

function renderMethod(template, model)
---

*Required*

This is designed to mimic the [Express render method](http://expressjs.com/api.html#app.render). Load your own templating system elsewhere in your app and call its render method here as a function of your own design.

As with Express, the `template` argument should refer to a named template and the `model` argument should be a JSON string or JavaScript object.

For example, using the [Teddy](https://github.com/rooseveltframework/teddy) templating engine:

```js
pageExpressMapper({
  renderMethod: function(template, model) {
    var mainElement = document.getElementsByTagName('main')[0];
    mainElement.innerHTML = teddy.render(template, model);
  }
});
```

This should work with any templating engine which supports both client-side rendering and Express on the server-side.

object customRouter
---

*Optional*

By default this plugin matches the Express 4 API, but if you want to remap it, supply a `customRouter`. For example, to match the Express 3 API, you could do this:

```js
pageExpressMapper({
  renderMethod: someRenderMethod,
  customRouter: {
    get: function(route, callback) {
      page(route, callback);
    },
    post: function(route, callback) {
      page(route, callback);
    },
    all: function(route, callback) {
      page(route, callback);
    }
  }
});
```

Default: `undefined`

Tying it all together
===

Assuming your server code begins as:

```js
const app = express()
```

And your client code begins as something like:

```js
pageExpressMapper({
  renderMethod: function(template, model) {
    /* render a template using
     * your favorite templating
     * system here
     */
  }
});
```

You can then write identical routes for both sides, such as:

```js
app.route('/someRoute').get(function(req, res) {
  res.render('someTemplate', {some: 'model'});
});
```

Sample app
===

- Clone this repo.
- Install dependencies.
- `cd` to your clone.
- `npm run sample-app`.
- Open the browser dev tools and examine the console logs when you click the links in the sample app to see evidence of it working.
