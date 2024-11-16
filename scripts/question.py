import pandas as pd
import json
import requests
import unicodedata

def normalize_text(text):
    """Normalize text while preserving accents and special characters."""
    if isinstance(text, str):
        return unicodedata.normalize('NFC', text)
    return text

# Load the CSV file with proper encoding
file_path = 'Allegations.csv'
data = pd.read_csv(file_path, delimiter=';', quotechar='"', encoding='utf-8-sig')
data = data.fillna('')  # Fill NaNs with empty strings
data.columns = data.columns.str.strip()  # Remove any leading/trailing spaces from column names

# Normalize the text fields to preserve accents
data['allegation'] = data['allegation'].apply(normalize_text)
data['theme'] = data['theme'].apply(normalize_text)

# Function to post data to the API
def post_to_api(json_data):
    url = 'http://localhost:8000/api/questions'
    headers = {'Content-Type': 'application/json; charset=utf-8'}
    try:
        # Ensure ASCII is False and encode in UTF-8
        json_payload = json.dumps(json_data, ensure_ascii=False).encode('utf-8')
        response = requests.post(url, data=json_payload, headers=headers)
        if response.status_code == 201:
            print("Question successfully posted.")
        else:
            print(f"Failed to post question. Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        print(f"Error posting data: {e}")

# Group data by theme and prepare questions
for theme in data['theme'].unique():
    theme_data = data[data['theme'] == theme]
    answers = [{"answer": normalize_text(allegation), "nextQuestionId": None} 
               for allegation in theme_data['allegation'].unique()]
    question_data = {
        "text": "text",
        "theme": theme,
        "isThemeRelated": True,
        "multiple": False,
        "answers": answers
    }
    
    # Post question data to the API
    post_to_api(question_data)
