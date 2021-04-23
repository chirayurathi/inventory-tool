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
                    <label>Product Name</label>
                    <input type="text" placeholder="Name" onChange={(e)=>{props.inputOnChange('product','product_name',e.target.value)}} value={props.form.product.product_name} /> 
                    <label>RAM</label>
                    <input type="text" placeholder="RAM" value={props.form.product.ram} onChange={(e)=>{props.inputOnChange('product','ram',e.target.value)}}/> 
                    <label>Processor</label>
                    <input type="text" placeholder="Processor" value={props.form.product.processor} onChange={(e)=>{props.inputOnChange('product','processor',e.target.value)}}/>
                    <label>Operating System</label>
                    <input type="text" placeholder="Operating System" value={props.form.product.operating_system} onChange={(e)=>{props.inputOnChange('product','operating_system',e.target.value)}}/>
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
                        <option value="DELHI">DELHI</option>    
                        <option value="SURAT">SURAT</option>    
                        <option value="GOA">GOA</option>
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
                    <label> From Location </label>
                    <select value={props.form.status.from_location} onChange={(e)=>{props.inputOnChange('status','from_location',e.target.value)}}>
                    <option value=""></option>
                        <option value="HYDRABAD">HYDRABAD</option>
                        <option value="BANGLORE">BANGLORE</option>    
                        <option value="CHENNAI">CHENNAI</option>    
                        <option value="MUMBAI">MUMBAI</option>    
                        <option value="DELHI">DELHI</option>    
                        <option value="SURAT">SURAT</option>    
                        <option value="GOA">GOA</option>
                    </select> 
                    <label> To Location </label>
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