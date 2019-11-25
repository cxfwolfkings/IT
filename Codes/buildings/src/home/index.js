'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import {
    log,
    logWarm,
    logErr
} from '../utils/log'

log('测试信息');
logWarm('测试警告');
logErr('测试错误');

export default class extends React.Component {
    render() {
        return <View style = {
                {
                    marginTop: 200
                }
            } >
            <
            Text > 这是首页 < /Text> < /
        View >
    }
}