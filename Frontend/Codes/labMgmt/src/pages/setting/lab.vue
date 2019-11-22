<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:10px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>实验室管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider> -->
    <div class="lab-title">
      实验室列表
      <el-button type="primary" size="mini" style="margin-left:100px" @click="handleAddLab">新增</el-button>
    </div>
    <div class="list">

      <div v-for="(item,index) in lst.data" :key="item.Id" class="row el-row">
        <el-card shadow="hover" style="padding:15px">
        <el-col :span="5">
          <div class="content">
            <i class="el-icon-thirdchengshi" style="font-size:40px"></i>
            {{ item.LaboratoryName}}
          </div>
          <div class="muted desc">地址： {{item.LaboratoryAddress}}</div>
          <!-- <div class="muted desc" style="line-height:25px">固定资产数量： {{item.assetCount}}</div> -->
          <div class="mt10">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              style="padding:6px"
              @click="handleEdit(index,item)"
            ></el-button>

            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              style="padding:6px"
              @click="handleDelete(index,item)"
            ></el-button>
          </div>
        </el-col>
        <div class="el-divider el-divider--vertical el-col el-col-1"></div>
        <el-col :span="17" class="addressList">
          <h4 style="margin-left:30px; h">
            馆藏地址列表 &nbsp;&nbsp;
            <el-button
              type="primary"
              circle
              plain
              style="padding:4px"
              icon="el-icon-plus"
              @click="handleAddSite(item)"
            ></el-button>
          </h4>
          <div
            v-for="(itm,idx) in item.childSites"
            :key="itm.Id"
            style="line-height:auto; margin-left:30px;font-size:15px; color:#999; margin-top:10px"
          >
            <el-row>
              <span>
                <el-col :span="6" class="labrow">
                  <i class="el-icon-collection-tag"></i>
                  {{itm.SiteName}}
                </el-col>
                <el-col :span="12" class="labrow">
                  <i class="el-icon-location"></i>
                  {{itm.SiteAddress}}
                </el-col>
                <el-col :span="4">
                  <!-- <el-link type="primary" @click="editAddress( itm.Id, index)">编辑</el-link>&nbsp; -->
                  <el-link type="primary" @click="handleUpdSite(itm)">编辑</el-link>&nbsp;
                  <el-link type="danger" @click="handleDelSite(itm)">删除</el-link>
                </el-col>
              </span>
            </el-row>
            <!-- <span v-show="itm.isEdit">
              <el-input
                v-model="itm.SiteAddress"
                placeholder="请输入内容"
                :autofocus="itm.isEdit"
                style="width:200px"
              ></el-input>
              <el-button
                type="success"
                circle
                style="padding:6px"
                icon="el-icon-check"
                @click="save(itm.name, itm.id, index)"
              ></el-button>
            </span>-->
          </div>
        </el-col>
        </el-card>
      </div>
      
    </div>
    <el-dialog :title="labTitle" :visible="dialogFormVisible" :show-close="false">
      <el-form ref="myModel" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="实验室名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" style="width:300px" clearable></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" autocomplete="off" style="width:530px" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item label="描述">
          <el-input
            type="textarea"
            autocomplete="off" 
            :autosize="{ minRows: 5, maxRows: 7}"
            placeholder="请输入内容"
            v-model="form.desc"
          />
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handeSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="siteTile" :visible="dialogFormVisible1" :show-close="false">
      <el-form ref="myModel1" :model="siteForm" :rules="rules1" label-width="100px">
        <el-form-item label="馆藏名称" prop="name">
          <el-input v-model="siteForm.name" autocomplete="off" style="width:300px" clearable></el-input>
        </el-form-item>
        <el-form-item label="馆藏地址" prop="address">
          <el-input v-model="siteForm.address" autocomplete="off" style="width:530px" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="handeSubmitSite">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import sysSettingService from "../../apis/SysSettingsService";
