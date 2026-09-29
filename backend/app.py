from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({
        "message": "VELORA API is running",
        "status": "success"
    })


@app.route("/api/products")
def products():
    return jsonify([
        {
            "id": 1,
            "name": "Obsidian",
            "category": "Architectural Evening",
            "price": 24900
        },
        {
            "id": 2,
            "name": "Élan",
            "category": "Silk Collection",
            "price": 28900
        },
        {
            "id": 3,
            "name": "Noir",
            "category": "Signature Tailoring",
            "price": 31900
        }
    ])


if __name__ == "__main__":
    app.run(debug=True, port=5000)