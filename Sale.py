from Database import Database
import pprint
import json
import datetime

# -----------------
# Sale
# -----------------
class Sale:

    def __init__(self):
        
        self.id = ''
        self.productId = ''
        self.quantity = ''
        self.sale_date = ''
        self.total = ''
        self.status = ''
        self.data = ''
        self.db = Database()

    def _prepareData(self):
        data = json.loads(self.data)
        if 'productId' in data:         
            self.productId = data["productId"]
        if 'quantity' in data: 
            self.quantity = data["quantity"]
        if 'sale_date' in data:
            self.sale_date = "%s/%s/%s" % (i.day, i.month, i.year)
        if 'total' in data: 
            self.total =data["total"]
        if 'status' in data:
            self.status = data["status"]
        else:
            self.status = 1     


    def get(self, id):
        query = """ select productId, quantity, sale_date, total from sale where id = ?; """
        result = self.db.query_db(query, [id]) 
        return result

    def getAll(self):
        query = """ select productId, quantity, sale_date, total from sale; """
        result = self.db.query_db(query, []) 
        return result

    def save(self):
        query = """ insert into sale (productId, quantity, sale_date, total, status) values (?,?,?,?,?); """
        self._prepareData()
        result = self.db.query_db(query, [self.productId, self.quantity, self.sale_date, self.total,self.status]) 
        return 200

    def delete(self, id):
        query = """ update sale set status=0 where id = ?; """
        result = self.db.query_db(query, [id])

    def update(self,id):
        query = """ update sale set productId=?, quantity=?, status=?  where id = ?; """
        self._prepareData()
        result = self.db.query_db(query, [self.productId,self.quantity, self.status,id])
        return 200

    def count(self):        
        query = """ select count(*) from sale where status=1; """
        result = self.db.query_db2(query, [])
        return result  

    def todaySales(self):
        i = datetime.datetime.now() 
        hoy = "%s/%s/%s" % (i.day, i.month, i.year)
        query = """ select count(*) from sale where status=1 and sale_date ='""" + hoy + """'"""
        result = self.db.query_db2(query, [])
        return result  
        
