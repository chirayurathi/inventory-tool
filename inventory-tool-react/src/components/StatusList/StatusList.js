import React from 'react'
import Style from './StatusList.module.css'

const StatusList = (props) => {
    return(
        <div className={Style.StatusList}>
                <div className={Style.Head}>
                <div onClick={props.backHandler}><i class="fas fa-arrow-left"></i></div> 
                <h1>Status</h1> 
                <button onClick={()=>{props.addToggleHandler("status")}}>Add Status</button> 
            </div>
            <ul className={Style.Heads}>
                <li>Initial Location</li>
                <li>Previous Holder</li>
                <li>Destination Location</li>
                <li>Present Holder</li>
                <li>Change Date</li>
                <li>Remark</li>
            </ul>
            {props.activeProductUnitStatus?<ul className={Style.List}>
                {props.activeProductUnitStatus.map(element =>{
                    console.log(props.allEmployesDict)
                    return(<li className={Style.Element}>
                        <ul>
                            <li>{element.from_location}</li>
                            <li>{props.allEmployesDict[element.from_holder]?props.allEmployesDict[element.from_holder].employee_name:"-"}</li>
                            <li>{element.to_location}</li>
                            <li>{props.allEmployesDict[element.to_holder]?props.allEmployesDict[element.to_holder].employee_name:"-"}</li>
                            <li>{element.update_time}</li>
                            <li>{element.remark}</li>
                        </ul>
                    </li>)
                })}
            </ul>:null}
        </div>
        )
}

export default StatusList;