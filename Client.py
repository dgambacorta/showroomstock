from Database import Database
import pprint
import json
from Error import Error


class Client:

    def __init__(self):
        
        self.id = ''
        self.name = ''
        self.mail = ''
        self.cellphone = ''
        self.birthday = ''
        self.dni = ''
        self.status=''
        self.data = ''
        self.db = Database()


    def _prepareData(self):
        data = json.loads(self.data)
        if 'name' in data:        
            self.name = data["name"]
        if 'mail' in data:
            self.mail = data["mail"]
        if 'cellphone' in data:
            self.cellphone = data["cellphone"]
        if 'birthday' in data:
            self.birthday = data["birthday"]
        if 'dni' in data:
            self.dni = data["dni"]
        if 'status' in data:
            self.status = data["status"]
        else:
            self.status = 1


    def get(self, id):
        query = """ select name, mail, cellphone, birthday, dni from client where id = ?; """
        result = self.db.query_db(query, [id])
        return result

    def _findByDni(self):        
        query = """ select count(*) from client where dni = ?; """
        result = self.db.query_db2(query, [self.dni])
        print (result)
        return result  

    def getAll(self):
        query = """ select name, mail, cellphone, birthday, dni from client; """
        result = self.db.query_db(query, [])
        return result 

    def save(self):
        query = """insert into client (name, mail, cellphone, birthday, dni, status) values (?,?,?,?,?,?)"""
        self._prepareData()
        if self._findByDni() == 0:
            result = self.db.query_db(query, [self.name, self.mail, self.cellphone, self.birthday, self.dni, self.status])
            return 200
        else:
            return Error().getError(701)

    def delete(self, id):
        query = """ update client set status=0 where id = ?; """
        result = self.db.query_db(query, [id]) 
        return 200

    def update(self,id):
        query = """ update client set name=?, mail=?, cellphone=?, birthday=?, dni=?, status=? where id = ?; """
        self._prepareData()
        result = self.db.query_db(query, [self.name, self.mail, self.cellphone, self.birthday, self.dni, self.status, id]) 
        return 200
        
