import React from 'react'
import styled from 'styled-components'
import {categories} from '../data.js'
import CategoryItem from './CategoryItem'
import {mobile} from '../responsive.js'

const Container = styled.div`

    display: flex;
    padding: 20px;
    ${mobile({ padding: "0px", flexDirection:"column" })}


`

const Categories = () => {
    return (
        <Container>
            {
                categories.map((item) => (

                    <CategoryItem  key={item.id} item={item}/>

                ))
            }
        </Container>
    )
}

export default Categories
