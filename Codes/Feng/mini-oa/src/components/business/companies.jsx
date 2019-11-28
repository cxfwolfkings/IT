import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtButton } from 'taro-ui'

export default class Companies extends Component {
    config = {
        navigationBarTitleText: '同行人选择'
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

    render() {
        return (
            <View>
                <AtList>
                    <AtListItem title='选项1' isSwitch />
                    <AtListItem title='选项2' isSwitch />
                    <AtListItem title='选项3' isSwitch />
                </AtList>
                <AtButton type='primary' onClick={this.handleConfirm.bind(this)}>确认</AtButton>
                <AtButton type='secondary' onClick={this.handleCancel.bind(this)}>取消</AtButton>
            </View>
        )
    }
}