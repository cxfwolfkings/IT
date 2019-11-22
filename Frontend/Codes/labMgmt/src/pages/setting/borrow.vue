<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:10px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>借用设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider> -->
    <div class="lab-title">借用设置</div>
    <el-form
          ref="borrowSettingForm"
          :model="form"
          :rules="rules"
          label-width="150px"
          style="width:50%;margin-top:50px"
        >
          <el-form-item label="使用地点" prop="PlaceId">
            <el-col :span="20">
            <el-select v-model="form.PlaceId" @change="onPlaceChange" placeholder="请选择" clearable style="width:100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            </el-col>
          </el-form-item>
          <div v-show="showDetail">
          <el-form-item label="借用周期" prop="BorrowCycle">
            <el-col :span="20">
              <el-input v-model.number="form.BorrowCycle" placeholder="天数" oninput ="value=value.replace(/[^\d]/g,'')">
                <template slot="append">天</template>
              </el-input>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="2">
              <el-tooltip class="item" effect="dark" content="借用周期" placement="right">
                <i class="el-icon-thirdicon-2" style="font-size:20px;"></i>
              </el-tooltip>
            </el-col>
          </el-form-item>
          <el-form-item label="续借周期" prop="RenewalCycle">
            <el-col :span="20">
              <el-input placeholder="天数" v-model.number="form.RenewalCycle" oninput ="value=value.replace(/[^\d]/g,'')">
                <template slot="append">天</template>
              </el-input>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="2">
              <el-tooltip class="item" effect="dark" content="续借周期" placement="right">
                <i class="el-icon-thirdicon-2" style="font-size:20px;"></i>
              </el-tooltip>
            </el-col>
          </el-form-item>
          <el-form-item label="最大续借次数" prop="MaximumTimes">
            <el-col :span="20">
              <el-input placeholder="次数" v-model.number="form.MaximumTimes" oninput ="value=value.replace(/[^\d]/g,'')">
                <template slot="append">次</template>
              </el-input>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="2">
              <el-tooltip class="item" effect="dark" content="最大续借次数" placement="right">
                <i class="el-icon-thirdicon-2" style="font-size:20px;"></i>
              </el-tooltip>
            </el-col>
          </el-form-item>
          <el-form-item label="平台组合无限期借用">
            <el-switch v-model="form.nolimited"></el-switch>
          </el-form-item>
          <el-form-item label="报告提交期限" prop="LimitDays">
            <el-col :span="20">
              <el-input placeholder="天数" v-model.number="form.LimitDays" oninput ="value=value.replace(/[^\d]/g,'')">
                <template slot="append">天</template>
              </el-input>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="2">
              <el-tooltip class="item" effect="dark" content="报告提交期限" placement="right">
                <i class="el-icon-thirdicon-2" style="font-size:20px;"></i>
              </el-tooltip>
            </el-col>
          </el-form-item>
          <el-form-item label="归还前提醒" prop="RemindDays">
            <el-col :span="20">
              <el-input placeholder="天数" v-model.number="form.RemindDays" oninput ="value=value.replace(/[^\d]/g,'')">
                <template slot="append">天</template>
              </el-input>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="2">
              <el-tooltip class="item" effect="dark" content="归还前提醒" placement="right">
                <i class="el-icon-thirdicon-2" style="font-size:20px;"></i>
              </el-tooltip>
            </el-col>
          </el-form-item>
          <el-form-item label>
            <el-button type="primary" @click="handleSubmit" style="width:150px">保 存</el-button>
          </el-form-item>
          </div>
        </el-form>
    <!-- <el-tabs type="card">
      <el-tab-pane label="场外借出">
        <el-form
          ref="borrowSettingForm"
          :model="form"
          :rules="rules"
          label-width="150px"
          style="width:50%;margin-top:50px"
        >
          <el-form-item label="使用地点" prop="PlaceId">
            <el-col :span="20">
            <el-select v-model="form.PlaceId" @change="onPlaceChange" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="借用周期" prop="BorrowCycle">
            <el-col :span="20">
              <el-input v-model.number="form.BorrowCycle" placeholder="天数">
                <template slot="append">天</template>
              </el-input>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="2">
              <el-tooltip class="item" effect="dark" content="借用周期" placement="right">
                <i class="el-icon-thirdicon-2" style="font-size:20px;"></i>
              </el-tooltip>
            </el-col>
          </el-form-item>
          <el-form-item label="续借周期" prop="RenewalCycle">
            <el-col :span="20">
              <el-input placeholder="天数" v-model.number="form.RenewalCycle">
                <template slot="append">天</template>
              </el-input>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="2">
              <el-tooltip class="item" effect="dark" content="续借周期" placement="right">
                <i class="el-icon-thirdicon-2" style="font-size:20px;"></i>
              </el-tooltip>
            </el-col>
          </el-form-item>
          <el-form-item label="最大借用次数" prop="MaximumTimes">
            <el-col :span="20">
              <el-input placeholder="次数" v-model.number="form.MaximumTimes">
                <template slot="append">次</template>
              </el-input>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="2">
              <el-tooltip class="item" effect="dark" content="最大续借次数" placement="right">
                <i class="el-icon-thirdicon-2" style="font-size:20px;"></i>
              </el-tooltip>
            </el-col>
          </el-form-item>
          <el-form-item label="平台组合无限期借用">
            <el-switch v-model="form.nolimited"></el-switch>
          </el-form-item>
          <el-form-item label="报告提交期限" prop="LimitDays">
            <el-col :span="20">
              <el-input placeholder="天数" v-model.number="form.LimitDays">
                <template slot="append">天</template>
              </el-input>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="2">
              <el-tooltip class="item" effect="dark" content="报告提交期限" placement="right">
                <i class="el-icon-thirdicon-2" style="font-size:20px;"></i>
              </el-tooltip>
            </el-col>
          </el-form-item>
          <el-form-item label>
            <el-button type="primary" @click="handleSubmit" style="width:150px">保 存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="场内借出">
        <el-form
          ref="borrowSettingInForm"
          :model="formIn"
          :rules="rulesIn"
          label-width="150px"
          style="width:50%;margin-top:50px"
        >
          <el-form-item label="借用周期" prop="BorrowCycle">
            <el-col :span="20">
              <el-input v-model.number="formIn.BorrowCycle" placeholder="天数">
                <template slot="append">天</template>
              </el-input>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="2">
              <el-tooltip class="item" effect="dark" content="借用周期" placement="right">
                <i class="el-icon-thirdicon-2" style="font-size:20px;"></i>
              </el-tooltip>
            </el-col>
          </el-form-item>
          <el-form-item label="续借周期" prop="RenewalCycle">
            <el-col :span="20">
              <el-input placeholder="天数" v-model.number="formIn.RenewalCycle">
                <template slot="append">天</template>
              </el-input>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="2">
              <el-tooltip class="item" effect="dark" content="续借周期" placement="right">
                <i class="el-icon-thirdicon-2" style="font-size:20px;"></i>
              </el-tooltip>
            </el-col>
          </el-form-item>
          <el-form-item label="最大借用次数" prop="MaximumTimes">
            <el-col :span="20">
              <el-input placeholder="次数" v-model.number="formIn.MaximumTimes">
                <template slot="append">次</template>
              </el-input>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="2">
              <el-tooltip class="item" effect="dark" content="最大续借次数" placement="right">
                <i class="el-icon-thirdicon-2" style="font-size:20px;"></i>
              </el-tooltip>
            </el-col>
          </el-form-item>
          <el-form-item label="报告提交期限" prop="LimitDays">
            <el-col :span="20">
              <el-input placeholder="天数" v-model.number="formIn.LimitDays">
                <template slot="append">天</template>
              </el-input>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="2">
              <el-tooltip class="item" effect="dark" content="报告提交期限" placement="right">
                <i class="el-icon-thirdicon-2" style="font-size:20px;"></i>
              </el-tooltip>
            </el-col>
          </el-form-item>
          <el-form-item label>
            <el-button type="primary" @click="handleSubmitIn" style="width:150px">保 存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script>
