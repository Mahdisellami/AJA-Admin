import pandas as pd
import json
import requests

file_path = 'Allegations.csv'  
data = pd.read_csv(file_path, delimiter=';', quotechar='"')
data = data.fillna('')
data.columns = data.columns.str.strip()
unique_allegations = data['allegation'].unique()
def post_to_api(json_data):
    url = 'http://api:8000/api/questions'  
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, data=json.dumps(json_data), headers=headers)
    if response.status_code == 201:
        print("Question successfully posted.")
    else:
        print(f"Failed to post question. Status code: {response.status_code}, Response: {response.text}")

answers = [{"answer": allegation, "nextQuestionId": None} for allegation in unique_allegations]
question_data = {
    "text": "text",  
    "theme": "energy", 
    "isThemeRelated": True, 
    "multiple": False,  
    "answers": answers  
}


post_to_api(question_data)
=======
import pandas as pd
import json
import requests

file_path = 'Allegations.csv'  
data = pd.read_csv(file_path, delimiter=';', quotechar='"')
data = data.fillna('')
data.columns = data.columns.str.strip()
unique_allegations = data['allegation'].unique()
def post_to_api(json_data):
    url = 'http://localhost:8000/api/questions'  
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, data=json.dumps(json_data), headers=headers)
    if response.status_code == 201:
        print("Question successfully posted.")
    else:
        print(f"Failed to post question. Status code: {response.status_code}, Response: {response.text}")

answers = [{"answer": allegation, "nextQuestionId": None} for allegation in unique_allegations]
question_data = {
    "text": "text",  
    "theme": "energy", 
    "isThemeRelated": True, 
    "multiple": False,  
    "answers": answers  
}


post_to_api(question_data)

