export default function Select({name, body, onChange}){
    return (
        <select name={name} id={name+"Select"} onChange={onChange}>
            {body.map(e => (
                <option>{e}</option>
            ))}
        </select>
    )
}