# third
import pprint
import sqlite3
from flask import g
import config

DATABASE = config.DB_PATH


class Database:

    #----------
    # __init__
    #----------
    def __init__(self):

        # self.response = {}
        self.response = {}


    #----------
    # get_db()
    #----------
    def get_db(self):

        db = getattr(g, '_database', None)
        if db is None:
            db = g._database = sqlite3.connect(DATABASE)
        return db    


    #----------
    # query_db()
    #----------
    def query_db(self, query, args=(), one=False):

        cur = self.get_db().execute(query, args)
        self.get_db().commit()
        rv = cur.fetchall()
        cur.close()
        return (rv[0] if rv else None) if one else rv
        # return rv

     #----------
    # query_db()
    #----------
    def query_db2(self, query, args=(), one=False):

        cur = self.get_db().execute(query, args)
        self.get_db().commit()
        rv = cur.fetchall()
        result = rv[0][0]
        cur.close()
        return result

    def init(self):
        query = """ CREATE TABLE IF NOT EXISTS  category     (
        id   INTEGER PRIMARY KEY AUTOINCREMENT,
        category     text NOT NULL,
        status   int NOT NULL
    );

    CREATE TABLE IF NOT EXISTS  client  (
        id   INTEGER PRIMARY KEY AUTOINCREMENT,
        name   text NOT NULL,
        mail     text NOT NULL,
        cellphone     text NOT NULL,
        birthday   date NOT NULL,
        dni  text NOT NULL,
            status   int NOT NULL
      );

      CREATE TABLE IF NOT EXISTS    product  (
        id   INTEGER PRIMARY KEY AUTOINCREMENT,
        category     int NOT NULL,
        name     text NOT NULL,
        stock    int NOT NULL,
        stock_limit    int NOT NULL,
        input_date   date NOT NULL,
        buy_price    float NOT NULL,
        sale_price   float NOT NULL,
        photo    text NOT NULL,
            status   int NOT NULL
    );

    CREATE TABLE IF NOT EXISTS  user     (
        id   INTEGER PRIMARY KEY AUTOINCREMENT,
        name     text NOT NULL,
        lastname     text NOT NULL,
        mail     text NOT NULL,
        pass     text NOT NULL,
        profile  int NOT NULL,
        status   int NOT NULL
    );

    CREATE TABLE IF NOT EXISTS  sale    (
        id   INTEGER PRIMARY KEY AUTOINCREMENT,
        productId    int NOT NULL,
        quantity    int NOT NULL,
        sale_date date not null,
        total float not null,
        status   int NOT NULL
    );
        """
        cur = self.get_db().executescript(query)
        self.get_db().commit()