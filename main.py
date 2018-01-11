import sys
from WebServer import WebServer
from flask import request

if __name__ == "__main__":
    server = WebServer()
    # server.host = "0.0.0.0"
    server.port = 5001 
    server.init()
    server.run() 