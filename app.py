from gevent.wsgi import WSGIServer

import json

from flask import Flask
from flask import render_template

app = Flask(__name__)
app.debug = True


@app.route("/")
def index():
    setup = json.load(open('setup.json'))
    return render_template('index.html', setup=setup)

    
if __name__ == "__main__":
    http_server = WSGIServer(('0.0.0.0', 5000), app)
    http_server.serve_forever()