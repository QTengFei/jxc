<template>
    <div class="background">

        <header>
            <div class="t-pic">
                <img src="../../public/images/小云朵.png" alt="图片受损">
            </div>
        </header>

        <footer>
            <h3 class="t-h3">欢迎注册进销存系统</h3>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入真实姓名" clearable
                              prefix-icon="el-icon-shimingrenzheng1shuruzhenshixingmingfuzhi"
                              style="margin-left:  -50px;!important;"></el-input>
                </el-form-item>

                <el-form-item prop="age">
                    <el-input v-model="ruleForm.age" placeholder="请输入账号" clearable
                              prefix-icon="el-icon-zhanghaoguanli" style="margin-left:  -50px;!important;"></el-input>
                </el-form-item>

                <el-form-item prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" placeholder="请输入密码" clearable
                              prefix-icon="el-icon-mima" style="margin-left:  -50px;!important;"></el-input>
                </el-form-item>

                <el-form-item prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" placeholder="请确认密码" clearable
                              prefix-icon="el-icon-mima" style="margin-left:  -50px;!important;"></el-input>
                </el-form-item>

                <el-form-item prop="phone">
                    <el-input v-model.number="ruleForm.phone" placeholder="请输入手机号码" clearable
                              prefix-icon="el-icon-weibiaoti-" id="phone"
                              style="margin-left:  -50px;!important;"></el-input>
                </el-form-item>


                <el-form-item prop="shen">
                    <el-input v-model="ruleForm.shen" placeholder="请输入身份证" clearable
                              prefix-icon="el-icon-emishenfenzheng" class="t-input" id="shen"
                              style="margin-left:  -50px;!important;"></el-input>
                </el-form-item>
            </el-form>

            <v-app id="inspire">
                <v-layout row justify-center>
                    <v-dialog v-model="dialog" persistent max-width="290">
                        <el-button slot="activator" color="primary" dark>
                            所属项目:点击选择
                        </el-button>

                        <v-card>
                            <v-card-title class="headline">选择工地所属项目</v-card-title>
                            <ul>
                                <li v-for="lib  in  gongdi" class="t-gongdi">
                                    <el-radio :label="lib.id" name="type" v-model="exo">{{lib.value}}</el-radio>
                                </li>
                            </ul>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <el-button color="green darken-1" flat @click="dialog = false">取消</el-button>
                                <el-button color="green darken-1" flat @click="dialog = false">确定</el-button>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-layout>
            </v-app>


            <el-row class="t-ck">
                <el-col :span="20" :offset="3">
                    <span style="color: gray">请选择注册账号类型:</span>
                    <span class="t-hidden">*&nbsp;请选择账号类型</span>
                    <div class="t-n">
                        <p>
                            <el-radio label="1" style="color:gray" v-model="radio" id="selectedOne" name="selected">
                                普通账号
                            </el-radio>
                        </p>
                        <p>
                            <el-radio label="2" style="color:gray" v-model="radio" id="selectedTwo" name="selected">
                                采购/经理账号
                            </el-radio>
                        </p>
                    </div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="14" :offset="5">
                    <el-button type="primary" @click="submitForm('ruleForm')"
                               style="width: 100%;!important;margin-bottom: 10px;">注册
                    </el-button>

                </el-col>
                <el-col :span="4" :offset="1">
                    <router-link to="/" style="text-decoration: none; font-size: 15px;line-height: 40px;">
                        <p>返回登录</p>
                    </router-link>
                </el-col>
            </el-row>

        </footer>

    </div>
</template>

<script>
    import contaUrl from '../../public/js/contaUrl.js'

    export default {
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validatePhone = (rule, value, callback) => {
                var phone = document.getElementById('phone').value;
                if (value === '') {
                    callback(new Error('请输入电话'));
                } else if (!(/^1[34578]\d{9}$/.test(phone))) {
                    callback(new Error('手机格式错误'));
                } else {
                    callback();
                }
            };
            var validateShen = (rule, value, callback) => {
                var shen = document.getElementById('shen').value;
                if (value === '') {
                    callback(new Error('请输入身份证'));
                } else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(shen))) {
                    callback(new Error('身份证格式错误'));
                } else {
                    callback();
                }
            };
            return {
                exo: '',
                people: '',
                dialog: false,
                checked: false,
                gongdi: [],
                ruleForm: {
                    name: '',
                    age: '',
                    pass: '',
                    checkPass: '',
                    phone: '',
                    shen: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入真实姓名', trigger: 'blur'},
                        {min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    age: [
                        {validator: checkAge, trigger: 'blur'}
                    ],
                    phone: [
                        {validator: validatePhone, trigger: 'blur'}
                    ],
                    shen: [
                        {validator: validateShen, trigger: 'blur'}
                    ],
                },
                radio: '',
            }
        },
        methods: {
            submitForm(formName) {
                var radio = document.getElementsByName("selected");
                var selectvalue = '';
                var hidden = document.querySelector(".t-hidden");
                var params = new URLSearchParams();
                params.append('realname', this.ruleForm.name);
                params.append('password', this.ruleForm.checkPass);
                params.append('username', this.ruleForm.age);
                params.append('phone', this.ruleForm.phone);
                params.append('cardid', this.ruleForm.shen);
                params.append('role', this.radio);
                params.append('siteList', this.exo);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(contaUrl.contaUrl + '/user/regist', params).then((response) => {
                            if (response.data.code == 200) {
                                this.$message({
                                    message: '恭喜你注册成功,2秒后跳转登陆!',
                                    type: 'success'
                                });

                                setTimeout(function () {
                                    window.location.href = '/'
                                }, 2000)
                            } else if (response.data.code == 400) {
                                this.$message.error('注册失败,此用户名已存在');
                            }
                        }).catch((error) => {
                            console.log(error)
                        })
                  /*      console.log(radio)
                        for (var i = 0; i < radio.length; i++) {
                            if (radio[i].checked == true) {
                                selectvalue = radio[i].value;
                            }
                        }
                        if (selectvalue == '') {
                            hidden.style.display = "block";
                        }*/
                    } else {
                        console.log('error submit!!');
                        return false;
                    }


                });


            }
        },
        created: function () {
            this.$axios.get(contaUrl.contaUrl + '/system/siteList', {
                params: {}
            }).then((response) => {
                if (response.data.code == 200) {
                    var siteList = response.data.data.siteList;
                    for (var i = 0; i < siteList.length; i++) {
                        var num = {};
                        num.id = siteList[i].id;
                        num.value = siteList[i].siteName;
                        this.gongdi.push(num)
                    }
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }
</script>

<style>
    ul, li {
        list-style: none;
    }

    /* header */
    .t-pic {
        width: 255px;
        height: 115px;
        margin: 0 auto;
        margin-top: 10px;
    }

    /* footer */
    .t-h3 {
        margin-top: 40px;
        text-align: center;
        margin-bottom: 40px;
    }

    .t-input {
        /*width: 315px;*/
    }

    .t-gongdi {
        margin: 5px 0 10px 0;
    }

    .t-ck {
        margin-top: 20px;
    }

    .t-n {
        margin-top: 10px;
    }

    .t-hidden {
        color: #ED6D6F;
        display: none;
        margin: 5px;
        font-size: 12px;
    }
</style>