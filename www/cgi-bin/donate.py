#!/usr/bin/env python
# Print the http header
# Design from https://github.com/pgbovine/csc210-fall-2015/blob/master/www/cgi-bin/lecture4.py

# Code to execute after users click the "Donate item" button.
print "Content-Type: text/html"
print # don't forget the extra newline

import cgi
form = cgi.FieldStorage()
usernameVal = form['usernameValue'].value
itemidVal = form['itemidValue'].value
descriptionVal = form['descriptionValue'].value
quantityVal = form['quantityValue'].value

import sqlite3
conn = sqlite3.connect('donors.db')
c = conn.cursor()

import json

data = {}
c.execute('INSERT INTO user_donation (username, itemid, description, quantity) VALUES (?, ?, ?, ?)', (usernameVal, itemidVal, descriptionVal, quantityVal))
data = "Donation completed!"

conn.commit()
print json.dumps(data)
