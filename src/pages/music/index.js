import React, {Component} from "react";
import {connect} from "react-redux";
import BannerComp from "./components/bannerComp";
import TitleComp from "./components/titleComp";
import {WrapperRecommend} from "./styled";
import CommonItem from "./components/commonItem";
import {actions} from "./store/actions";

const tabsState = [
    {
        name: "华语",
    },
    {
        name: "流行",
    },
    {
        name: "摇滚",
    },
    {
        name: "民谣",
    },
    {
        name: "电子",
    },]

class Music extends Component {

    componentDidMount() {
        this.props.loadData()
    }

    render() {
        let {banners, personalizedList} = this.props
        return <>
            <BannerComp data={banners}/>
            <WrapperRecommend>
                <section className='container_left'>
                    <TitleComp title='热门推荐' tabs={tabsState}/>
                    <section className='recommend-list'>
                        {personalizedList.splice(0, 8).map(item => {
                            return <CommonItem key={item.id} itemData={item}/>
                        })}
                    </section>
                    <TitleComp title='新碟上架'/>
                    <TitleComp title='榜单'/>
                </section>
            </WrapperRecommend>
        </>
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadData: () => dispatch({type: actions.LOAD_DATA}),
})

const mapStateToProps = (state) => ({
    ...state.music.toJS()
})

export default connect(mapStateToProps, mapDispatchToProps)(Music)
