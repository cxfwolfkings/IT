import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtList, AtNavBar, AtTabBar } from 'taro-ui'

export default class Index extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      current: 0,
      list: this.data
    }
  }

  config = {
    navigationBarTitleText: '公告'
  }

  data = [
    {
      key: 1,
      cover: '../../assets/homeHeader.jpg',
      title: '通知',
      note: '系统于2019年11月26号进行更新，请大家知晓'
    },
    {
      key: 2,
      cover: '../../assets/homeHeader.jpg',
      title: '通知',
      note: '系统于2019年11月26号进行更新，请大家知晓'
    },
    {
      key: 3,
      cover: '../../assets/homeHeader.jpg',
      title: '通知',
      note: '系统于2019年11月26号进行更新，请大家知晓'
    }
  ]

  handleClickLeftIcon() {
    Taro.redirectTo({
      url: '/pages/index/index'
    })
  }

  handleClick(value) {
    this.setState({
      current: value
    })
  }

  render() {
    return (
      <View>
        <AtNavBar
          onClickLeftIcon={this.handleClickLeftIcon}
          leftIconType='chevron-left'
          color='#000'
          leftText='返回'
        >
          <AtTabBar
            tabList={[
              { title: '未读' },
              { title: '已读' }
            ]}
            onClick={this.handleClick.bind(this)}
            current={this.state.current}
          />
        </AtNavBar>
        <AtList>
          {
            this.state.list.map(item => {
              return (
                <View key={item.key} className='at-row'
                  style='font-size:32rpx;border:0 solid #d6e4ef;border-bottom-width:1px'
                >
                  <View className='at-col at-col-4'>
                    <View className='at-row'>
                      <View className='at-col'>
                        <Image src={item.cover} style='width:100%;height:180rpx'></Image>
                      </View>
                    </View>
                  </View>
                  <View className='at-col at-col-8' style='margin-left:18rpx;margin-top:18rpx'>
                    <View className='at-row'>
                      <View className='at-col' style='font-size:36rpx'>
                        {item.title}
                      </View>
                    </View>
                    <View className='at-row' style='margin-top:9rpx'>
                      <View className='at-col' style='white-space:normal'>
                        {item.note}
                      </View>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </AtList>
      </View>
    )
  }
}
