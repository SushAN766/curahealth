
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Define a simple mapping of symptoms to potential conditions
const symptomToDiseaseMap: Record<string, string[]> = {
  "fever": ["Common Cold", "Flu", "COVID-19", "Dengue"],
  "headache": ["Migraine", "Tension Headache", "Sinusitis", "Flu"],
  "cough": ["Common Cold", "Bronchitis", "COVID-19", "Asthma"],
  "sore throat": ["Strep Throat", "Common Cold", "Tonsillitis", "Laryngitis"],
  "runny nose": ["Common Cold", "Allergic Rhinitis", "Sinusitis"],
  "fatigue": ["Anemia", "Depression", "Chronic Fatigue Syndrome", "Flu", "COVID-19"],
  "nausea": ["Food Poisoning", "Gastroenteritis", "Morning Sickness", "Migraine"],
  "vomiting": ["Food Poisoning", "Gastroenteritis", "Norovirus", "Motion Sickness"],
  "diarrhea": ["Food Poisoning", "Irritable Bowel Syndrome", "Gastroenteritis"],
  "shortness of breath": ["Asthma", "Pneumonia", "COVID-19", "Heart Failure"],
  "chest pain": ["Angina", "Heart Attack", "Pneumonia", "Acid Reflux"],
  "dizziness": ["Vertigo", "Low Blood Pressure", "Anemia", "Dehydration"],
  "rash": ["Eczema", "Psoriasis", "Allergic Reaction", "Chickenpox"],
  "joint pain": ["Arthritis", "Gout", "Lupus", "Lyme Disease"],
  "abdominal pain": ["Appendicitis", "Gallstones", "Irritable Bowel Syndrome", "Gastritis"],
  "muscle aches": ["Flu", "Fibromyalgia", "COVID-19", "Lyme Disease"],
  "chills": ["Flu", "Pneumonia", "Malaria", "COVID-19"],
  "loss of taste": ["COVID-19", "Zinc Deficiency", "Common Cold"],
  "loss of smell": ["COVID-19", "Nasal Polyps", "Common Cold", "Sinusitis"],
  "sinus pressure": ["Sinusitis", "Allergies", "Common Cold"],
  "ear pain": ["Ear Infection", "Swimmer's Ear", "Temporomandibular Joint Syndrome"],
  "back pain": ["Muscle Strain", "Herniated Disc", "Sciatica", "Kidney Infection"],
  "itching": ["Allergic Reaction", "Eczema", "Psoriasis", "Dry Skin"],
  "swelling": ["Injury", "Infection", "Allergic Reaction", "Lymphedema"],
  "insomnia": ["Anxiety", "Depression", "Sleep Apnea", "Stress"]
};

const Predictor = () => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddSymptom = () => {
    if (!inputValue.trim()) {
      toast.error("Please enter a symptom");
      return;
    }
    
    if (symptoms.includes(inputValue.trim())) {
      toast.error("This symptom is already in the list");
      return;
    }
    
    setSymptoms([...symptoms, inputValue.trim().toLowerCase()]);
    setInputValue("");
    
    // Focus the input field after adding
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    toast.success("Symptom added successfully");
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddSymptom();
    }
  };

  const handleRemoveSymptom = (symptomToRemove: string) => {
    setSymptoms(symptoms.filter(symptom => symptom !== symptomToRemove));
    toast.info("Symptom removed");
  };

  const predictDisease = (symptomsList: string[]): string => {
    // If no symptoms, return no prediction
    if (symptomsList.length === 0) {
      return "No symptoms provided";
    }

    // Count occurrences of each possible disease
    const diseaseCounts: Record<string, number> = {};
    
    // Go through each symptom and get possible diseases
    symptomsList.forEach(symptom => {
      // Check if the symptom is in our map
      const possibleDiseases = symptomToDiseaseMap[symptom] || [];
      
      // Increment count for each possible disease
      possibleDiseases.forEach(disease => {
        diseaseCounts[disease] = (diseaseCounts[disease] || 0) + 1;
      });
    });
    
    // No matches found in our database
    if (Object.keys(diseaseCounts).length === 0) {
      return "Unknown condition. Please consult a doctor.";
    }
    
    // Find the disease(s) with the highest count
    const maxCount = Math.max(...Object.values(diseaseCounts));
    const topDiseases = Object.keys(diseaseCounts).filter(
      disease => diseaseCounts[disease] === maxCount
    );
    
    // If there's only one top disease or we have many symptoms and a strong match
    if (topDiseases.length === 1 || (symptomsList.length >= 3 && maxCount >= 2)) {
      return `Based on your symptoms, it might be: ${topDiseases[0]}`;
    } else {
      // Multiple possible diseases with equal likelihood
      return `Possible conditions include: ${topDiseases.join(", ")}`;
    }
  };

  const handlePredict = () => {
    const result = predictDisease(symptoms);
    setPrediction(result);
    toast.success("Prediction complete");
  };

  const handleClearSymptoms = () => {
    setSymptoms([]);
    setPrediction(null);
    toast.info("All symptoms cleared");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1">
            
            <div className="relative">
              <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter your symptoms.."
                className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medware-primary"
              />
            </div>
          </div>

          <Button 
            onClick={handleAddSymptom}
            className="bg-medware-primary hover:bg-medware-secondary text-white"
          >
            <Plus className="mr-1 h-4 w-4" />
            ADD
          </Button>
        </div>
    
         <div className="flex justify-center mb-8">
                <img 
                  src="\assets\images\modal.svg" 
                  alt="" 
                  className="max-w-md w-full h-auto"
                />
              </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-green-50 border-green-100 min-h-[300px]">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Your Symptoms</h2>
              
              {symptoms.length === 0 ? (
                <div className="flex items-center justify-center h-40 text-gray-500 italic">
                  Add your first symptom
                </div>
              ) : (
                <ul className="space-y-2">
                  {symptoms.map((symptom, index) => (
                    <li key={index} className="p-2 bg-white rounded flex justify-between items-center">
                      <span>{symptom}</span>
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveSymptom(symptom)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              
              <div className="flex gap-4 mt-8">
                <Button 
                  onClick={handlePredict}
                  disabled={symptoms.length === 0}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  PREDICT
                </Button>
                <Button 
                  onClick={handleClearSymptoms}
                  disabled={symptoms.length === 0}
                  variant="outline" 
                  className="flex-1 border-red-300 text-red-500 hover:bg-red-50"
                >
                  CLEAR SYMPTOMS
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 border-blue-100 min-h-[300px]">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Predicted Result</h2>
              
              <div className="flex items-center justify-center h-40 text-center">
                {prediction ? (
                  <div className="text-lg font-medium">{prediction}</div>
                ) : (
                  <div className="text-gray-500 italic">No prediction yet</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Predictor;
