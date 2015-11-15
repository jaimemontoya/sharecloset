#modeled from https://github.com/pgbovine/csc210-fall-2015/blob/master/www/cgi-bin/lecture4-create-database.py

import sqlite3

#database called users.db
conn = sqlite3.connect('donors.db')
c = conn.cursor()

#varchar is a variable length character string
#making a table called 'users' inside donors.db
c.execute('create table users(username varchar(10) primary key, password varchar(20), zipcode int)')

#filling in db with users (maybe not do for real)
c.execute("insert into users values('stargirl27', 'elephant360!', 14627);")
c.execute("insert into users values('emichel2', 'password', 14086);")
c.execute("insert into users values('fish99', 'iheartbob6*', 14225);")
c.execute("insert into users values('bobram8', '92798@!', 14043);")


#table for items called 'items' inside donors.db
#note: no primary key because allowing multiple entries with the same username. 
#c.execute('create table items(username varchar(10), type varchar(30), subtype varchar(30), quantity int)')

#filling in with a few items
#c.execute("insert into items values('stargirl27','clothing','jeans',5);")
#c.execute("insert into items values('emichel2','clothing','coats',2);")
#c.execute("insert into items values('fish99','appliances','mixer',1);")
#c.execute("insert into items values('bobram8','clothing','shoes',3);")
#c.execute("insert into items values('stargirl27','toys','dress-up clothes',1);")
#c.execute("insert into items values('bobram8','furniture','couch',1);")

# Creating a table called 'item'.
c.execute('CREATE TABLE item(itemid integer primary key, itemname varchar(30), itemtypeid integer)')
# Populating the table 'item'
c.execute('INSERT INTO item(itemid, itemname, itemtypeid) VALUES (1, "Shirt", 1)')
c.execute('INSERT INTO item(itemid, itemname, itemtypeid) VALUES (2, "Pants", 1)')
c.execute('INSERT INTO item(itemid, itemname, itemtypeid) VALUES(3, "Shoes", 1)')
c.execute('INSERT INTO item(itemid, itemname, itemtypeid) VALUES (4, "Bed", 2)')
c.execute('INSERT INTO item(itemid, itemname, itemtypeid) VALUES (5, "Table", 2)')
c.execute('INSERT INTO item(itemid, itemname, itemtypeid) VALUES (6, "Desk", 2)')
c.execute('INSERT INTO item(itemid, itemname, itemtypeid) VALUES (7, "Board game", 3)')
c.execute('INSERT INTO item(itemid, itemname, itemtypeid) VALUES (8, "Video game", 3)')
c.execute('INSERT INTO item(itemid, itemname, itemtypeid) VALUES (9, "Doll", 3)')

# Creating a table called 'type'
c.execute('CREATE TABLE type(typeid integer primary key, typename varchar(20))')
# Populating the table 'type'
c.execute('INSERT INTO type(typeid, typename) VALUES (1, "Clothes")')
c.execute('INSERT INTO type(typeid, typename) VALUES (2, "Furniture")')
c.execute('INSERT INTO type(typeid, typename) VALUES (3, "Toys")')

# Creating a table called 'user_donation'
c.execute('CREATE TABLE user_donation(user_donationsid integer primary key autoincrement, username varchar(10), itemid integer, description varchar(100), quantity integer, timestamp not null default current_timestamp)')

# Creating a table called 'organization'
c.execute('CREATE TABLE organization(organizationid integer primary key, organizationname varchar(30), zipcode integer)')	

# Creating a table called 'item_organization'
c.execute('CREATE TABLE item_organization(organizationid integer primary key, organizationname varchar(30), zipcode integer)')

conn.commit()
conn.close()
