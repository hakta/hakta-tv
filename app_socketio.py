from gevent import monkey; monkey.patch_all()
from socketio import SocketIOServer


class Application(object):    
    def __call__(self, environ, start_response):
        path = environ['PATH_INFO'].strip('/')
        if path.startswith("socket.io"):
            socketio = environ['socketio']
    
            while True:
                message = socketio.receive()
                print message, message['type']

                if message and message['type'] == "event":
                    print 'message:', message, message['type']
                    self.handle_event(message, socketio)
        else:
            return not_found(start_response)

    def handle_event(self, message, socketio):
        if message['name'] == 'connected':
            socketio.send_event('list', "['a', 'b', 'c']")
        else:
            print 'unhandled', message, message['type']

    
def not_found(start_response):
    start_response('404 Not Found', [])
    return ['<h1>Not Found</h1>']


if __name__ == '__main__':
    print 'Listening on port 8080 and on port 843 (flash policy server)'
    server = SocketIOServer(('127.0.0.1', 8080), Application(), namespace="socket.io", policy_server=False)
    server.serve_forever()
