var server_port = 8080

var server_ip_address = '0.0.0.0'

app.listen(server_port, server_ip_address)

server.listen(server_port, server_ip_address, function () {

    console.log( "Listening on " + server_ip_address + ", port " + server_port )
  
  });