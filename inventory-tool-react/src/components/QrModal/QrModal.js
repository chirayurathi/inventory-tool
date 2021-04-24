import React from 'react'
import Style from './QrModal.module.css'

const QrModal = (props)=>{
    return(<div className={Style.QrModal}>
                <div className={Style.Backdrop} onClick={()=>{props.getQr()}}></div>
                <div className={Style.QR}>
                    <img alt="QR Code" src={`http://localhost:8000/getQrCode/${props.qrid}/`} />
                    <a href={`http://localhost:8000/getQrCode/${props.qrid}/`} download>Download</a> 
                </div>
        </div>)
}

export default QrModal;