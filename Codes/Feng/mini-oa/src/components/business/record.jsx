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

  onClick(tag) {
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

  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
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
              onClick={this.onClick.bind(this)}
            >日</AtTag>
            <AtTag
              type='primary'
              name='tag-week'
              active={this.state.current == 1}
              onClick={this.onClick.bind(this)}
            >周</AtTag>
            <AtTag
              type='primary'
              name='tag-month'
              active={this.state.current == 2}
              onClick={this.onClick.bind(this)}
            >月</AtTag></View>
          <View className='at-col'>
            <Picker mode='date' onChange={this.onDateChange}>
              <View className='picker'>
                当前选择：{this.state.dateSel}
              </View>
            </Picker></View>
        </View>
        <AtList>
          <AtListItem title='电气研发部(12)' arrow='right' />
          <AtListItem title='机械研发部' arrow='right' />
          <AtListItem title='项目管理部' arrow='right' />
        </AtList>
      </View>
    )
  }
}
