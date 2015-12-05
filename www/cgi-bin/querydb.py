#!/usr/bin/env python
#!"C:\Python27\python.exe"
#lecture 4 code
import sqlite3

# open an existing database file named 'people.db'
conn = sqlite3.connect('donors.db')
c = conn.cursor()

# run these SQL queries and print out their results to the terminal:
for s in c.execute('select * from users;'):
	print s
print

#all creating tables for reference
#c.execute('create table users(username varchar(10) primary key, password varchar(20), zipcode int)')
#c.execute('CREATE TABLE item(itemid integer primary key, itemname varchar(30), itemtypeid integer)')
#c.execute('CREATE TABLE type(typeid integer primary key, typename varchar(20))')
#c.execute('CREATE TABLE user_donation(user_donationsid integer primary key autoincrement, username varchar(10), itemid integer, description varchar(100), quantity integer, timestamp not null default current_timestamp)')
#c.execute('CREATE TABLE organization(organizationid integer primary key, organizationname varchar(30), zipcode integer)')
#c.execute('CREATE TABLE item_organization(gen_id integer primary key autoincrement, org_id integer, org_itemid integer)')


for r in c.execute('select * from user_donation;'):
	print r
print


print "starting..."

obtainedOrgId=1
obtainedUsername = "cow"

for r in c.execute('select * from organizationname;'):
	print r
print

for r in c.execute('SELECT	itemname FROM item,user_donation,item_organization WHERE user_donation.username=? AND item_organization.org_id=? \
	AND user_donation.itemid=item_organization.org_itemid AND item.itemid=user_donation.itemid;',[obtainedUsername,obtainedOrgId]): 
	print r[0]

#print "About to start 2nd for loop"

#x = 'stargirl27'
#y = 'elephant360!'

#for r in c.execute('select * from organization '):
#	print r

print "at end!"

conn.close()