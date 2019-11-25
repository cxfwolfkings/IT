'use strict';

import React from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';
//添加路由组件
import Navigation from 'react-navigation';

//添加展示用的首页
import Home from './home/index';
import Products from './home/products';
import Shop_Cart from './home/shop_cart';
import My from './home/my';

//创建tab页的顶部样式
const styles = StyleSheet.create({
    tab: {
        height: 40,
        backgroundColor: '#fbfafc',
        borderTopColor: '#efefef'
    },
    tabIcon: {
        width: 20,
        height: 20
    },
    tabLabel: {
        marginBottom: 4
    }
})

//创建首页的tab页
const Tabs = Navigation.TabNavigator({
    'Home': {
        screen: Home,
        navigationOptions: ({
            navigation,
            screenProps
        }) => {
            return {
                tabBarLabel: '首页',
                tabBarIcon: (opt) => {
                    if (opt.focused) return <Image source = {
                        {
                            uri: require('./images/tab-home-active')
                        }
                    }
                    style = {
                        styles.tabIcon
                    } > < /Image>;
                    return <Image source = {
                        {
                            uri: require('./images/tab-home')
                        }
                    }
                    style = {
                        styles.tabIcon
                    } > < /Image>;
                }
            }
        }
    },
    'Products': {
        screen: Products,
        navigationOptions: ({
            navigation,
            screenProps
        }) => {
            return {
                tabBarLabel: '产品分类',
                tabBarIcon: (opt) => {
                    if (opt.focused) return <Image source = {
                        {
                            uri: require('./images/tab-products-active')
                        }
                    }
                    style = {
                        styles.tabIcon
                    } > < /Image>;
                    return <Image source = {
                        {
                            uri: require('./images/tab-products')
                        }
                    }
                    style = {
                        styles.tabIcon
                    } > < /Image>;
                }
            }
        }
    },
}, {
    //设置tab使用的组件
    tabBarComponent: Navigation.TabBarBottom,
    //点击哪个才加载哪个tab里的页面
    lazy: true,
    //设置tab放在界面的底部
    tabBarPosition: 'bottom',
    //设置tab里面的样式
    tabBarOptions: {
        style: styles.tab,
        labelStyle: styles.tabLabel,
        activeTintColor: '#d0648f'
    }
});

//创建路由
const Pages = Navigation.StackNavigator({
    'Tabs': {
        screen: Tabs
    },
    'Home': {
        screen: Home
    }
}, {
    //这里做了一个页面跳转的动画
    transitionConfig: () => ({
        screenInterpolator: sceneProps => {
            const {
                layout,
                position,
                scene
            } = sceneProps;
            const {
                index
            } = scene;
            //设置页面跳转的动画
            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [layout.initWidth, 0, 0]
            });
            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
                outputRange: [0, 1, 1, 0.3, 0]
            });
            return {
                opacity,
                transform: [{
                    translateX
                }]
            };
        }
    }),
    navigationOptions: {
        header: null
    }
});

//创建一个自己的容器,方便以后对路由做一些处理
export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Pages onNavigationStateChange = {
            this.listenChange.bind(this)
        } > < /Pages>;
    }
    //监听路由的跳转
    listenChange(state1, state2, action) {

    }
}