import requests
import pandas as pd
import json
from bson import ObjectId  
def fetch_all_questions():
    url = 'http://api:8000/api/questions'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching questions: {response.status_code}")
        return []

def parse_csv_file(csv_file_path):
    data = pd.read_csv(csv_file_path, delimiter=';')
    data = data.fillna('')
    data.columns = data.columns.str.strip()
    return data.to_dict(orient='records')

def create_answer_id_mapping(questions_json):
    answer_id_mapping = {}
    for question in questions_json:
        for answer in question['answers']:
            answer_id_mapping[answer['answer']] = answer['_id']
    return answer_id_mapping

def replace_negative_values(csv_data, answer_id_mapping):
    updated_data = []
    for row in csv_data:
        updated_row = row.copy()
        for key, value in row.items():
            if value == '-':
                updated_row[key] = answer_id_mapping.get(key, "")
            elif value in ['0', '+']:  
                updated_row[key] = ""
            else:
                updated_row[key] = value  
        updated_data.append(updated_row)
    return updated_data


def roman_to_int(s):
    roman = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    total = 0
    prev_value = 0

    for char in s[::-1]:
        value = roman.get(char.upper(), 0)
        if value >= prev_value:
            total += value
        else:
            total -= value
        prev_value = value
    
    return total

def get_theme_related_answer(index, theme_related_answers):
    if len(theme_related_answers) == 0:
        return None

    if 0 <= index <= 9:
        return theme_related_answers[0]['_id']
    elif 10 <= index <= 11:
        return theme_related_answers[1]['_id']
    elif 12 <= index <= 16:
        return theme_related_answers[2]['_id']
    elif 17 <= index <= 23:
        return theme_related_answers[3]['_id']
    else:
        return theme_related_answers[0]['_id']

def validate_molecule(molecule):
    required_fields = ['name', 'priority', 'answer', 'theme']
    
    for field in required_fields:
        if not molecule.get(field):
            print(f"Error: {field} is missing or empty in molecule: {molecule['name']}")
            return False
    return True

# Function to post data to the API with ObjectId serialization
def post_to_node_service(molecule_data):
    url = 'http://api:8000/api/molecules'  # Adjust this to your actual Node service endpoint
    headers = {'Content-Type': 'application/json'}  # Set the content type to JSON

    # Convert ObjectId to string for JSON serialization
    def convert_objectid_to_str(data):
        if isinstance(data, list):
            return [str(item) if isinstance(item, ObjectId) else item for item in data]
        elif isinstance(data, dict):
            return {key: convert_objectid_to_str(value) for key, value in data.items()}
        return str(data) if isinstance(data, ObjectId) else data

    # Apply the conversion to the entire molecule_data
    molecule_data = convert_objectid_to_str(molecule_data)

    try:
        response = requests.post(url, data=json.dumps(molecule_data), headers=headers)
        
        if response.status_code == 201:
            print("Molecule successfully posted.")
        else:
            print(f"Failed to post molecule. Status code: {response.status_code}, Response: {response.text}")
    
    except Exception as e:
        print(f"An error occurred: {e}")

# Update the output format to group by predefined categories with arrays for each attribute, and add 'name', 'priority', and 'answer'
def format_output_data(updated_data, theme_related_answers):
    formatted_data = []

    for index, row in enumerate(updated_data):
        # Extract the 'name' from 'formule a recommendé'
        name = row.get('formule a recommendé', "").strip()
        print(f"Row {index} - 'formule a recommendé': '{name}'")

        priority = roman_to_int(row.get('priorité', '0').strip())

        
        score = int(row.get('score', 0))  
        theme = "60d21b4967d0d8992e610c85"  
          # Replace with actual theme ObjectId

        # Get the theme-related answer ID
        answer = get_theme_related_answer(index, theme_related_answers)

        # If any required field is missing, print a warning for debugging
        if not name or priority == 0 or not answer:
            print(f"Warning: Missing required field in row {index}")

        # Prepare the formatted row
        formatted_row = {
            "name": name,
            "priority": priority,
            "score": score,
            "age": ["", "", ""],
            "sex": [""],
            "woman": ["", "", "", "", ""],
            "pathology": ["", "", "", "", "", ""],
            "medication": ["", "", "", "", "", ""],
            "alcohol": ["", ""],
            "smoking": [""],
            "answer": answer,
            "theme": theme  
        }

        # Map CSV data to the categories
        for key, value in row.items():
            if value:
                if key == 'Personnes âgées':
                    formatted_row['age'][0] = value
                elif key == 'adulte':
                    formatted_row['age'][1] = value
                elif key == 'Enfants':
                    formatted_row['age'][2] = value
                elif key == 'homme':
                    formatted_row['sex'][0] = value
                elif key == 'menopausé':
                    formatted_row['woman'][0] = value
                elif key == 'age de procreer':
                    formatted_row['woman'][1] = value
                elif key == 'Procréation planifiée':
                    formatted_row['woman'][2] = value
                elif key == 'Allaitante':
                    formatted_row['woman'][3] = value
                elif key == 'Enceinte':
                    formatted_row['woman'][4] = value
                elif key == 'psychiatrique':
                    formatted_row['pathology'][0] = value
                elif key == 'troubles renaux':
                    formatted_row['pathology'][1] = value
                elif key == 'trouble hepatique':
                    formatted_row['pathology'][2] = value
                elif key == 'trouble cardiaque-vasculaire':
                    formatted_row['pathology'][3] = value
                elif key == 'HTA':
                    formatted_row['pathology'][4] = value
                elif key == 'diabete':
                    formatted_row['pathology'][5] = value
                elif key == 'Anticoagulants':
                    formatted_row['medication'][0] = value
                elif key == 'Antidiabétiques':
                    formatted_row['medication'][1] = value
                elif key == 'Antihypertenseurs':
                    formatted_row['medication'][2] = value
                elif key == 'Antidépresseurs':
                    formatted_row['medication'][3] = value
                elif key == 'medicament cardiovasculaire':
                    formatted_row['medication'][4] = value
                elif key == 'antibiotique':
                    formatted_row['medication'][5] = value
                elif key == 'Consomme de l\'alcool':
                    formatted_row['alcohol'][0] = value
                elif key == 'grand alcoolique = insuffisance hepatique':
                    formatted_row['alcohol'][1] = value
                elif key == 'Fumeur':
                    formatted_row['smoking'][0] = value

        formatted_data.append(formatted_row)

    return formatted_data

