;(function() {
  var {{{ js_class }}} = {{{ js_constructor }}};
  
  if (exports) {
    exports.{{{ js_class }}} = {{{ js_class }}};
  } else {
    this.{{{ doc_id }}} = {};
    this.{{{ doc_id }}}.{{{ js_class }}} = {{{ js_class }}};
  }
  
  {{{ js_class }}}.prototype = {{{ js_prototype }}};
})(this);