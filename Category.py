from Database import Database
import pprint
import json


# -----------------
# Category
# -----------------
class Category:

    def __init__(self):
        
        self.id = ''
        self.category = ''
        self.status = ''
        self.data = ''
        self.db = Database()


    def _prepareData(self):
        data = json.loads(self.data)
        if 'category' in data:        
            self.category = data["category"]
        if 'status' in data:
            self.status = data["status"]
        else:
            self.status = 1

    def get(self, id):
        query = """ select category from category where id = ? and status=1; """
        result = self.db.query_db2(query, [id]) 
        return result

    def getAll(self):
        query = """ select category from category where status=1; """
        result = self.db.query_db(query, []) 
        return result

    def save(self):
        query = """insert into category (category, status) values (?,?)"""
        self._prepareData()
        result = self.db.query_db(query, [self.category, self.status]) 
        return 200 

    def delete(self, id):
        query = """ update category set status=0 where id = ?; """
        result = self.db.query_db(query, [id])
        return 200 

    def update(self,id):
        query = """ update category set category=?, status=? where id = ?; """
        self._prepareData()
        result = self.db.query_db(query, [self.category,self.status,id]) 
        return 200 

        
