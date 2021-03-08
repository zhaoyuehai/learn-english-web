import React, {memo} from "react";
import {WrapperContainer} from "./styled";

const CommonItem = ({itemData}) => <WrapperContainer>
    <section className='cover'>
        <img src={`${itemData.picUrl}?param=140y140`} alt=''/>
        <a className='msk'/>
    </section>
    <p className='desc'>
        <a title={itemData.name} className='tit'>{itemData.name}</a>
    </p>
</WrapperContainer>


export default memo(CommonItem)
