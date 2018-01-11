# third
import platform
from flask import Flask, jsonify, request
from flask import Response
from flask import send_from_directory

import os

import time
import logging
from termcolor import colored

# owner
from Category import Category
from Client import Client
from Product import Product
from Sale import Sale
from User import User
from Database import Database


#-------------
# WebServer
#-------------
class WebServer:
    
    def __init__(self):
    
        self.app = Flask(__name__)
        self.host = "0.0.0.0"
        self.port = 5001
        self.server = ''
        self.database = ''
        self.url = "http://" + self.host + ":" + str(self.port) + "/ol-ti-itcpfegem-beta/billService?wsdl"
        self.category = Category()
        self.client = Client()
        self.product = Product()
        self.sale = Sale()
        self.user = User()


    #-------------
    # init
    #-------------
    def init(self):

        with  self.app.app_context():
            db = Database()
            db.init()
                

        # Category 
        @self.app.route('/category/create', methods=['POST'])      
        def categoryCreate():     
            self.category.data = request.data
            return jsonify(self.category.save())

        @self.app.route('/category/update/<category_id>', methods=['POST'])      
        def categoryUpdate(category_id):     
            self.category.data = request.data
            return jsonify(self.category.update(category_id))

        @self.app.route('/category/delete/<category_id>', methods=['GET','POST'])      
        def categoryDelete(category_id):     
            return jsonify(self.category.delete(category_id))
            
        @self.app.route('/category/<category_id>', methods=['GET','POST'])      
        def categoryGet(category_id):  
            return jsonify(self.category.get(category_id)), 200

        @self.app.route('/category/all', methods=['GET','POST'])      
        def categoryAll():  
            return jsonify(self.category.getAll()), 200


        # Client 

        @self.app.route('/client/create', methods=['POST'])      
        def clientCreate():     
            self.client.data = request.data
            return jsonify(self.client.save())

        @self.app.route('/client/update/<client_id>', methods=['POST'])      
        def clientUpdate(client_id):     
            self.client.data = request.data
            return jsonify(self.client.update(client_id))

        @self.app.route('/client/delete/<client_id>', methods=['GET','POST'])      
        def clientDelete(client_id):     
            return jsonify(self.client.delete(client_id))

        @self.app.route('/client/<client_id>', methods=['GET','POST'])      
        def clientGet(client_id):     
            return jsonify(self.client.get(client_id)), 200

        @self.app.route('/client/all', methods=['GET','POST'])      
        def clientGetAll():     
            return jsonify(self.client.getAll()), 200

        # Product 

        @self.app.route('/product/create', methods=['POST'])      
        def productCreate():     
            self.product.data = request.data
            return jsonify(self.product.save())

        @self.app.route('/product/update/<product_id>', methods=['POST'])      
        def productUpdate(product_id):     
            self.product.data = request.data
            return jsonify(self.product.update(product_id))

        @self.app.route('/product/delete/<product_id>', methods=['GET','POST'])      
        def productDelete(product_id):     
            return jsonify(self.product.delete(product_id))

        @self.app.route('/product/<product_id>', methods=['GET','POST'])      
        def productGet(product_id):     
            return jsonify(self.product.get(product_id)), 200

        @self.app.route('/product/all', methods=['GET','POST'])      
        def productGetAll():     
            return jsonify(self.product.getAll()), 200

        @self.app.route('/product/count', methods=['GET','POST'])      
        def count():     
            return jsonify(self.product.count()), 200

        @self.app.route('/product/lowstock', methods=['GET','POST'])      
        def lowstock():     
            return jsonify(self.product.lowStock()), 200

        # Sale 

        @self.app.route('/sale/create', methods=['POST'])      
        def saleCreate():     
            self.sale.data = request.data
            return jsonify(self.sale.save())

        @self.app.route('/sale/update/<sale_id>', methods=['POST'])      
        def saleUpdate(sale_id):     
            self.sale.data = request.data
            return jsonify(self.sale.update(sale_id))

        @self.app.route('/sale/delete/<sale_id>', methods=['GET','POST'])      
        def saleDelete(sale_id):     
            return jsonify(self.sale.delete(sale_id))

        @self.app.route('/sale/<sale_id>', methods=['GET','POST'])      
        def saleGet(sale_id):
            return jsonify(self.sale.get(sale_id)), 200

        @self.app.route('/sale/all', methods=['GET','POST'])      
        def saleGetAll():
            return jsonify(self.sale.getAll()), 200

        @self.app.route('/sale/count', methods=['GET','POST'])      
        def saleCount():     
            return jsonify(self.sale.count()), 200

        @self.app.route('/sale/today', methods=['GET','POST'])      
        def saleToday():     
            return jsonify(self.sale.todaySales()), 200


        # User 

        @self.app.route('/user/create', methods=['POST'])      
        def userCreate():     
            self.user.data = request.data
            return jsonify(self.user.save())

        @self.app.route('/user/update/<user_id>', methods=['POST'])      
        def userUpdate(user_id):     
            self.user.data = request.data
            return jsonify(self.user.update(user_id))

        @self.app.route('/user/delete/<user_id>', methods=['GET','POST'])      
        def userDelete(user_id):     
            return jsonify(self.user.delete(user_id))

        @self.app.route('/user/<user_id>', methods=['GET','POST'])      
        def userGet(user_id):     
            return jsonify(self.user.get(user_id)), 200

        @self.app.route('/user/all', methods=['GET','POST'])      
        def userGetAll():     
            return jsonify(self.user.getAll()), 200


        # Static

        @self.app.route('/static/<path:filename>')
        def static_file(filename):
            root_dir = os.path.dirname(os.getcwd())
            return send_from_directory(os.path.join(root_dir, 'static'), filename)

        
    #-------------
    # run
    #-------------
    def run(self):

        # start server

 
        print ''
        print '-----------------------------------------------------'
        print ' System Stock |  version 1.0 '
        print '-----------------------------------------------------'
        print ' https://{0}:{1}{2}' . format(self.host, self.port, '/')
        print '-----------------------------------------------------'
        print ''
        
        print("-- Running Flask HTTP Server --")
        #self.app.run(debug=True, port=self.port, host=self.host, ssl_context='adhoc')
        self.app.run(debug=True, port=self.port, host=self.host)

