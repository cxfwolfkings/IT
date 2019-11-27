import Taro, { Component } from '@tarojs/taro'
import { Label, Radio, RadioGroup } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'

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
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '出差申请'
  }

  handleChange(value) {
    this.setState({
      value
    })
  }

  onSubmit() {
    console.log(this.state.value)
  }

  onReset() {
    this.setState({
      value: '',
    })
  }

  render() {
    return (
      <AtForm
        onSubmit={this.onSubmit.bind(this)}
        onReset={this.onReset.bind(this)}
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
          name='txt-name'
          title='出差日期'
          type='text'
          placeholder='请选择...'
          value={this.state.value}
          onChange={this.handleChange.bind(this, 'value')}
        />
        <AtInput
          name='txt-name'
          title='出差时间'
          type='text'
          placeholder='请选择...'
          value={this.state.value}
          onChange={this.handleChange.bind(this, 'value')}
        />
        <RadioGroup>
          {this.state.dayTypes.map((item, i) => {
            return (
              <Label className='radio-list__label' for={i} key={i}>
                <Radio className='radio-list__radio' value={item.value} checked={item.checked}>{item.text}</Radio>
              </Label>
            )
          })}
        </RadioGroup>
        <AtButton formType='submit'>提交</AtButton>
        <AtButton formType='reset'>重置</AtButton>
      </AtForm>
    )
  }
}
