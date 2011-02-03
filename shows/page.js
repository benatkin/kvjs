function(doc) {
  // TODO: make it look at the doc & find the template
  var ddoc = this,
      mustache = require('edocs/kvjs_mustache/mustache');
  return mustache.to_html('<h1>{{ greeting }}</h1>', {greeting: "Hello, mustache!"});
}