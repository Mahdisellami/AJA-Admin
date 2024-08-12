import React, { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { createMolecule } from "../services/MoleculeService"; // Import the API method

// Options for each multi-select field
const options = {
  priority: [
    { value: 1, label: "I" },
    { value: 2, label: "II" },
  ],
  age: [
    { value: "66b4d61c8596df14d43fa098", label: "Elderly" },
    { value: "66b4d61c8596df14d43fa099", label: "Adult" },
    { value: "66b4d61c8596df14d43fa09a", label: "Child" },
  ],
  sex: [
    { value: "66b4d2598596df14d43fa08f", label: "Man" },
    { value: "66b4d2598596df14d43fa08e", label: "Woman" },
  ],
  woman: [
    { value: "66b4d5cf8596df14d43fa092", label: "Menopausal" },
    { value: "66b4d5cf8596df14d43fa093", label: "Planned reproduction" },
    { value: "66b4d5cf8596df14d43fa094", label: "Pregnant" },
    { value: "66b4d5cf8596df14d43fa095", label: "Breastfeeding" },
  ],
  pathology: [
    { value: "66b4db718596df14d43fa09d", label: "Psychiatric" },
    { value: "66b4db718596df14d43fa09e", label: "Cardiovascular disorder" },
    { value: "66b4db718596df14d43fa09f", label: "Hypertension" },
    { value: "66b4db718596df14d43fa0a0", label: "Diabetes" },
    { value: "66b4db718596df14d43fa0a1", label: "coagulation disorder" },
    { value: "66b4db718596df14d43fa0a2", label: "liver failure" },
    { value: "66b4db718596df14d43fa0a3", label: "Renal insufficiensy" },
  ],
  medication: [
    { value: "66b4dd208596df14d43fa0a6", label: "Antidiabetic" },
    { value: "66b4dd208596df14d43fa0a7", label: "Antidepressant" },
    { value: "66b4dd208596df14d43fa0a8", label: "Antibiotic" },
    { value: "66b4dd208596df14d43fa0a9", label: "Anticoagulant" },
    { value: "66b4dd208596df14d43fa0aa", label: "Antihypertensive" },
    { value: "66b4dd208596df14d43fa0ab", label: "None" },
    { value: "66b72d68acf23c997fe02ca4", label: "heart medication" },
  ],
  alcohol: [
    { value: "66b4dda08596df14d43fa0ae", label: "Never" },
    { value: "66b4dda08596df14d43fa0af", label: "Occasionaly" },
    { value: "66b4dda08596df14d43fa0b0", label: "Often" },
  ],
  diet: [
    { value: "Normal", label: "Normal" },
    { value: "Pescétarien", label: "Pescétarien" },
    { value: "Végétarien", label: "Végétarien" },
    { value: "Végétalien", label: "Végétalien" },
  ],
  physical_activity: [
    { value: "entrainement sport actif", label: "Entraînement sport actif" },
    { value: "rithme de vie actif", label: "Rythme de vie actif" },
    { value: "Sédentaire", label: "Sédentaire" },
  ],
  sleeping_habits: [
    { value: "Apnée du sommeil", label: "Apnée du sommeil" },
    { value: "insomnie", label: "Insomnie" },
    { value: "Décallage horraire", label: "Décalage horaire" },
    { value: "sommeil pertirbé", label: "Sommeil perturbé" },
    {
      value: "je dors plus de 7h par semaine",
      label: "Je dors plus de 7h par semaine",
    },
    {
      value: "je dors moins de 7h par semaine",
      label: "Je dors moins de 7h par semaine",
    },
  ],
  fruit_veg_per_day: [
    { value: "0", label: "0" },
    { value: "1-2", label: "1-2" },
    { value: "3 ou plus", label: "3 ou plus" },
  ],
  freq_cons_sup_2: [
    { value: "Poisson", label: "Poisson" },
    { value: "Viande rouge", label: "Viande rouge" },
    { value: "volaille", label: "Volaille" },
    { value: "produits laitiers", label: "Produits laitiers" },
  ],
  water_liters_per_day: [
    { value: "<0.5L", label: "<0.5L" },
    { value: "0.5-1L", label: "0.5-1L" },
    { value: "1-2L", label: "1-2L" },
  ],
  eyes: [
    { value: "eyes option 1", label: "Eyes option 1" }, // Add actual options
    { value: "eyes option 2", label: "Eyes option 2" },
  ],
  stress: [
    { value: "Stress 1", label: "Stress 1" }, // Add actual options
    { value: "Stress 2", label: "Stress 2" },
  ],
  theme: [
    { value: "66b4cc228596df14d43fa053", label: "Energy and Immunity", 
      answers: [
        { value: "66b4cc228596df14d43fa054", label: "- I want to strengthen my body naturally." },
        { value: "66b4cc228596df14d43fa055", label: "- I want to avoid getting sick often." },
        { value: "66b4cc228596df14d43fa056", label: "- I wish to strengthen my natural defenses." },
        { value: "66b4cc228596df14d43fa057", label: "- I want to get rid of persistent fatigue." },
        { value: "66b4cc228596df14d43fa058", label: "- I need a temporary energy boost." },
        { value: "66b7a844edd3fd6345377a41", label: "- I want to reduce and prevent seasonal allergies and food intolerances." },
      ],
    },
    { value: "66b4ce548596df14d43fa05e", label: "sport and muscles", 
      answers: [
        { value: "66b4ce548596df14d43fa05f", label: "- I want to improve my athletic performance." },
        { value: "66b71cc0acf23c997fe02ca2", label: "- I want to improve my endurance and resistance to effort." },
        { value: "66b71cb0acf23c997fe02ca0", label: "- I have muscle pain and soreness after physical exertion." },
        { value: "66b4ce548596df14d43fa060", label: "- I want to recover faster after exercise." },
        { value: "66b4ce548596df14d43fa061", label: "- I want to prevent sports injuries." },
        { value: "66b4ce548596df14d43fa062", label: "- I want to increase my muscle mass." },
      ],
    },
    { value: "66b4e0b18596df14d43fa0c0", label: "brain and Mental Health", 
      answers: [
        { value: "66b4e0b18596df14d43fa0c1", label: "- I want to maintain optimal mental endurance." },
        { value: "66b4e0b18596df14d43fa0c2", label: "- I want to optimize my intellectual performance as a student." },
        { value: "66b4e0b18596df14d43fa0c3", label: "- I want to fight against concentration and memory problems." },
        { value: "66b4e0b18596df14d43fa0c4", label: "- I wish to reduce my mental fatigue." },
        { value: "66b4e0b18596df14d43fa0c5", label: "- I want to be more resistant to distractions." },
        { value: "66b4e0b18596df14d43fa0c6", label: "- I want to avoid frequent headaches and migraines." },
      ],
    },
    { value: "66b4e13d8596df14d43fa110", label: "relaxation and sleep", 
      answers: [
        { value: "66b4e13d8596df14d43fa111", label: "- I feel overwhelmed and exhausted by stress." },
        { value: "66b4e13d8596df14d43fa113", label: "- I am constantly stressed and have trouble relaxing." },
        { value: "66b4e13d8596df14d43fa114", label: "- I wake up tired despite a full night's sleep." },
        { value: "66b4e13d8596df14d43fa115", label: "- I feel drowsy during the day." },
        { value: "66b4e13d8596df14d43fa116", label: "- I am going through a difficult period." },
      ],
    },
    { value: "66b4e2a28596df14d43fa118", label: "feminine and masculine health", 
      answers: [
        { value: "66b4e2a28596df14d43fa119", label: "- I want to solve the problem of painful or irregular periods." },
        { value: "66b4e2a28596df14d43fa11a", label: "- I wish to improve my fertility." },
        { value: "66b4e2a28596df14d43fa11b", label: "- I want to relieve premenstrual syndrome." },
        { value: "66b4e2a28596df14d43fa11c", label: "- I want to stimulate my lactation to breastfeed my baby." },
        { value: "66b4e2a28596df14d43fa11d", label: "- I want to boost my libido." },
        { value: "66b4e2a28596df14d43fa11e", label: "- I want to maintain my erection longer." },
      ],
    },
    { value: "66b4f6ef8596df14d43fa174", label: "beauty: hair, nails and skin", 
      answers: [
        { value: "66b4f6ef8596df14d43fa175", label: "My scalp is dry, irritated, or flaky." },
        { value: "66b4f6ef8596df14d43fa176", label: "My hair growth is not fast enough." },
        { value: "66b4f6ef8596df14d43fa177", label: "Slow nail growth" },
        { value: "66b4f6ef8596df14d43fa178", label: "Sensitive skin" },
        { value: "66b4f6ef8596df14d43fa179", label: "Acne-prone skin" },
      ],
    },
    { value: "66b4f76d8596df14d43fa204", label: "stomach and guts health", 
      answers: [
        { value: "66b4f76d8596df14d43fa205", label: "I have bloating, gas, or abdominal pain" },
        { value: "66b4f76d8596df14d43fa206", label: "I am constipated and have trouble going to the bathroom" },
        { value: "66b4f76d8596df14d43fa207", label: "I often feel nauseous" },
        { value: "66b4f76d8596df14d43fa208", label: "I have digestive spasms and abdominal pain" },
        { value: "66b4f76d8596df14d43fa209", label: "I have sensitive gums " },
      ],
    },
    { value: "66b4f7e88596df14d43fa27f", label: "heart and lungs health", 
      answers: [
        { value: "66b4f7e88596df14d43fa280", label: "I have high cholesterol levels" },
        { value: "66b4f7e88596df14d43fa281", label: "I have high and unstable blood pressure" },
        { value: "66b4f7e88596df14d43fa282", label: "I have a family history of heart disease" },
        { value: "66b4f7e88596df14d43fa283", label: "I have an irritative cough due to pollution or allergies." },
        { value: "66b4f7e88596df14d43fa284", label: "I have a dry, irritating cough." },
        { value: "66b4f7e88596df14d43fa285", label: "I have a wet cough with thick mucus." },
      ],
    },
    { value: "66b4f8308596df14d43fa300", label: "Bones and Joints", 
      answers: [
        { value: "66b4f8308596df14d43fa301", label: "I am worried about maintaining the flexibility and mobility of my joints." },
        { value: "66b4f8308596df14d43fa302", label: "I am an athlete and put a lot of stress on my joints." },
        { value: "66b4f8308596df14d43fa303", label: "I am concerned about my bone health." },
      ],
    },
    { value: "66b4fa598596df14d43fa381", label: "Weight loss and gain", 
      answers: [
        { value: "66b4fa598596df14d43fa382", label: "I lack appetite and feel nauseous." },
        { value: "66b4fa598596df14d43fa383", label: "I want to lose weight." },
        { value: "66b4fa598596df14d43fa384", label: "I struggle to maintain my weight (after reaching my goal)" },
        { value: "66b4fa598596df14d43fa385", label: "I want to control my sugar cravings." },
        { value: "66b4fa598596df14d43fa386", label: "I want to increase my basal metabolism." },
        { value: "66b4fa598596df14d43fa387", label: "I have trouble controlling my appetite." },
      ],
    },
  ],
  score: [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
  ],
  sport: [
    { value: "oui", label: "Oui" },
    { value: "non", label: "Non" },
  ],
  sun_exposition: [
    { value: "oui", label: "Oui" },
    { value: "non", label: "Non" },
  ],
  smoking: [
    { value: "66b4ddd48596df14d43fa0b3", label: "Yes" },
    { value: "66b4ddd48596df14d43fa0b4", label: "No" },
  ],
};

const AddMoleculePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    theme: "",
    answer: "",
    priority: "",
    score: "",
    age: [],
    sex: [],
    woman: [],
    pathology: [],
    medication: [],
    alcohol: [],
    smoking: [],
    diet: [],
    sport: [],
    sun_exposition: [],
    physical_activity: [],
    sleeping_habits: [],
    fruit_veg_per_day: [],
    freq_cons_sup_2: [],
    water_liters_per_day: [],
    eyes: [],
    stress: [],
  });

  const handleChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    if (Array.isArray(selectedOption)) {
      setFormData({
        ...formData,
        [name]: selectedOption.map((option) => option.value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: selectedOption ? selectedOption.value : "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createMolecule(formData);
      console.log("Form submitted successfully:", response.data);
      // Optionally, reset form or show success message
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally, show error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) =>
            handleChange({ value: e.target.value }, { name: "name" })
          }
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="theme" className="form-label">
          Theme
        </label>
        <Select
          name="theme"
          options={options.theme}
          classNamePrefix="select"
          value={options.theme.find(
            (option) => option.value === formData.theme,
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="answer" className="form-label">
          Answer
        </label>
        <Select
          name="answer"
          options={options.theme.find((t) => t.value===formData.theme)?.answers}
          classNamePrefix="select"
          value={options.theme.find((t) => t.value===formData.theme)?.answers?.find(
            (option) => option.value === formData.answer,
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="priority" className="form-label">
          Priority
        </label>
        <Select
          name="priority"
          options={options.priority}
          classNamePrefix="select"
          value={options.priority.find(
            (option) => option.value === formData.priority,
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="score" className="form-label">
          Score
        </label>
        <Select
          name="score"
          options={options.score}
          classNamePrefix="select"
          value={options.score.find(
            (option) => option.value === formData.score,
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <Select
          isMulti
          name="age"
          options={options.age}
          className="basic-multi-select"
          classNamePrefix="select"
          value={options.age.filter((option) =>
            formData.age.includes(option.value),
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="sex" className="form-label">
          Sex
        </label>
        <Select
          isMulti
          name="sex"
          options={options.sex}
          className="basic-multi-select"
          classNamePrefix="select"
          value={options.sex.filter((option) =>
            formData.sex.includes(option.value),
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="woman" className="form-label">
          Woman
        </label>
        <Select
          isMulti
          name="woman"
          options={options.woman}
          className="basic-multi-select"
          classNamePrefix="select"
          value={options.woman.filter((option) =>
            formData.woman.includes(option.value),
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="pathology" className="form-label">
          Pathologies
        </label>
        <Select
          isMulti
          name="pathology"
          options={options.pathology}
          className="basic-multi-select"
          classNamePrefix="select"
          value={options.pathology.filter((option) =>
            formData.pathology.includes(option.value),
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="medication" className="form-label">
          Medications
        </label>
        <Select
          isMulti
          name="medication"
          options={options.medication}
          className="basic-multi-select"
          classNamePrefix="select"
          value={options.medication.filter((option) =>
            formData.medication.includes(option.value),
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="alcohol" className="form-label">
          Alcohol
        </label>
        <Select
          isMulti
          name="alcohol"
          options={options.alcohol}
          classNamePrefix="select"
          value={options.alcohol.find(
            (option) => option.value === formData.alcohol,
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="smoking" className="form-label">
          Smoking
        </label>
        <Select
          isMulti
          name="smoking"
          options={options.smoking}
          classNamePrefix="select"
          value={options.smoking.find(
            (option) => option.value === formData.smoking,
          )}
          onChange={handleChange}
        />
      </div>
      {/*<div className="mb-3">
        <label htmlFor="diet" className="form-label">
          Régime alimentaire
        </label>
        <Select
          isMulti
          name="diet"
          options={options.diet}
          className="basic-multi-select"
          classNamePrefix="select"
          value={options.diet.filter((option) =>
            formData.diet.includes(option.value),
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="sport" className="form-label">
          Sport
        </label>
        <Select
          isMulti
          name="sport"
          options={options.sport}
          classNamePrefix="select"
          value={options.sport.find(
            (option) => option.value === formData.sport,
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="sun_exposition" className="form-label">
          Exposition au soleil
        </label>
        <Select
          isMulti
          name="sun_exposition"
          options={options.sun_exposition}
          classNamePrefix="select"
          value={options.sun_exposition.find(
            (option) => option.value === formData.sun_exposition,
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="physical_activity" className="form-label">
          Activité physique
        </label>
        <Select
          isMulti
          name="physical_activity"
          options={options.physical_activity}
          className="basic-multi-select"
          classNamePrefix="select"
          value={options.physical_activity.filter((option) =>
            formData.physical_activity.includes(option.value),
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="sleeping_habits" className="form-label">
          Habitudes de sommeil
        </label>
        <Select
          isMulti
          name="sleeping_habits"
          options={options.sleeping_habits}
          className="basic-multi-select"
          classNamePrefix="select"
          value={options.sleeping_habits.filter((option) =>
            formData.sleeping_habits.includes(option.value),
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="fruit_veg_per_day" className="form-label">
          Fruits et légumes par jour
        </label>
        <Select
          isMulti
          name="fruit_veg_per_day"
          options={options.fruit_veg_per_day}
          classNamePrefix="select"
          value={options.fruit_veg_per_day.find(
            (option) => option.value === formData.fruit_veg_per_day,
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="freq_cons_sup_2" className="form-label">
          Consommation fréquente (2 par semaine)
        </label>
        <Select
          isMulti
          name="freq_cons_sup_2"
          options={options.freq_cons_sup_2}
          className="basic-multi-select"
          classNamePrefix="select"
          value={options.freq_cons_sup_2.filter((option) =>
            formData.freq_cons_sup_2.includes(option.value),
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="water_liters_per_day" className="form-label">
          Litres d'eau par jour
        </label>
        <Select
          isMulti
          name="water_liters_per_day"
          options={options.water_liters_per_day}
          classNamePrefix="select"
          value={options.water_liters_per_day.find(
            (option) => option.value === formData.water_liters_per_day,
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="eyes" className="form-label">
          Yeux
        </label>
        <Select
          isMulti
          name="eyes"
          options={options.eyes}
          className="basic-multi-select"
          classNamePrefix="select"
          value={options.eyes.filter((option) =>
            formData.eyes.includes(option.value),
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="theme" className="form-label">
          Theme
        </label>
        <Select
          isMulti
          name="theme"
          options={options.theme}
          className="basic-multi-select"
          classNamePrefix="select"
          value={options.theme.filter((option) =>
            formData.theme.includes(option.value),
          )}
          onChange={handleChange}
        />
      </div>*/}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AddMoleculePage;
