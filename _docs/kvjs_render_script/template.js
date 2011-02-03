;(function() {
  var {{{ js_class }}} = {{{ constructor_fn }}};
  
  if (exports) {
    exports.{{{ js_class }}} = {{{ js_class }}};
  } else {
    this.{{{ doc_id }}} = {};
    this.{{{ doc_id }}}.{{{ js_class }}} = {{{ js_class }}};
  }
  
  {{{ js_class }}}.prototype = {{{ prototype }}};
})(this);