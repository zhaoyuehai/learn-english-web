import React, {Component} from "react";
import {BannerControl, LeftContainer, RightContainer, WrapperContainer} from "./styled";
import {Carousel} from "antd";

class BannerComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        }
    }

    render() {
        let {currentIndex} = this.state
        let banners = this.props.data
        let bgImage = banners[currentIndex] && `${banners[currentIndex]["imageUrl"]}?imageView&blur=40x20`
        return (<WrapperContainer bgImage={bgImage}>
            <section className='banner'>
                <LeftContainer>
                    <Carousel
                        effect='fade'
                        beforeChange={(from, to) => {
                            this.setState({
                                currentIndex: to
                            })
                        }}
                        ref={bannerRef => this.bannerRef = bannerRef}
                        autoplay
                    >
                        {
                            banners.map((item, index) => {
                                return <div className='banner-item' key={item.imageUrl}>
                                    <img className='image'
                                         src={item.imageUrl}
                                         alt={item.typeTitle}
                                    />
                                </div>
                            })
                        }
                    </Carousel>
                </LeftContainer>
                <RightContainer>
                </RightContainer>
                <BannerControl>
                    <a className='btn left' onClick={() => {
                        this.bannerRef.prev()
                    }}/>
                    <a className='btn right' onClick={() => {
                        this.bannerRef.next()
                    }}/>
                </BannerControl>
            </section>
        </WrapperContainer>)
    }
}

export default BannerComp
