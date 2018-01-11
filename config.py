# Database Path
DB_PATH = '/mnt/dev/showroomstock/database/stockdb.sqlite'


# If the file local_config.py is present, it overrides this configuration
try:
    from local_config import *
except ImportError:
    # The absence of the file does not constitute an error
    pass

