import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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
    <div className="bg-4 text-1 rounded-2xl p-4 m-4 flex flex-row justify-between">
      <div className="py-4 px-6">
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
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <button className="p-2 rounded-xl hover:bg-3 transition ease-in-out duration-250" onClick={() => alert("Copied to clipboard!")}>
            <ContentCopyIcon/>
          </button>
        </div>
        <article className="prose prose-sm prose-invert px-2">
          <Markdown remarkPlugins={[remarkGfm]}>{ `
# NAME

*trait, trait, trait*

*meaning of name*

\`Genetic Information\`
> - **Species & Variant**: 
> - **Gender**: 
> - **Age**: XX season(s)
> - **Immune System Type**: N(eutral) / W(eak) / S(trong)
> - **Status**: alive/dead

\`milestones\`
> :BRONZEMEDAL:
>
> :SILVERMEDAL:
>
> :GOLDMEDAL: 
>
> :DIAMONDMEDAL: 

\`Appearance\`
> - **d**ominant skin: 
> - **r**ecessive skin(s): 
> - **eye-colour**: 
> - **mutations**: 

\`Family Tree\`   
> ♂ **father**: *NAME*
> - **skin**: [D] ... [R] ...
> - **eye-color**: 
> - **health, genes & mutation**: 
> 
> ♀ **mother**: *NAME*
> - **skin**: [D] ... [R] ...
> - **eye-color**: 
> - **health, genes & mutation**: 
>
> **clutchmates**
> ♀/♂ unknown

\`offspring\` 
**\`1st clutch\`**
> - **sire/dame**: [link to sheet]
> - :egg: • [name] | [gender] | [status]
> - :egg: • [name] | [gender] | [status]
> - :egg: • [name] | [gender] | [status]

**\`2nd clutch\`**
> - **sire/dame**: [link to sheet]
> - :egg: • [name] | [gender] | [status]
> - :egg: • [name] | [gender] | [status]
> - :egg: • [name] | [gender] | [status]

**\`3rd clutch\`**
> - **sire/dame**: [link to sheet]
> - :egg: • [name] | [gender] | [status]
> - :egg: • [name] | [gender] | [status]
> - :egg: • [name] | [gender] | [status]
          ` }</Markdown>
        </article>
      </div>
    </div>
  );
}

export default HomePage;