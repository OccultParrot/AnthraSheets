import {useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TextInput from "../inputs/TextInput.tsx";
import ListInput from "../inputs/ListInput.tsx";
import type {InputChangeEvent} from "../../config/types.ts";

interface FormState {
  name: string;
  traits: string[];
  description?: string;
  species: string;
  subspecies: string;
  gender: string;
  dominantSkin: string;
  recessiveSkins: string[];
  eyeColor: string;
  mutations: string[];
}

function HomePage() {
  
  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      try {
        navigator.clipboard.writeText(text).then(() => {
          alert("Copied to clipboard!")
        });
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    } else {
      alert("Clipboard API not supported.");
    }
  }

  const [ formData, setFormData ] = useState<FormState>({
    name: '',
    traits: [],
    species: '',
    subspecies: '',
    gender: '',
    dominantSkin: '',
    recessiveSkins: [],
    eyeColor: '',
    mutations: [],
  });

  const onChange = (e: InputChangeEvent<any>) => {
    const { name, value } = e;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  
  const markdownContent = `
# ${formData.name.trim()}

*${formData.traits.join(', ')}*

${formData.description ? `*${formData.description.trim()}*` : ''}

\`Genetic Information\`
> - **Species & Variant**: *${formData.species} ${formData.subspecies}*
> - **Gender**: ${formData.gender}
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
> - **d**ominant skin: ${formData.dominantSkin}
> - **r**ecessive skin(s): ${formData.recessiveSkins}
> - **eye-colour**: ${formData.eyeColor}
> - **mutations**: ${formData.mutations.length > 0 ? formData.mutations.join(', ') : 'none'}

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
> - :egg: • [name] | [gender] | [status]`

  return (
    <div className="bg-4 text-1 rounded-2xl p-4 m-4 flex flex-col md:flex-row md:justify-between ">
      <div className="py-4 px-6 w-auto md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Character Form</h2>
        
        <h3 className="text-lg font-bold mb-2 text-center">── General ──</h3>
        <TextInput label="Name" name="name" onChange={onChange}  />
        <TextInput label="Description" placeholder="Optional" name={"description"} onChange={onChange} />
        <ListInput label="Traits" name="traits" onChange={onChange} />

        <h3 className="text-lg font-bold mb-2 text-center">── Genetics ──</h3>
        <TextInput label="Species" name="species" onChange={onChange} />
        <TextInput label="Subspecies" name="subspecies" onChange={onChange} />
        <TextInput label="Gender" name="gender" onChange={onChange} />
        <TextInput label="Dominant Skin" name="dominantSkin" onChange={onChange} />
        <ListInput label="Recessive Skin(s)" name="recessiveSkins" onChange={onChange} />
        <TextInput label="Eye Color" name="eyeColor" onChange={onChange} />
        <ListInput label="Mutations" name="mutations" onChange={onChange} />
        
      </div>
      <div className="bg-5 p-4 rounded-lg w-auto md:w-1/2">
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <button className="p-2 rounded-xl hover:bg-3 transition ease-in-out duration-250"
                  onClick={ () => copyToClipboard(markdownContent) }>
            <ContentCopyIcon/>
          </button>
        </div>
        <article className="prose prose-sm prose-invert px-2">
          <Markdown remarkPlugins={ [ remarkGfm ] }>{markdownContent}</Markdown>
        </article>
      </div>
    </div>
  );
}

export default HomePage;