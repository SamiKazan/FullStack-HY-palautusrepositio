import Part from "./Part";
import { CoursePart } from '../types';


  interface ContentProps {
    courseParts: CoursePart[];
  }
  
  export const Content: React.FC<ContentProps> = ({ courseParts }) => (
    <div>
      {courseParts.map((part) => (
        <Part key={part.name} {...part}/>
      ))}
    </div>
  );