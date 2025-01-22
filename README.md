# Agri Platform for Farmers and Dealers ( AgriHaven )

- [Project summary](#project-summary)
- [Technology implementation](#technology-implementation)
  - [The platform consists of three main components :](#ibm-ai-services-used)
  - [1. DiseaseModel](#solution-architecture)
  - [2. Backend](#solution-architecture)
  - [Add environment variables in the .env file](#solution-architecture)
  - [3. Frontend](#other-ibm-technology-used)
- [Future Improvements](#presentation-materials)

## Project summary

Agri Platform for Farmers and Dealers is a comprehensive solution that combines machine learning and web technologies to provide :  

Disease Detection: Detect plant diseases using a trained machine learning model.  
Product Management: Enable farmers and dealers to list, manage, and sell products.  
User-Friendly Interface: A React-based web application for farmers, dealers, and admins.  
Additional Features: Includes market insights, weather updates, order management, and secure payments.  


## Technology implementation

##### The platform consists of three main components :

DiseaseModel: A Python-based machine learning model for plant disease detection.  
Backend: A Node.js server with MongoDB for database management.  
Frontend: A React application for user interaction.  

#### 1. DiseaseModel
A Python-based machine learning model designed to detect plant diseases from uploaded images.  

Technologies:  
Python.  
Tensorflow  
Keras  

Setup:  
cd DiseaseModel  
pip install -r requirement.txt  
python modeltrain.py  
python detect_disease.py  
Trained Model: The trained model is hosted on Google Drive. You can download it [here](https://drive.google.com/file/d/1Saf949PPLOmf9rAFFGfRFJaXZxm2Tb5w/view).  

#### 2. Backend
The backend provides API endpoints and business logic for handling authentication, products, orders, and payments.  

Technologies:  

Node.js, Express.js  
MongoDB  
Cloudinary for image storage 

Features:  

Authentication for farmers and dealers.  
Product and order management.  
Payment gateway integration.  
Email notifications for verifications and updates.  

Setup:  
cd Backend  
npm install  
nodemon index.js  
###### Add environment variables in the .env file

#### 3. Frontend
The frontend is a React-based web application for farmers, dealers, and admins to interact with the platform.  

Technologies:  

React.js  
CSS for styling  

Features:  

Dashboard for managing products and orders.  
Market insights and weather data.  
Secure login and user management.  

Setup:  
cd Frontend  
npm install  
npm start  


#### Future Improvements
Enhance the disease detection model to support more crops.  
Add a mobile app for easier access.  
Include advanced real-time market and weather prediction features.  

This README.md file provides a detailed and organized guide for understanding, setting up, and using the Agri Platform for Farmers and Dealers. Let me know if you want to make further adjustments!
