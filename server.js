var server_port = 3000

var server_ip_address = '0.0.0.0'

server.listen(server_port, server_ip_address, function () {

    console.log( "Listening on " + server_ip_address + ", port " + server_port )
  
  });