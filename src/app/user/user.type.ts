import { ProficiencyLevel } from './proficiency-level.enum';

export type Skill = {
  name: string;
  proficiency: ProficiencyLevel;
};

export type User = {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  skills: Skill[];
};
