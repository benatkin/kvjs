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
3.  Run `python fulfillment.py` to update documents that are automatically processed or are generated from other documents. Then, push again. Some changes, especially changing the script renderer, require running `couchapp push` and `python fulfillment.py` more than once.

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

### action items

* add another template
* add config to design doc (root or env)
* add a page with a custom template
* add markdown doc
* make renderer use specified template and markdown body

### areas of focus

* ...
* get a proper build system going

I [avoid yammering about my uber-clever plans before I attempt them](http://sivers.org/zipit "one of my favorite articles"), but I have other todos. If you're curious, find me online. I may tell you some of them. :)

Annotations, Stamping, Items (draft)
------------------------------------

Some annotations, like those in Activity Streams format, could be built in. Others could be added later. Perhaps the ones added later would need to be specified in a metadata property for every document it's added to.

LICENSE
-------

Copyright (c) 2011 Ben Atkin. Licensed under the terms of the MIT license.