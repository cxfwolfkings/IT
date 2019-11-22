<template>
  <el-card class="box-card">
    <el-form ref="myModel" :model="myModel" :rules="formContent.rules" :form-content="formContent" :inline="formContent.formProterty.inline" :label-width="formContent.formProterty.labelWidth" :label-position="formContent.formProterty.labelPosition">
      <el-form-item v-for="item in formContent.formItems" :key="item.index" :label="item.label" :prop="item.prop" :id="'c_' + item.prop">
        <template v-if="item.formType==='text'">
          <el-input v-show="item.isVisible" v-model="myModel[item.prop]" :placeholder="item.placeholder" :size="item.size" :form-type="item.formType"/>
          <a v-if="item.isAddButton" style="Color: #28a7dc!important" href="javascript:;" @click="item.clickFunc()">{{ item.selectText }}</a>
        </template>
        <template v-if="item.formType==='date'">
          <el-date-picker v-model="myModel[item.prop]" :placeholder="item.placeholder" :size="item.size" :form-type="item.formType" />
        </template>
        <template v-if="item.formType==='dateInterval'">
          <el-date-picker v-model="myModel[item.prop1]" :id="'c_' + item.prop1" :placeholder="item.placeholder" :size="item.size" :form-type="item.formType" :type="item.dataType"/>
          ~
          <el-date-picker v-model="myModel[item.prop2]" :id="'c_' + item.prop2" :placeholder="item.placeholder" :size="item.size" :form-type="item.formType" :type="item.dataType"/>
          <!-- <el-date-picker v-model="myModel[item.prop]" :range-separator="item.rangeSeparator" :start-placeholder="item.startPlaceholder" :end-placeholder="item.endPlaceholder" :size="item.size" :form-type="'date'" type="daterange" style="width:350px"/> -->
        </template>
        <template v-if="item.formType==='select'">
          <el-select v-if="typeof item.changeFunc === 'function'" v-model="myModel[item.prop]" :placeholder="item.placeholder" :size="item.size" :form-type="item.formType" :value="item.dafaultValue" :multiple="item.isMultiple" collapse-tags @change="item.changeFunc(myModel[item.prop])">
            <el-option v-for="x in item.dafaultValue" :label="x.label" :value="x.value" :key="x.index" />
          </el-select>
          <el-select v-else v-model="myModel[item.prop]" :placeholder="item.placeholder" :size="item.size" :form-type="item.formType" :value="item.dafaultValue" :multiple="item.isMultiple" collapse-tags>
            <el-option v-for="x in item.dafaultValue" :label="x.label" :value="x.value" :key="x.index" />
          </el-select>
          <a v-if="item.isAddButton" style="Color: #28a7dc!important" href="javascript:;" @click="item.clickFunc(myModel[item.prop])">{{ item.selectText }}</a>
        </template>
        <template v-if="item.formType==='checkbox'">
          <el-checkbox-group v-model="myModel[item.prop]" :placeholder="item.placeholder" :size="item.size" :form-type="item.formType" :value="item.dafaultValue">
            <el-checkbox v-for="y in item.dafaultValue" :label="y.label" :name="y.value" :key="y.index" />
          </el-checkbox-group>
        </template>
        <template v-if="item.formType==='radiobox'">
          <el-radio-group v-model="myModel[item.prop]" :placeholder="item.placeholder" :size="item.size" :form-type="item.formType" :value="item.dafaultValue">
            <el-radio v-for="z in item.dafaultValue" :label="z.label" :name="z.value" :key="z.index"/>
          </el-radio-group>
        </template>
        <template v-if="item.formType==='textarea'">
          <el-input v-model="myModel[item.prop]" :placeholder="item.placeholder" :size="item.size" :form-type="item.formType"/>
        </template>
        <template v-if="item.formType==='switch'">
          <el-switch v-model="myModel[item.prop]" :placeholder="item.placeholder" :size="item.size" :form-type="item.formType" />
        </template>
        <template v-if="item.formType==='fixed-time'">
          <el-time-picker v-model="myModel[item.prop]" :placeholder="item.placeholder" :size="item.size" :form-type="item.formType" />
        </template>
      </el-form-item>
      <el-row>
        <el-row class="tx-right">
          <el-button v-waves type="primary" icon="el-icon-search" size="small" @click="query">{{ L('Query') }}</el-button>
          <el-button v-waves type="success" icon="el-icon-download" size="small" @click="handleExport">{{ L('Export') }}</el-button>
        </el-row>
      </el-row>
    </el-form>
  </el-card>
</template>
<style scoped>
  .el-form-item .el-form-item__content .el-input,
  .el-form-item .el-form-item__content .el-input__inner,
  .el-form-item .el-form-item__content .el-select,
  .el-form-item .el-form-item__content .el-textarea {
    width: 185px;
  }
</style>
<script>
export default {
  name: 'Search',
  directives: {
    waves
  },
  props: {
    formContent: {
      type: Object,
      default: () => [],
      formProterty: {
        type: Object,
        default: () => [],
        inline: {
          type: Boolean,
          default: false
        },
        labelWidth: {
          type: String,
          default: ''
        },
        labelPosition: {
          type: String,
          default: ''
        }
      },
      formItems: {
        type: Array,
        default: [
          {
            label: {
              type: String,
              default: ''
            },
            prop: {
              type: String,
              default: ''
            },
            placeholder: {
              type: String,
              default: ''
            },
            size: {
              type: String,
              default: ''
            },
            formType: {
              type: String,
              default: ''
            },
            dafaultValue: {
              type: Array,
              default: []
            },
            isAddButton: {
              type: Boolean,
              default: false
            },
            clickFunc: {
              type: Function,
              default: function() {}
            },
            changeFunc: {
              type: Function,
              default: function() {}
            },
            isVisible: {
              type: Function,
              default: true
            },
            rangeSeparator: {
              type: String,
              default: ''
            },
            startPlaceholder: {
              type: String,
              default: ''
            },
            endPlaceholder: {
              type: String,
              default: ''
            },
            isMultiple: {
              type: Boolean,
              default: false
            },
            selectText: {
              type: String,
              default: '选择...'
            }
          }
        ]
      },
      rules: {
        type: Object,
        default: () => {}
      }
    },
    queryModel: { // 从父组件传过来的value
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      myModel: this.queryModel // 子组件自己的value
    }
  },
  mounted() {
  },
  methods: {
    query() {
      // 如果不选任何条件就显示所有数据
      this.$emit('query', this.myModel)
      // 如果填写某一项，把myModel传给后台，get新的list
    },
    handleExport() {
      // 根据后台传过来的 queryModel
      this.$emit('export')
    }
  }
}
</script>

