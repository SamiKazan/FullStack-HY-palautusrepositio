import { CoursePart } from '../types';

const Part = (part: CoursePart) => {
    switch (part.kind) {
        case "basic":
          return (
            <div>
              <h3>{part.name} {part.exerciseCount}</h3>
              <p>description: {part.description}</p>
            </div>
          );
        case "group":
          return (
            <div>
              <h3>{part.name} {part.exerciseCount}</h3>
              <p>Project exercises: {part.groupProjectCount}</p>
            </div>
          );
        case "background":
          return (
            <div>
              <h3>{part.name} {part.exerciseCount}</h3>
              <p>description: {part.description}</p>
              <p>Submit to: {part.backgroundMaterial}</p>
            </div>
          );
        case "special":
            return (
                <div>
                <h3>{part.name} {part.exerciseCount}</h3>
                <p>description: {part.description}</p>
                <p>requirements: {part.requirements.join(', ')}</p>
                </div> 
            )
        default:
          return assertNever(part);
      }
};

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export default Part;