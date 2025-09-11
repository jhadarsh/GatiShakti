import cv2
import numpy as np
import base64
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from tensorflow.keras.models import load_model
from fastapi.middleware.cors import CORSMiddleware

# Load model once at startup
model = load_model("pothole_detection_model.h5")

app = FastAPI()

# ✅ Allow frontend to connect (React dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # adjust if different
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Prediction function
def predict_and_mark(image_bytes):
    # Convert bytes to numpy array
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Preprocess
    img_resized = cv2.resize(img, (64, 64)) / 255.0
    img_array = np.expand_dims(img_resized, axis=0)

    # Predict
    prediction = model.predict(img_array)[0]
    class_index = np.argmax(prediction)
    confidence = prediction[class_index]

    # Apply threshold
    if class_index == 0 and confidence > 0.80:
        label = f"Pothole ({confidence*100:.2f}%)"
        color = (0, 0, 255)  # Red
    else:
        label = f"Normal Road ({confidence*100:.2f}%)"
        color = (0, 255, 0)  # Green

    # Draw label + box
    cv2.putText(img, label, (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 1.0, color, 3)
    cv2.rectangle(img, (10, 60), (img.shape[1]-10, img.shape[0]-10), color, 3)

    # Encode image to base64
    _, buffer = cv2.imencode(".jpg", img)
    img_base64 = base64.b64encode(buffer).decode("utf-8")

    return label, float(confidence), img_base64

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        label, confidence, img_base64 = predict_and_mark(image_bytes)
        return {
            "prediction": label,
            "confidence": confidence,
            "output_image": img_base64  # base64 string
        }
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
