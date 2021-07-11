import React from 'react'
import Style from './EmployeeList.module.css'
const EmployeeList = (props) => {
    
    return(
        <div className={`${Style.EmployeeList} ${props.activeLink!=="system" && Style.Other}`}>
            <div className={Style.Head}>
                <h1>Employees</h1>
                <button onClick={()=>{props.addToggleHandler("employee")}}>Add Employee</button> 
            </div>
            <div className={Style.Box}>
            <ul className={Style.Heads}>
                <li>Employee Id</li>
                <li>Employee Name</li>
                <li>Branch</li>
                <li>Department</li>
                <li>Designation</li>
            </ul>
            {props.allEmployees?<ul className={Style.List}>
                {props.allEmployees.map(element => {
                    // return(<li className={Style.Element} key={element.product_id} onClick={()=>{props.selectEmployeeHandler(element.employee_id)}}>
                    if(element.employee_name.toLowerCase().includes(props.search.value.toLowerCase()))
                    return(<li className={Style.Element} key={element.product_id}>
                        <ul>
                            <li>{element.employee_id}</li>
                            <li>{element.employee_name}</li>
                            <li>{element.branch}</li>
                            <li>{element.department}</li>
                            <li>{element.designation}</li>
                        </ul> 
                  </li>) 
                  else
                  return null;
                })}
            </ul>:null}
            </div>
        </div>
        )
}

export default EmployeeList;