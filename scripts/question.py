import pandas as pd
import json
import requests

# Load the CSV file and process it
file_path = 'Allegations.csv'  
data = pd.read_csv(file_path, delimiter=';', quotechar='"', encoding='ISO-8859-1')
data = data.fillna('')
data.columns = data.columns.str.strip()

# Function to post data to the API
def post_to_api(json_data):
    url = 'http://localhost:8000/api/questions'
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, data=json.dumps(json_data), headers=headers)
    if response.status_code == 201:
        print("Question successfully posted.")
    else:
        print(f"Failed to post question. Status code: {response.status_code}, Response: {response.text}")
for theme in data['theme'].unique():
    theme_data = data[data['theme'] == theme]
    answers = [{"answer": allegation, "nextQuestionId": None} for allegation in theme_data['allegation'].unique()]
    question_data = {
        "text": "text",  
        "theme": theme,  
        "isThemeRelated": True, 
        "multiple": False,  
        "answers": answers  
    }
    
    # Post question data to the API
    post_to_api(question_data)
