import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtNoticebar, AtCalendar } from 'taro-ui'
import './index.scss'

import logoImg from '../../assets/images/logo.png'

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  // 组件将挂载
  componentWillMount() {
    console.log("componentWillMount...");
  }
  // 组件挂载完成
  componentDidMount() {
    console.log("componentDidMount...");
  }
  // 组件将卸载
  componentWillUnmount() {
    console.log("componentWillUnmount...");
  }
  // 显示组件
  componentDidShow() {
    console.log("componentDidShow...");
  }
  // 隐藏组件
  componentDidHide() {
    console.log("componentDidHide...");
  }

  render() {
    return (
      <View className='page page-index'>
        <View className='logo'>
          <Image src={logoImg} className='img' mode='widthFix' onClick={this.onClickLogoImage} />
        </View>
        <View className='page-title'>小马宋的营销日历</View>
        <View>
          <AtNoticebar marquee speed={50} icon='volume-plus'  >
            有圆点标记的日期才有营销日历，点击日期显示营销日历，营销日历贴图版权为「小马宋」所有，小程序开发作者 By Javen，开源项目:https://gitee.com/javen205
          </AtNoticebar>
        </View>
        <View className='page-content'>
          <AtCalendar isVertical />
        </View>
      </View>
    )
  }
}
