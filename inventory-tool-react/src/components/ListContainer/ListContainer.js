import React from 'react'
import Style from './ListContainer.module.css'
import ProductList from '../ProductList/ProductList'
import StatusList from '../StatusList/StatusList'
import UnitList from '../UnitList/UnitList'
const ListContainer = (props) => {
    return(
        <div className={Style.ListContainer}>
            <div className={Style.Lists} style={{transform:`translateX(${props.slider*-100}%)`}}>
                <ProductList allProducts = {props.allProducts} selectProductHandler = {props.selectProductHandler} addToggleHandler={props.addToggleHandler}/>
                <UnitList activeProductUnit={props.activeProductUnit} selectUnitHandler={props.selectUnitHandler} addUnit={props.addUnit} backHandler={props.backHandler} addToggleHandler={props.addToggleHandler} allEmployesDict = {props.allEmployesDict}/>
                <StatusList activeProductUnitStatus={props.activeProductUnitStatus} backHandler={props.backHandler} addToggleHandler={props.addToggleHandler} allEmployesDict = {props.allEmployesDict}/>
            </div>
        </div>
        )
}

export default ListContainer;