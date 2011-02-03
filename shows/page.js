function(doc) {
  // TODO: make it look at the doc & find the template
  var ddoc = this,
      mustache = require('edocs/kvjs_mustache/mustache'),
      template = require('edocs/kvjs_template/module');
  return new(template.Template)(this.edocs.kvjs_centerbox).render(doc);
}