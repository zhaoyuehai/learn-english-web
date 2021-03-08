import styled from 'styled-components'
import indexImg from '../../../../../assets/images/index.png'

export const WrapperContainer = styled.div`
  width: 700px;
  height: 33px;
  padding: 0 10px 0 33px;
  border-bottom: 2px solid #c10d0c;
  background: url(${indexImg}) no-repeat -225px -156px;
  .more {
    float:right;
    margin-top: 9px;
    .cor{
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-left: 4px;
      vertical-align: middle;
      background: url(${indexImg}) no-repeat 0 -240px;
    }
    i{
      font-style: normal;
      text-align: left;
      font-size: inherit;
    }
  }
  .tit {
    float: left;
    font-size: 20px;
    font-weight: normal;
    line-height: 28px;
    text-decoration: none;
    font-family: 'Microsoft YaHei UI', Arial,Helvetica,sans-serif;
  }
  .tab {
    width: 258px;
    height: 16px;
    float: left;
    margin: 7px 0 0 20px;
    a {
      text-decoration: none;
      cursor: pointer;
      &:hover{
        color:#333;
      }
    }
    .line {
      margin: 0 10px;
      color: #ccc;
    }
  }
`