# Save the formatted data as JSON
def save_json(data, output_file, theme_related_answers):
    formatted_data = format_output_data(data, theme_related_answers)
    with open(output_file, 'w', encoding='utf-8') as outfile:
        json.dump(formatted_data, outfile, ensure_ascii=False, indent=4)

# Main function
def main():
    csv_file_path = 'Mollecules.csv'  # Path to your uploaded CSV file
    output_json_file = 'updated_data.json'  # Path to the output JSON file

    # Fetch all questions from the API
    questions_json = fetch_all_questions()

    # Filter out theme-related questions
    theme_related_questions = [q for q in questions_json if q.get('isThemeRelated')]
    theme_related_answers = theme_related_questions[0]['answers'] if theme_related_questions else []

    # Load the CSV data
    csv_data = parse_csv_file(csv_file_path)

    # Replace negative values (-) with corresponding answer IDs
    answer_id_mapping = create_answer_id_mapping(questions_json)
    updated_data = replace_negative_values(csv_data, answer_id_mapping)

    # Save the updated data as JSON with the new format
    save_json(updated_data, output_json_file, theme_related_answers)

    # Post the data to the Node service
    with open(output_json_file, 'r') as file:  # Corrected line to reference the JSON file path
        molecule_data = json.load(file)
    
    # Ensure that the theme and other ObjectIds are properly set as ObjectId instances
    for molecule in molecule_data:
        if validate_molecule(molecule):
            try:
                # Convert 'theme' to ObjectId if it exists as a string (or replace with an actual one)
                if isinstance(molecule['theme'], str):
                    molecule['theme'] = ObjectId(molecule['theme'])

                # Convert other fields that need to be ObjectId lists
                molecule['age'] = [ObjectId(a) if a else None for a in molecule['age']]
                molecule['sex'] = [ObjectId(s) if s else None for s in molecule['sex']]
                molecule['woman'] = [ObjectId(w) if w else None for w in molecule['woman']]
                molecule['pathology'] = [ObjectId(p) if p else None for p in molecule['pathology']]
                molecule['medication'] = [ObjectId(m) if m else None for m in molecule['medication']]
                molecule['alcohol'] = [ObjectId(al) if al else None for al in molecule['alcohol']]
                molecule['smoking'] = [ObjectId(sm) if sm else None for sm in molecule['smoking']]

                # Remove any None values
                molecule['age'] = [a for a in molecule['age'] if a]
                molecule['sex'] = [s for s in molecule['sex'] if s]
                molecule['woman'] = [w for w in molecule['woman'] if w]
                molecule['pathology'] = [p for p in molecule['pathology'] if p]
                molecule['medication'] = [m for m in molecule['medication'] if m]
                molecule['alcohol'] = [al for al in molecule['alcohol'] if al]
                molecule['smoking'] = [sm for sm in molecule['smoking'] if sm]

                # Post the molecule to the Node service
                post_to_node_service(molecule)

            except Exception as e:
                print(f"Error processing molecule: {molecule['name']}. Error: {e}")

    print(f"Processing complete. Updated data saved to '{output_json_file}'")

if __name__ == "__main__":
    main()
