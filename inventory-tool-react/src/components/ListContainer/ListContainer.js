import React from 'react'
import Style from './ListContainer.module.css'
import ProductList from '../ProductList/ProductList'
import StatusList from '../StatusList/StatusList'
import UnitList from '../UnitList/UnitList'
import EmployeeList from '../EmployeeList/EmployeeList'
const ListContainer = (props) => {
    return(
        <div className={Style.ListContainer}>
            <div className={Style.Lists} style={{transform:`translateX(${props.slider*-100}%)`}}>
                {props.activeLink!=="employee"?
                [<ProductList search={props.search} activeLink={props.activeLink} allProducts = {props.allProducts} selectProductHandler = {props.selectProductHandler} addToggleHandler={props.addToggleHandler} allOthers={props.allOthers} categoryChangeHandler={props.categoryChangeHandler} activeCategory={props.activeCategory}/>,
                <UnitList search={props.search} activeProductUnit={props.activeProductUnit} getQr={props.getQr} selectUnitHandler={props.selectUnitHandler} addUnit={props.addUnit} backHandler={props.backHandler} addToggleHandler={props.addToggleHandler} allEmployeesDict = {props.allEmployeesDict}/>,
                <StatusList activeProductUnitStatus={props.activeProductUnitStatus} backHandler={props.backHandler} addToggleHandler={props.addToggleHandler} allEmployeesDict = {props.allEmployeesDict}/>]:
                <EmployeeList search={props.search} allEmployees={props.allEmployees} addToggleHandler={props.addToggleHandler}/>}
            </div>
        </div>
        )
}

export default ListContainer;