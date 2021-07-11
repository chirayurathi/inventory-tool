import React from 'react'
import Style from './UnitList.module.css'

const UnitList = (props) => {
    return(
        <div className={Style.UnitList}>
                <div className={Style.Head}>
                <div onClick={props.backHandler}><i className="fas fa-arrow-left"></i></div> 
                <h1>Units</h1> 
                <button onClick={()=>{props.addUnit()}}>Add Unit</button> 
            </div>
            <div className={Style.Box}>
            <ul className={Style.Heads}>
                <li>Barcode</li>
                <li>Branch</li>
                <li>Holder</li>
                <li>Added On</li>
                <li>Shipped On</li>
                <li>Remark</li>
                <li>QR</li>
            </ul>
            {props.activeProductUnit?<div className={Style.List}>
                {props.activeProductUnit.map(element => {
                    if(element.barcode.toString().toLowerCase().includes(props.search.value.toLowerCase())){
                        return(<li className={Style.Element} key={element.barcode} onClick={()=>{props.selectUnitHandler(element.barcode)}}>
                            <ul>
                                <li>{element.barcode}</li>
                                <li>{element.status}</li>
                                <li>{props.allEmployeesDict[element.holder]?props.allEmployeesDict[element.holder].employee_name:"-"}</li>
                                <li>{element.added_on}</li>
                                <li>{element.shipped_on}</li>
                                <li className={Style.Remark} onClick={(e)=>{props.addToggleHandler("remark",element.barcode);e.stopPropagation();}}><span><i className="fas fa-pen"></i></span><p>{element.remark}</p></li>
                                <li><i className="fas fa-qrcode" onClick={(e)=>{e.stopPropagation();props.getQr(element.barcode)}}></i></li>
                            </ul>
                        </li>)  
                    }
                    else{
                        return null;
                    }})
                }
            </div>:null}
            </div>
        </div>
        )
}

export default UnitList;