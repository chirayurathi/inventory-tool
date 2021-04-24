import React from 'react'
import Style from './UnitList.module.css'

const UnitList = (props) => {
    return(
        <div className={Style.UnitList}>
                <div className={Style.Head}>
                <div onClick={props.backHandler}><i class="fas fa-arrow-left"></i></div> 
                <h1>Units</h1> 
                <button onClick={()=>{props.addUnit()}}>Add Unit</button> 
            </div>
            <ul className={Style.Heads}>
                <li>Barcode</li>
                <li>Branch</li>
                <li>Holder</li>
                <li>Added On</li>
                <li>Shipped On</li>
                <li>Remark</li>
                <li>QR Code</li>
            </ul>
            {props.activeProductUnit?<div className={Style.List}>
                {props.activeProductUnit.map(element => {
                return(<li className={Style.Element} onClick={()=>{props.selectUnitHandler(element.barcode)}}>
                    <ul>
                        <li>{element.barcode}</li>
                        <li>{element.status}</li>
                        <li>{props.allEmployesDict[element.holder]?props.allEmployesDict[element.holder].employee_name:"-"}</li>
                        <li>{element.added_on}</li>
                        <li>{element.shipped_on}</li>
                        <li>{element.remark}</li>
                        <li><i class="fas fa-qrcode" onClick={(e)=>{e.stopPropagation();props.getQr(element.barcode)}}></i></li>
                    </ul>
                </li>)  
                })}
            </div>:null}
        </div>
        )
}

export default UnitList;