;(function(){
  
var ScriptRenderer = function(p) {
  this.mustache = p.mustache;
  this.doc = p.doc;
  this.ddoc = p.ddoc;
  this.template = this.ddoc.edocs.script_renderer.template;
  this.js_functions = (this.doc.kvjs && this.doc.kvjs.js_functions) || {};
  this.js_functions.js_prototype = (this.js_functions.js_prototype) || {};
};

ScriptRenderer.prototype = {
  indent: function(v, space) {
    if (typeof v === "string") {
      return v.replace(/\n/g, "\n" + space);
    }
    return v;
  },
  render_js_prototype: function() {
    var lines = [], value, value_str;
    for (var key in this.doc.js_prototype) {
      value = this.doc.js_prototype[key];
      value = this.indent(this.js_functions.js_prototype[key] ? value : JSON.stringify(value, null, 2), "    ");
      lines.push("    " + JSON.stringify(key) + ': ' + value);
    }
    return "{\n" + lines.join(",\n") + "\n  }"
  },
  render: function() {
    return this.mustache.to_html(this.template, {
      "js_class": this.doc.kvjs.js_class,
      "js_constructor": this.indent(this.doc.js_constructor, "  "),
      "js_prototype": this.render_js_prototype(),
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