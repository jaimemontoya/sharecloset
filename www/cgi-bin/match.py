#!/usr/bin/env python
#!"C:\Python27\python.exe"
#looking at other files from this project

print "Content-Type: text/html"
print # don't forget the extra newline	


import cgi
form = cgi.FieldStorage()
obtainedUsername = form['usernameValue'].value

#obtainedUsername = 'stargirl27'

import sqlite3
conn = sqlite3.connect('donors.db')
c = conn.cursor()

#getting user's zipcode
userzip = 0
for r in c.execute('SELECT zipcode FROM users WHERE username = ?;',[obtainedUsername]):
	userzip = r[0] #or should it be r? 
	#when also doing by item: make sure id's of user's item and org's item match...but there are multiple for each so maybe nested loops? 

import json
data = {}

#getting organizations
counter = 0
#for r in c.execute('SELECT organizationname FROM organization WHERE zipcode = ?;',[userzip]):
for r in c.execute('SELECT organizationname FROM organization, item_organization, user_donation WHERE organizationid=item_organization.org_id AND organization.zipcode=? AND item_organization.org_itemid=user_donation.itemid  AND user_donation.username=?;',[userzip,obtainedUsername]):	
	data[counter] = {"org_name": r[0]} #or should it be r? 
	counter += 1

print json.dumps(data)
