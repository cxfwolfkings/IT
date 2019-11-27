import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtGrid } from 'taro-ui'

import awayBusinessImg from '../../assets/awayBusiness.png'
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

  gridCellClick(item, index) {
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

  render() {
    return (
      <View>
        <Image src={awayBusinessImg} style='height:150px'></Image>
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
          onClick={this.gridCellClick.bind(this)}
        />
      </View>
    )
  }
}
