<template>
    <div class="background">

        <header>
            <div class="t-pic">
                <img src="../../public/images/小云朵.png" alt="图片受损">
            </div>
        </header>

        <footer>
            <h3 class="t-h3">欢迎登陆进销存系统</h3>

            <div class="t-name">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                    <el-form-item prop="username">
                        <el-input placeholder="请输入账号" v-model="ruleForm.username" clearable
                                  prefix-icon="el-icon-zhanghaoguanli"
                                  style="margin-left: -50px;!important;"></el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" clearable
                                  prefix-icon="el-icon-mima"
                                  clearable style="margin-left: -50px;!important;"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div class="t-checkbox">
                <el-checkbox v-model="checked">是否记住此账号</el-checkbox>
            </div>

            <div class="t-deng">
                <el-button type="primary" round class="t-button" @click="submitForm('ruleForm')" plain :plain="true">
                    登陆
                </el-button>
            </div>

            <div class="t-forget">
                <span class="t-span">还没有账号?</span>
                <router-link class="t-zhuce" to="/register">去注册</router-link>
            </div>

        </footer>

    </div>

</template>

<script>
    import contaUrl from '../../public/js/contaUrl'

    export default {
        data() {
            var checkName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                } else {
                    callback();
                }
            };
            var checkPass = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('密码不能为空'));
                } else {
                    callback();
                }
            };
            return {
                checked: false,
                ruleForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        {validator: checkName, trigger: 'blur'}
                    ],
                    password: [
                        {validator: checkPass, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                var params = new URLSearchParams();
                params.append('username', this.ruleForm.username);
                params.append('password', this.ruleForm.password);

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(contaUrl.contaUrl + '/user/login', params).then((response) => {

                            if (response.data.code == 400) {
                                this.$notify.error({
                                    title: '错误',
                                    message: '此账号不存在,请注册!'
                                });
                            } else if (response.data.code == 200) {
                                console.log(this.checked)

                                sessionStorage.setItem('token', response.data.data.token);
                                if(this.checked == true){
                                    localStorage.setItem('token', response.data.data.token);
                                }
                                sessionStorage.setItem('role', response.data.data.role);
                                sessionStorage.setItem('username', response.data.data.username);
                                this.getUserInfo()
                            }else if(response.data.code==401){
                                this.$notify.error({
                                    title: '错误',
                                    message: '密码错误，请重试!'
                                });
                            }

                        }).catch((error) => {
                            console.log(error);
                            this.$message.error('用户名/密码错误,请重试!');
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }

                });



            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            getUserInfo() {
                var token = sessionStorage.getItem("token");
                console.log(token)
                this.$axios.get(contaUrl.contaUrl + '/user/getUserInfo', {
                    params: {
                        token: token
                    }
                }).then((response) => {
                    if (response.data.code == 200) {
                        sessionStorage.setItem("image", contaUrl.contaUrl + "/" + response.data.data.user.image);
                        sessionStorage.setItem('role', response.data.data.user.role);
                        sessionStorage.setItem('username', response.data.data.user.realName);

                        this.$router.push('/homepage')
                    }
                    console.log(response.data.data);
                }).catch((error) => {
                    console.log(error)
                })
            }

        },

        created: function () {
            var token = localStorage.getItem("token");
            if (token != null && token != undefined) {
                sessionStorage.setItem("token",token);
                this.getUserInfo();
            }
        }
    }
</script>

<style scpoed>
    html, body {
        margin: 0;
        padding: 0;
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
    }

    .t-name {
        width: 300px;
        margin: 0 auto;
        margin-top: 70px;
    }

    .t-checkbox {
        width: 200px;
        margin: 15px auto;
    }

    .t-deng {
        width: 200px;
        margin: 30px auto;
    }

    .t-button {
        width: 200px;
    }

    .t-forget {
        margin-top: 130px;
        text-align: center;
    }

    .t-span {
        font-size: 14px;
    }

    .t-zhuce {
        color: dodgerblue;
        font-size: 14px;
        text-decoration: none;
    }
</style>
