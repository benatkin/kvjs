# -*- coding: utf-8 -*-

# TODO: make this a standalone script
# TODO: implement filters
# TODO: implement fulfillment for non-design docs & dependency resolution

import logging
import os
import json

from couchapp.config import Config
from couchapp.localdoc import document

logger = logging.getLogger(__name__)

def doc_path(path, doc_id=None):
  if doc_id is None:
    return path
  else:
    return "./docs/%s/%s" % (doc_id, path)

class Fulfillment(object):
  def __init__(self):
    self.conf = Config()
    self.db = self.conf.get_dbs()[0]
    
  def run(self):
    self.build_edocs()
    self.build_js()
  
  def build_edocs(self, doc_id=None):
    if os.path.exists('kvjs.json'):
      with open('kvjs.json') as f:
        edocs = json.load(f)['edocs']
      if len(edocs) > 0:
        if not os.path.exists(doc_path('edocs', doc_id)):
          os.mkdir(doc_path('edocs', doc_id))
        for edoc_id, edoc_opts in edocs.items():
          edoc = self.db.open_doc(edoc_id)
          for field in ['_id', '_rev']:
            del edoc[field]
          self.write_if_changed(doc_path('edocs/%s.json' % edoc_id, doc_id), edoc)
  
  def build_js(self, doc_id=None):
    for doc_id in os.listdir('./_docs'):
      pth = doc_path('kvjs.json', doc_id)
      if os.path.exists(pth):
        with open(pth) as f:
          kvjs = json.load(f)
        if kvjs.has_key('js_class') and not kvjs.get('render_module', True):
          resp = self.db.res.get('/_design/kvjs/_show/script/%s' % doc_id)
          self.write_if_changed(doc_path('module.js', doc_id), resp.body_string())
          resp.close()
  
  def write_if_changed(self, pth, val):
    verb = 'Created'
    if os.path.exists(pth):
      verb = 'Updated'
      with open(pth) as f:
        if type(val) == str:
          if val == f.read():
            return False
        else:
          if val == json.load(f):
            return False
    with open(pth, 'w') as f:
      if type(val) == str:
        f.write(txt)
      else:
        json.dump(val, f, indent=2, sort_keys=True)
    print '%s %s' % (verb, pth)

if __name__ == '__main__':
  fulfillment = Fulfillment()
  fulfillment.run()