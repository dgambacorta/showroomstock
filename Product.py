from Database import Database
import pprint
import json
from Error import Error

# -----------------
# Product
# -----------------
class Product:

    def __init__(self):
        
        self.id = ''
        self.category = ''
        self.name = ''
        self.stock = ''
        self.input_date = ''
        self.buy_price = ''
        self.sale_price = ''
        self.photo = ''
        self.status = ''
        self.data = ''
        self.limit = ''
        self.db = Database()

    def _prepareData(self):
        data = json.loads(self.data) 
        if 'category' in data:       
            self.category = data["category"]
        if 'name' in data:  
            self.name = data["name"]
        if 'stock' in data:  
            self.stock = data["stock"]
        if 'input_date' in data:  
            self.input_date = data["input_date"]
        if 'buy_price' in data:  
            self.buy_price = data["buy_price"]
        if 'sale_price' in data:  
            self.sale_price = data["sale_price"]
        if 'photo' in data:  
            self.photo = data["photo"]
        if 'stock_limit' in data:  
            self.stock_limit = data["stock_limit"]
        if 'status' in data:
            self.status = data["status"]
        else:
            self.status = 1

    def get(self, id):
        query = """ select category, name, stock, input_date, buy_price, sale_price, photo, stock_limit from product where id = ?; """
        result = self.db.query_db(query, [id])
        return result

    def getAll(self):
        query = """ select category, name, stock, input_date, buy_price, sale_price, photo, stock_limit from product """
        result = self.db.query_db(query, [])
        return result  

    def save(self):
        query = """insert into product (category, name, stock, input_date, buy_price, sale_price, photo, status, stock_limit) values (?,?,?,?,?,?,?,?,?)"""
        self._prepareData()
        result = self.db.query_db(query, [self.category, self.name, self.stock, self.input_date, self.buy_price, self.sale_price, self.photo,self.status, self.stock_limit]) 
        return 200

    def delete(self, id):
        query = """ update product set status=0 where id = ?; """
        result = self.db.query_db(query, [id])
        return 200

    def update(self,id):
        query = """ update product set category=?, name=?, stock=?, input_date=?, buy_price=?, sale_price=?, photo=?, status=?, stock_limit=? where id = ?; """
        self._prepareData()
        result = self.db.query_db(query, [self.category, self.name, self.stock, self.input_date, self.buy_price, self.sale_price, self.photo, self.status, self.stock_limit,id])
        return 200

    def count(self):        
        query = """ select count(*) from product where status=1; """
        result = self.db.query_db2(query, [])
        return result  
        
    def lowStock(self):
        query = """ select count(*) from product where stock <= stock_limit; """
        result = self.db.query_db2(query, [])
        return result
