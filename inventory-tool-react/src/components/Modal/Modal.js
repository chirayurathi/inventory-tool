import React from 'react'
import Style from './Modal.module.css'

const Modal = (props)=>{
    let ml = null
    if(props.formOf==="product"){
        ml=(
            <div className={Style.Modal}>
                <div className={Style.Backdrop} onClick={()=>{props.addToggleHandler()}}></div>
                <div className={`${Style.Form} ${Style.ProductForm}`}>
                    <h1>Add New Product</h1>
                    <label>Product Category</label>
                    <select value={props.form.category} onChange={(e)=>{props.inputOnChange('category','',e.target.value)}}>
                        <option value=""></option>
                        <option value="IT">IT</option>
                        <option value="furniture">Furniture</option>
                        <option value="other">other</option>
                    </select>
                    {props.form.category==="IT"?<label>Product Type</label>:null}
                    {props.form.category==="IT"?<select value={props.form.product.product_type} onChange={(e)=>{props.inputOnChange('product','product_type',e.target.value)}}>
                        <option value=""></option>
                        <option value="laptop">laptop</option>
                        {/* <option value="charger">charger</option> */}
                        <option value="monitor">monitor</option>
                        <option value="keyboard">keyboard</option>
                        <option value="mouse">mouse</option>
                        <option value="cabinet">cabinet</option>
                        <option value="SMPS">SMPS</option>
                        <option value="graphic card">graphic card</option>
                        <option value="RAM">RAM</option>
                        <option value="HDD">HDD</option>
                        {/* <option value="furniture">Furniture</option> */}
                        {/* <option value="other">other</option> */}
                    </select>:null}
                    <label>Product Name</label>
                    <input type="text" placeholder="Name" onChange={(e)=>{props.inputOnChange('product','product_name',e.target.value)}} value={props.form.product.product_name} /> 
                    {props.form.product.product_type==="laptop"||props.form.product.product_type==="RAM"?[<label>RAM</label>,
                    <input type="text" placeholder="RAM" value={props.form.product.ram} onChange={(e)=>{props.inputOnChange('product','ram',e.target.value)}}/>]:null}
                    {props.form.product.product_type==="laptop"?[<label>Processor</label>,
                    <input type="text" placeholder="Processor" value={props.form.product.processor} onChange={(e)=>{props.inputOnChange('product','processor',e.target.value)}}/>,
                    <label>Operating System</label>,
                    <input type="text" placeholder="Operating System" value={props.form.product.operating_system} onChange={(e)=>{props.inputOnChange('product','operating_system',e.target.value)}}/>,
                    <label>HDD</label>,
                    <input type="text" placeholder="HDD" value={props.form.product.hdd} onChange={(e)=>{props.inputOnChange('product','hdd',e.target.value)}}/>]:null}
                    <label>Units</label>
                    <input type="number" placeholder="Units" value={props.form.product.units} onChange={(e)=>{props.inputOnChange('product','units',e.target.value)}}/>
                    <button onClick={props.addProducts}>Submit</button> 
                </div>
            </div>
        )
    }
    else if(props.formOf==="unit"){
        ml=(
            <div className={Style.Modal}>
                <div className={Style.Backdrop} onClick={()=>{props.addToggleHandler()}}></div>
                <div className={Style.Form}>
                    <h1>Add New Unit</h1>
                    <label>Barcode</label>
                    <input type="text" placeholder="Barcode" value={props.form.unit.barcode} onChange={(e)=>{props.inputOnChange('unit','barcode',e.target.value)}} /> 
                    <label> Location </label>
                    <select value={props.form.unit.status} onChange={(e)=>{props.inputOnChange('unit','status',e.target.value)}}>
                        <option value=""></option>
                        <option value="HYDRABAD">HYDRABAD</option>
                        <option value="BANGLORE">BANGLORE</option>    
                        <option value="CHENNAI">CHENNAI</option>    
                        <option value="MUMBAI">MUMBAI</option>    
                        <option value="VELLORE">VELLORE</option>    
                        <option value="COIMBATORE">COIMBATORE</option>    
                        <option value="CALICUT">CALICUT</option>
                    </select> 
                    <button onClick={props.addUnit}>Submit</button> 
                </div>
            </div>
        )
    }
    else{
        ml=(
            <div className={Style.Modal}>
                <div className={Style.Backdrop} onClick={()=>{props.addToggleHandler()}}></div>
                <div className={Style.Form}> 
                <h1>Move Unit</h1>
                    {/* <label> From Location </label>
                    <select value={props.form.status.from_location} onChange={(e)=>{props.inputOnChange('status','from_location',e.target.value)}}>
                    <option value=""></option>
                        <option value="HYDRABAD">HYDRABAD</option>
                        <option value="BANGLORE">BANGLORE</option>    
                        <option value="CHENNAI">CHENNAI</option>    
                        <option value="MUMBAI">MUMBAI</option>    
                        <option value="DELHI">DELHI</option>    
                        <option value="SURAT">SURAT</option>    
                        <option value="GOA">GOA</option>
                    </select>  */}
                    <label> Destination </label>
                    <select value={props.form.status.to_location} onChange={(e)=>{props.inputOnChange('status','to_location',e.target.value)}}>
                        <option value=""></option>
                        <option value="HYDRABAD">HYDRABAD</option>
                        <option value="BANGLORE">BANGLORE</option>    
                        <option value="CHENNAI">CHENNAI</option>    
                        <option value="MUMBAI">MUMBAI</option>    
                        <option value="DELHI">DELHI</option>    
                        <option value="SURAT">SURAT</option>    
                        <option value="GOA">GOA</option>
                    </select> 
                    <label> Present Holder </label>
                    <select value={props.form.status.to_holder} onChange={(e)=>{props.inputOnChange('status','to_holder',e.target.value)}}>
                        <option value=""></option>
                        {props.allEmployes.map(emp=>{
                            return(<option value={emp.employee_id}>{emp.employee_id} {emp.employee_name}</option>)
                        })}
                    </select> 
                    <label>Note</label>
                    <input type="text" placeholder="Note" value={props.form.status.remark} onChange={(e)=>{props.inputOnChange('status','remark',e.target.value)}}/>
                    <button onClick={props.addStatus}>Submit</button> 
                </div>
            </div>
        )
    }
    return(ml)
}

export default Modal