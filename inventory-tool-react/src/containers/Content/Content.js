import React,{Component} from 'react'
import Style from './Content.module.css'
import Nav from '../../components/Nav/Nav'
import ListContainer from '../../components/ListContainer/ListContainer'
import Modal from '../../components/Modal/Modal'
import QrModal from '../../components/QrModal/QrModal'
import SideNav from '../../components/SideNav/SideNav'
import SearchBar from '../../components/SearchBar/SearchBar'

class Content extends Component{
    constructor(props){
        super(props)
        this.form = {
            category:"",
            remark:"",
            product:{
                product_name:"",
                processor:"",
                ram:"",
                operating_system:"",
                units:0,
                product_type:"",
                hdd:"",
                other_type:null,
                description:""
            },
            unit:{
                barcode:0,
                status:""
            },
            status:{
                to_location:"",
                to_holder:"",
                remark:""
            },
            employee:{
                employee_id:0,
                employee_name:"",
                branch:"",
                department:"",
                designation:""
            }
        }
        this.state = {
            allProducts:null,
            allEmployees:null,
            allEmployeesDict:null,
            activeProductUnit:null,
            allOthers:[],
            activeProductUnitStatus:null,
            qrid:null,
            activeProduct:null,
            activeUnit:null,
            activeCategory:"",
            slider:0,
            formOf:null,
            activeLink:"system",
            search:{
                placeholder:"Search Product Name",
                value:""
            },
            form:this.form,
            remarkUnit:null
        }
        this.getProducts()
        this.getEmployees()
        this.getOthers()
    }
    logoutHandler = ()=>{
        localStorage.clear()
        this.props.setAuthToken(null)
    }
    getEmployees = ()=>{
        let xhr = new XMLHttpRequest()
        xhr.addEventListener("readystatechange",()=>{
            if(xhr.readyState===4){
                let response = JSON.parse(xhr.responseText)
                if(xhr.status === 200){
                    let allEmployees = response
                    let allEmployeesDict = {}
                    allEmployees.forEach(emp =>{
                        allEmployeesDict[emp.employee_id] = emp
                    })
                    this.setState({allEmployees:response,allEmployeesDict:allEmployeesDict})
                }
            }
        })
        xhr.open("GET","http://127.0.0.1:8000/getEmployes/")
        xhr.setRequestHeader('content-type','application/json')
        xhr.setRequestHeader('Authorization','Token '+localStorage.getItem('AuthToken'))
        xhr.withCredentials = true
        xhr.send()   
    }
    getProducts = ()=>{
            let xhr = new XMLHttpRequest()
            xhr.addEventListener("readystatechange",()=>{
                if(xhr.readyState===4){
                    let response = JSON.parse(xhr.responseText)
                    if(xhr.status === 200){
                        this.setState({allProducts:response})
                    }
                }
            })
        xhr.open("GET","http://127.0.0.1:8000/getProducts/")
        xhr.setRequestHeader('content-type','application/json')
        xhr.setRequestHeader('Authorization','Token '+localStorage.getItem('AuthToken'))
        // xhr.setRequestHeader('Authorization','Token 354478c37bb42ec0cbc54f3ef61f2283059d1ad0')
        xhr.withCredentials = true
        xhr.send()
    }    
    getOthers = ()=>{
            let xhr = new XMLHttpRequest()
            xhr.addEventListener("readystatechange",()=>{
                if(xhr.readyState===4){
                    let response = JSON.parse(xhr.responseText)
                    if(xhr.status === 200){
                        this.setState({allOthers:response})
                    }
                }
            })
        xhr.open("GET","http://127.0.0.1:8000/getOthers/")
        xhr.setRequestHeader('content-type','application/json')
        xhr.setRequestHeader('Authorization','Token '+localStorage.getItem('AuthToken'))
        // xhr.setRequestHeader('Authorization','Token 354478c37bb42ec0cbc54f3ef61f2283059d1ad0')
        xhr.withCredentials = true
        xhr.send()
    }    
    getUnits = (x)=>{
        let xhr = new XMLHttpRequest()
        xhr.addEventListener("readystatechange",()=>{
            if(xhr.readyState===4){
                let response = JSON.parse(xhr.responseText)
                if(xhr.status === 200){
                    this.setState({activeProductUnit:response})
                }
            }
        })
        xhr.open("GET","http://127.0.0.1:8000/getUnits/"+x)
        xhr.setRequestHeader('content-type','application/json')
        xhr.setRequestHeader('Authorization','Token '+localStorage.getItem('AuthToken'))
        xhr.withCredentials = true
        xhr.send(JSON.stringify({product_id:x}))
    }
    addToggleHandler = (x=null,y=null)=>{
        console.log(x,y)
        this.setState({formOf:x,remarkUnit:y})
    }
    selectProductHandler = (id)=>{
        this.getUnits(id)
        this.setState({slider:1,activeProduct:id,search:{placeholder:"Enter Barcode",value:""}})
    }
    selectUnitHandler = (id)=>{
        this.getUpdates(id)
        this.setState({slider:2,activeUnit:id})
    }
    getUpdates = (x)=>{
        let xhr = new XMLHttpRequest()
        xhr.addEventListener("readystatechange",()=>{
            if(xhr.readyState===4){
                let response = JSON.parse(xhr.responseText)
                if(xhr.status === 200){
                    this.setState({activeProductUnitStatus:response})
                }
            }
        })
    xhr.open("GET","http://127.0.0.1:8000/getStatus/"+x)
    xhr.setRequestHeader('content-type','application/json')
    xhr.setRequestHeader('Authorization','Token '+localStorage.getItem('AuthToken'))
    xhr.withCredentials = true
    xhr.send(JSON.stringify({productunit_id:x}))
    }
    inputOnChange = (x,y,value)=>{
        let formCopy = {...this.state.form}
        let formCopyX = {...formCopy[x]}
        if(x==='category'||x==="remark"){
            formCopyX = value
        }
        else{
            formCopyX[y] = value
        }
        if((value==='furniture'||value==='other')&&y===''){
            let copy = {
                ...formCopy['product'],
                product_type:value
            }
            formCopy['product'] = copy
        }
        formCopy[x] = formCopyX
        this.setState({form:formCopy})
    }
    backHandler = ()=>{
        if(this.state.slider===2){
            this.setState({activeProductUnitStatus:null,slider:this.state.slider-1,activeUnit:null})
        }
        else{
            this.setState({activeProductUnit:null,slider:this.state.slider-1,activeProduct:null,search:{placeholder:"Search Product Name",value:""}})
        }
    }
    addProducts = ()=>{

        let xhr = new XMLHttpRequest()
        xhr.addEventListener("readystatechange",()=>{
            if(xhr.readyState===4){
                // let response = JSON.parse(xhr.responseText)
                if(xhr.status === 201){
                    this.setState({formOf:null,form:this.form})
                    this.getProducts()
                }
            }
        })
    xhr.open("POST","http://127.0.0.1:8000/addProducts/")
    xhr.setRequestHeader('content-type','application/json')
    xhr.setRequestHeader('Authorization','Token '+localStorage.getItem('AuthToken'))
    xhr.withCredentials = true
    xhr.send(JSON.stringify(this.state.form.product))
    } 
    addUnit = ()=>{

        // let data = {...this.state.form.unit}
        let data = {}
        data["Product"] = this.state.activeProduct
        let xhr = new XMLHttpRequest()
        xhr.addEventListener("readystatechange",()=>{
            if(xhr.readyState===4){
                // let response = JSON.parse(xhr.responseText)
                if(xhr.status === 201){
                    this.setState({formOf:null,form:this.form})
                    this.getUnits(this.state.activeProduct)
                    this.getProducts()
                }
            }
        })
    xhr.open("POST","http://127.0.0.1:8000/addUnits/")
    xhr.setRequestHeader('content-type','application/json')
    xhr.setRequestHeader('Authorization','Token '+localStorage.getItem('AuthToken'))
    xhr.withCredentials = true
    xhr.send(JSON.stringify(data))
    }  
    addStatus = ()=>{
        let data = {...this.state.form.status}
        data["ProductUnit"] = this.state.activeUnit
        let xhr = new XMLHttpRequest()
        xhr.addEventListener("readystatechange",()=>{
            if(xhr.readyState===4){
                // let response = JSON.parse(xhr.responseText)
                if(xhr.status === 201){
                    this.setState({formOf:null,form:this.form})
                    this.getUpdates(this.state.activeUnit)
                    this.getUnits(this.state.activeProduct)
                }
            }
        })
        xhr.open("POST","http://127.0.0.1:8000/addStatus/")
        xhr.setRequestHeader('content-type','application/json')
        xhr.setRequestHeader('Authorization','Token '+localStorage.getItem('AuthToken'))
        xhr.withCredentials = true
        xhr.send(JSON.stringify(data))
    }

