import type { ReactElement } from "react";

/**
 * The properties needed for a route in the configs
 */
export type RouteProps = {
  name: string;
  route: string;
  element: ReactElement;
}

/**
 * The event we pass when an input changes.
 * It contains the name of the input and the new value of type T.
 */
export interface InputChangeEvent<T> {
  name: string;
  value: T
}

/**
 * The properties that ALL input props inherent from.
 * All inputs take a name, a label, a required flag, a value, and an onChange function.
 */
interface FormOptionProps {
  label?: string;
  name: string;
  required?: boolean;
  value?: any;
  onChange: (e: InputChangeEvent<any>) => void;
}

/**
 * The properties for a text input.
 * It extends the FormOptionProps and adds an optional placeholder.
 */
export interface TextInputProps extends FormOptionProps {
  placeholder?: string;
}

/**
 * The properties for a list input.
 * It extends the FormOptionProps and adds an optional maxItems property.
 */
export interface ListInputProps extends FormOptionProps {
  maxItems?: number;
}

/**
 * The properties for a number input.
 */
export interface NumberInputProps extends FormOptionProps {
  min?: number;
  max?: number;
  step?: number;
}

export interface ToggleInputProps extends FormOptionProps {

}

export interface ModalProps {
  onClose?: () => void;
  title: string;
  children?: ReactElement | ReactElement[];
}

export interface ToggleProps {
  checked?: boolean;
  onChange: (value: boolean) => void;
}

/**
 * The values that a clutchmate will have in the form.
 */
export interface Clutchmate {
  name: string;
  link?: string;
  sex: string;
  adopted: boolean;
}

/**
 * The values that a clutch will have in the form.
 * It contains the partner's name, an optional link, the number of eggs, and an array of eggs.
 */
export interface Clutch {
  partner: string;
  partnerLink?: string;
  eggCount: number;
  eggs: Egg[];
}

/**
 * The values that an egg will have in the form.
 */
export interface Egg {
  name: string;
  link?: string;
  gender: string;
  status: string;
  adopted: boolean;
}

/**
 * The state of the form.
 * It contains ALL the values that the form will have.
 */
export interface FormState {
  // General Information
  name: string;
  age: number;
  traits: string[];
  description?: string;
  status: string;
  // Milestones
  bronzeMilestone: string;
  silverMilestone: string;
  goldMilestone: string;
  diamondMilestone: string;
  // Genetics
  species: string;
  subspecies: string;
  gender: string;
  immuneSystem: string;
  dominantSkin: string;
  recessiveSkins: string[];
  eyeColor: string;
  mutations: string[];
  // Family Tree
  adopted: boolean;
  birthLocation?: string;
  fatherName: string;
  fatherLink?: string;
  fatherDominantSkin: string;
  fatherRecessiveSkins: string[];
  fatherEyeColor: string;
  fatherHealthGenesMutations: string;
  motherName: string;
  motherLink?: string;
  motherDominantSkin: string;
  motherRecessiveSkins: string[];
  motherEyeColor: string;
  motherHealthGenesMutations: string;
  linkToClutch?: string;
  clutchmates: Clutchmate[];
  clutches: Clutch[];
}

export interface BackgroundPhoto {
  url: string;
  photographer: string;
}
