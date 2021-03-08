import styled from 'styled-components'
import coverall from '../../../../../assets/images/coverall.png'

export const WrapperContainer = styled.div`
  width: 180px;
  height: 234px;
  float: left;
  display: inline-block;
  overflow: hidden;
  padding: 0 0 30px 50px;
  line-height: 1.4;
  .cover{
    width: 140px;
    height: 140px;
    position: relative;
    img{
      display: block;
      width: 100%;
      height: 100%;
      border: 0;
    }
    .msk{
      position: absolute;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
      background: url(${coverall}) 0 0;
    }
  }
  .desc{
    margin: 8px 0 3px;
    font-size: 14px;
    .tit{
      display: inline-block;
      max-width: 100%;
      vertical-align: middle;
      color:#000;
      cursor: pointer;
      text-decoration: none;
     }
  }
`