    updateRemark = ()=>{
        let data = {remark:this.state.form.remark}
        data["id"] = this.state.remarkUnit
        let xhr = new XMLHttpRequest()
        xhr.addEventListener("readystatechange",()=>{
            if(xhr.readyState===4){
                // let response = JSON.parse(xhr.responseText)
                if(xhr.status === 200){
                    this.setState({formOf:null,form:this.form,remarkUnit:null})
                    // this.getUpdates(this.state.activeUnit)
                    this.getUnits(this.state.activeProduct)
                }
            }
        })
        xhr.open("POST","http://127.0.0.1:8000/updateRemark/")
        xhr.setRequestHeader('content-type','application/json')
        xhr.setRequestHeader('Authorization','Token '+localStorage.getItem('AuthToken'))
        xhr.withCredentials = true
        xhr.send(JSON.stringify(data))
    }  

    addOther = ()=>{
        let xhr = new XMLHttpRequest()
        xhr.addEventListener("readystatechange",()=>{
            if(xhr.readyState===4){
                // let response = JSON.parse(xhr.responseText)
                if(xhr.status === 200){
                    this.setState({formOf:null,form:this.form})
                    this.getOthers()
                }
            }
        })
        xhr.open("POST","http://127.0.0.1:8000/addOthers/")
        xhr.setRequestHeader('content-type','application/json')
        xhr.setRequestHeader('Authorization','Token '+localStorage.getItem('AuthToken'))
        xhr.withCredentials = true
        xhr.send(JSON.stringify({"sub_type":this.state.form.category}))
    }

