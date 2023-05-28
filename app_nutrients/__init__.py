from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

app.config["SECRET_KEY"]="\x96\x96\x8c\xe7\x0b\xea\xfcO\xd8n\x96W"
app.config["SECURITY_PASSWORD_SALT"]="\x96\x96\x8c\xe7\x0b\xea\xfcO\xd8n\x96W"


