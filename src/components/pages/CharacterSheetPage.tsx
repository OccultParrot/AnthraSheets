import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Icons
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Input Components
import TextInput from "../inputs/TextInput.tsx";
import ListInput from "../inputs/ListInput.tsx";
import NumberInput from "../inputs/NumberInput.tsx";

// Types
import type { Clutch, Clutchmate, Egg, FormState, InputChangeEvent } from "../../types.ts";

function CharacterSheetPage() {
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
    age: 0,
    traits: [],
    status: '',
    bronzeMileStone: '',
    silverMileStone: '',
    goldMileStone: '',
    diamondMileStone: '',
    species: '',
    subspecies: '',
    gender: '',
    dominantSkin: '',
    recessiveSkins: [],
    eyeColor: '',
    mutations: [],
    fatherName: '',
    fatherDominantSkin: '',
    fatherRecessiveSkins: [],
    fatherEyeColor: '',
    fatherHealthGenesMutations: '',
    motherName: '',
    motherDominantSkin: '',
    motherRecessiveSkins: [],
    motherEyeColor: '',
    motherHealthGenesMutations: '',
    clutchmates: [],
    clutches: [],
  });

  const [ clutchmates, setClutchmates ] = useState<Clutchmate[]>([]);
  const [ clutches, setClutches ] = useState<Clutch[]>([]);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      clutchmates: clutchmates
    }));
  }, [ clutchmates ]);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      clutches: clutches
    }))
  }, [ clutches ])

  const appendClutchmate = () => {
    setClutchmates(prev => [ ...prev, { name: '', sex: '' } ]);
  }

  const updateClutchmate = (index: number, field: keyof Clutchmate, value: string) => {
    setClutchmates(prev =>
      prev.map((clutchmate, i) =>
        i === index ? { ...clutchmate, [field]: value } : clutchmate
      )
    );
  };

  const appendClutch = () => {
    setClutches(prev => [ ...prev, { partner: '', partnerLink: '', eggCount: 0, eggs: [] } ]);
  }

  const updateClutch = (index: number, field: keyof Clutch, value: string | number) => {
    setClutches(prev =>
      prev.map((clutch, i) => {
        if (i === index) {
          const updatedClutch = { ...clutch, [field]: value };
          
          if (field === 'eggCount') {
            const newEggCount = value as number;
            const currentEggs = clutch.eggs;

            if (newEggCount > currentEggs.length) {
              const eggsToAdd = newEggCount - currentEggs.length;
              const newEggs = Array.from({ length: eggsToAdd }, () => ({
                name: '',
                gender: '',
                status: ''
              }));
              updatedClutch.eggs = [ ...currentEggs, ...newEggs ];
            } else if (newEggCount < currentEggs.length) {
              updatedClutch.eggs = currentEggs.slice(0, newEggCount);
            }
          }

          return updatedClutch;
        }
        return clutch;
      })
    );
  }

  const updateEgg = (clutchIndex: number, eggIndex: number, field: keyof Egg, value: string) => {
    setClutches(prev =>
      prev.map((clutch, i) => {
        if (i === clutchIndex) {
          const updatedEggs = clutch.eggs.map((egg, j) =>
            j === eggIndex ? { ...egg, [field]: value } : egg
          );
          return { ...clutch, eggs: updatedEggs };
        }
        return clutch;
      })
    );
  };

  const onChange = (e: InputChangeEvent<any>) => {
    const { name, value } = e;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const generateClutchmatesMarkdown = () => {
    if (clutchmates.length === 0) {
      return '>\n> ♀/♂ unknown';
    }

    return clutchmates.map((clutchmate) => {
      const genderSymbol = clutchmate.sex.toLowerCase() === 'male' ? '♂' :
        clutchmate.sex.toLowerCase() === 'female' ? '♀' : '♀/♂';
      const nameDisplay = clutchmate.name || 'unknown';
      const linkDisplay = clutchmate.link ? `[${ nameDisplay }](${ clutchmate.link })` : nameDisplay;

      return `>\n> ${ genderSymbol } ${ linkDisplay }`;
    }).join('\n');
  };

  const generateClutchesMarkdown = () => {
    if (clutches.length === 0) {
      return `**\`1st clutch\`**
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
> - :egg: • [name] | [gender] | [status]`;
    }

    return clutches.map((clutch, index) => {
      const clutchNumber = index + 1;
      const ordinalSuffix = clutchNumber === 1 ? 'st' : clutchNumber === 2 ? 'nd' : clutchNumber === 3 ? 'rd' : 'th';

      const partnerDisplay = clutch.partnerLink ?
        `[${ clutch.partner || 'partner' }](${ clutch.partnerLink })` :
        (clutch.partner || '[link to sheet]');

      const eggsMarkdown = clutch.eggs.length > 0 ?
        clutch.eggs.map(egg => {
          const nameDisplay = egg.name || '[name]';
          const genderDisplay = egg.gender.toLowerCase() === 'male' ? '♂' :
            egg.gender.toLowerCase() === 'female' ? '♀' : '♀/♂';
          const statusDisplay = egg.status || '[status]';
          const linkDisplay = egg.link ? `[${ nameDisplay }](${ egg.link })` : nameDisplay;
          return `> - :egg: • ${ linkDisplay } | ${ genderDisplay } | ${ statusDisplay }`;
        }).join('\n') :
        `> - :egg: • [name] | [gender] | [status]`;

      return `**\`${ clutchNumber }${ ordinalSuffix } clutch\`**
> - **sire/dame**: ${ partnerDisplay }
${ eggsMarkdown }`;
    }).join('\n\n');
  };

  const markdownContent = `
# ${ formData.name.trim() }

*${ formData.traits.join(', ') }*

${ formData.description ? `*${ formData.description.trim() }*` : '' }

\`Genetic Information\`
> - **Species & Subspecies**: *${ formData.species } ${ formData.subspecies }*
> - **Gender**: ${ formData.gender }
> - **Age**: ${ formData.age } season${ formData.age <= 1 ? '' : 's' }
> - **Immune System Type**: N(eutral) / W(eak) / S(trong)
> - **Status**: ${formData.status}

\`milestones\`
> :BRONZEMEDAL: ${formData.bronzeMileStone}
>
> :SILVERMEDAL: ${formData.silverMileStone}
>
> :GOLDMEDAL: ${formData.goldMileStone}
>
> :DIAMONDMEDAL: ${formData.diamondMileStone}

\`Appearance\`
> - **d**ominant skin: ${ formData.dominantSkin }
> - **r**ecessive skin(s): ${ formData.recessiveSkins }
> - **eye-colour**: ${ formData.eyeColor }
> - **mutations**: ${ formData.mutations.length > 0 ? formData.mutations.join(', ') : 'none' }

\`Family Tree\`   
> ♂ **father**: *${ formData.fatherLink ? `[${ formData.fatherName }](${ formData.fatherLink })` : formData.fatherName }*
> - **skin**: [D] ${ formData.fatherDominantSkin } [R] ${ formData.fatherRecessiveSkins.join(', ') }
> - **eye-color**: ${ formData.fatherEyeColor }
> - **health, genes & mutation**: ${ formData.fatherHealthGenesMutations }
> 
> ♀ **mother**: *${ formData.motherLink ? `[${ formData.motherName }](${ formData.motherLink })` : formData.motherName }*
> - **skin**: [D] ${ formData.motherDominantSkin } [R] ${ formData.motherRecessiveSkins.join(', ') }
> - **eye-color**: ${ formData.motherEyeColor }
> - **health, genes & mutation**: ${ formData.motherHealthGenesMutations }
>
> **clutchmates**
${ generateClutchmatesMarkdown() }

\`offspring\` 
${ generateClutchesMarkdown() }`

  return (
    <div className="bg-4 text-1 rounded-2xl p-4 m-4 flex flex-col md:flex-row md:justify-between ">
      <div className="py-4 px-6 w-auto md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Character Form</h2>

        <h3 className="text-lg font-bold mb-2 text-center">── General ──</h3>
        <TextInput label="Name" name="name" onChange={ onChange }/>
        <TextInput label="Description" placeholder="Optional" name={ "description" } onChange={ onChange }/>
        <ListInput label="Traits" name="traits" onChange={ onChange }/>
        <NumberInput label="Age" name="age" onChange={ onChange }/>
        <TextInput label="Status" name="status" onChange={ onChange } placeholder="Alive or Dead"/>
        
        <h3 className="text-lg font-bold mb-2 text-center">── Milestones ──</h3>
        <TextInput name="bronzeMilestone" onChange={onChange} />
        <TextInput name="silverMilestone" onChange={onChange} />
        <TextInput name="goldMilestone" onChange={onChange} />
        <TextInput name="diamondMilestone" onChange={onChange} />

        <h3 className="text-lg font-bold mb-2 text-center">── Genetics ──</h3>
        <TextInput label="Species" name="species" onChange={ onChange }/>
        <TextInput label="Subspecies" name="subspecies" onChange={ onChange }/>
        <TextInput label="Gender" name="gender" onChange={ onChange }/>
        <TextInput label="Dominant Skin" name="dominantSkin" onChange={ onChange }/>
        <ListInput label="Recessive Skin(s)" name="recessiveSkins" onChange={ onChange }/>
        <TextInput label="Eye Color" name="eyeColor" onChange={ onChange }/>
        <ListInput label="Mutations" name="mutations" onChange={ onChange }/>

        <h3 className="text-lg font-bold mb-2 text-center">── Family Tree ──</h3>
        <h4 className="text-md font-bold mb-2">Father</h4>
        <TextInput label="Name" name="fatherName" onChange={ onChange }/>
        <TextInput label="Link to Sheet" name="fatherLink" onChange={ onChange } placeholder="Optional"/>
        <TextInput label="Dominant Skin" name="fatherDominantSkin" onChange={ onChange }/>
        <ListInput label="Recessive Skins" name="fatherRecessiveSkins" onChange={ onChange }/>
        <TextInput label="Eye Color" name="fatherEyeColor" onChange={ onChange }/>
        <TextInput label="Health, Genes & Mutations" name="fatherHealthGenesMutations" onChange={ onChange }/>

        <h4 className="text-md font-bold mb-2">Mother</h4>
        <TextInput label="Name" name="motherName" onChange={ onChange }/>
        <TextInput label="Link to Sheet" name="motherLink" onChange={ onChange } placeholder="Optional"/>
        <TextInput label="Dominant Skin" name="motherDominantSkin" onChange={ onChange }/>
        <ListInput label="Recessive Skins" name="motherRecessiveSkins" onChange={ onChange }/>
        <TextInput label="Eye Color" name="motherEyeColor" onChange={ onChange }/>
        <TextInput label="Health, Genes & Mutations" name="motherHealthGenesMutations" onChange={ onChange }/>

        <h4 className="text-md font-bold mb-2">Clutchmates</h4>
        <ul>
          { clutchmates.map((clutchmate, index) => (
            <div className="rounded-2xl p-4 flex flex-col bg-5 justify-between mb-2" key={ index }>
              <div className="flex justify-between items-center w-full mb-2">
                <h5 className="text-md font-bold">{ clutchmate.name || `Clutchmate ${ index + 1 }` }</h5>
                <button onClick={ () => {
                  setClutchmates(prev => prev.filter((_, i) => i !== index));
                } }
                        className="flex items-center justify-center w-8 h-8 bg-5 rounded-full cursor-pointer hover:bg-3 transition ease-in-out duration-250">
                  <RemoveIcon/>
                </button>
              </div>
              <TextInput
                label="Name"
                name="name"
                onChange={ (e) => updateClutchmate(index, 'name', e.value) }
              />
              <TextInput
                label="Gender"
                name="sex"
                onChange={ (e) => updateClutchmate(index, 'sex', e.value) }
              />
              <TextInput
                label="Link"
                name="link"
                placeholder="Optional"
                onChange={ (e) => updateClutchmate(index, 'link', e.value) }
              />
            </div>
          )) }
        </ul>
        <div className="flex justify-center">
          <button onClick={ appendClutchmate }
                  className="flex items-center justify-center w-8 h-8 bg-4 rounded-full cursor-pointer hover:bg-3 transition ease-in-out duration-250 mr-2">
            <AddIcon/>
          </button>
        </div>

        <h4 className="text-md font-bold mb-2">Clutches</h4>
        <ul>
          { clutches.map((clutch, index) => (
            <div className="rounded-2xl p-4 flex flex-col bg-5 justify-between mb-2" key={ index }>
              <div className="flex justify-between items-center w-full mb-2">
                <h5 className="text-md font-bold">{ `Clutch ${ index + 1 }` }</h5>
                <button onClick={ () => {
                  setClutches(prev => prev.filter((_, i) => i !== index));
                } }
                        className="flex items-center justify-center w-8 h-8 bg-5 rounded-full cursor-pointer hover:bg-3 transition ease-in-out duration-250">
                  <RemoveIcon/>
                </button>
              </div>
              <TextInput
                label="Partner"
                name="partner"
                onChange={ (e) => updateClutch(index, 'partner', e.value) }
              />
              <TextInput
                label="Link to partner's sheet"
                name="link"
                placeholder="Optional"
                onChange={ (e) => updateClutch(index, 'partnerLink', e.value) }
              />
              <NumberInput
                label="Egg Count"
                name="eggCount"
                onChange={ (e) => updateClutch(index, 'eggCount', e.value) }/>

              { clutch.eggs.map((_, eggIndex) => (
                <div key={ eggIndex } className="bg-4 rounded-xl p-3 mt-2">
                  <h6 className="text-sm font-bold mb-2">Egg { eggIndex + 1 }</h6>
                  <TextInput
                    label="Name"
                    name="name"
                    placeholder="Optional"
                    onChange={ (e) => updateEgg(index, eggIndex, 'name', e.value) }
                  />
                  <TextInput
                    label="Link"
                    name="link"
                    placeholder="Optional"
                    onChange={ (e) => updateEgg(index, eggIndex, 'link', e.value) }
                  />
                  <TextInput
                    label="Gender"
                    name="gender"
                    onChange={ (e) => updateEgg(index, eggIndex, 'gender', e.value) }
                  />
                  <TextInput
                    label="Status"
                    name="status"
                    placeholder="alive/dead"
                    onChange={ (e) => updateEgg(index, eggIndex, 'status', e.value) }
                  />
                </div>
              )) }
            </div>
          )) }
        </ul>
        <div className="flex justify-center">
          <button onClick={ appendClutch }
                  className="flex items-center justify-center w-8 h-8 bg-4 rounded-full cursor-pointer hover:bg-3 transition ease-in-out duration-250 mr-2">
            <AddIcon/>
          </button>
        </div>


      </div>
      <div className="bg-5 p-4 rounded-lg w-auto md:w-1/2">
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <button className="p-2 rounded-xl hover:bg-3 transition ease-in-out duration-250 cursor-pointer"
                  onClick={ () => copyToClipboard(markdownContent) }>
            <ContentCopyIcon/>
          </button>
        </div>
        <article className="prose prose-sm prose-invert px-2">
          <Markdown remarkPlugins={ [ remarkGfm ] }>{ markdownContent }</Markdown>
        </article>
      </div>
    </div>
  );
}

export default CharacterSheetPage;