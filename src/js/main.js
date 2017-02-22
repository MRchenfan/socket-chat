var socket = io('localhost:3003')

socket.on('connect', function() {
	console.log('connect')
})

socket.on('disconnect', function() {
	console.log('disconnect')
})