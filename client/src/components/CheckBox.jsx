export default function CheckBox({handleCheck, isCheked, value}){
    return (
        <li>
            <input type="checkbox" checked={isCheked} onChange={handleCheck} value={value}/>{value} 
        </li>
    )
}