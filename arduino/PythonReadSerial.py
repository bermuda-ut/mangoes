import serial, binascii

# Setup serial
s = serial.Serial(port='/dev/ttyACM0', baudrate=9600)

# Run the read() command while true 
while True:
	str = s.readline();
	
	# Ignore new line characters
	if len(str) > 2:
		productHex   = str.replace(' ', '');
		print productHex
		productHex   = productHex.partition("F")[0];
		print productHex
		productASCII = binascii.a2b_hex(productHex);
		print productASCII
	



