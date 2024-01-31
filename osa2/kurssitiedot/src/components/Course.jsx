const Total = ({course}) => {
    const initVal = 0
    const sum = course.parts.reduce((accumulate, currVal) =>
    accumulate + currVal.exercises, initVal
    );
    return (<b>Total of {sum} exercises</b>)
}


const Course = ({course}) => {
    return (
        <div>
            <h2>{course.name}</h2>
            {course.parts.map(c =>
                <p key ={c.id}>
                    {c.name} {c.exercises}
                </p>
            )}
            <Total course={course}/>
        </div>
    )
}

export default Course