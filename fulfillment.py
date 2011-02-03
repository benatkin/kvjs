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

class Fulfillment(object):
  def __init__(self):
    self.conf = Config()
    self.db = self.conf.get_dbs()[0]
    
  def run(self):
    self.build_ddoc()
    self.build_js()
    
  def build_ddoc(self):
    if os.path.exists('kvjs.json'):
      with open('kvjs.json') as f:
        edocs = json.load(f)['edocs']
      if len(edocs) > 0:
        if not os.path.exists('./edocs'):
          os.mkdir('./edocs')
        for edoc, value in edocs.items():
          doc = self.db.open_doc(edoc)
          for field in ['_id', '_rev', 'couchapp']:
            del doc[field]
          with open('./edocs/%s.json' % edoc, 'w') as f:
            json.dump(doc, f, indent=2, sort_keys=True)
  
  def build_js(self):
    for doc in os.listdir('./_docs'):
      pth = './_docs/%s/kvjs.json' % doc
      if os.path.exists(pth):
        with open(pth) as f:
          kvjs = json.load(f)
        if kvjs.has_key('js_class'):
          resp = self.db.res.get('/_design/kvjs/_show/script/%s' % doc)
          self.write_if_changed('./_docs/%s/module.js' % doc, resp.body_string())
          resp.close()
  
  def write_if_changed(self, pth, txt):
    verb = 'Created'
    if os.path.exists(pth):
      verb = 'Updated'
      with open(pth) as f:
        if txt == f.read():
          return
    with open(pth, 'w') as f:
      f.write(txt)
    print '%s %s' % (verb, pth)

if __name__ == '__main__':
  fulfillment = Fulfillment()
  fulfillment.run()