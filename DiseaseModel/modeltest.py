import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array

# Load the trained model
model = load_model('plant_disease_model.h5')

# Class labels (in order of the dataset)
class_labels = [
    'Apple Scab', 'Black Rot', 'Cedar Apple Rust', 'Healthy Apple',
    'Healthy Blueberry', 
    'Powdery Mildew (Cherry)', 'Healthy Cherry',
    'Cercospora Leaf Spot (Corn)', 'Common Rust (Corn)', 
    'Northern Leaf Blight (Corn)', 'Healthy Corn',
    'Black Rot (Grape)', 'Esca (Grape)', 'Leaf Blight (Grape)', 
    'Healthy Grape', 'Citrus Greening', 'Healthy Peach', 
    'Bacterial Spot (Peach)', 'Healthy Pepper', 'Bacterial Spot (Pepper)',
    'Early Blight (Potato)', 'Late Blight (Potato)', 'Healthy Potato',
    'Healthy Raspberry', 'Healthy Soybean', 'Powdery Mildew (Squash)',
    'Leaf Scorch (Strawberry)', 'Healthy Strawberry',
    'Bacterial Spot (Tomato)', 'Early Blight (Tomato)', 
    'Late Blight (Tomato)', 'Leaf Mold (Tomato)', 
    'Septoria Leaf Spot (Tomato)', 'Spider Mites (Tomato)', 
    'Target Spot (Tomato)', 'Tomato Mosaic Virus', 
    'Tomato Yellow Leaf Curl Virus', 'Healthy Tomato'
]

# Function to preprocess the image
def preprocess_image(image_path):
    image = load_img(image_path, target_size=(224, 224))  # Resize to match model input
    image = img_to_array(image) / 255.0  # Normalize pixel values
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

# Predict the disease
def predict_disease(image_path):
    image = preprocess_image(image_path)
    probabilities = model.predict(image)[0]  # Get probabilities for each class
    class_index = np.argmax(probabilities)  # Get the class with the highest probability
    disease_name = class_labels[class_index]  # Map to class label
    confidence = probabilities[class_index]  # Confidence level for the prediction
    return disease_name, confidence

# Example usage
image_path = 'image.JPG'
disease, confidence = predict_disease(image_path)
print(f"Predicted Disease: {disease}")
print(f"Confidence: {confidence:.2f}")
