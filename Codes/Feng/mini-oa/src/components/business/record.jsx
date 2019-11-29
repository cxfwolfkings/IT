import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { AtTag, AtList, AtListItem } from 'taro-ui'

export default class Record extends Component {

  constructor() {
    super(...arguments)
    let list = this.data
    if (this.$router.params.key) {
      // ...
    }
    this.state = {
      current: 2,
      list: list
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

  data = [
    {
      key: 1,
      name: '电气研发部(12)',
      children: [
        {
          key: 1.1,
          name: '电气一组(3)',
          children: [
            {
              key: '1.1.1',
              isLeaf: true,
              name: '鸣人',
              from: '木叶村',
              to: '妙木山',
              date: '2019-12-31 上午',
              parentKey: 1.1
            },
            {
              key: '1.1.2',
              isLeaf: true,
              name: '鸣人',
              from: '木叶村',
              to: '妙木山',
              date: '2019-12-31 上午',
              parentKey: 1.1
            },
            {
              key: '1.1.3',
              isLeaf: true,
              name: '鸣人',
              from: '木叶村',
              to: '妙木山',
              date: '2019-12-31 上午',
              parentKey: 1.1
            }
          ]
        },
        {
          key: 1.2,
          name: '电气二组'
        },
        {
          key: 1.3,
          name: '电气三组'
        },
        {
          key: 1.4,
          name: '电气四组'
        },
        {
          key: 1.5,
          name: '电气五组'
        },
        {
          key: 1.6,
          name: '电气六组'
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

  handleClickRow(itemKey) {
    let data = this.state.list
    data = data.find(_ => _.key == itemKey).children
    this.setState({
      list: data
    })
  }

  handleViewDetail(itemKey, parentKey) {
    Taro.redirectTo({
      url: '/components/business/apply?key=' + itemKey + '&parentKey=' + parentKey
    })
  }

  render() {
    const _this = this
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
            this.state.list.map(function (item) {
              if (item.isLeaf) {
                return (
                  <View key={item.key} className='at-row'
                    style='font-size:32rpx;border:0 solid #d6e4ef;border-bottom-width:1px;padding:30rpx'
                    onClick={_this.handleViewDetail.bind(_this, item.key, item.parentKey)}
                  >
                    <View className='at-col'>
                      <View className='at-row'>
                        <View className='at-col' style='font-size:36rpx'>{item.name}</View>
                        <View className='at-col'>{item.date}</View>
                      </View>
                      <View className='at-row'>
                        <View className='at-col'>出发地：{item.from}</View>
                      </View>
                      <View className='at-row'>
                        <View className='at-col'>目的地：{item.to}</View>
                      </View>
                    </View>
                  </View>
                )
              } else if (item.children) {
                return <AtListItem key={item.key} title={item.name} arrow='right' onClick={_this.handleClickRow.bind(_this, item.key)} />
              }
              return <AtListItem key={item.key} title={item.name} />
            })
          }
        </AtList>
      </View>
    )
  }
}
