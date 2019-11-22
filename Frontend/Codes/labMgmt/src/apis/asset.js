import https from '../utils/https'
import request from '../utils/https'

export default {
    searchByKeywords1: params => request.get('/Asset/GetAssetsGruopByModel', params),
    searchByKeywords: async(keywords) => {
       //debugger
       // var res = await https.get('api/asset/' + keywords, {});
       var data = [
           { id:1 , category1: '卷绕机', brand: '先导智能', category2: '小型', model: 'SMALL001', count: 200 },
           { id:1 , category1: 'PLC', brand: '倍福', category2: '小型', model: 'BEFI001', count: 50 },
           { id:1 , category1: 'PLC', brand: '欧姆龙', category2: '卷绕机用', model: 'OMRON001', count: 100 },
           { id:1 , category1: '卷绕机', brand: '先导智能', category2: '小型', model: 'SMALL001', count: 200 },
           { id:1 , category1: '卷绕机', brand: '先导智能', category2: '小型', model: 'SMALL001', count: 200 },
           { id:1 , category1: '卷绕机', brand: '先导智能', category2: '小型', model: 'SMALL001', count: 200 },
           { id:1 , category1: '卷绕机', brand: '先导智能', category2: '小型', model: 'SMALL001', count: 200 }
       ]
       return data
    },
    getAssetCategoryMain: () => {
        return {
            categories: [
                { name: "PLC", belongto:"电气研发" },
                { name: "工控机", belongto:"电气研发" },
                { name: "HMI", belongto:"电气研发" },
                { name: "伺服电机", belongto:"电气研发" }
            ],
            pageInfo: {
                totalItemCount: 100,
                pageSize: 10,
                curPage:1
            }
        }
    },
    getAssetCategorySub: () => {
        return {
            brands: [
                { name: '光源', belongto: '电气研发', parent: '呆滞品'},
                { name: '面阵相机', belongto: '机械设计', parent: '呆滞品'},
                { name: '镜头', belongto: '电气研发', parent: '伺服机'},
                { name: '伺服动力标准电缆', belongto: '电气研发', parent: '振动抑制'},
                { name: '光纤同轴位移控制器', belongto: '电气研发', parent: '振动抑制'}
            ],
            pageInfo: {
                totalItemCount: 26,
                pageSize: 10,
                curPage:1
            }
        }
    },
    getBrands: () => {
        return {
            brands: [
                { name: '欧姆龙', belongto: '电气研发', parent: 'PLC'},
                { name: '倍福', belongto: '机械设计', parent: 'PLC'},
                { name: '倍福', belongto: '电气研发', parent: '伺服机'},
                { name: '富士', belongto: '设计', parent: '伺服机'},
                { name: '倍福', belongto: '电气研发', parent: 'PLC'}
            ],
            pageInfo: {
                totalItemCount: 26,
                pageSize: 10,
                curPage:1
            }
        }
    },
    getDeptMainCategories : () => {
        return [
            { value: 'md', label: '机械部门', children: [ { value: 'PLC1', label: 'PLC001' }, { value: 'sfj1', label: '伺服机001' }  ] },
            { value: 'elec', label: '电气研发', children: [ { value: 'PLC2', label: 'PLC002' }, { value: 'sfj2', label: '伺服机002' }  ] }
        ]
    },
    getLabAddress: () =>{ // 馆藏地址options数据源
        return [
            {
                value: '1',
                label: '一号实验室',
                children: [
                    {
                        value: 1,
                        label: '1楼馆藏地'
                    },
                    {
                        value: 2,
                        label: '2楼馆藏地'
                    },
                    {
                        value: 3,
                        label: '3楼馆藏地'
                    }
                ]
            },
            {
                value: '2',
                label: '2号实验室',
                children: [
                    {
                        value: 4,
                        label: '4楼馆藏地'
                    },
                    {
                        value: 5,
                        label: '5楼馆藏地'
                    },
                    {
                        value: 6,
                        label: '6楼馆藏地'
                    }
                ]
            }
        ]
    }
}