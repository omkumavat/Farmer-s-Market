

from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Alternatively, if you want to restrict it to specific origins:
# CORS(app, origins=["http://localhost:3000"])

# Load the pre-trained model
model = load_model('plant_disease_model.h5')

# Map diseases to pesticides
disease_to_pesticide = {
    'Apple Scab': 'Captan',
    'Black Rot': 'Mancozeb',
    'Cedar Apple Rust': 'Myclobutanil',
    'Healthy Apple': 'No pesticide needed',
    
    'Powdery Mildew (Cherry)': 'Sulfur Fungicide',
    'Healthy Cherry': 'No pesticide needed',
    
    'Cercospora Leaf Spot (Corn)': 'Azoxystrobin',
    'Common Rust (Corn)': 'Mancozeb',
    'Northern Leaf Blight (Corn)': 'Chlorothalonil',
    'Healthy Corn': 'No pesticide needed',
    
    'Black Rot (Grape)': 'Mancozeb',
    'Esca (Grape)': 'Myclobutanil',
    'Leaf Blight (Grape)': 'Captan',
    'Healthy Grape': 'No pesticide needed',
    
    'Citrus Greening': 'Imidacloprid',
    'Healthy Orange': 'No pesticide needed',
    
    'Bacterial Spot (Peach)': 'Copper-Based Fungicide',
    'Healthy Peach': 'No pesticide needed',
    
    'Bacterial Spot (Pepper)': 'Streptomycin Sulfate',
    'Healthy Pepper': 'No pesticide needed',
    
    'Late Blight (Potato)': 'Chlorothalonil',
    'Early Blight (Potato)': 'Mancozeb',
    'Healthy Potato': 'No pesticide needed',
    
    'Bacterial Spot (Tomato)': 'Copper-Based Fungicide',
    'Early Blight (Tomato)': 'Chlorothalonil',
    'Late Blight (Tomato)': 'Mancozeb',
    'Leaf Mold (Tomato)': 'Myclobutanil',
    'Septoria Leaf Spot (Tomato)': 'Azoxystrobin',
    'Spider Mites (Tomato)': 'Abamectin',
    'Target Spot (Tomato)': 'Mancozeb',
    'Tomato Mosaic Virus': 'No pesticide available',
    'Tomato Yellow Leaf Curl Virus': 'No pesticide available',
    'Healthy Tomato': 'No pesticide needed',
}


# Upload folder
UPLOAD_FOLDER = './uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def detect_disease(image_path):
    image = load_img(image_path, target_size=(224, 224))
    image = img_to_array(image) / 255.0
    image = np.expand_dims(image, axis=0)

    prediction = model.predict(image)
    disease_index = np.argmax(prediction)
    disease_name = list(disease_to_pesticide.keys())[disease_index]
    pesticide = disease_to_pesticide[disease_name]
    return {"disease": disease_name, "pesticide": pesticide}

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image = request.files['image']
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
    image.save(image_path)

    result = detect_disease(image_path)
    os.remove(image_path)
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
