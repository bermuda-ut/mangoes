from pymongo import MongoClient
import serial, binascii
import string
import sys

# Setup serial
s = serial.Serial(port='/dev/ttyACM0', baudrate=9600)

def insert(name, date):
    coll.insert_one({'name': name, 'doe': date})
    print "Inserted {}".format(name)

print "Connecting to mongoDB"
try:
    client = MongoClient("mongodb://localhost:3001/meteor")
    db = client.meteor
    coll = db.tempFridge
except:
    print "Unable to connect to mongoDB"
    exit(1)
    
# Run the read() command while true 
print "Ready"

while True:
    raw = s.readline();
    
    # Ignore new line characters
    if len(raw) > 2 and len(raw) % 2 == 0:
        try:
            print raw;
            productHex = raw.strip().replace(' ', '');
            productASCII = productHex.decode('hex')

            productDate = filter(str.isdigit, productASCII)
            productName = filter(str.isalpha, productASCII)

            insert(productName.strip(), productDate.strip())
        except:
            print "Failed to read"

        print "Ready"

"""
hardware wiring:

from   to
-------------
reset  pin9
ground ground
miso   pin12
mosi   pin11
sck    pin13
nss    pin10
"""
