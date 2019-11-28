import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { AtTag, AtList, AtListItem } from 'taro-ui'

export default class Record extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      current: 2
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '出差记录'
  }

  list = [
    {
      key: 1,
      name: '电气研发部(12)',
      children: [
        {
          key: 1.1,
          name: '电气一组(3)'
        },
        {
          key: 1.2,
          name: '电气二组(3)'
        },
        {
          key: 1.3,
          name: '电气三组(3)'
        }
      ]
    },
    {
      key: 2,
      name: '机械研发部'
    },
    {
      key: 3,
      name: '项目管理部'
    }
  ]

  handleClickLeftIcon() {
    Taro.redirectTo({
      url: '/components/business/index'
    })
  }

  handleClickDateType(tag) {
    switch (tag.name) {
      case 'tag-day':
        this.setState({
          current: 0
        })
        break
      case 'tag-week':
        this.setState({
          current: 1
        })
        break
      case 'tag-month':
        this.setState({
          current: 2
        })
        break
    }
  }

  handleChangeDate = e => {
    this.setState({
      dateSel: e.detail.value
    })
  }

  handleClickRow(row) {
    console.log(row)
  }

  render() {
    return (
      <View>
        <View className='at-row'>
          <View className='at-col'>
            <AtTag
              type='primary'
              name='tag-day'
              active={this.state.current == 0}
              onClick={this.handleClickDateType.bind(this)}
            >日</AtTag>
            <AtTag
              type='primary'
              name='tag-week'
              active={this.state.current == 1}
              onClick={this.handleClickDateType.bind(this)}
            >周</AtTag>
            <AtTag
              type='primary'
              name='tag-month'
              active={this.state.current == 2}
              onClick={this.handleClickDateType.bind(this)}
            >月</AtTag></View>
          <View className='at-col'>
            <Picker mode='date' onChange={this.handleChangeDate} style='font-size:32rpx;'>
              <View className='picker' style='font-size:32rpx;'>
                当前选择：{this.state.dateSel}
              </View>
            </Picker></View>
        </View>
        <AtList>
          {
            this.list.map(function (item) {
              if (item.children) {
                return <AtListItem key={item.key} title={item.name} arrow='right' onClick='' />
              } else {
                return <AtListItem key={item.key} title={item.name} />
              }
            })
          }
        </AtList>
      </View>
    )
  }
}
