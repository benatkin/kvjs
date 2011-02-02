kvjs
====

**NOTE**: This project includes some custom python scripting for generating parts of the design document from regular documents within the `_docs` directory. This readme includes special instructions for making sure this happens.

Getting Started
---------------

1.   [Get a couch.](http://couchone.com/get)
2.   Install the required python tools:
     *    `pip install couchapp`
     *    `pip install mustache`
3.   set up your [.couchapprc](http://couchapp.org/)
4.   run `PYTHONPATH=. couchapp push`
5.   edit the files in `_docs`
6.   run `PYTHONPATH=. couchapp push` again
7.   repeat

The directory for this project needs to be included in your `PYTHONPATH` in order to run a hook in `fulfillment.py`. It's defined in `couchapp.json`.