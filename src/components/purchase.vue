<template>
    <div>

        <div id="myVue" class="container" style="margin-top: 100px;">
            <div class="row">
                <img class="top img-responsive center-block" src="images/小云朵.png">
            </div>

            <div class="row" style="margin-top: 10px">
                <hr style="height: 3px;background-color:#D1D1D1;border: none;margin:5px">
            </div>

            <div class="row" style="margin-top: 20px">
                <h4 style="text-align: center;">请选择需要申请提货的明细</h4>
            </div>

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                     label-position="right">
                <!--<el-row class="row" style="margin-top: 10px">-->
                <!--<el-col :span="10">-->
                <el-form-item label="归属工地" prop="name" style="margin-top: 10px">
                    <el-select v-model="ruleForm.name" size="medium" placeholder="请选择工地" style="width: 80%;">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="材料名称" prop="name1" style="margin-top: 5px">
                    <el-select v-model="ruleForm.name1" size="medium" placeholder="请选择" style="width: 80%">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <div class="text-xs-center" style="display: inline">
                        <v-dialog v-model="dialog" width="500">
                            <el-button
                                    slot="activator"
                                    type="medium"
                                    style="margin: 0;width: 100%"
                            >添加新材料
                            </el-button>

                            <v-card>

                                <el-row>
                                    <el-col :span="6" :offset="1"><h4 style="line-height: 80px;">材料类型</h4></el-col>
                                    <el-col :span="16" style="margin-top: 20px;">
                                        <el-select v-model="fei1om" size="medium" placeholder="请选择材料类型"
                                                   style="width: 200px;">
                                            <el-option v-for="item in opom" :key="item.value" :label="item.label"
                                                       :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="6" :offset="1"><h4 style="line-height: 30px;">材料名称</h4></el-col>
                                    <el-col :span="16">
                                        <el-input size="medium" v-model="cailiaomingom" placeholder="请输入材料名称"
                                                  style="width: 200px;"></el-input>
                                    </el-col>
                                </el-row>


                                <el-row>
                                    <el-col :span="6" :offset="1"><h4 style="line-height: 70px;">计量规格</h4></el-col>
                                    <el-col :span="16" style="margin-top: 20px;">
                                        <el-select v-model="fei2om" size="medium" placeholder="请选择计量规格"
                                                   style="width: 200px;">
                                            <el-option v-for="item in kgom" :key="item.value" :label="item.label"
                                                       :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>

                                <el-form>
                                    <el-form-item label="材料属性" :label-width="formLabelWidth" style="margin-left: 1px">
                                        <div class="materialData">

                                            <el-button style="margin-left: 20px" class="el-icon-plus"
                                                       @click.prevent="addRow()"></el-button>
                                            <el-button class="el-icon-minus" @click.prevent="delData()"></el-button>

                                            <div class="table">
                                                <el-table :data="materialData" ref="table" tooltip-effect="dark" border
                                                          stripe style="width: 200px;margin-left: 2px;"
                                                          @selection-change='selectRow'>
                                                    <el-table-column type="selection" width="45"
                                                                     align="center"></el-table-column>

                                                    <el-table-column label="材料属性" align="center">
                                                        <template slot-scope="scope">
                                                            <el-input v-model="scope.row.materialProperty"></el-input>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column label="属性值" align="center">
                                                        <template slot-scope="scope">
                                                            <el-input v-model="scope.row.propertyValue"></el-input>
                                                        </template>
                                                    </el-table-column>
                                                </el-table>
                                            </div>
                                        </div>
                                    </el-form-item>

                                </el-form>
                                <v-card-actions style="margin-right: 60px">
                                    <v-spacer></v-spacer>
                                    <el-button type="danger" flat @click="dialog = false">
                                        取消
                                    </el-button>

                                    <el-button type="success" flat @click="dialog = false">
                                        确定
                                    </el-button>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>
                </el-form-item>
                <el-form-item label="预计数量" prop="name2">
                    <el-input size="medium" v-model="ruleForm.name2" placeholder="请输入内容" id="nums" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="使用部位" prop="name3">
                    <el-input size="medium" v-model.number="ruleForm.name3" placeholder="请输入内容 "
                              style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="申请人" prop="name4">
                    <el-input size="medium" v-model="ruleForm.name4" placeholder="请输入内容" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="name5">
                    <el-input size="medium" v-model="ruleForm.name5" placeholder="请输入内容" id="phone" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="beizhu">
                    <el-input size="medium" v-model="beizhu" placeholder="请输入内容" style="width: 80%;"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>


            <!--<el-row style="margin-top: 20px;margin-bottom: 50px">-->
            <!--<el-col :span="6" :offset="9">-->
            <!--<el-button plain size="medium" @click="commit">提交申请</el-button>-->
            <!--</el-col>-->
            <!--</el-row>-->

            <el-dialog :visible.sync="dialogVisible" width="100%">
                <span>提交申请成功</span>
            </el-dialog>

        </div>

    </div>

