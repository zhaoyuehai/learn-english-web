import styled from 'styled-components'
import downloadBg from '../../../../../assets/images/download.png'
import arrowImg from '../../../../../assets/images/arrow_banner_sprite.png'

export const WrapperContainer = styled.div`
    height:285px;
    background: url(${(props) => props.bgImage}) center center/6000px;
    .banner{
      margin: 0 auto;
      height: 285px;
      width: 982px;
      display: flex;
      position: relative;
    }
`
export const LeftContainer = styled.div`
  height: 285px;
  width: 730px;
  .banner-item{
    overflow: hidden;
    height: 285px;
    .image{
      width: 100%;
      height: 285px;
    }
  }
`
export const RightContainer = styled.div`
  height: 285px;
  width: 254px;
  background: url(${downloadBg});
`
export const BannerControl = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 40%;
  transform: translateY(-50%);
  .btn {
    border: none;
    position: absolute;
    width: 37px;
    height: 63px;
    background: transparent url(${arrowImg});
    cursor: pointer;
    &:hover{
      background-color: rgb(0,0,0,0.1);
    }
  }
  .left{
    left: -68px;
    background-position: 0 -360px;
  }
  .right{
    right: -68px;
    background-position: 0 -508px;
  }
`

