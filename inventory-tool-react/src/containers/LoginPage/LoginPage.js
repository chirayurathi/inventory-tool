import React,{Component} from 'react'
import Style from './LoginPage.module.css'
import Nav from '../../components/Nav/Nav'

class LoginPage extends Component{
    state = {
        form:{
            username:"",
            password:""
        },
        error:false
    }
    loginUser = ()=>{
        let xhr = new XMLHttpRequest()
        xhr.addEventListener("readystatechange",()=>{
            if(xhr.readyState===4){
                let response = JSON.parse(xhr.responseText)
                if(response.token){
                    localStorage.setItem('AuthToken',response.token)
                    this.props.setAuthToken(response.token)
                }
                else{
                    this.setState({error:true})
                }
            }
        })
        xhr.open("POST","http://127.0.0.1:8000/api-token-auth/")
        xhr.setRequestHeader('content-type','application/json')
        // xhr.setRequestHeader('WWW-Authenticate',localStorage.getItem('AuthToken'))
        xhr.withCredentials = false
        xhr.send(JSON.stringify(this.state.form))  
    }
    inputChange = (name,e)=>{
        let formCopy = {...this.state.form}
        formCopy[name] = e.target.value
        this.setState({form:formCopy})
    }
    render(){
        return(<div className={Style.LoginPage}>
            <Nav loggedout/>
            <h1>Login</h1>
            <div className={Style.error} style={{opacity:this.state.error?1:0}}>Invalid Credentials.</div>
            <label for="uername">Username</label>
            <input name="username" type="text" value={this.state.form.username} onChange={(e)=>{this.inputChange("username",e)}} placeholder="username" />
            <label for="password">Password</label>
            <input name="username" type="password" value={this.state.form.password} placeholder="password" onChange={(e)=>{this.inputChange("password",e)}} />
            <button onClick={this.loginUser}>submit</button>
        </div>)
    }
}

export default LoginPage