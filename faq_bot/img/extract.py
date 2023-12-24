from flask import Flask, render_template, request, jsonify
from transformers import pipeline
from paddleocr import PaddleOCR
from PIL import Image
import numpy as np

app = Flask(__name__)

model_name = "deepset/roberta-base-squad2"
nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)

def extract_text_from_image(image_path):
    ocr = PaddleOCR(use_angle_cls=True, lang="en")
    image = Image.open(image_path)
    image_array = np.array(image)
    result = ocr.ocr(image_array)
    text = ''
    for res in result:
        for line in res:
            text += line[1][0] + ' '
    return text

def extract_information(image_path):
    text = extract_text_from_image(image_path)

    answers = []

    QA_input1 = {
        'question': 'what is the Account No?',
        'context': text
    }
    answers.append({"question": "Account No", "answer": nlp(QA_input1)['answer']})

    QA_input2 = {
        'question': 'what is the Customer Name?',
        'context': text
    }
    answers.append({"question": "Customer Name", "answer": nlp(QA_input2)['answer']})

    QA_input3 = {
        'question': 'what is the Branch Code?',
        'context': text
    }
    answers.append({"question": "Branch Code", "answer": nlp(QA_input3)['answer']})

    return {"answers": answers}

@app.route('/')
def index():
    return render_template('index.html', answers=None)

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"})

    if file:
        file_path = "uploaded_image.jpg"
        file.save(file_path)
        answers = extract_information(file_path)
        return render_template('index.html', answers=answers)

if __name__ == '__main__':
    app.run(debug=True,port="5001")
