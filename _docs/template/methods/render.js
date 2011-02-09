function(doc) {
  var _ = this.ddoc.edoc_modules.underscore,
    mustache = this.ddoc.edoc_modules.mustache,
    ctx = {};
  
  if (typeof _ !== "function") _ = _.underscore;
  
  _.each(this.tdoc.vars, function(value, key) {
    ctx[key] = value.default || value.placeholder;
  }, this);
  _.each(this.tdoc.vars, function(value, key) {
    if (value.default_to) {
      ctx[key] = ctx[value.default_to];
    }
  }, this);
  
  var disp_doc = _.clone(doc);
  delete disp_doc['_revisions'];
  
  var extract_multiline = function(path, obj, multiline) {
    _.each(obj, function(val, key) {
      if (_.isString(val)) {
        if (val.indexOf("\n") !== -1) {
          multiline.push({"path": path.concat(key).join("."), "str": val});
          obj[key] = "$ref: " + path.concat(key).join(".");
        }
      } else if (! _.isEmpty(val)) {
        extract_multiline(path.concat(key), val, multiline);
      }
    }, this);
  }
  
  var path = [], multiline = [];
  extract_multiline(path, disp_doc, multiline);
  var json = JSON.stringify(disp_doc, null, 2);
  _.extend(ctx, {
    "title": doc.env.page.title,
    "json": json,
    "multiline": multiline
  });

  ctx.inline_styles = mustache.to_html(this.tdoc.styles, ctx);
  return mustache.to_html(this.tdoc.page, ctx);
}
