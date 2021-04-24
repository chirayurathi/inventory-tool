import React from 'react'
import Style from './ProductList.module.css'

const ProductList = (props) => {
    return(
        <div className={Style.ProductList}>
            <div className={Style.Head}>
                <div></div> 
                <h1>Products</h1> 
                <button onClick={()=>{props.addToggleHandler("product")}}>Add Product</button> 
            </div>
            <ul className={Style.Heads}>
                <li>Product Type</li>
                <li>Product Name</li>
                <li>RAM</li>
                <li>Processor</li>
                <li>OS</li>
                <li>Total Units</li>
            </ul>
            {props.allProducts?<ul className={Style.List}>
                {props.allProducts.map(element => {
                    console.log(element)
                    return(<li className={Style.Element} onClick={()=>{props.selectProductHandler(element.product_id)}}>
                        <ul>
                            <li>{element.product_type}</li>
                            <li>{element.product_name}</li>
                            <li>{element.ram}</li>
                            <li>{element.processor}</li>
                            <li>{element.operating_system}</li>
                            <li>{element.total_units}</li>
                        </ul> 
                  </li>) 
                })}
            </ul>:null}
        </div>
        )
}

export default ProductList;