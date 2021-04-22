import React from 'react'
import Style from './Modal.module.css'

const Modal = (props)=>{
    let ml = null
    if(props.formOf==="product"){
        ml=(
            <div className={Style.Modal}>
                <div className={Style.Backdrop} onClick={()=>{props.addToggleHandler()}}></div>
                <div className={Style.Form}>
                    <h1>Add New Product</h1>
                    <label>Product Id</label>
                    <input type="text" placeholder="ID" onChange={(e)=>{props.inputOnChange('product','product_id',e.target.value)}} value={props.form.product.product_id} /> 
                    <label>Product Name</label>
                    <input type="text" placeholder="Name" value={props.form.product.product_name} onChange={(e)=>{props.inputOnChange('product','product_name',e.target.value)}}/> 
                    <label>Product Price</label>
                    <input type="number" placeholder="Price" value={props.form.product.product_price} onChange={(e)=>{props.inputOnChange('product','product_price',e.target.value)}}/>
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