</template>

<script>
    import contaUrl from '../../public/js/contaUrl'

    export default {
        data() {
            var validatea = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('请选择申请归属工地'));
                } else {
                    // if (this.ruleForm.name !== '') {
                    //     this.$refs.ruleForm.validatea('name');
                    // }
                    callback();
                }
            };
            var validateb = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择材料名称'));
                } else {
                    // if (this.ruleForm.name1 !== '') {
                    //     this.$refs.ruleForm.validateField('name1');
                    // }
                    callback();
                }
            };
            var validatec = (rule, value, callback) => {
                var num = document.getElementById('nums').value;
                if (value === '') {
                    callback(new Error('请输入预计数量'));
                } else if (!(/^[0-9]+.?[0-9]*$/.test(num))) {
                    callback(new Error('请输入数字'));
                } else {
                    callback();
                }
            };
            var validated = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入使用部位'));
                } else {
                    // if (this.ruleForm.name1 !== '') {
                    //     this.$refs.ruleForm.validateField('name1');
                    // }
                    callback();
                }
            };
            var validatee = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入申请人'));
                } else {
                    // if (this.ruleForm.name1 !== '') {
                    //     this.$refs.ruleForm.validateField('name1');
                    // }
                    callback();
                }
            };
            var validatef = (rule, value, callback) => {
                var phone = document.getElementById('phone').value;
                if (value === '') {
                    callback(new Error('请输入电话'));
                } else if (!(/^1[34578]\d{9}$/.test(phone))) {
                    callback(new Error('手机格式错误'));
                } else {
                    callback();
                }
            }
            return {
                ruleForm: {
                    name: '',
                    name1: '',
                    name2: '',
                    name3: '',
                    name4: '',
                    name5: '',

                },
                rules: {
                    name: [
                        {required: true, validator: validatea, trigger: 'blur'},
                    ],
                    name1: [
                        {required: true, validator: validateb, trigger: 'blur'},
                    ],
                    name2: [
                        {required: true, type:'number',validator: validatec, trigger: 'blur'},
                    ],
                    name3: [
                        {required: true, validator: validated, trigger: 'blur'},
                    ],
                    name4: [
                        {required: true, validator: validatee, trigger: 'blur'},
                    ],
                    name5: [
                        {required: true, validator: validatef, trigger: 'blur'},
                    ],


                },
                dialog: false,
                drawer: null,
                dialogVisible: false,
                options: [],
                options1: [],
                value: '',
                input: '',
                value1: '',
                value2: '',
                name: '',
                stockername: '',
                stockertel: '',
                amount: '',
                guige: '',
                unit: '',
                shiyongbuwei: '',
                supplier: '',
                money: '',
                beizhu: '',
                role: "",
                opom: [],
                fei1: '',
                db: [
                    {value: '1', label: '条目1'},
                    {value: '2', label: '条目2'},
                    {value: '3', label: '条目3'}
                ],
                fei2: '',
                kg: [
                    {value: '1', label: '吨'},
                    {value: '2', label: '千克'},
                    {value: '3', label: '克'},
                ],
                cailiaoming: '',
                kgom: '',
                fei1om: '',
                fei2om: '',
                cailiaomingom: '',
                formLabelWidth: '80px',
                materialData: [],
                selectlistRow: [],
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.get(contaUrl.contaUrl + '/apply/pickapply', {
                            params: {
                                siteid: this.ruleForm.name,
                                material_id: this.ruleForm.name1,
                                amount: this.ruleForm.name2,
                                usePart: this.ruleForm.name3,
                                pickerName: this.ruleForm.name4,
                                pickertel: this.ruleForm.name5,
                                comment: this.ruleForm.name6,
                                token: sessionStorage.getItem('token')
                            }
                        }).then((response) => {
                            if (response.data.code == 200) {
                                console.log(response.data.data)
                                this.$message({
                                    showClose:true,
                                    message: '恭喜你,提交成功',
                                    type: 'success'
                                });
                                this.resetForm('ruleForm')
                                this.beizhu= ''
                            } else {
                                this.$message(
                                    {
                                        showClose:true,
                                        message:'提交失败!'+response.data.msg,
                                        type:'error'
                                    });
                               /* this.resetForm('ruleForm')
                                this.beizhu= ''*/
                            }
                        }).catch((error) => {
                            console.log(error);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.beizhu= ''
            },// 获取表格选中时的数据
            selectRow(val) {
                this.selectlistRow = val
            },
            // 增加行
            addRow() {
                var list = {
                    rowNum: '',
                    materialProperty: this.materialProperty,
                    propertyValue: this.propertyValue,
                }
                this.materialData.unshift(list)
                console.log(this.materialData)
            },
            // 删除方法
            // 删除选中行
            delData() {
                if (this.selectlistRow.length == 0) {
                    this.$message.warning("请勾选待移除的材料属性")
                } else {
                    for (let i = 0; i < this.selectlistRow.length; i++) {
                        let val = this.selectlistRow
                        // 获取选中行的索引的方法
                        // 遍历表格中materialData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
                        // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
                        val.forEach((val) => {
                            console.log(val);
                            this.materialData.forEach((v, i) => {
                                if (val.rowNum === v.rowNum) {
                                    // i 为选中的索引
                                    this.materialData.splice(i, 1)
                                }
                            })
                        })
                    }
                    // 删除完数据之后清除勾选框
                    this.$refs.materialData;
                }
            },


        },
        mounted: function () {
            var role = sessionStorage.getItem("role");
            console.log(role)
            var tile = document.getElementsByClassName("tile")
            console.log(tile)

            if (role == 3) {
                tile[2].style.display = "none";
                tile[3].style.display = "none";
                tile[7].style.display = "none";
            } else if (role == 2) {
                tile[3].style.display = "none";
                tile[7].style.display = "none";
            } else if (role == 1) {
                tile[2].style.display = "none";
                tile[4].style.display = "none";
                tile[6].style.display = "none";
            }
            this.$axios.get(contaUrl.contaUrl + '/user/getUserSites', {
                params: {
                    token: sessionStorage.getItem('token')
                }
            }).then((response) => {
                if (response.data.code == 200) {
                    var options = response.data.data.siteList;
                    console.log(options)
                    for (var i = 0; i < options.length; ++i) {
                        var obj = {};
                        obj.value = options[i].id;
                        obj.label = options[i].siteName;
                        this.options.push(obj);
                    }
                }
            }).catch((error) => {
                console.log(error);
            })

            this.$axios.get(contaUrl.contaUrl + '/material/getAll', {
                params: {}
            }).then((response) => {
                if (response.data.code == 200) {
                    var options1 = response.data.data.materialList;
                    // console.log(options1)
                    for (var i = 0; i < options1.length; ++i) {
                        var obj = {};
                        obj.value = options1[i].id;
                        obj.label = options1[i].materialName;
                        // obj.value = options1[i].materialTypeName;
                        this.options1.push(obj);
                    }
                }
            }).catch((error) => {
                console.log(error);
            })
            this.$axios.get(contaUrl.contaUrl + '/material/getAll', {
                params: {}
            }).then((response) => {
                if (response.data.code == 200) {
                    var opom = response.data.data.materialList;
                    // console.log(opom)
                    for (var i = 0; i < opom.length; ++i) {
                        var obj = {};
                        obj.value = opom[i].id;
                        obj.label = opom[i].materialTypeName;
                        this.opom.push(obj);
                    }
                }
            }).catch((error) => {
                console.log(error);
            })
        },
    }
</script>

<style scoped>
    .el-form-item__label {
        /*text-align: right;*/
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: black;
        font-weight: bolder;

    }
</style>