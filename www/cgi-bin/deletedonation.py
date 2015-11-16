#!/usr/bin/env python
# Print the http header
# Design from https://github.com/pgbovine/csc210-fall-2015/blob/master/www/cgi-bin/lecture4.py

# Code to execute after users click the button to delete a donation.
print "Content-Type: text/html"
print # don't forget the extra newline

import cgi
form = cgi.FieldStorage()
user_donationsidVal = form['user_donationsidValue'].value

import sqlite3
conn = sqlite3.connect('donors.db')
c = conn.cursor()

import json

data = {}



#c.execute('INSERT INTO user_donation (username, itemid, description, quantity) VALUES (?, ?, ?, ?)', ('jaimemontoya', itemidVal, descriptionVal, quantityVal))
c.execute('DELETE FROM user_donation WHERE user_donationsid = ?', [user_donationsidVal])
data = "Donation deleted successfully."
#data = user_donationsidVal

conn.commit()
print json.dumps(data)
