import type { Clutch, Clutchmate, Egg, FormState } from "../../types"

const getGenderTag = (gender: string) => {
  if (gender === "") return "N/A";
  return gender.toLowerCase() === 'male' ? '♂ Male' :
    gender.toLowerCase() === 'female' ? '♀ Female' : gender;
}

const toLink = (name: string, link?: string) => {
  if (!link || link === "") return name;
  return `[${ name }](${ link })`;
}

const generateClutchmate = (clutchmate: Clutchmate) => {
  const genderSymbol = clutchmate.sex.toLowerCase() === 'male' ? '♂' :
    clutchmate.sex.toLowerCase() === 'female' ? '♀' : '♀/♂';
  console.log(clutchmate);

  return `> ${ genderSymbol } ${ clutchmate.name != "" ? toLink(clutchmate.name, clutchmate.link) : "Unknown" } ${ clutchmate.adopted ? '(Adopted)' : '' }`;
}

const generateClutch = (clutch: Clutch, index: number) => {
  const clutchNumber = index + 1;
  const ordinalSuffix = clutchNumber === 1 ? 'st' : clutchNumber === 2 ? 'nd' : clutchNumber === 3 ? 'rd' : 'th';
  const partner = toLink(clutch.partner, clutch.partnerLink);
  const eggs = clutch.eggs.map((egg) => generateEgg(egg)).join('\n> \n');

  return `**\`${ clutchNumber }${ ordinalSuffix } clutch\`**
> Partner: ${ partner || "Unknown" }
> 
${ eggs }`

}

const generateEgg = (egg: Egg) => {
  const genderSymbol = egg.gender.toLowerCase() === 'male' ? '♂' :
    egg.gender.toLowerCase() === 'female' ? '♀' : '♀/♂';
  const emoji = egg.adopted ? ':empty_nest:' : ':egg:';

  return `> ${ emoji } | ${ egg.name != "" ? toLink(egg.name, egg.link) : "Unknown" } | ${ genderSymbol } | ${ egg.status || "N/A" } ${ egg.adopted ? '(Adopted)' : '' }`;
}

export const keebeeFormat = (formData: FormState) => {
  const titleSection = () => {
    return `# ${ formData.name != "" ? formData.name : "Unnamed" }
${ formData.traits.length > 0 ? `*${ formData.traits.join(", ") }*${ formData.description ? '\n' : '' }` : "" }
${ formData.description ? formData.description : "" }`
  }

  const geneticsSection = () => {
    return `
\` Genetic Information \`

> - **Species**: ${ formData.species || "unknown" } ${ formData.subspecies || "" }
> 
> - **Immune System**: ${ formData.immuneSystem || "unknown" }
> 
> - **Gender**: ${ getGenderTag(formData.gender) }
> 
> - **Age**: ${ formData.age }
> 
> - **Status**: ${ formData.status || "unknown" }`
  }

  const milestonesSection = () => {
    return `
\` Milestones \`

> :BRONZEMEDAL: ${ formData.bronzeMilestone }
> 
> :SILVERMEDAL: ${ formData.silverMilestone }
> 
> :GOLDMEDAL: ${ formData.goldMilestone }
> 
> :DIAMONDMEDAL: ${ formData.diamondMilestone }`
  }

  const appearanceSection = () => {
    return `
\` Appearance \`

> - **Dominant Skin**: ${ formData.dominantSkin || "unknown" }
> 
> - **Recessive** **Skins**: ${ formData.recessiveSkins.length > 0 ? formData.recessiveSkins.join(", ") : "none" }
> 
> - **Eye Color**: ${ formData.eyeColor || "unknown" }
> 
> - **Mutations**: ${ formData.mutations.length > 0 ? formData.mutations.join(", ") : "none" }
`
  }

  const familySection = () => {
    return `
\` Family Tree \`${ formData.adopted ? '\n> (Adopted)\n> ' : '' }
${formData.birthLocation ? `\n\n> Birth Location: ${ formData.birthLocation }\n` : "" }
> ♂ Father: ${ formData.fatherName ? toLink(formData.fatherName, formData.fatherLink) : "Unknown" }
> 
> - Dominant Skin: ${ formData.fatherDominantSkin || "unknown" }
> - Recessive Skins: ${ formData.fatherRecessiveSkins.length > 0 ? formData.fatherRecessiveSkins.join(", ") : "none" }
> - Eye Color: ${ formData.fatherEyeColor || "unknown" }

> ♀ Mother: ${ formData.motherName ? toLink(formData.motherName, formData.motherLink) : "Unknown" }
> 
> - Dominant Skin: ${ formData.motherDominantSkin || "unknown" }
> - Recessive Skins: ${ formData.motherRecessiveSkins.length > 0 ? formData.motherRecessiveSkins.join(", ") : "none" }
> - Eye Color: ${ formData.motherEyeColor || "unknown" }
${ formData.linkToClutch ? `\n-# [Link to Clutch](${ formData.linkToClutch })` : "" }`
  }

  const clutchMatesSection = () => {
    if (formData.clutchmates.length === 0) return '';

    return formData.clutchmates.map((clutchmate) => {
      return generateClutchmate(clutchmate)
    }).join('\n> \n')
  }

  const clutchesSection = () => {
    if (formData.clutches.length === 0) return '';

    return formData.clutches.map((clutch, index) => {
      return generateClutch(clutch, index);
    }).join('\n\n');
  }

  return `${ titleSection() }\n${ geneticsSection() }\n${ milestonesSection() }\n ${ appearanceSection() }\n${ familySection() }\n${ clutchMatesSection() }\n\n${ clutchesSection() }`
}
