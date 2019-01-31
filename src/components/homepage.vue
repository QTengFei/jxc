<template>
    <div id="app">
        <div class="t-top">
            <el-row>
                <el-col :span="18" :offset="3">
                    <img src="../../public/images/小云朵.png" alt="图片受损">
                </el-col>
            </el-row>

            <div class="t-selection">
                <div class="t-people">
                    <router-link to="/file"><img :src="img" :onerror="defaultImg" style="float: left" width="48px"
                                                 height="48px">
                    </router-link>
                    <!--<img src="../../public/images/人像.png" alt="图片受损" style="float: left">-->
                    <p class="t-pe">欢迎登陆</p>
                    <p class="t-pe">尊敬的&nbsp;<span style="color:red">{{username}}</span></p>
                </div>
            </div>

            <footer class="t-footer">
                <div class="t-div">
                    <ul class="t-ul">

                        <el-row>
                            <el-col :span="8">
                                <li class="t-li">
                                    <router-link to="/query" class="t-a">
                                        <img src="../../public/images/库存查询.png" alt="图片受损">
                                        <p>库存查询</p>
                                    </router-link>
                                </li>
                            </el-col>

                            <el-col :span="8">
                                <li class="t-li" style="position: relative">
                                    <div class="t-a" @click="center">
                                        <el-badge :value="value">
                                            <img src="../../public/images/个人中心.png" alt="图片受损">
                                            <p>个人中心</p>
                                        </el-badge>
                                    </div>

                                </li>
                            </el-col>

                            <el-col :span="8">
                                <li class="t-li">
                                    <router-link to="/record" class="t-a">
                                        <img src="../../public/images/明细流水.png" alt="图片受损">
                                        <p>明细流水</p>
                                    </router-link>
                                </li>
                            </el-col>

                            <el-col :span="8">
                                <li class="t-li">
                                    <router-link to="/apply" class="t-a">
                                        <img src="../../public/images/材料申请.png" alt="图片受损">
                                        <p>材料申请</p>
                                    </router-link>
                                </li>
                            </el-col>

                            <el-col :span="8">
                                <li class="t-li">
                                    <router-link to="/money" class="t-a">
                                        <img src="../../public/images/财务分析.png" alt="图片受损">
                                        <p>财务分析</p>
                                    </router-link>
                                </li>
                            </el-col>

                            <el-col :span="8">
                                <li class="t-li">
                                    <router-link to="/input" class="t-a">
                                        <img src="../../public/images/库存录入.png" alt="图片受损">
                                        <p>库存录入</p>
                                    </router-link>
                                </li>
                            </el-col>

                            <el-col :span="8">
                                <li class="t-li">
                                    <router-link to="/ordinary" class="t-a">
                                        <img src="../../public/images/库存查询.png" alt="图片受损">
                                        <p>我的库存</p>
                                    </router-link>
                                </li>
                            </el-col>
                        </el-row>
                    </ul>
                </div>

            </footer>

        </div>
    </div>
</template>

<script>
    import contaUrl from '../../public/js/contaUrl.js'

    export default {
      beforeRouteEnter(to, from, next) {
            next(vm=>{
                if(to.path == "/homepage"){
                    console.log(vm.$route.path)
                    vm.handClose = !vm.handClose
                }else{
                    next()
                }
            })
        },
        data() {
            return {
                drawer: null,
                value: '',
                username: '',
                img: '',
                defaultImg: 'this.src="' + require('../../public/images/人像.png') + '"',
            }
        },
        created: function () {
            this.username = sessionStorage.getItem("username");
            this.$axios.get(contaUrl.contaUrl + '/user/getUserInfo', {
                params: {
                    token: sessionStorage.getItem('token'),
                }
            }).then((response) => {
                if (response.data.code == 200) {
                    // this.image = response.data.data.user.image;
                    this.img = sessionStorage.getItem('image');
                }
            }).catch((error) => {
                console.log(error)
            })
            this.$axios.get(contaUrl.contaUrl + '/apply/eventCount', {
                params: {
                    token: sessionStorage.getItem("token")
                }
            }).then((response) => {
                if (response.data.code == 200) {
                    // this.image = response.data.data.user.image;
                    const data = response.data
                    this.value = data.data.eventCount;
                    // console.log(data.data.eventCount)
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        mounted: function () {
            var role = sessionStorage.getItem("role");
            console.log(role)
            var li = document.getElementsByClassName("t-li");
            console.log(li)
            var tile = document.getElementsByClassName("tile")
            console.log(tile)


            if (role == 3) {
                li[3].style.display = "none";
                li[5].style.display = "none";
                li[6].style.display = "none";
                tile[2].style.display = "none";
                tile[3].style.display = "none";
                tile[7].style.display = "none";
            } else if (role == 2) {
                li[3].style.display = "none";
                li[6].style.display = "none";
                tile[3].style.display = "none";
                tile[7].style.display = "none";
            } else if (role == 1) {
                li[0].style.display = "none";
                li[4].style.display = "none";
                li[5].style.display = "none";
                tile[2].style.display = "none";
                tile[4].style.display = "none";
                tile[6].style.display = "none";
            }
        },
        methods: {
            query: function () {
                this.$router.push('query')
            },
            ordinary: function () {
                this.$router.push('ordinary')
            },
            apply: function () {
                this.$router.push('apply')
            },
            input: function () {
                this.$router.push('input')
            },
            water: function () {
                this.$router.push('record')
            },
            money: function () {
                this.$router.push('money')
            },
            homepage: function () {
                // this.$router.push('homepage')
                window.location.reload()
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
                    this.$router.push("CenterThree")
                } else if (role == 2) {
                    this.$router.push("CenterTwo")
                } else if (role == 1) {
                    this.$router.push("Center")
                }
            }
        },

    }


</script>

<style>
    .t-top {
        margin-top: 100px;
    }

    .t-people {
        /*border: 1px solid red;*/
        width: 75%;
        margin: 0px auto;
        margin-top: 30px;
        overflow: hidden;
    }

    .t-pe {
        font-size: 14px;
        margin: 0;
        padding: 0;
        text-indent: 1em;
        letter-spacing: 1px;
    }

    .t-pe:last-child {
        line-height: 40px;
    }

    /* footer */
    .t-footer {
        border-top: 2px solid #666;
        width: 90%;
        margin: 0 auto;
        margin-top: 20px;
        overflow: hidden;
        padding: 15px 0 0 0;
    }

    .t-footer .t-div .t-ul {
        list-style: none;
        margin: 0 auto;
        padding: 0;
        height: 100%;
        margin-left: 10%;
    }

    .t-footer .t-div .t-ul .t-li {
        float: left;
        /*margin-right: 45px;*/
    }

    .t-footer .t-div .t-ul .t-li .t-a {
        text-decoration: none;
        color: black;
        font-family: "HoloLens MDL2 Assets";
    }


    .ii {
        /*display: none;*/
        background: #f00;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        top: 0px;
        right: 0px;
        position: absolute;
        text-align: center;
        color: #FFF;
        z-index: 99;
    }
</style>