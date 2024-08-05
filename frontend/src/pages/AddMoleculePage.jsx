import React, { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { createMolecule } from "../services/MoleculeService"; // Import the API method

// Options for each multi-select field
const options = {
  age: [
    { value: "Personnes âgées", label: "Personnes âgées" },
    { value: "adulte", label: "Adulte" },
    { value: "enfants", label: "Enfants" },
  ],
  sex: [
    { value: "homme", label: "Homme" },
    { value: "femme", label: "Femme" },
  ],
  woman: [
    { value: "menopausé", label: "Ménopausé" },
    { value: "age de procreer", label: "Âge de procréer" },
    { value: "Procréation planifiée", label: "Procréation planifiée" },
    { value: "Allaitante", label: "Allaitante" },
    { value: "Enceinte", label: "Enceinte" },
  ],
  pathology: [
    { value: "Hypertension", label: "Hypertension" },
    { value: "diabetes", label: "Diabète" },
    { value: "tachycardia", label: "Tachycardie" },
  ],
  medication: [
    { value: "Anticoagulants", label: "Anticoagulants" },
    { value: "Antidiabétiques", label: "Antidiabétiques" },
    { value: "Antihypertenseurs", label: "Antihypertenseurs" },
    { value: "Antidépresseurs", label: "Antidépresseurs" },
    { value: "antibiotique", label: "Antibiotique" },
    { value: "autre", label: "Autre" },
  ],
  alcool: [
    { value: "non", label: "Non" },
    { value: "moyen", label: "Moyen" },
    { value: "hardcore", label: "Hardcore" },
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
    { value: "stress", label: "Stress" },
    { value: "sommeil", label: "Sommeil" },
    { value: "energy", label: "Energy" },
    { value: "immunity", label: "Immunity" },
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
    { value: "oui", label: "Oui" },
    { value: "non", label: "Non" },
  ],
};

const AddMoleculePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: [],
    sex: [],
    woman: [],
    pathology: [],
    medication: [],
    alcool: [],
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
    score: "",
    theme: [],
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
          Nom
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
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="sex" className="form-label">
          Sexe
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
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="woman" className="form-label">
          Femmes
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
          Médicaments
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
        <label htmlFor="alcool" className="form-label">
          Consommation d'alcool
        </label>
        <Select
          isMulti
          name="alcool"
          options={options.alcool}
          classNamePrefix="select"
          value={options.alcool.find(
            (option) => option.value === formData.alcool,
          )}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="smoking" className="form-label">
          Tabagisme
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
      <div className="mb-3">
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
          Thème
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
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AddMoleculePage;
