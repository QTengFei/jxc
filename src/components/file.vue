<template>
    <div>

        <el-row class="item_bock  head_p">
            <el-col :span="20" :offset="2">
                <div class="head_img">
                    <img :src="ig" :onerror="defaultImg">
                </div>
            </el-col>
            <el-col>
                <div class="setting_right" @click.stop="uploadHeadImg">
                    <el-button type="small">点击修改头像</el-button>
                </div>
                <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
            </el-col>

        </el-row>

        <el-row>
            <el-col :span="20" :offset="2">
                <ul class="ul">
                    <li>姓名</li>
                    <li>电话</li>
                    <li>密码</li>
                    <li>所属工地</li>
                </ul>
                <ul class="ul">
                    <li>{{username}}</li>
                    <li><input type="tel" v-model="card" name="email" style="text-align:  center"></li>
                    <li>
                        <el-button type="text" @click="dialogVisible  =  true" style="line-height:  10px;">
                            点击更改密码
                        </el-button>
                        <el-dialog title="提示"
                                   :visible.sync="dialogVisible"
                                   width="100%"
                                   id="dialog">

                            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                                     class="demo-ruleForm">

                                <el-form-item label="原密码">
                                    <el-input type="password" v-model="oldpassword" id="pdd"></el-input>
                                </el-form-item>

                                <el-form-item label="新密码" prop="pass">
                                    <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                                </el-form-item>

                                <el-form-item label="确认密码" prop="checkPass">
                                    <el-input type="password" v-model="ruleForm2.checkPass"
                                              autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                                </el-form-item>

                            </el-form>
                        </el-dialog>
                    </li>
                    <li>
                        <el-button type="text" style="line-height:10px;" @click="show">{{inchats}}</el-button>
                        <el-dialog title="请选择要更换的工地"
                                   :visible.sync="dialogVisible1"
                                   width="100%"
                        >
                            <!--<el-row>-->
                            <!--<el-col :span="10">-->
                            <!--<el-select v-model="oldSite" size="medium" multiple placeholder="请选择原工地"-->
                            <!--style="width: 150px">-->
                            <!--<el-option v-for="item in options" :key="item.value" :label="item.label"-->
                            <!--:value="item.value">-->
                            <!--</el-option>-->
                            <!--</el-select>-->
                            <!--</el-col>-->
                            <!--<el-col :span="10" :offset="3">-->
                            <!--<el-select v-model="newSite" size="medium"    multiple-->
                            <!--placeholder="请选择更换工地">-->
                            <!--<el-option v-for="item in options1" :key="item.value" :label="item.label"-->
                            <!--:value="item.value">-->
                            <!--</el-option>-->
                            <!--</el-select>-->
                            <!--</el-col>-->

                            <!--</el-row>-->
                            <el-table :data="materialData" :height="tableheight">
                                <el-table-column label="原工地" prop="siteName" align="center">
                                </el-table-column>
                                <el-table-column label="现工地" prop="NewSite" align="center">
                                    <template slot-scope="scope">
                                        <el-select size="medium" v-model="scope.row.newSite"
                                                   placeholder="请选择更换工地">
                                            <el-option v-for="item in options1" :key="item.value"
                                                       :label="item.label"
                                                       :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                            </el-table>

                            <el-row style="margin-top: 40px">
                                <el-col :span="4" :offset="6">
                                    <el-button plain type="primary" size="medium" @click="dialogVisible1=false"> 确定
                                    </el-button>
                                </el-col>

                                <el-col :span="4" :offset="2">
                                    <el-button plain size="medium" @click="cancelChangeSite,dialogVisible1=false"> 取消
                                    </el-button>
                                </el-col>
                            </el-row>

                        </el-dialog>

                    </li>
                </ul>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8" :offset="8">
                <el-button large style="margin-top: 30px" @click="pic()">
                    确认修改
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import contaUrl from '../../public/js/contaUrl'
    import qs from 'qs'

    export default {
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                input: '',
                oldSite: '',
                newSite: '',
                options: [],
                options1: [],
                dialogVisible1: false,
                defaultImg: 'this.src="' + require('../../public/images/人像.png') + '"',
                drawer: null,
                selection: [],
                dialog: false,
                username: '',
                card: '',
                oldSide: [],
                newSide: 'kjfkjjfd',
                tableheight: window.innerHeight - 400,
                outerVisible: false,
                innerVisible: false,
                dialogVisible: false,
                oldpassword: '',
                file: '',
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                    age: '',
                },
                rules2: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    age: [
                        {validator: checkAge, trigger: 'blur'}
                    ]
                },
                radio: '',
                inchats: '点击查看工地',
                img: '',
                ig: '',
                formLabeW: "70px",
                materialData: [],
                selectlistRow: [],
            }
        },
        methods: {

            // 获取表格选中时的数据
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
            query: function () {
                this.$router.push('query')
            },
            ordinary: function () {
                this.$router.push('ordinary')
            },
            back: function () {
                // window.history.back(-1)
                this.$router.push("homepage")
            },
            apply: function () {
                this.$router.push('apply')
            },
            input1: function () {
                this.$router.push('input')
            },
            water: function () {
                this.$router.push('record')
            },
            money: function () {
                this.$router.push('money')
            },
            homepage: function () {
                this.$router.push('homepage')
            },
            stop: function () {
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                this.$router.push('/')
            },
            center: function () {
                var role = sessionStorage.getItem("role");
                console.log(role)
                if (role == 3) {
                    this.$router.push("centerThree")
                } else if (role == 2) {
                    this.$router.push("centerTwo")
                } else if (role == 1) {
                    this.$router.push("center")
                }
            },

            // 打开图片上传
            uploadHeadImg: function () {
                this.$el.querySelector('.hiddenInput').click()
            },
            // 将头像显示
            handleFile: function (e) {
                let $target = e.target || e.srcElement
                console.log($target.files);

                let file = $target.files[0]
                this.file = file;
                console.log(this.file);
                var reader = new FileReader()
                reader.onload = (data) => {
                    let res = data.target || data.srcElement
                    this.ig = res.result
                    // res.result = this.ig
                }
                reader.readAsDataURL(file)

            },
            show() {
                this.dialogVisible1 = true
                console.log(this.oldSide.length)

            },


            submitForm(formName) {

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // var params = new URLSearchParams();
                        // params.append('oldPassword', this.oldpassword);
                        // params.append('newPassword', this.ruleForm2.pass);
                        // params.append('token', sessionStorage.getItem('token'));
                        //
                        // this.$axios.post(contaUrl.contaUrl + '/user/edit', params).then((response) => {
                        //     if (response.data.code == 200) {
                        //         window.sessionStorage.setItem('token', response.data.data.token);
                        //         this.$alert('<strong>密码修改成功</strong>', '提示', {
                        //             dangerouslyUseHTMLString: true,
                        //         });
                        //
                        //         var dialog = document.getElementById('dialog');
                        //         var v = document.querySelector('.v-modal');
                        //         dialog.style.display = "none";
                        //         v.style.background = "none";
                        //
                        //     } else {
                        //         this.$alert('原密码错误', {
                        //             confirmButtonText: '确定',
                        //         });
                        //      }
                        // }
                        // ).catch((error) => {
                        //         console.log(error);
                        //     })
                        this.dialogVisible = false;
                    } else {
                        return false;
                    }

                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.oldpassword = '';
            },

            /*  gongdi() {
                  this.inchats = this.radio;
                  for (var i = 0; i < this.selection.length; ++i) {
                      if (this.radio == this.selection[i].id) {
                          this.inchats = this.selection[i].value;
                          break;
                      }
                  }
              },*/
            pic: function () {
                var params = new FormData();
                if (this.file != null && this.file != undefined) {
                    params.append('img', this.file);
                }
                //console.log(this.ig)
                if (this.oldpassword != "" && this.ruleForm2.pass != "") {
                    params.append('oldPassword', this.oldpassword);
                    params.append('newPassword', this.ruleForm2.pass);
                }
                params.append('token', sessionStorage.getItem('token'));
                params.append('phone', this.card)
               for (var i=0;i<this.materialData.length;i++){
                    console.log(this.newSite)
                    if (this.materialData[i].siteName!= "") {
                        params.append("oldSiteId", this.materialData[i].siteName);
                        params.append("newSiteId", this.newSite);
                    }
                }
                this.$axios.post(contaUrl.contaUrl + '/user/edit', params).then((response) => {
                    if (response.data.code == 200) {
                        console.log(response.data.data)
                        sessionStorage.setItem("image", contaUrl.contaUrl + "/" + response.data.data.img);
                        this.open2();
                    }
                }).catch((error) => {
                    console.log(error)
                });
            },
            open2() {
                this.$message({
                    message: '恭喜你，恭喜修改成功3秒后跳转',
                    type: 'success'
                });
                setTimeout(() => {
                    this.$router.replace('/homepage')
                }, 3000)
            },
            checkIsNotUserSite(siteId) {
                for (var i = 0; i < this.options.length; ++i) {
                    if (siteId == this.options[i].value) {
                        return false;
                    }
                }
                return true;
            },
            cancelChangeSite() {
                this.oldSite = '';
                this.newSite = '';
                this.dialogVisible = false;
            }
        },
        mounted() {
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
        },
        created() {
            this.username = sessionStorage.getItem("username");
            var token = sessionStorage.getItem("token");
            this.$axios.get(contaUrl.contaUrl + '/user/getUserInfo', {
                params: {
                    token: token
                }
            }).then((response) => {
                var rdd = response.data.data;
                console.log(rdd.user.phone)
                this.card = rdd.user.phone;
                this.oldphone = this.card;
                console.log(this.oldphone)
                this.ig = sessionStorage.getItem("image")
            }).catch((error) => {
                console.log(error);
            })

            this.$axios.get(contaUrl.contaUrl + '/user/getUserSites', {
                params: {
                    token: sessionStorage.getItem('token')
                }
            }).then((response) => {
                if (response.data.code == 200) {
                    var options = response.data.data.siteList;
                    this.oldSide = response.data.data.siteList;
                    console.log(this.oldSide);
                    console.log(options)
                    for (var i = 0; i < this.oldSide.length; i++) {
                        var material = {}
                        material.siteName = this.oldSide[i].siteName
                        // this.materialData[i].newSite=0;
                        this.materialData.push(material)


                    }
                console.log(this.materialData[0].siteName)

                    // for (var i = 0; i < options.length; ++i) {
                    //     var obj = {};
                    //     obj.value = options[i].id;
                    //     obj.label = options[i].siteName;
                    //     this.options.push(obj);
                    // }
                }
            }).catch((error) => {
                console.log(error);
            })

            this.$axios.get(contaUrl.contaUrl + '/system/siteList', {
                params: {
                    token: sessionStorage.getItem('token')
                }
            }).then((response) => {
                if (response.data.code == 200) {
                    console.log("4326")
                    var options1 = response.data.data.siteList;
                    for (var i = 0; i < options1.length; ++i) {
                        var obj = {};
                        obj.value = options1[i].id;
                        obj.label = options1[i].siteName;
                        if (this.checkIsNotUserSite(obj.value)) {
                            this.options1.push(obj);
                        }
                    }
                }
            }).catch((error) => {
                console.log(error);
            })

        }
    }
</script>

<style scoped>
    .item_bock {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 94px;
        padding: 0px 24px 0px 38px;
        border-bottom: 2px solid #f7f7f7;
        background: #fff;
        margin-top: 100px;
    }

    .head_p {
        height: 132px;
    }

    .head_img {
        float: left;
        float: left;
    }

    .head_img img {
        width: 90px;
        height: 90px;
    }

    .setting_right {
        line-height: 90px;
    }

    .hiddenInput {
        display: none;
    }

    .ul {
        display: inline-block;
        padding: 0;
        margin-top: 50px;
        list-style: none;
    }

    .ul:last-child {
        background-color: #f7f7f7;
    }

    .ul li {
        border: 1px solid #d7d7d7;
        width: 150px;
        height: 35px;
        text-align: center;
        line-height: 35px;
    }

    /* 修改密码的弹出框 width默认100% */
    .el-message-box {
        width: 80% !important;
    }
</style>