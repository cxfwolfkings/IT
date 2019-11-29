import Taro, { Component } from '@tarojs/taro'
import { View, Text, Label, Radio, RadioGroup } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtIcon } from 'taro-ui'

export default class Apply extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      value: '',
      dayTypes: [
        {
          value: '1',
          text: '上午',
          checked: true
        },
        {
          value: '2',
          text: '下午',
          checked: false
        }
      ]
    }
    if (this.$router.params.key) {
      Taro.setNavigationBarTitle({
        title: '记录详情'
      })
    } else {
      Taro.setNavigationBarTitle({
        title: '出差申请'
      })
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleChange(value) {
    this.setState({
      value
    })
  }

  handleSubmit() {
    console.log(this.state.value)
  }

  handleCancel() {
    Taro.redirectTo({
      url: '/components/business/index'
    })
  }

  handleReturn() {
    Taro.redirectTo({
      url: '/components/business/record?key=' + this.$router.params.parentKey
    })
  }

  handleClickRgIconSt() {
    Taro.redirectTo({
      url: '/components/business/companies'
    })
  }

  addButtons() {
    if (this.$router.params.key) {
      return <AtButton type='secondary' className='bottomBar' onClick={this.handleReturn.bind(this)}>返回</AtButton>
    }
    return (
      <View className='bottomBar'>
        <AtButton type='primary' formType='submit'>提交</AtButton>
        <AtButton type='secondary' onClick={this.handleCancel.bind(this)}>取消</AtButton>
      </View>
    )
  }

  render() {
    return (
      <AtForm
        onSubmit={this.handleSubmit.bind(this)}
      >
        <AtInput
          name='txt-name'
          title='姓名'
          type='text'
          placeholder='请输入...'
          value={this.state.value}
          onChange={this.handleChange.bind(this, 'value')}
        />
        <AtInput
          name='txt-busiDate'
          title='出差日期'
          type='text'
          placeholder='请选择...'
          value={this.state.value}
          onChange={this.handleChange.bind(this, 'value')}
        />
        <View className='at-row' style='padding:24rpx 0;font-size: 32rpx;line-height:1.5'>
          <Text style='margin-left:32rpx;margin-right:16rpx;width:172rpx'>出差时段</Text>
          <RadioGroup>
            {this.state.dayTypes.map((item, i) => {
              return (
                <Label className='radio-list__label' for={i} key={i}>
                  <Radio className='radio-list__radio' value={item.value} checked={item.checked}>{item.text}</Radio>
                </Label>
              )
            })}
          </RadioGroup>
        </View>
        <AtInput
          name='txt-name'
          title='出差时间'
          type='text'
          placeholder='请选择...'
          value={this.state.value}
          onChange={this.handleChange.bind(this, 'value')}
        />
        <AtInput
          name='txt-srcPlace'
          title='出发地'
          type='text'
          placeholder='请选择...'
          value={this.state.value}
          onChange={this.handleChange.bind(this, 'value')}
        />
        <AtInput
          name='txt-busiPlace'
          title='目的地'
          type='text'
          placeholder='请选择...'
          value={this.state.value}
          onChange={this.handleChange.bind(this, 'value')}
        />
        <View
          hidden={this.$router.params.key}
          className='at-row'
          style='padding:24rpx 0;font-size: 32rpx;line-height:1.5'
          onClick={this.handleClickRgIconSt}
        >
          <Text style='margin-left:32rpx;margin-right:16rpx;width:172rpx'>同行人</Text>
          <AtIcon value='chevron-right' size='28' color='#CCC' className='rightArrow'></AtIcon>
        </View>
        {
          this.addButtons()
        }
      </AtForm >
    )
  }
}
