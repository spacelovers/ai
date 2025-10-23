from flask import Flask, request, jsonify, send_from_directory
import re
import random
import json

class SimpleAssistant:
    def __init__(self):
        self.knowledge_base = {
            "سلام": [
                "سلام! چطور می‌توانم کمکت کنم؟",
                "درود! چه کمکی از من ساخته است؟"
            ],
            "خوبی": [
                "ممنونم، خوبم. شما چطورید؟",
                "خوب هستم، امیدوارم شما هم خوب باشید"
            ],
            "اسمت چیه": [
                "من یک دستیار هوش مصنوعی هستم",
                "اسم من دستیار است"
            ]
        }
        self.default_responses = [
            "دقیقا منظورتان را متوجه نشدم",
            "می‌توانید واضح‌تر توضیح دهید؟",
            "سوال جالبی است!"
        ]

    def preprocess_input(self, text):
        text = text.lower().strip()
        text = re.sub(r'[^\w\s]', '', text)
        return text

    def find_best_response(self, processed_input):
        for key, responses in self.knowledge_base.items():
            if key in processed_input:
                return random.choice(responses)
        return random.choice(self.default_responses)

    def generate_response(self, user_input):
        processed_input = self.preprocess_input(user_input)
        response = self.find_best_response(processed_input)
        return {
            "sender": "assistant",
            "message": response,
            "timestamp": "now"
        }

assistant = SimpleAssistant()
app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    user_message = request.json['message']
    response = assistant.generate_response(user_message)
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
