import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtNavBar, AtTabBar } from 'taro-ui'

export default class Index extends Component {

    constructor() {
        super(...arguments)
        this.state = {
            current: 0,
        }
    }

    config = {
        navigationBarTitleText: '公告'
    }

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
                    <AtListItem title='电气研发部(12)' arrow='right' />
                    <AtListItem title='机械研发部' arrow='right' />
                    <AtListItem title='项目管理部' arrow='right' />
                </AtList>
            </View>
        )
    }
}
