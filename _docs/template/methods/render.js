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
    
    _.extend(ctx, {
      "title": doc.env.page.title
    });
  ctx.inline_styles = mustache.to_html(this.tdoc.styles + "", ctx);
  return mustache.to_html(this.tdoc.page + "", ctx);
}