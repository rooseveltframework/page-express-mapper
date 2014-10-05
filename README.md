page.js-express-mapper.js [![Gittip](http://img.shields.io/gittip/kethinov.png)](https://www.gittip.com/kethinov/)
===

A plugin for [page.js](http://visionmedia.github.io/page.js/) which aims to provide a direct imitation of the [Express](http://expressjs.com/) API so you can share controller code on the client and the server with your Express application without modification.

With this plugin you should be able to write apps that share the same models, views, and controllers on the client and the server, so long as you run Express on the server, page.js on the client, and use a JS templating system that can run on the client and server.

Installation
===

Either download the file from here or use [bower](http://bower.io/):

```
bower install page.js-express-mapper.js
```

Initialization
===

Load `page.js-express-mapper.js` after loading `page.js`.

Then initialize it by calling `pageExpressMapper()` *before* defining any routes.

Params
===

`pageExpressMapper()` accepts the following params:

function renderMethod(template, model)
---

*Required*

This is designed to mimic the [Express render method](http://expressjs.com/api.html#app.render). Load your own templating system elsewhere in your app and call its render method here a function of your own design.

As with Express, the `template` argument should refer to a named template and the `model` argument should be a JSON string or JavaScript object.

For example, using the [Teddy](https://github.com/kethinov/teddy) templating engine:

```js
pageExpressMapper({
  renderMethod: function(template, model) {
    var mainElement = document.getElementsByTagName('main')[0];
    mainElement.innerHTML = teddy.render(template, model);
  }
});
```

This should work with any templating engine which supports both client-side rendering and Express on the server-side.

string expressAppName
---

*Optional*

In the Express API, routes are defined as [children of a named app object](http://expressjs.com/api.html#app.route).

As such, to directly imitate Express client-side, this plugin defines a global variable named for your Express app just as is done in Node.js.

Default: `'app'`

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
var app = express();
```

And your client code begins as something like:

```js
pageExpressMapper({
  renderMethod: function(template, model) {
    /* render a template using
     * your favorite templating
     * system here
     */
  },
  expressAppName: 'app'
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

Check out `sampleApp.html` for simple demonstration of how this works.

To run it, follow these steps:

Clone this repo:

```
git clone https://github.com/kethinov/page.js-express-mapper.js.git
```

Install page.js:

```
cd page.js-express-mapper.js
bower install page.js
```

Start a simple web server (example assumes you have python installed, but you could use any web server):

```
python -m SimpleHTTPServer
```

Then open [http://localhost:8000/sampleApp.html](http://localhost:8000/) in your browser.

License
===

All original code in this library is licensed under the [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0)</a>. Commercial and noncommercial use is permitted with attribution.