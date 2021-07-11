import React from 'react'
import Style from './ProductList.module.css'
import { Fragment } from 'react'
const ProductList = (props) => {
    
    return(
        <div className={`${Style.ProductList} ${props.activeLink!=="system" && Style.Other}`}>
            <div className={Style.Head}>
                <div className={Style.Filters}>
                <h1>Products</h1>
                {props.activeLink === "other"?props.allOthers.map(e=>{console.log(props.activeCategory===e.sub_type);return(<div className={props.activeCategory===e.sub_type?Style.ActiveFilter:null} onClick={()=>{props.categoryChangeHandler(e.sub_type)}}>{e.sub_type}</div>)}):null}
                {props.activeLink === "other"?<div onClick={()=>{props.addToggleHandler("other")}}>Add Category</div>:null}
                </div>
                <button onClick={()=>{props.addToggleHandler("product")}}>Add Product</button> 
            </div>
            <div className={Style.Box}>
            <ul className={Style.Heads}>
                <li>Product Type</li>
                <li>Product Name</li>
                {props.activeLink==="system"?
                <Fragment>
                    <li>RAM</li> 
                    <li>Processor</li>
                    <li>OS</li>
                    <li>HDD</li>
                </Fragment>:<li>Description</li>}
                <li>Units</li>
            </ul>
            {props.allProducts?<ul className={Style.List}>
                {props.allProducts.map(element => {
                    if((element.product_type===props.activeLink || (props.activeLink === "system" && element.product_type!=="furniture" && element.product_type!=="other")) && ((element.product_type==="other" && element.other_type.toLowerCase().includes(props.activeCategory.toLowerCase())) || (element.product_type!=="other")) && (element.product_name.includes(props.search.value))){
                    return(<li className={Style.Element} key={element.product_id} onClick={()=>{props.selectProductHandler(element.product_id)}}>
                        <ul>
                            <li>{props.activeLink==="other"?element.other_type:element.product_type}</li>
                            <li>{element.product_name}</li>
                            {props.activeLink==="system"?
                            <Fragment>
                            <li>{element.ram}</li>
                            <li>{element.processor}</li>
                            <li>{element.operating_system}</li>
                            <li>{element.hdd}</li>
                            </Fragment>:<li>{element.description}</li>}
                            <li>{element.total_units}</li>
                        </ul> 
                  </li>) 
                    }
                    else{
                        return null;
                    }
                })}
            </ul>:null}
            </div>
        </div>
        )
}

export default ProductList;