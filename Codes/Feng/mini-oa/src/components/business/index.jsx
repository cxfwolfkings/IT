import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtGrid, AtNavBar } from 'taro-ui'

import awayBusinessImg from '../../assets/awayBusiness.jpg'
import businessApplyImg from '../../assets/businessApply.png'
import businessRecordImg from '../../assets/businessRecord.png'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '出差'
  }

  handleGridCellClick(item, index) {
    switch (index) {
      case 0:
        Taro.redirectTo({
          url: '/components/business/apply'
        })
        break
      case 1:
        Taro.redirectTo({
          url: '/components/business/record'
        })
        break
    }
  }

  handleClickLeftIcon() {
    Taro.redirectTo({
      url: '/pages/index/index'
    })
  }

  render() {
    return (
      <View>
        <Image src={awayBusinessImg} style='height:400rpx;width:100%'></Image>
        <AtNavBar
          onClickLeftIcon={this.handleClickLeftIcon}
          leftIconType='chevron-left'
          color='#000'
        />
        <AtGrid data={
          [
            {
              image: businessApplyImg,
              value: '出差申请'
            },
            {
              image: businessRecordImg,
              value: '出差记录'
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
          columnNum='2'
          onClick={this.handleGridCellClick.bind(this)}
        />
      </View>
    )
  }
}
