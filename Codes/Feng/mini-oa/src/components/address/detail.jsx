import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtList, AtListItem, AtNavBar } from 'taro-ui'

import awayBusinessImg from '../../assets/awayBusiness.jpg'

export default class Detail extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '联系人'
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
        <AtList>
          <AtListItem title='姓名' />
          <AtListItem title='部门' />
          <AtListItem title='电话' />
          <AtListItem title='出勤地' />
        </AtList>
      </View>
    )
  }
}
