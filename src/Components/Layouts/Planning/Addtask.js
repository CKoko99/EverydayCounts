import React from 'react'

const addtask = props =>{
    return(<input placeholder={props.children}
         style={{backgroundColor: "#AEE4FF",
            width: "80%",
            textAlign: 'center',
            fontSize: "1.5em",
            fontFamily: "inherit",
            padding: "1.5%",
            border: '0',
            borderBottom: '1px'
        }}
        ref={props.ref}/>)
}

export default addtask