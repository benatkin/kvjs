kvjs
====

**NOTE**: This project includes some custom python scripting for generating parts of the design document from regular documents within the `_docs` directory. This readme includes special instructions for making sure this happens.

Getting Started
---------------

1.  Install this [couchapp](http://couchapp.org/)
    a.  Get a couch from [CouchOne](http://couchone.com/) or [Cloudant](http://cloudant.com/) or [set up CouchDB on your desktop or server](http://couchone.com/get)
    b.  Install `couchapp` by running `pip install couchapp` or `easy_install couchapp`
    c.  Clone this repo
    d.  Create a .couchapprc in the root directory of this repo
    e.  run `couchapp push`
2.  Edit the documents (the design document and the documents under \_docs) and run `couchapp push` to update them.
3.  Runn `python fulfillment.py` to update documents that are automatically processed or are generated from other documents. Then, push again. Some changes, especially changing the script renderer, require running `couchapp push` and `python fulfillment.py` more than once.

Sample `.couchapprc`:
    {
      "env": {
        "default": {
          "db": "https://bat:cleverpassword@bat.cloudant.com/kvjs"
        }
      }
    }

TODO
----

* Include underscore.js
* Make `page` show function use template
* Make page show function grab the title from `doc.kvjs.title` and spit out the json in a pre for now
* add _rewrite
* deploy to Cloudant at kvjs.com
* ...
* get a proper build system going

I [avoid yammering about my uber-clever plans before I attempt them](http://sivers.org/zipit), but I have other todos. If you're curious, find me online. I may tell you some of them. :)

LICENSE
-------

Copyright (c) 2011 Ben Atkin. Licensed under the terms of the MIT license.