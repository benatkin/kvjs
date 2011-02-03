;(function(){
  
var ScriptRenderer = function(p) {
  this.mustache = p.mustache;
  this.doc = p.doc;
  this.ddoc = p.ddoc;
  this.template = this.ddoc.edocs.kvjs_render_script.template;
  this.functions = (this.doc.kvjs && this.doc.kvjs.functions) || {};
  this.functions.proto = (this.functions.proto) || {};
}

ScriptRenderer.prototype = {
  indent: function(v, space) {
    if (typeof v === "string") {
      return v.replace(/\n/g, "\n" + space);
    }
    return v;
  },
  render_proto: function() {
    var lines = [], value;
    for (var key in this.doc.proto) {
      value = this.indent(this.functions[key] ? this.doc[key] : JSON.stringify(this.doc[key], null, 2), "    ");
      lines.push("    " + JSON.stringify(key) + ': ' + value);
    }
    return "{\n" + lines.join(",\n") + "\n  }"
  },
  render: function() {
    return this.mustache.to_html(this.template, {
      "js_class": this.doc.kvjs.js_class,
      "constructor_fn": this.indent(this.doc.constructor_fn, "  "),
      "proto": this.render_proto(),
      "doc_id": this.doc._id
    });
  }
};

if (typeof exports !== 'undefined') {
  exports.ScriptRenderer = ScriptRenderer;
} else {
  this.kvjs = (this.kvjs || {});
  this.kvjs.ScriptRenderer = ScriptRenderer;
}

})(this);