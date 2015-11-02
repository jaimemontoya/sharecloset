#!/usr/bin/env python
# print the http header
# print "Content-Type: text/html"
# print # don't forget the extra newline

# import cgi
# form = cgi.FieldStorage()
# usernameValue = form['usernameValue'].value
# import json
# data = {}
# data['myUsername'] = usernameValue
# print json.dumps(data)
import cgitb
cgitb.enable()


import cgi
form = cgi.FieldStorage()

user_name = form['user_name'].value
user_password = form['user_password'].value
user_zip = form['user_zip'].value

# insert new user data into the database
import sqlite3

conn = sqlite3.connect('donors.db')
c = conn.cursor()

c.execute('insert into users values (?, ?, ?)', (user_name, user_password, user_zip))
conn.commit()
conn.close()
