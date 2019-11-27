import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtTabBar, AtGrid } from 'taro-ui'

import './index.scss'
import funcImg from '../../assets/homeFunctions.png'
import addressImg from '../../assets/homeAddress.png'
import accountImg from '../../assets/homeAccount.png'
import homeHeaderImg from '../../assets/homeHeader.png'
import funcAwayImg from '../../assets/funcAway.png'
import funcNoticeImg from '../../assets/funcNotice.png'

export default class Index extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      current: 0
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

  gridCellClick(item, index) {
    switch (index) {
      case 0:
        Taro.redirectTo({
          url: '/components/business/index'
        })
        break
      case 1:
        break
      case 2:
        break
    }
  }

  render() {
    return (
      <View>
        <View hidden={this.state.current!=0}>
          <Image src={homeHeaderImg} style='height:150px'></Image>
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
            onClick={this.gridCellClick.bind(this)}
          />
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
