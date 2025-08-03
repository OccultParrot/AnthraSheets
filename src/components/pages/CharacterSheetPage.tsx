import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Icons
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';

// Input Components
import TextInput from "../inputs/TextInput.tsx";
import ListInput from "../inputs/ListInput.tsx";
import NumberInput from "../inputs/NumberInput.tsx";

// Types
import type { Clutch, Clutchmate, Egg, FormState, InputChangeEvent } from "../../types.ts";

function CharacterSheetPage() {
  const importData = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        setFormData(data);
        setClutchmates(data.clutchmates);
        setClutches(data.clutches);
      } catch (err) {
        console.error("Error parsing JSON file:", err);
        alert("Failed to import data. Please ensure the file is a valid .asheet or .json file.");
        return;
      }
    }

    reader.readAsText(file);
  }

  const exportData = () => {
    // Converting formData to JSON and creating a Blob for download
    const blob = new Blob([ JSON.stringify(formData, null, 2) ], { type: 'application/json' });
    // Creating a link to download the Blob
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const date = new Date();
    a.download = `${ formData.name.trim() || 'character' }-${ date.getMonth() }_${ date.getDate() }_${ date.getFullYear() }|${ date.getTime() }.asheet`;
    document.body.appendChild(a);
    // Triggering the download
    a.click();
    // Cleanup: removing the link and revoking the object URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("Data exported successfully!");
  }

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
    immuneSystem: '',
    bronzeMilestone: '',
    silverMilestone: '',
    goldMilestone: '',
    diamondMilestone: '',
    species: '',
    subspecies: '',
    gender: '',
    dominantSkin: '',
    recessiveSkins: [  ],
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
  // Ignore error this, Just linter being pissed at me for using any instead of specifying types
  const onChange = (e: InputChangeEvent<any>) => {
    const { name, value } = e;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const generateClutchmatesMarkdown = () => {
    if (clutchmates.length === 0) {
      return '';
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
      return '';
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

\`genetic information\`
> - **species & subspecies**: *${ formData.species } ${ formData.subspecies }*
> - **gender**: ${ formData.gender }
> - **age**: ${ formData.age } season${ formData.age <= 1 ? '' : 's' }
> - **immune system type**: ${ formData.immuneSystem }
> - **status**: ${ formData.status }

\`milestones\`
> :BRONZEMEDAL: ${ formData.bronzeMilestone }

> :SILVERMEDAL: ${ formData.silverMilestone }

> :GOLDMEDAL: ${ formData.goldMilestone }

> :DIAMONDMEDAL: ${ formData.diamondMilestone }

\`appearance\`
> - **dominant skin**: ${ formData.dominantSkin }
> - **recessive skin(s)**: ${ formData.recessiveSkins }
> - **eye color**: ${ formData.eyeColor }
> - **mutations**: ${ formData.mutations.length > 0 ? formData.mutations.join(', ') : 'none' }

\`family tree\`   
> ♂ **father**: *${ formData.fatherLink ? `[${ formData.fatherName }](${ formData.fatherLink })` : formData.fatherName }*
> - **skin**: [D] ${ formData.fatherDominantSkin } [R] ${ formData.fatherRecessiveSkins.join(', ') }
> - **eye color**: ${ formData.fatherEyeColor }
> - **health, genes & mutation**: ${ formData.fatherHealthGenesMutations }
> 
> ♀ **mother**: *${ formData.motherLink ? `[${ formData.motherName }](${ formData.motherLink })` : formData.motherName }*
> - **skin**: [D] ${ formData.motherDominantSkin } [R] ${ formData.motherRecessiveSkins.join(', ') }
> - **eye color**: ${ formData.motherEyeColor }
> - **health, genes & mutation**: ${ formData.motherHealthGenesMutations }

${ formData.linkToClutch ? `> [link to clutch](${ formData.linkToClutch })` : '' }

${ formData.clutchmates.length > 0 ? `> **Clutchmates:**\n${ generateClutchmatesMarkdown() }` : '' }

${ formData.clutches.length > 0 ? `\n\n**Clutches:**\n${ generateClutchesMarkdown() }` : '' }`

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  }


  return (
    <div className="bg-4 text-1 rounded-2xl p-4 m-4 flex flex-col md:flex-row md:justify-between ">
      {/*Hidden File Input */ }
      <input type="file" accept=".asheet,.json" style={ { display: "none" } } ref={ fileInputRef }
             onChange={ importData }/>
      <div className="py-4 px-6 w-auto md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Character Form</h2>
        <div className="flex flex-row justify-between lg:justify-center mb-4">
          <button onClick={ handleFileInputClick }
                  className="p-2 mr-4 rounded-xl hover:bg-3 transition ease-in-out duration-250 cursor-pointer">
            Import
            <GetAppOutlinedIcon/>
          </button>
          <button onClick={ exportData }
                  className="p-2 ml-4 rounded-xl hover:bg-3 transition ease-in-out duration-250 cursor-pointer">
            Export
            <PublishOutlinedIcon/>
          </button>
        </div>

        <h3 className="text-lg font-bold mb-2 text-center">── General ──</h3>
        <TextInput label="Name" name="name" value={formData.name} onChange={ onChange }/>
        <TextInput label="Description" placeholder="Optional" name={ "description" } value={formData.description} onChange={ onChange }/>
        <ListInput label="Traits" name="traits" value={formData.traits} onChange={ onChange }/>
        <NumberInput label="Age" name="age" value={formData.age} onChange={ onChange }/>
        <TextInput label="Status" name="status" value={formData.status} onChange={ onChange } placeholder="Alive or Dead"/>

        <h3 className="text-lg font-bold mb-2 text-center">── Milestones ──</h3>
        <TextInput label="Bronze Milestone" name="bronzeMilestone" value={formData.bronzeMilestone} onChange={ onChange }/>
        <TextInput label="Silver Milestone" name="silverMilestone" value={formData.silverMilestone} onChange={ onChange }/>
        <TextInput label="Gold Milestone" name="goldMilestone" value={formData.goldMilestone} onChange={ onChange }/>
        <TextInput label="Diamond Milestone" name="diamondMilestone" value={formData.diamondMilestone} onChange={ onChange }/>

        <h3 className="text-lg font-bold mb-2 text-center">── Genetics ──</h3>
        <TextInput label="Species" name="species" value={formData.species} onChange={ onChange }/>
        <TextInput label="Subspecies" name="subspecies" value={formData.subspecies} onChange={ onChange }/>
        <TextInput label="Gender" name="gender" value={formData.gender} onChange={ onChange }/>
        <TextInput label="Immune System Type" name="immuneSystem" value={formData.immuneSystem} onChange={ onChange }
                   placeholder="Neutral / Weak / Strong"/>
        <TextInput label="Dominant Skin" name="dominantSkin" value={formData.dominantSkin} onChange={ onChange }/>
        <ListInput label="Recessive Skin(s)" name="recessiveSkins" value={formData.recessiveSkins} onChange={ onChange }/>
        <TextInput label="Eye Color" name="eyeColor" value={formData.eyeColor} onChange={ onChange }/>
        <ListInput label="Mutations" name="mutations" value={formData.mutations} onChange={ onChange }/>

        <h3 className="text-lg font-bold mb-2 text-center">── Family Tree ──</h3>
        <h4 className="text-md font-bold mb-2">Father</h4>
        <TextInput label="Name" name="fatherName" value={formData.fatherName} onChange={ onChange }/>
        <TextInput label="Link to Sheet" name="fatherLink" value={formData.fatherLink} onChange={ onChange } placeholder="Optional"/>
        <TextInput label="Dominant Skin" name="fatherDominantSkin" value={formData.fatherDominantSkin} onChange={ onChange }/>
        <ListInput label="Recessive Skins" name="fatherRecessiveSkins" value={formData.fatherRecessiveSkins} onChange={ onChange }/>
        <TextInput label="Eye Color" name="fatherEyeColor" value={formData.fatherEyeColor} onChange={ onChange }/>
        <TextInput label="Health, Genes & Mutations" name="fatherHealthGenesMutations" value={formData.fatherHealthGenesMutations} onChange={ onChange }/>

        <h4 className="text-md font-bold mb-2">Mother</h4>
        <TextInput label="Name" name="motherName" value={formData.motherName} onChange={ onChange }/>
        <TextInput label="Link to Sheet" name="motherLink" value={formData.motherLink} onChange={ onChange } placeholder="Optional"/>
        <TextInput label="Dominant Skin" name="motherDominantSkin" value={formData.motherDominantSkin} onChange={ onChange }/>
        <ListInput label="Recessive Skins" name="motherRecessiveSkins" value={formData.motherRecessiveSkins} onChange={ onChange }/>
        <TextInput label="Eye Color" name="motherEyeColor" value={formData.motherEyeColor} onChange={ onChange }/>
        <TextInput label="Health, Genes & Mutations" name="motherHealthGenesMutations" value={formData.motherHealthGenesMutations} onChange={ onChange }/>

        <h4 className="text-md font-bold mb-2">Clutchmates</h4>
        <TextInput label="Link to Clutch" name="linkToClutch" onChange={ onChange } value={formData.linkToClutch} placeholder="Optional"/>
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
                value={clutchmate.name}
                onChange={ (e) => updateClutchmate(index, 'name', e.value) }
              />
              <TextInput
                label="Gender"
                name="sex"
                value={clutchmate.sex}
                onChange={ (e) => updateClutchmate(index, 'sex', e.value) }
              />
              <TextInput
                label="Link"
                name="link"
                value={clutchmate.link}
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
                value={clutch.partner}
                onChange={ (e) => updateClutch(index, 'partner', e.value) }
              />
              <TextInput
                label="Link to partner's sheet"
                name="link"
                value={clutch.partnerLink}
                placeholder="Optional"
                onChange={ (e) => updateClutch(index, 'partnerLink', e.value) }
              />
              <NumberInput
                label="Egg Count"
                name="eggCount"
                value={clutch.eggCount}
                onChange={ (e) => updateClutch(index, 'eggCount', e.value) }/>

              { clutch.eggs.map((egg, eggIndex) => (
                <div key={ eggIndex } className="bg-4 rounded-xl p-3 mt-2">
                  <h6 className="text-sm font-bold mb-2">Egg { eggIndex + 1 }</h6>
                  <TextInput
                    label="Name"
                    name="name"
                    value={egg.name}
                    placeholder="Optional"
                    onChange={ (e) => updateEgg(index, eggIndex, 'name', e.value) }
                  />
                  <TextInput
                    label="Link"
                    name="link"
                    value={egg.link}
                    placeholder="Optional"
                    onChange={ (e) => updateEgg(index, eggIndex, 'link', e.value) }
                  />
                  <TextInput
                    label="Gender"
                    name="gender"
                    value={egg.gender}
                    onChange={ (e) => updateEgg(index, eggIndex, 'gender', e.value) }
                  />
                  <TextInput
                    label="Status"
                    name="status"
                    value={egg.status}
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