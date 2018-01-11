from Database import Database
import pprint
import json

# -----------------
# User
# -----------------
class User:

    def __init__(self):
        
        self.id = ''
        self.name = ''
        self.lastname = ''
        self.mail = ''
        self.password = ''
        self.profile = ''
        self.status = ''
        self.data = ''
        self.db = Database()

    def _prepareData(self):
        data = json.loads(self.data)
        if 'name' in data:         
            self.name = data["name"]
        if 'lastname' in data: 
            self.lastname = data["lastname"]
        if 'mail' in data: 
            self.mail = data["mail"]
        if 'password' in data: 
            self.password = data["password"]
        if 'profile' in data: 
            self.profile = data["profile"]
        if 'status' in data:
            self.status = data["status"]
        else:
            self.status = 1

    def get(self, id):
        query = """ select name, lastname, mail, pass, profile, status from user where id = ?; """
        result = self.db.query_db(query, [id])
        return  result

    def getAll(self):
        query = """ select name, lastname, mail, pass, profile, status from user; """
        result = self.db.query_db(query, [])
        return  result

    def save(self):
        query = """insert into user (name, lastname, mail, pass, profile, status) values (?,?,?,?,?,?)"""
        self._prepareData()
        result = self.db.query_db(query, [self.name, self.lastname, self.mail, self.password, self.profile, self.status])
        return 200 

    def delete(self, id):
        query = """ update user set status=0 where id = ?; """
        result = self.db.query_db(query, [id])
        return 200 

    def update(self,id):
        query = """ update user set name=?, lastname=?, mail=?, pass=?, profile=?, status=? where id = ?; """
        self._prepareData()
        result = self.db.query_db(query, [self.name, self.lastname, self.mail, self.password, self.profile, self.status,id]) 
        return 200

