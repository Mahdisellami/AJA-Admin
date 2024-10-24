import pandas as pd
import json
import requests

file_path = 'Questions.csv' 
data = pd.read_csv(file_path, delimiter=';')  
data = data.fillna('')
data.columns = data.columns.str.strip()
print("Column Names:", data.columns)
grouped = data.groupby('question')
def post_to_api(json_data):
    url = 'http://api:8000/api/questions'  
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, data=json.dumps(json_data), headers=headers)
    if response.status_code == 201:
        print(f"Question '{json_data['text']}' successfully posted.")
    else:
        print(f"Failed to post question '{json_data['text']}'. Status code: {response.status_code}, Response: {response.text}")


for question, group in grouped:
    answers = [{"answer": answer, "nextQuestionId": None} for answer in group['answer']]

    # Construct the question data
    question_data = {
        "text": question.strip(),  
        "isThemeRelated": False,   
        "theme": "energy",               
        "multiple": False,         
        "answers": answers         
    }

   
    post_to_api(question_data)

