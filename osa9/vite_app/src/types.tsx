export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
export interface coursePartDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends coursePartDescription {
  kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartBackground extends coursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

export interface CoursePartSpecial extends coursePartDescription {
  requirements: string[];
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