export default {
  data() {
    return {
      labTitle: "",
      siteTile: "",
      form: {
        id: "",
        name: "",
        address: "",
        desc: ""
      },
      siteForm: {
        id: null,
        labId: null,
        name: "",
        address: ""
      },
      editMode: null, //新增或编辑
      rules: {
        name: [
          {
            required: true,
            message: "请输入实验室名称",
            trigger: ["blur", "change"]
          }
        ],
        address: [
          {
            required: true,
            message: "请输入实验室地址",
            trigger: ["blur", "change"]
          }
        ]
        //desc:[{required:true,message:"请输入实验室描述",trigger: ['blur', 'change']}]
      },
      rules1: {
        name: [
          {
            required: true,
            message: "请输入馆藏名称",
            trigger: ["blur", "change"]
          }
        ],
        address: [
          {
            required: true,
            message: "请输入馆藏地址",
            trigger: ["blur", "change"]
          }
        ]
        //desc:[{required:true,message:"请输入实验室描述",trigger: ['blur', 'change']}]
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      lst: {
        data: [
          {
            Id: null,
            LaboratoryName: "",
            LaboratoryAddress: "",
            childSites: [
              {
                Id: null,
                LabId: null,
                SiteName: "",
                SiteAddress: ""
              }
            ]
          }
        ]
        // data: [
        //   {
        //     id: 1,
        //     name: "先导智能一号实验室",
        //     desc: "老厂1号楼五楼实验办公室",
        //     assetCount: 2000,
        //     has: [
        //       { name: "2楼馆藏地", id: 1 },
        //       { name: "3楼馆藏地", id: 2 },
        //       { name: "5楼馆藏地", id: 3 }
        //     ]
        //   },
        // ]
      }
    };
  },
  mounted() {
    this.getLabs();
  },

  methods: {
    handleAddSite(item) {
      this.siteTile = "新增馆藏地";
      this.siteForm.labId = item.Id;
      this.dialogFormVisible1 = true;
      this.siteForm.name = "";
      this.siteForm.address = "";
      this.siteForm.id = null;
      this.$nextTick(() => {
        this.$refs["myModel1"].clearValidate();
      });
    },
    handleUpdSite(item) {
      this.siteTile = "编辑馆藏地";
      this.siteForm.id = item.Id;
      this.siteForm.labId = item.LabId;
      this.siteForm.name = item.SiteName;
      this.siteForm.address = item.SiteAddress;
      this.dialogFormVisible1 = true;
    },
    handleDelSite(item) {
      this.$confirm("该馆藏下的货架都会被删除,是否要继续删除该馆藏?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          sysSettingService.delSite({ SiteId: item.Id }).then(res => {
            this.$message({ type: "success", message: "操作成功！" });
            this.getLabs();
          });
        })
    },
    getLabs() {
      sysSettingService.getLabs().then(res => {
        this.lst.data = res;
      });
    },
    addLab() {
      let params = {
        LabName: this.form.name,
        LabAddress: this.form.address
        //LabDesc:this.form.desc,
      };
      sysSettingService.addLab(params).then(res => {
        this.$message({ type: "success", message: "操作成功！" });
        this.getLabs();
        this.dialogFormVisible = false;
      });
    },
    updLab() {
      let params = {
        Id: this.form.id,
        LabName: this.form.name,
        LabAddress: this.form.address
        //LabDesc:this.form.desc,
      };
      sysSettingService.updLab(params).then(res => {
        this.$message({ type: "success", message: "操作成功！" });
        this.getLabs();
        this.dialogFormVisible = false;
      });
    },
    addSite() {
      let params = {
        SiteName: this.siteForm.name,
        SiteAddress: this.siteForm.address,
        LabId: this.siteForm.labId
        //LabDesc:this.form.desc,
      };
      sysSettingService.addSite(params).then(res => {
        this.$message({ type: "success", message: "操作成功！" });
        this.dialogFormVisible1 = false;
        this.getLabs();
      });
    },
    updSite() {
      let params = {
        SiteName: this.siteForm.name,
        SiteAddress: this.siteForm.address,
        LabId: this.siteForm.labId,
        Id: this.siteForm.id
      };
      sysSettingService.updSite(params).then(res => {
        this.$message({ type: "success", message: "操作成功！" });
        this.dialogFormVisible1 = false;
        this.getLabs();
      });
    },
    handeSubmit() {
      this.$refs["myModel"].validate(valid => {
        if (valid) {
          if (this.editMode == 0) {
            this.addLab();
          } else if (this.editMode == 1) {
            this.updLab();
          }
          
        }
      });
    },
    handeSubmitSite() {
      this.$refs["myModel1"].validate(valid => {
        if (valid) {
          if (this.siteForm.id) {
            this.updSite();
          } else {
            this.addSite();
          }
          
        }
      });
    },
    handleAddLab() {
      this.labTitle = "新增实验室";
      this.editMode = 0;
      this.form.id = null;
      this.dialogFormVisible = true;
      this.form.name = "";
      this.form.address = "";
      this.form.desc = "";
      this.$nextTick(() => {
        this.$refs["myModel"].clearValidate();
      });
    },
    editAddress(sid, idx) {
      var item = this.lst.data[idx];
      var s = item.childSites.filter(m => m.Id == sid)[0];
      s.isEdit = !s.isEdit;
      Vue.set(this.lst.data, idx, item);
    },
    handleEdit(i, row) {
      this.labTitle = "编辑实验室信息";
      this.editMode = 1;
      this.form.id = row.Id;
      this.form.name = row.LaboratoryName;
      this.form.address = row.LaboratoryAddress;
      this.dialogFormVisible = true;
    },
    save(name, sid, idx) {
      var item = this.lst.data[idx];
      var s = item.has.filter(m => m.id == sid)[0];
      s.isEdit = false;
      s.name = name;
      Vue.set(this.lst.data, idx, item);

      //
      this.$message({ type: "success", message: "修改成功!" });
    },
    handleDelete(i, row) {
      this.$confirm(
        "该实验室下的馆藏和货架都会被删除,是否要继续删除该实验室?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          sysSettingService.delLab({ labId: row.Id }).then(res => {
            this.$message({ type: "success", message: "操作成功！" });
            this.getLabs();
          });
        })
    },
    filterChange(e) {
      console.log("brand filter changed", e);
    }
  }
};
</script>
<style>
.el-divider--vertical {
  height: 100px;
  background-color: #f7f7f7;
}
.addressList input {
  height: 30px;
}
</style>
<style>
.labrow
{
white-space:nowrap; 
text-overflow:ellipsis;
overflow:hidden; 
}
</style>
