#!/usr/bin/env python

print "Content-Type: text/html"
print # don't forget the extra newline	

import cgi
form = cgi.FieldStorage()

obtainedUsername = form['usernameValue'].value

import sqlite3
conn = sqlite3.connect('donors.db')
c = conn.cursor()

import json
data = {}
#data['mykey'] = 'This is working and the selecttypeValue is:' + obtainedType

counter = 0
for r in c.execute('SELECT user_donationsid, itemname, quantity, description FROM user_donation, item WHERE username = ? AND user_donation.itemid = item.itemid;',[obtainedUsername]):
  data[counter] = {"user_donationsid": r[0], "itemname": r[1], "quantity": r[2], "description": r[3]}
  counter += 1
#for r in c.execute('SELECT itemid, itemname FROM item WHERE itemtypeid=?;',[obtainedType]):
  # r[0] corresponds to itemid. r[1] corresponds to itemname.
  #data[r[0]] = r[1]

#data = {'name':'Kasun', 'address':'columbo','age': '29'}
#data['myName'] = 'Jaime'
#data['myLastName'] = 'Montoya'

#counter = 0
#for r in c.execute('SELECT typeid, typename FROM type;'):
  #counter += 1
  #data[counter] = r['typeid']
  # r[0] corresponds to typeid. r[1] corresponds to typename.
  #data[r[0]] = r[1]




print json.dumps(data)
