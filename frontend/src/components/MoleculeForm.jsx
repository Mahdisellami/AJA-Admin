import React, { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

// Options for each multi-select field
const options = {
  age: [
    { value: "Personnes âgées", label: "Personnes âgées" },
    { value: "adulte", label: "Adulte" },
    { value: "enfants", label: "Enfants" },
  ],
  sex: [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ],
  woman: [
    { value: "menopausé", label: "Menopausé" },
    { value: "age de procreer", label: "Age de procreer" },
    { value: "Procréation planifiée", label: "Procréation planifiée" },
    { value: "Allaitante", label: "Allaitante" },
    { value: "Enceinte", label: "Enceinte" },
  ],
  pathology: [
    { value: "Hypertension", label: "Hypertension" },
    { value: "diabetes", label: "Diabet" },
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
    { value: "entrainement sport actif", label: "Entrainement sport actif" },
    { value: "rythme de vie actif", label: "Rythme de vie actif" },
    { value: "sédentaire", label: "Sédentaire" },
  ],
  sleeping_habits: [
    { value: "Apnée du sommeil", label: "Apnée du sommeil" },
    { value: "insomnie", label: "Insomnie" },
    { value: "Décallage horraire", label: "Décallage horraire" },
    { value: "sommeil perturbé", label: "Sommeil perturbé" },
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
  freqConsSup2: [
    { value: "Poisson", label: "Poisson" },
    { value: "Viande rouge", label: "Viande rouge" },
    { value: "Volaille", label: "Volaille" },
    { value: "Produits laitiers", label: "Produits laitiers" },
  ],
  water_liters_per_day: [
    { value: "<0.5L", label: "<0.5L" },
    { value: "0.5-1L", label: "0.5-1L" },
    { value: "1-2L", label: "1-2L" },
  ],
  eyes: [
    { value: "pas de trouble visuelle", label: "Pas de trouble visuelle" },
    { value: "Myopie", label: "Myopie" },
    { value: "hypermétropie", label: "Hypermétropie" },
    { value: "Astigmatisme", label: "Astigmatisme" },
    { value: "Presbytie", label: "Presbytie" },
  ],
  stress: [
    { value: "Oui", label: "Oui" },
    { value: "Non", label: "Non" },
  ],
  theme: [
    { value: "stress", label: "Stress" },
    { value: "sommeil", label: "Sommeil" },
    { value: "energy", label: "Energy" },
    { value: "immunity", label: "Immunity" },
  ],
};

const MoleculeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: [],
    sex: [],
    woman: [],
    pathology: [],
    medication: [],
    alcool: [],
    smoking: false,
    diet: [],
    sport_activity: false,
    sun_exposition: false,
    physical_activity: [],
    sleeping_habits: [],
    fruit_veg_per_day: [],
    freq_cons_sup_2: [],
    water_liters_per_day: [],
    eyes: [],
    stress: [],
    score: 0,
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="name" className="form-label">
            Nom
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
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
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
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
        {formData.sex.includes("female") && (
          <div className="col-md-6 mb-3">
            <label htmlFor="woman" className="form-label">
              Femme
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
              required
            />
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="pathology" className="form-label">
            Pathologie
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
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="medication" className="form-label">
            Médicament
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
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="alcool" className="form-label">
            Alcool
          </label>
          <Select
            isMulti
            name="alcool"
            options={options.alcool}
            className="basic-multi-select"
            classNamePrefix="select"
            value={options.alcool.filter((option) =>
              formData.alcool.includes(option.value),
            )}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="diet" className="form-label">
            Régime
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
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
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
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="sleeping_habits" className="form-label">
            Sommeil
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
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="fruit_veg_per_day" className="form-label">
            Fruits et légumes par jour
          </label>
          <Select
            isMulti
            name="fruit_veg_per_day"
            options={options.fruit_veg_per_day}
            className="basic-multi-select"
            classNamePrefix="select"
            value={options.fruit_veg_per_day.filter((option) =>
              formData.fruit_veg_per_day.includes(option.value),
            )}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="freq_cons_sup_2" className="form-label">
            Fréquence de consommation de suppléments
          </label>
          <Select
            isMulti
            name="freq_cons_sup_2"
            options={options.freqConsSup2}
            className="basic-multi-select"
            classNamePrefix="select"
            value={options.freqConsSup2.filter((option) =>
              formData.freq_cons_sup_2.includes(option.value),
            )}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="water_liters_per_day" className="form-label">
            Litres d'eau par jour
          </label>
          <Select
            isMulti
            name="water_liters_per_day"
            options={options.water_liters_per_day}
            className="basic-multi-select"
            classNamePrefix="select"
            value={options.water_liters_per_day.filter((option) =>
              formData.water_liters_per_day.includes(option.value),
            )}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
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
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="stress" className="form-label">
            Stress
          </label>
          <Select
            isMulti
            name="stress"
            options={options.stress}
            className="basic-multi-select"
            classNamePrefix="select"
            value={options.stress.filter((option) =>
              formData.stress.includes(option.value),
            )}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
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
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="score" className="form-label">
            Score
          </label>
          <input
            type="number"
            className="form-control"
            id="score"
            name="score"
            value={formData.score}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default MoleculeForm;
