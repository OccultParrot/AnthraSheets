import type { ReactElement, ReactNode } from "react";

export type RouteProps = {
  name: string;
  route: string;
  element: ReactElement;
}

export interface SidebarProps {
  defaultOpen?: boolean;
  content?: SidebarContentProps[];
  tabOptions?: boolean;
  tabPosition: 'top' | 'middle' | 'bottom';
}

export interface SidebarContentProps {
  content: ReactNode;
  autoClose?: boolean;
}

export interface InputChangeEvent<T> {
  name: string;
  value: T
}

interface FormOptionProps {
  label?: string;
  name: string;
  required?: boolean;
  onChange: (e: InputChangeEvent<any>) => void;
}

export interface TextInputProps extends FormOptionProps {
  placeholder?: string;
}

export interface ListInputProps extends FormOptionProps {
  maxItems?: number;
}

export interface NumberInputProps extends FormOptionProps {
  min?: number;
  max?: number;
  step?: number;
}

export interface Clutchmate {
  name: string;
  link?: string;
  sex: string;
  
}

export interface Clutch {
  partner: string;
  partnerLink?: string;
  eggCount: number;
  eggs: Egg[];
}

export interface Egg {
  name: string;
  link?: string;
  gender: string;
  status: string;
}

export interface FormState {
  name: string;
  age: number;
  traits: string[];
  description?: string;
  status: string;
  bronzeMileStone: string;
  silverMileStone: string;
  goldMileStone: string;
  diamondMileStone: string;
  species: string;
  subspecies: string;
  gender: string;
  dominantSkin: string;
  recessiveSkins: string[];
  eyeColor: string;
  mutations: string[];
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
  clutchmates: Clutchmate[];
  clutches: Clutch[];
}