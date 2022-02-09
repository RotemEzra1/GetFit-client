
const Input = ({id,type,label,myValue,change}) => {

    const myOnChange = (e) => {

        change(e.target.value);
   
    }

    return (
        <div className="form-floating mb-3">
            <input type={type} className="form-control" id={id} placeholder={label}
            defaultValue={myValue}
            value={myValue} 
            onChange={myOnChange}/>
            <label htmlFor={id}>{label}</label>
        </div>
    )

}

Input.defaultProps = {
    id:"inpudID",
    type:"text",
    label:"...",
    myValue:"",
    change:(v) => {console.log(v);}
}

export default Input;