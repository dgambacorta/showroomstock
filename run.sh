export DIRECTORY='.env'
export DIRECTORYDB='database/stockdb.sqlite'

if [ ! -d "$DIRECTORY" ]; then
	virtualenv --python=/usr/bin/python2 $DIRECTORY
	source $DIRECTORY/bin/activate
	pip install -r requirements.txt
	deactivate
fi

if [ ! -f "$DIRECTORYDB" ]; then
    touch $DIRECTORYDB
fi

PORT_NUMBER=5001
lsof -i tcp:${PORT_NUMBER} | awk 'NR!=1 {print $2}' | xargs kill -9

source $DIRECTORY/bin/activate
export testName="main.py"
python $testName


