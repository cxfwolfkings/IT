import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtTabBar, AtGrid, AtList, AtListItem, AtInput } from 'taro-ui'

import './index.scss'
import funcImg from '../../assets/homeFunctions.png'
import addressImg from '../../assets/homeAddress.png'
import accountImg from '../../assets/homeAccount.png'
import homeHeaderImg from '../../assets/homeHeader.jpg'
import funcAwayImg from '../../assets/funcAway.png'
import funcNoticeImg from '../../assets/funcNotice.png'

export default class Index extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      current: 0,
      address: ''
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '首页'
  }

  handleClick(value) {
    this.setState({
      current: value
    })
  }

  handleChange(address) {
    this.setState({
      address
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return address
  }

  handleGridCellClick(item, index) {
    switch (index) {
      case 0:
        Taro.redirectTo({
          url: '/components/business/index'
        })
        break
      case 1:
        Taro.redirectTo({
          url: '/components/notice/index'
        })
        break
      case 2:
        break
    }
  }

  render() {
    return (
      <View>
        <View hidden={this.state.current != 0}>
          <Image src={homeHeaderImg}  style='height:400rpx;width:100%'></Image>
          <AtGrid data={
            [
              {
                image: funcAwayImg,
                value: '出差'
              },
              {
                image: funcNoticeImg,
                value: '公告'
              },
              {
                image: '',
                value: ''
              },
              {
                image: '',
                value: ''
              },
              {
                image: '',
                value: ''
              },
              {
                image: '',
                value: ''
              },
              {
                image: '',
                value: ''
              },
              {
                image: '',
                value: ''
              },
              {
                image: '',
                value: ''
              }
            ]}
            onClick={this.handleGridCellClick.bind(this)}
          />
        </View>
        <View hidden={this.state.current != 1}>
          <AtInput
            name='value'
            title=''
            type='text'
            placeholder='搜索'
            value={this.state.address}
            onChange={this.handleChange.bind(this)}
          />
          <AtList>
            <AtListItem title='电气研发部(12)' arrow='right' />
            <AtListItem title='机械研发部' arrow='right' />
            <AtListItem title='项目管理部' arrow='right' />
          </AtList>
        </View>
        <AtTabBar
          fixed
          tabList={[
            { image: funcImg },
            { image: addressImg },
            { image: accountImg }
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
      </View>
    )
  }
}
