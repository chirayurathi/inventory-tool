import React,{Component} from 'react'
import Style from './Content.module.css'
import Nav from '../../components/Nav/Nav'
import ListContainer from '../../components/ListContainer/ListContainer'
import Modal from '../../components/Modal/Modal'
import QrModal from '../../components/QrModal/QrModal'

class Content extends Component{
    constructor(props){
        super(props)
        this.state = {
            allProducts:null,
            allEmployes:null,
            allEmployesDict:null,
            activeProductUnit:null,
            activeProductUnitStatus:null,
            qrid:null,
            activeProduct:null,
            activeUnit:null,
            slider:0,
            formOf:null,
            form:{
                product:{
                    product_name:"",
                    processor:"",
                    ram:"",
                    operating_system:"",
                    units:0,
                    product_type:""
                },
                unit:{
                    barcode:0,
                    status:""
                },
                status:{
                    to_location:"",
                    to_holder:"",
                    remark:""
                }
            }
        }
        this.getProducts()
        this.getEmployes()
    }
    getEmployes = ()=>{
        let xhr = new XMLHttpRequest()
        xhr.addEventListener("readystatechange",()=>{
            if(xhr.readyState===4){
                let response = JSON.parse(xhr.responseText)
                if(xhr.status === 200){
                    let allEmployes = response
                    let allEmployesDict = {}
                    allEmployes.forEach(emp =>{
                        allEmployesDict[emp.employee_id] = emp
                    })
                    this.setState({allEmployes:response,allEmployesDict:allEmployesDict})
                }
            }
        })
        xhr.open("GET","http://127.0.0.1:8000/getEmployes/")
        xhr.setRequestHeader('content-type','application/json')
        xhr.withCredentials = false
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
        xhr.withCredentials = false
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
        xhr.withCredentials = false
        xhr.send(JSON.stringify({product_id:x}))
    }
    addToggleHandler = (x=null)=>{
        console.log(x)
        this.setState({formOf:x})
    }
    selectProductHandler = (id)=>{
        this.getUnits(id)
        this.setState({slider:1,activeProduct:id})
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
    xhr.withCredentials = false
    xhr.send(JSON.stringify({productunit_id:x}))
    }
    inputOnChange = (x,y,value)=>{
        let formCopy = {...this.state.form}
        let formCopyX = {...formCopy[x]}
        formCopyX[y] = value
        formCopy[x] = formCopyX
        this.setState({form:formCopy})
    }
    backHandler = ()=>{
        if(this.state.slider===2){
            this.setState({activeProductUnitStatus:null,slider:this.state.slider-1,activeUnit:null})
        }
        else{
            this.setState({activeProductUnit:null,slider:this.state.slider-1,activeProduct:null})
        }
    }
    addProducts = ()=>{
        let form = {
            product:{
                product_name:"",
                processor:"",
                ram:"",
                operating_system:"",
                units:0,
                product_type:""
            },
            unit:{
                barcode:0,
                status:""
            },
            status:{
                to_location:"",
                to_holder:"",
                remark:""
            }
        }
        let xhr = new XMLHttpRequest()
        xhr.addEventListener("readystatechange",()=>{
            if(xhr.readyState===4){
                // let response = JSON.parse(xhr.responseText)
                if(xhr.status === 201){
                    this.setState({formOf:null,form:form})
                    this.getProducts()
                }
            }
        })
    xhr.open("POST","http://127.0.0.1:8000/addProducts/")
    xhr.setRequestHeader('content-type','application/json')
    xhr.withCredentials = false
    xhr.send(JSON.stringify(this.state.form.product))
    } 
    addUnit = ()=>{
        let form = {
            product:{
                product_name:"",
                processor:"",
                ram:"",
                operating_system:"",
                units:0,
                product_type:""
            },
            unit:{
                barcode:0,
                status:""
            },
            status:{
                to_location:"",
                to_holder:"",
                remark:""
            }
        }
        // let data = {...this.state.form.unit}
        let data = {}
        data["Product"] = this.state.activeProduct
        let xhr = new XMLHttpRequest()
        xhr.addEventListener("readystatechange",()=>{
            if(xhr.readyState===4){
                // let response = JSON.parse(xhr.responseText)
                if(xhr.status === 201){
                    this.setState({formOf:null,form:form})
                    this.getUnits(this.state.activeProduct)
                    this.getProducts()
                }
            }
        })
    xhr.open("POST","http://127.0.0.1:8000/addUnits/")
    xhr.setRequestHeader('content-type','application/json')
    xhr.withCredentials = false
    xhr.send(JSON.stringify(data))
    }  
    addStatus = ()=>{
        let form = {
            product:{
                product_name:"",
                processor:"",
                ram:"",
                operating_system:"",
                units:0,
                product_type:""
            },
            unit:{
                barcode:0,
                status:""
            },
            status:{
                to_location:"",
                to_holder:"",
                remark:""
            }
        }
        let data = {...this.state.form.status}
        data["ProductUnit"] = this.state.activeUnit
        let xhr = new XMLHttpRequest()
        xhr.addEventListener("readystatechange",()=>{
            if(xhr.readyState===4){
                // let response = JSON.parse(xhr.responseText)
                if(xhr.status === 201){
                    this.setState({formOf:null,form:form})
                    this.getUpdates(this.state.activeUnit)
                    this.getUnits(this.state.activeProduct)
                }
            }
        })
        xhr.open("POST","http://127.0.0.1:8000/addStatus/")
        xhr.setRequestHeader('content-type','application/json')
        xhr.withCredentials = false
        xhr.send(JSON.stringify(data))
    }  
    getQr = (id=null)=>{
        this.setState({qrid:id})
    }
    render(){
        return(
        <div className={Style.Content}>
            <Nav/>
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
                allEmployesDict={this.state.allEmployesDict}
                getQr = {this.getQr}
            />
            {this.state.formOf?<Modal addToggleHandler={this.addToggleHandler} inputOnChange={this.inputOnChange} form={this.state.form} formOf={this.state.formOf} addProducts={this.addProducts} addUnit={this.addUnit} addStatus={this.addStatus} allEmployes={this.state.allEmployes}/>:null}
            {this.state.qrid?<QrModal qrid={this.state.qrid} getQr={this.getQr} />:null}
        </div>
        )
    }
}

export default Content