import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface FormOptionProps {
  label: string;
  name: string;
  type: string;
  required: boolean;
}

function FormOption({ label, name, type, required }: FormOptionProps) {
  return (
    <div className="mb-4 flex flex-row items-center">
      <label className="block text-sm font-medium text-1 mb-2">{ label }:</label>
      <input
        name={ name }
        type={ type }
        required={ required }
        className="h-8 ml-2 w-fit p-2 bg-3 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
      />
    </div>
  );
}

function HomePage() {
  const [ formData, setFormData ] = useState({
    name: '',
    traits: [],
    genetics: {
      species: '',
      subSpecies: '',
      gender: '',
      age: 0,
      immuneSystem: '',
      status: ''
    },
    milestones: [],
    appearance: {
      dominantSkin: '',
      recessiveSkin: '',
      eyeColor: '',
      mutations: []
    },
    family: {
      father: {
        name: '',
        dominantSkin: '',
        recessiveSkin: '',
        eyeColor: '',
        subspecies: '',
        immuneSystem: '',
        traits: [],
        mutations: []
      },
      mother: {
        name: '',
        dominantSkin: '',
        recessiveSkin: '',
        eyeColor: '',
        subspecies: '',
        immuneSystem: '',
        traits: [],
        mutations: []
      },
      siblings: [],
      offspring: []
    }
  });

  return (
    <div className="bg-4 text-1 rounded-2xl p-4 m-4 flex flex-row items-center justify-between">
      <div>
        <h2 className="text-xl font-bold mb-4">Character Form</h2>
        <FormOption label="Name" name="name" type="text" required/>
        <FormOption label="Species" name="species" type="text" required/>
        <FormOption label="Subspecies" name="subspecies" type="text" required/>
        <FormOption label="Gender" name="gender" type="text" required/>
        <FormOption label="Age" name="age" type="number" required/>
        <FormOption label="Immune System" name="immuneSystem" type="text" required/>
        <FormOption label="Status" name="status" type="text" required/>
      </div>
      <div className="bg-5 p-4 rounded-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        <br />
        <Markdown remarkPlugins={[remarkGfm]}></Markdown>
      </div>
    </div>
  );
}

export default HomePage;