from pymongo import MongoClient
import serial, binascii
import string
import sys

# Setup serial
s = serial.Serial(port='/dev/ttyACM0', baudrate=9600)

def insert(w):
    coll.insert_one({'name': w})
    print "Inserted {}".format(w)

print "Connecting to mongoDB"
try:
    client = MongoClient("mongodb://localhost:3001/meteor")
    db = client.meteor
    coll = db.tempFridge
except:
    print "Unable to connect to mongoDB"
    exit(1)
    
# Run the read() command while true 
while True:
    print "ready"
    str = s.readline();
    print str;
    
    # Ignore new line characters
    if len(str) > 2:
        productHex   = str.replace(' ', '');
        productHex   = productHex.partition("F")[0];
        productASCII = binascii.a2b_hex(productHex);
        insert(productASCII)
