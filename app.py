from flask import Flask, request, jsonify, send_from_directory
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
import pickle
import json
import random

app = Flask(__name__, static_url_path='/static')

# load trained model
model = load_model('chat_model.keras')

# load tokenizer object
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

# load label encoder object
with open('label_encoder.pickle', 'rb') as enc:
    lbl_encoder = pickle.load(enc)

# load intents file
with open('knowledge_base.json') as file:
    data = json.load(file)

max_len = 20

def generate_response(user_input):
    inp = user_input
    sequence = tokenizer.texts_to_sequences([inp])
    padded_sequence = pad_sequences(sequence, truncating='post', maxlen=max_len)
    result = model.predict(padded_sequence)
    tag = lbl_encoder.inverse_transform([np.argmax(result)])

    for i in data['intents']:
        if i['tag'] == tag:
            response = np.random.choice(i['responses'])
            break

    return {
        "sender": "assistant",
        "message": response,
        "timestamp": "now"
    }


@app.route('/')
def index():
    return send_from_directory('.', 'index.html')


@app.route('/get_response', methods=['POST'])
def get_response():
    user_message = request.json['message']
    response = generate_response(user_message)
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