import { METHODS } from "http";
import SysSettingService from "../../apis/SysSettingsService";
import { BorrowSettingType } from "../../config/const";
export default {
  data() {
    return {
      showDetail:false,
      options:[],
      form: {
        PlaceId:null,
        nolimited: true,
        BorrowCycle: null,
        RenewalCycle: null,
        MaximumTimes: null,
        LimitDays: null,
        RemindDays:null,
        Type: BorrowSettingType.场外
      },
      formIn: {
        BorrowCycle: null,
        RenewalCycle: null,
        MaximumTimes: null,
        LimitDays: null,
        Type: BorrowSettingType.场内
      },
      rules: {
        PlaceId:[
          {
            required: true,
            message: "请选择使用地点",
            trigger: ["blur", "change"]
          },
        ],
        BorrowCycle: [
          {
            required: true,
            message: "请输入借用周期",
            trigger: ["blur", "change"]
          },
          {
            type: "number",
            min: 0,
            max:999,
            message: "请输入小于999的数字",
            trigger: ["blur", "change"]
          }
        ],
        RenewalCycle: [
          {
            required: true,
            message: "请输入续借周期",
            trigger: ["blur", "change"]
          },
          {
            type: "number",
            min: 0,
            max:999,
            message: "请输入小于999的数字",
            trigger: ["blur", "change"]
          }
        ],
        MaximumTimes: [
          {
            required: true,
            message: "请输入最大借用次数",
            trigger: ["blur", "change"]
          },
          {
            type: "number",
            min: 0,
            max:999,
            message: "请输入小于999的数字",
            trigger: ["blur", "change"]
          }
        ],
        LimitDays: [
          {
            required: true,
            message: "请输入报告提交期限",
            trigger: ["blur", "change"]
          },
          {
            type: "number",
            min: 0,
            max:999,
            message: "请输入小于999的数字",
            trigger: ["blur", "change"]
          }
        ],
        RemindDays: [
          {
            required: true,
            message: "请输入归还前提醒",
            trigger: ["blur", "change"]
          },
          {
            type: "number",
            min: 0,
            max:999,
            message: "请输入小于999的数字",
            trigger: ["blur", "change"]
          }
        ]
      },
      rulesIn: {
        BorrowCycle: [
          {
            required: true,
            message: "请输入借用周期",
            trigger: ["blur", "change"]
          },
          {
            type: "number",
            min: 0,
            max:999,
            message: "请输入小于999的数字",
            trigger: ["blur", "change"]
          }
        ],
        RenewalCycle: [
          {
            required: true,
            message: "请输入续借周期",
            trigger: ["blur", "change"]
          },
          {
            type: "number",
            min: 0,
            max:999,
            message: "请输入小于999的数字",
            trigger: ["blur", "change"]
          }
        ],
        MaximumTimes: [
          {
            required: true,
            message: "请输入最大借用次数",
            trigger: ["blur", "change"]
          },
          {
            type: "number",
            min: 0,
            max:999,
            message: "请输入小于999的数字",
            trigger: ["blur", "change"]
          }
        ],
        LimitDays: [
          {
            required: true,
            message: "请输入报告提交期限",
            trigger: ["blur", "change"]
          },
          {
            type: "number",
            min: 0,
            max:999,
            message: "请输入小于999的数字",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  mounted() {
    //this.getBorrowSetting();
    //this.getBorrowSettingIn();
    this.getPlaceOptions()
  },
  methods: {
    getPlaceOptions(){
      SysSettingService.getUseplace().then(res=>{
        if(res.Data){
          res.Data.map(_=>{
            _.label=_.PlaceName
            _.value = _.Id
            return _
          })
          this.options = res.Data
        }
      })
    },
    onPlaceChange(e){
      if(e){
        this.showDetail = true
        SysSettingService.getBorrowSettingByPlace({PlaceId:e}).then(res=>{
          Object.assign(this.form, res);
        })
      }
    },
    // getBorrowSetting() {
    //   SysSettingService.getBorrowSetting().then(res => {
    //     const record = res;
    //     Object.assign(this.form, record);
    //   });
    // },
    // getBorrowSettingIn() {
    //   SysSettingService.getBorrowSettingIn().then(res => {
    //     const record = res;
    //     Object.assign(this.formIn, record);
    //   });
    // },
    handleSubmit() {
      //console.log(this.form)
      this.$refs["borrowSettingForm"].validate(valid => {
        if (valid) {
          SysSettingService.setBorrowSetting(this.form).then(res => {
            this.$message({ type: "success", message: "操作成功！" });
          });
        }
      });
    },
    handleSubmitIn() {
      //console.log(this.form)
      this.$refs["borrowSettingInForm"].validate(valid => {
        if (valid) {
          SysSettingService.setBorrowSetting(this.formIn).then(res => {
            this.$message({ type: "success", message: "操作成功！" });
          });
        }
      });
    }
  }
};
</script>