    addEmployee = ()=>{
        let xhr = new XMLHttpRequest()
        xhr.addEventListener("readystatechange",()=>{
            if(xhr.readyState===4){
                // let response = JSON.parse(xhr.responseText)
                if(xhr.status === 201){
                    this.setState({formOf:null,form:this.form})
                    this.getEmployees()
                }
            }
        })
        xhr.open("POST","http://127.0.0.1:8000/addEmployee/")
        xhr.setRequestHeader('content-type','application/json')
        xhr.setRequestHeader('Authorization','Token '+localStorage.getItem('AuthToken'))
        xhr.withCredentials = true
        xhr.send(JSON.stringify(this.state.form.employee))
    }  

    getQr = (id=null)=>{
        this.setState({qrid:id})
    }
    activeLinkChangeHandler = (x)=>{
        let formCopy = {
            ...this.form,
            product:{...this.form.product},
            status:{...this.form.status},
            unit:{...this.form.unit}
        }
        let search = {placeholder:"Search Product Name",value:""}
        if(x==="employee"){
            search = {placeholder:"Search Employee Name",value:""} 
        }
        if(x==="other"||x==="furniture"){
            formCopy.product.product_type = x
        }
        this.setState({activeLink:x,activeProductUnitStatus:null,slider:0,activeUnit:null,activeProductUnit:null,activeProduct:null,search:search,form:formCopy})
    }
    searchChangeHandler = (x)=>{
        let search = {...this.state.search}
        search.value = x.target.value
        this.setState({search:search})
    }
    categoryChangeHandler = (x)=>{
        this.setState({activeCategory:x===this.state.activeCategory?"":x})
    }
    render(){
        return(
        <div className={Style.Content}>
            <Nav logoutHandler={this.logoutHandler}/>
            <SideNav activeLink={this.state.activeLink} activeLinkChangeHandler={this.activeLinkChangeHandler}/>
            <SearchBar searchChangeHandler={this.searchChangeHandler} current={this.state.search}/>
            <ListContainer 
                activeProductUnitStatus={this.state.activeProductUnitStatus} 
                selectProductHandler = {this.selectProductHandler}
                activeProductUnit={this.state.activeProductUnit} 
                selectUnitHandler={this.selectUnitHandler}
                addToggleHandler = {this.addToggleHandler}
                activeProduct={this.state.activeProduct} 
                allProducts={this.state.allProducts} 
                backHandler = {this.backHandler}
                slider={this.state.slider}
                addUnit={this.addUnit}
                allEmployeesDict={this.state.allEmployeesDict}
                allEmployees = {this.state.allEmployees}
                getQr = {this.getQr}
                activeLink={this.state.activeLink}
                allOthers={this.state.allOthers}
                categoryChangeHandler = {this.categoryChangeHandler}
                activeCategory = {this.state.activeCategory}
                search={this.state.search}
            />
            {this.state.formOf?<Modal addToggleHandler={this.addToggleHandler} updateRemark={this.updateRemark} inputOnChange={this.inputOnChange} activeLink={this.state.activeLink} form={this.state.form} formOf={this.state.formOf} addProducts={this.addProducts} addEmployee={this.addEmployee} addUnit={this.addUnit} addStatus={this.addStatus} addOther={this.addOther} allOthers={this.state.allOthers} allEmployees={this.state.allEmployees}/>:null}
            {this.state.qrid?<QrModal qrid={this.state.qrid} getQr={this.getQr} />:null}
        </div>
        )
    }
}

export default Content