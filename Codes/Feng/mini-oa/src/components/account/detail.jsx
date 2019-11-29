import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtButton, AtSearchBar } from 'taro-ui'

export default class Detail extends Component {
  config = {
    navigationBarTitleText: '个人信息'
  }

  handleCancel() {
    Taro.redirectTo({
      url: '/components/business/apply'
    })
  }

  handleConfirm() {
    Taro.redirectTo({
      url: '/components/business/apply'
    })
  }

  onChangeAddress(searchAddress) {
    this.setState({
      searchAddress
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return searchAddress
  }

  render() {
    return (
      <View>
        <AtSearchBar
          value={this.state.searchAddress}
          onChange={this.onChangeAddress.bind(this)}
        />
        <AtList>
          <AtListItem title='选项1' isSwitch />
          <AtListItem title='选项2' isSwitch />
          <AtListItem title='选项3' isSwitch />
        </AtList>
        <View className='bottomBar'>
          <AtButton type='primary' onClick={this.handleConfirm.bind(this)}>确认</AtButton>
          <AtButton type='secondary' onClick={this.handleCancel.bind(this)}>取消</AtButton>
        </View>
      </View>
    )
  }
}