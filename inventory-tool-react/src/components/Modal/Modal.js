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
                    {/* <label>Product Category</label>
                    <select value={props.form.category} onChange={(e)=>{props.inputOnChange('category','',e.target.value)}}>
                        <option value=""></option>
                        <option value="IT">IT</option>
                        <option value="furniture">Furniture</option>
                        <option value="other">other</option>
                    </select> */}
                    {props.activeLink==="system"?<label>Product Type</label>:null}
                    {props.activeLink==="system"?<select value={props.form.product.product_type} onChange={(e)=>{props.inputOnChange('product','product_type',e.target.value)}}>
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
                    {props.activeLink==="other"?[<label>Category</label>,<select value={props.form.product.other_type} onChange={(e)=>{props.inputOnChange('product','other_type',e.target.value)}}><option value=""></option>
                        {props.allOthers.map(e=>{return(<option value={e.sub_type}>{e.sub_type}</option>)})}
                        </select>]:null}
                    {props.activeLink!=="system"?[<label>Description</label>,
                    <input type="text" placeholder="description" value={props.form.product.description} onChange={(e)=>{props.inputOnChange('product','description',e.target.value)}}/>]:null}
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
    else if(props.formOf==="other"){
        ml = (
            <div className = {Style.Modal}>
                <div className={Style.Backdrop} onClick={()=>{props.addToggleHandler()}}></div>
                <div className={Style.Form}>
                    <h1>Add Category</h1>
                    <label> Category Name </label>
                    <input type="text" placeholder="category" value={props.form.category} onChange={(e)=>{props.inputOnChange('category','',e.target.value)}}/>
                    <button onClick={props.addOther}>Submit</button>
                </div>
            </div>
        )
    }
    else if(props.formOf==="employee"){
        ml = (
            <div className = {Style.Modal}>
                <div className={Style.Backdrop} onClick={()=>{props.addToggleHandler()}}></div>
                <div className={Style.Form}>
                    <h1>Add Employee</h1>
                    <label>Employee Id</label>
                    <input type="number" placeholder="Employee Id" value={props.form.employee.employee_id} onChange={(e)=>{props.inputOnChange('employee','employee_id',e.target.value)}}/>
                    <label>Employee Name</label>
                    <input type="text" placeholder="Employee Name" value={props.form.employee.employee_name} onChange={(e)=>{props.inputOnChange('employee','employee_name',e.target.value)}}/>
                    <label> Branch </label>
                    <select value={props.form.employee.branch} onChange={(e)=>{props.inputOnChange('employee','branch',e.target.value)}}>
                        <option value=""></option>
                        <option value="HYDRABAD">HYDRABAD</option>
                        <option value="BANGLORE">BANGLORE</option>    
                        <option value="CHENNAI">CHENNAI</option>    
                        <option value="MUMBAI">MUMBAI</option>    
                        <option value="VELLORE">VELLORE</option>    
                        <option value="COIMBATORE">COIMBATORE</option>    
                        <option value="CALICUT">CALICUT</option>
                    </select> 
                    <label> Department </label>
                    <select value={props.form.employee.department} onChange={(e)=>{props.inputOnChange('employee','department',e.target.value)}}>
                        <option value=""></option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="HR">HR</option>
                        <option value="ACCOUNTS">ACCOUNTS</option>
                        <option value="SALES">SALES</option>
                        <option value="BUSINESS DEVELOPMENT">BUSINESS DEVELOPMENT</option>
                        <option value="SYSTEM ADMIN">SYSTEM ADMIN</option>
                        <option value="EVENT COORDINATION">EVENT COORDINATION</option>
                        <option value="CUSTOMER RELATION">CUSTOMER RELATION</option>
                        <option value="OPERATIONS">OPERATIONS</option>
                        <option value="PHOTOGRAPHY">PHOTOGRAPHY</option>
                        <option value="ALBUM DESIGNING">ALBUM DESIGNING</option>
                        <option value="CC">CC</option>
                        <option value="DATA MANAGEMENT">DATA MANAGEMENT</option>
                        <option value="CINEMATOGRAPHY">CINEMATOGRAPHY</option>
                        <option value="PHOTO RETOUCHING">PHOTO RETOUCHING</option>
                        <option value="DIRECTION">DIRECTION</option>
                        <option value="VIDEO EDITING">VIDEO EDITING</option>
                        <option value="VIDEOGRAPHY">VIDEOGRAPHY</option>
                        <option value="SOCIAL MEDIA">SOCIAL MEDIA</option>
                        <option value="GRAPHIC DESIGNING">GRAPHIC DESIGNING</option>
                        <option value="SUPPORT SERIVICE">SUPPORT SERIVICE</option>
                        <option value="PRODUCTION">PRODUCTION</option>
                        <option value="EVENT MANAGEMENT">EVENT MANAGEMENT</option>
                        <option value="DIGITAL MARKETING">DIGITAL MARKETING</option>
                        <option value="ADMIN & OPERATIONS">ADMIN & OPERATIONS</option>
                        <option value="COLOUR CORRECTION">COLOUR CORRECTION</option>
                        <option value="LEARNING & DEVELOPMENT">LEARNING & DEVELOPMENT</option>
                    </select> 
                    <label>Employee Designation</label>
                    <input type="text" placeholder="Employee Designation" value={props.form.employee.designation} onChange={(e)=>{props.inputOnChange('employee','designation',e.target.value)}}/>
                    <button onClick={props.addEmployee}>Submit</button>
                </div>
            </div>
        )
    }
    else if(props.formOf==="remark"){
        ml = (
            <div className = {Style.Modal}>
                <div className={Style.Backdrop} onClick={()=>{props.addToggleHandler()}}></div>
                <div className={Style.Form}>
                    <h1>update Remark</h1>
                    <label> Remark </label>
                    <input type="text" placeholder="remark" value={props.form.remark} onChange={(e)=>{props.inputOnChange('remark','',e.target.value)}}/>
                    <button onClick={props.updateRemark}>Submit</button>
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
                        {props.allEmployees.map(emp=>{
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