function(doc) {
  // TODO: make it look at the doc & find the template
  var ddoc = this,
      mustache = require('edocs/mustache/js_module'),
      template = require('edocs/template/js_module');
  return new(template.Template)(this.edocs.centerbox).render(doc);
}