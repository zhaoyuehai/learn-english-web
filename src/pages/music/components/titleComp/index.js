import React, {Fragment, memo} from "react";
import PropTypes from "prop-types";
import {WrapperContainer} from "./styled";

const TitleComp = ({title, tabs}) =>
    <WrapperContainer>
        <a className='tit'>{title}</a>
        <section className='tab'>
            {tabs && tabs.map(item => {
                return <Fragment key={item.name}>
                    <a>{item.name}</a>
                    <span className='line'>|</span>
                </Fragment>
            })}
        </section>
        <span className='more'>
            <a>更多</a>
            <i className='cor'>&nbsp;</i>
        </span>
    </WrapperContainer>

TitleComp.prototype = {
    title: PropTypes.string.isRequired
}
TitleComp.defaultProps = {
    title: '热门推荐'
}
export default memo(TitleComp)
