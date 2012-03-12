from gevent.wsgi import WSGIServer

from flask import Flask
from flask import render_template

app = Flask(__name__)
app.debug = True

@app.route("/")
def index():
    return render_template('index.html')

    
if __name__ == "__main__":
    http_server = WSGIServer(('0.0.0.0', 5000), app)
    http_server.serve_forever()