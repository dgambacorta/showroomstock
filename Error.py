class Error:
    def __init__(self):
        self.error = {701: 'Client Alredy Exists!'}


    def getError(self, error):
        return self.error[error]