<template>
    <div>

        <div id="myVue" class="container" style="margin-top: 50px;">
            <div class="t-selection2">
                <div class="t-people1">
                    <img :src="img" :onerror="defaultImg" style="float: left" width="48px" height="48px">
                    <!--<img src="../../public/images/人像.png" alt="图片受损" style="float: left">-->
                    <div class="zunjing">
                        <p class="t-pe">欢迎登陆</p>
                        <p class="t-pe">尊敬的&nbsp;<span style="color:red">{{info.realName}}</span></p>
                    </div>
                    <router-link to="/file">
                        <el-button depressed style="line-height: 30px;" type="info" size="small">更该账户信息</el-button>
                    </router-link>
                </div>

            </div>

            <div class="row">
                <el-row>
                    <el-col :span="2" :offset="4">
                        <el-badge :value="listTitle" class="item"></el-badge>
                    </el-col>
                    <el-col :span="2" :offset="4">
                        <el-badge :value="listTitle1" class="item"></el-badge>
                    </el-col>
                    <el-col :span="2" :offset="4">
                        <el-badge :value="listTitle2" class="item"></el-badge>
                    </el-col>
                </el-row>
            </div>

            <div class="row">
                <el-tabs type="border-card">
                    <el-tab-pane label="提货申请">
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column label="日期" width="120">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.date }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="姓名" width="100">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.name }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="button"
                                               @click="handleClick(scope.$index, scope.row)">详情
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <el-dialog :visible.sync="outerVisible" width="100%">
                            <el-dialog width="100%" :visible.sync="innerVisible" append-to-body>
                                <h3 style="text-align: center">申请内容</h3>
                                <el-row>
                                    <table v-for="item in text"
                                           style="margin:auto; border-collapse: collapse;width: 100%;text-align: center;margin-top: 20px"
                                           border="1">
                                        <tr>
                                            <td>申请人</td>
                                            <td>{{item.applyPeopleName}}</td>

                                        </tr>

                                        <tr>
                                            <td>申请时间</td>
                                            <td>{{item.gmtCreate}}</td>
                                        </tr>
                                        <tr>
                                            <td>申请材料</td>
                                            <td>{{item.materialName}}</td>
                                        </tr>
                                        <tr>
                                            <td>计划数量</td>
                                            <td>{{item.planAmount}}</td>
                                        </tr>
                                        <tr>
                                            <td>申请人电话</td>
                                            <td>{{item.applyPeoplePhone}}</td>
                                        </tr>
                                        <tr>
                                            <td>使用部位</td>
                                            <td>{{item.usePart}}</td>
                                        </tr>
                                        <tr>
                                            <td>工地</td>
                                            <td>{{item.siteName}}</td>
                                        </tr>

                                    </table>
                                </el-row>
                                <el-row style="margin-top: 20px">
                                    <el-col :span="6" :offset="4">
                                        <el-button type="button" size="medium" @click="tongyi">同意</el-button>
                                    </el-col>
                                    <el-col :span="6" :offset="4">
                                        <el-button type="button" size="medium" @click="bohui">驳回</el-button>
                                    </el-col>
                                </el-row>
                                <el-row style="margin-top: 20px">
                                    <el-col :span="4" :offset="2">
                                        <span>备注：</span>
                                    </el-col>
                                    <el-col :span="20" :offset="2">
                                        <el-input type="textarea" :rows="2" placeholder="" v-model="textarea">
                                        </el-input>
                                    </el-col>
                                </el-row>
                            </el-dialog>
                            <div>
                                <el-row>
                                    <el-col :span="10" :offset="8">
                                        <el-button type="primary" @click="chakan">查看申请内容</el-button>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <table v-for="item in text1"
                                           style="margin:auto;border-collapse:collapse;width: 100%;text-align: center;margin-top: 20px"
                                           border="1">
                                        <tr>
                                            <td>申请日期</td>
                                            <td>{{item.applyTime}}</td>
                                        </tr>

                                        <tr>
                                            <td>一级审核</td>
                                            <td>{{item.firstLevelVerifier}}</td>
                                        </tr>
                                        <tr>
                                            <td>停留时间</td>
                                            <td>{{item.firstLeverApproveTime}}</td>
                                        </tr>
                                        <tr>
                                            <td>审批时间</td>
                                            <td>{{item.firstLeverApproveTime}}</td>
                                        </tr>
                                        <tr>
                                            <td>二级审核</td>
                                            <td>{{item.secondLevelVerifier}}</td>
                                        </tr>
                                        <tr>
                                            <td>停留时间</td>
                                            <td>{{item.secondLevelWaitTime}}</td>
                                        </tr>
                                        <tr>
                                            <td>审批时间</td>
                                            <td>{{item.secondLeverApproveTime}}</td>
                                        </tr>

                                    </table>
                                </el-row>

                            </div>
                        </el-dialog>
                    </el-tab-pane>

                    <el-tab-pane label="进货申请">
                        <el-table :data="tableData1" style="width: 100%">
                            <el-table-column label="日期" width="120">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.date }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="姓名" width="100">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.name }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="button"
                                               @click="handleClick2(scope.$index, scope.row)">详情
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <el-dialog :visible.sync="outerVisible1" width="100%" append-to-body>
                            <el-dialog width="100%" :visible.sync="innerVisible" append-to-body>
                                <h3 style="text-align: center">申请内容</h3>
                                <el-row>
                                    <table v-for="item in textp1"
                                           style="margin:auto; border-collapse: collapse;width: 100%;text-align: center;margin-top: 20px"
                                           border="1">
                                        <tr>
                                            <td>申请人</td>
                                            <td>{{item.applyPeopleName}}</td>

                                        </tr>

                                        <tr>
                                            <td>申请时间</td>
                                            <td>{{item.gmtCreate}}</td>
                                        </tr>

                                        <tr>
                                            <td>申请材料</td>
                                            <td>{{item.materialName}}</td>
                                        </tr>

                                        <tr>
                                            <td>计划数量</td>
                                            <td>{{item.planAmount}}</td>
                                        </tr>

                                        <tr>
                                            <td>申请人电话</td>
                                            <td>{{item.applyPeoplePhone}}</td>
                                        </tr>

                                        <tr>
                                            <td>使用部位</td>
                                            <td>{{item.usePart}}</td>
                                        </tr>

                                        <tr>
                                            <td>工地</td>
                                            <td>{{item.siteName}}</td>
                                        </tr>

                                    </table>
                                </el-row>


                                <el-row style="margin-top: 20px">
                                    <el-col :span="6" :offset="4">
                                        <el-button type="button" size="medium" @click="tongyi">同意</el-button>
                                    </el-col>
                                    <el-col :span="6" :offset="4">
                                        <el-button type="button" size="medium" @click="bohui">驳回</el-button>
                                    </el-col>
                                </el-row>
                                <el-row style="margin-top: 20px">
                                    <el-col :span="4" :offset="2">
                                        <span>备注：</span>
                                    </el-col>
                                    <el-col :span="20" :offset="2">
                                        <el-input type="textarea" :rows="2" placeholder="" v-model="textarea2">
                                        </el-input>
                                    </el-col>
                                </el-row>
                            </el-dialog>
                            <div>
                                <el-row>
                                    <el-col :span="10" :offset="8">
                                        <el-button type="primary" @click="chakan2">查看申请内容</el-button>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <table v-for="item in textp"
                                           style="margin:auto;border-collapse:collapse;width: 100%;text-align: center;margin-top: 20px"
                                           border="1">
                                        <tr>
                                            <td>申请日期</td>
                                            <td>{{item.applyTime}}</td>
                                        </tr>

                                        <tr>
                                            <td>一级审核</td>
                                            <td>{{item.firstLevelVerifier}}</td>
                                        </tr>
                                        <tr>
                                            <td>停留时间</td>
                                            <td>{{item.firstLeverApproveTime}}</td>
                                        </tr>
                                        <tr>
                                            <td>审批时间</td>
                                            <td>{{item.firstLeverApproveTime}}</td>
                                        </tr>
                                        <tr>
                                            <td>二级审核</td>
                                            <td>{{item.secondLevelVerifier}}</td>
                                        </tr>
                                        <tr>
                                            <td>停留时间</td>
                                            <td>{{item.secondLevelWaitTime}}</td>
                                        </tr>
                                        <tr>
                                            <td>审批时间</td>
                                            <td>{{item.secondLeverApproveTime}}</td>
                                        </tr>

                                    </table>
                                </el-row>

                            </div>
                        </el-dialog>
                    </el-tab-pane>

                    <el-tab-pane label="账号申请">

                        <el-table :data="tableData2" style="width: 100%">
                            <el-table-column label="日期" width="120">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.date }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="姓名" width="100">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.name }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="button"
                                               @click="handleClick3(scope.$index, scope.row)">详情
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <el-dialog :visible.sync="dialogTableVisible" width="100%">
                            <h3 style="text-align: center">申请内容</h3>

                            <el-row>
                                <table v-for="item in gridData"
                                       style="margin:auto; border-collapse: collapse;width: 100%;text-align: center;margin-top: 20px"
                                       border="1">
                                    <tr>
                                        <td>申请人</td>
                                        <td>{{item.name}}</td>

                                    </tr>

                                    <tr>
                                        <td>申请人电话</td>
                                        <td>{{item.phone}}</td>
                                    </tr>
                                    <tr>
                                        <td>申请时间</td>
                                        <td>{{item.date}}</td>
                                    </tr>
                                    <tr>
                                        <td>所属工地</td>
                                        <td>{{item.siteName}}</td>
                                    </tr>


                                </table>
                            </el-row>
                            <el-row style="margin-top: 20px">
                                <el-col :span="6" :offset="4">
                                    <el-button type="button" size="medium" @click="tongyi">同意</el-button>
                                </el-col>
                                <el-col :span="6" :offset="4">
                                    <el-button type="button" size="medium" @click="bohui">驳回</el-button>
                                </el-col>
                            </el-row>
                            <el-row style="margin-top: 20px">
                                <el-col :span="4" :offset="2">
                                    <span>备注：</span>
                                </el-col>
                                <el-col :span="20" :offset="2">
                                    <el-input type="textarea" :rows="2" placeholder="" v-model="textarea3">
                                    </el-input>
                                </el-col>
                            </el-row>
                        </el-dialog>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>

</template>

<script>
    import contaUrl from '../../public/js/contaUrl.js'

    export default {
        data() {
            return {
                drawer: null,
                activeName: 'second',
                activeName2: 'first',
                tabPosition: 'top',
                editableTabsValue2: '2',
                tabIndex: 2,
                tableData: [],
                tableData1: [],
                tableData2: [],
                text: [],
                text1: [],
                outerVisible: false,
                outerVisible1: false,
                innerVisible: false,
                dialogTableVisible: false,
                gridData: [],
                textarea: '',
                textarea2: '',
                textarea3: '',
                textp: [],
                textp1: [],
                info: [],
                img: '',
                row:"",
                index:'',
                id:'',
                applyType:'',
                defaultImg: 'this.src="' + require('../../public/images/人像.png') + '"',

            }
        },
        created: function () {

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
            this.$axios.get(contaUrl.contaUrl + '/apply/getapplylist', {
                params: {
                    token: sessionStorage.getItem('token')
                }
            }).then((response) => {
                if (response.data.code == 200) {
                    var tableData = response.data.data.applies.pickApplyList;
                    console.log(tableData)
                    for (var i = 0; i < tableData.length; ++i) {
                        var obj = {};
                        obj.date = tableData[i].gmtCreate;
                        obj.name = tableData[i].applyPeopleName;
                        obj.id = tableData[i].id;
                        obj.applyId = tableData[i].applyId;
                        this.tableData.push(obj);
                    }
                    var tableData1 = response.data.data.applies.stockRecordList;
                    console.log(tableData1)
                    for (var i = 0; i < tableData1.length; ++i) {
                        var obj = {};
                        obj.date = tableData1[i].gmtCreate;
                        obj.name = tableData1[i].applyPeopleName;
                        obj.id = tableData1[i].id;
                        obj.applyId = tableData1[i].applyId;
                        this.tableData1.push(obj);
                    }
                    var tableData2 = response.data.data.applies.accountApplyList;
                    console.log(tableData2)
                    for (var i = 0; i < tableData2.length; ++i) {
                        var obj = {};
                        obj.date = tableData2[i].applyTime;
                        obj.name = tableData2[i].userName;
                        obj.id = tableData2[i].id;
                        obj.applyId = tableData2[i].applyId;
                        obj.phone=tableData2[i].phone;
                        obj.siteName=tableData2[i].newSite.siteName;
                        this.tableData2.push(obj);
                    }
                }
            }).catch((error) => {
                console.log(error);
            })

            this.$axios.get(contaUrl.contaUrl + '/user/getUserInfo', {
                params: {
                    token: sessionStorage.getItem('token'),
                }
            }).then((response) => {
                if (response.data.code == 200) {
                    this.info = response.data.data.user;
                    this.img = sessionStorage.getItem('image');
                }
            }).catch((error) => {
                console.log(error);
            })
        },
        computed: {
            listTitle: function () {
                return this.tableData.length;
            },
            listTitle1: function () {
                return this.tableData1.length;
            },
            listTitle2: function () {
                return this.tableData2.length;
            }
        },
        methods: {
            water: function () {
                this.$router.push('record')
            },
            query: function () {
                this.$router.push('query')
            },
            apply: function () {
                this.$router.push('apply')
            },
            input: function () {
                this.$router.push('input')
            },
            ordinary: function () {
                this.$router.push('ordinary')
            },
            money: function () {
                this.$router.push('money')
            },
            homepage: function () {
                this.$router.push('homepage')
            },
            center: function () {
                var role = sessionStorage.getItem("role");
                console.log(role)
                if (role == 3) {
                    this.$router.push("centerThree")
                } else if (role == 2) {
                    // this.$router.push("centerTwo")
                    window.location.reload();
                } else if (role == 1) {
                    this.$router.push("center")
                }
            },
            back: function () {
                // window.history.go(-1)
                this.$router.push('homepage')
            },
            stop: function () {
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                this.$router.push('/')
            },
            to: function () {
                // window.location.href = "./view/file.html"
            },
            handleClick(index, row) {
                console.log(index, row)
                this.row = row;
                this.index=index;

                console.log(this.row);
                this.id = this.row.id;
                console.log(this.id);
                this.applyId = this.row.applyId;
                this.id=this.row.id;
                this.applyType=1;
                console.log(this.applyId);
                this.xiangqing()
            },
            handleClick2(index, row) {
                console.log(index, row)
                this.row = row;
                this.index=index;

                console.log(this.row);
                this.id = this.row.id;
                console.log(this.id);
                this.applyId = this.row.applyId;
                this.id=this.row.id;
                this.applyType=2;
                console.log(this.applyId);
                this.xiangqing2();
            },
            handleClick3(index, row) {
                console.log(index, row)
                this.row = row;
                this.index=index;

                console.log(this.row);
                this.id = this.row.id;
                console.log(this.id);
                this.applyId = this.row.applyId;
                console.log(this.applyId);
                this.applyType=3;
                this.xiangqing3();
            },
            xiangqing: function () {
                this.outerVisible = true;
                this.$axios.get(contaUrl.contaUrl + '/apply/applyresult', {
                    params: {
                        id: this.id
                    }
                }).then((response) => {
                    if (response.data.code == 200) {
                        this.text1 = new Array();
                        this.text1.push(response.data.data.apply);
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            xiangqing2: function () {
                this.outerVisible1 = true;
                this.$axios.get(contaUrl.contaUrl + '/apply/applyresult', {
                    params: {
                        id: this.id
                    }
                }).then((response) => {
                    if (response.data.code == 200) {
                        this.textp = new Array();
                        this.textp.push(response.data.data.apply);
                        console.log(this.textp)
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            xiangqing3: function () {
                this.dialogTableVisible = true;
                this.gridData=new Array();
                this.gridData.push(this.row);
                console.log(this.gridData);
            },
            chakan: function () {
                this.innerVisible = true;
                this.$axios.get(contaUrl.contaUrl + '/apply/getapplyinfo', {
                    params: {
                        id: this.applyId
                    }
                }).then((response) => {
                    if (response.data.code == 200) {
                        this.text = new Array();
                        this.text.push(response.data.data.apply);
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            chakan2: function () {
                this.innerVisible = true;
                this.$axios.get(contaUrl.contaUrl + '/apply/getapplyinfo', {
                    params: {
                        id: this.applyId
                    }
                }).then((response) => {
                    if (response.data.code == 200) {
                        this.textp1 = new Array();
                        this.textp1.push(response.data.data.apply);
                        console.log(this.textp1)
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            tongyi: function () {
                this.$axios.get(contaUrl.contaUrl + '/apply/approve', {
                    params: {
                        id: this.applyId,
                        isApproval: true,
                        token: sessionStorage.getItem('token')
                        // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY0ODY0NjIsInVzZXJuYW1lIjoiYWRtaW4ifQ.xQzyd74DwDaM9epiQSEPphV8zWW230JalPVVs8Lsk5A"
                    }
                }).then((response)=>{
                    if (response.data.code == 200) {
                        this.$message({
                            showClose:true,
                            message: '恭喜你,同意成功!',
                            type: 'success'
                        });

                        this.hideDialog();
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            },
            bohui: function () {
                this.$axios.get(contaUrl.contaUrl + '/apply/approve', {
                    params: {
                        id: this.applyId,
                        isApproval: false,
                        token: sessionStorage.getItem('token')
                        // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY0ODY0NjIsInVzZXJuYW1lIjoiYWRtaW4ifQ.xQzyd74DwDaM9epiQSEPphV8zWW230JalPVVs8Lsk5A"
                    }
                }).then((response) => {
                    if (response.data.code == 200) {
                        this.$message({
                            showClose:true,
                            message: '驳回成功!',
                            type: 'success'
                        });
                        this.hideDialog();
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },

            hideDialog(){
                if(this.applyType==1){
                    this.outerVisible = false;
                    this.tableData.splice(this.index,1);
                }else if(this.applyType==2){
                    this.outerVisible1=false;
                    this.tableData1.splice(this.index,1);
                }else if(this.applyType==3){
                    this.dialogTableVisible = false;
                    this.tableData2.splice(this.index,1);
                }
                this.innerVisible = false;
            },
            removeTab(targetName) {
                let tabs = this.editableTabs2;
                let activeName = this.editableTabsValue2;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }
                this.editableTabsValue2 = activeName;
                this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
            }
        }
    }
</script>

<style>
    .t-selection2 {
        border-bottom: 2px solid #666;
        padding-bottom: 10px;
    }

    .t-people1 {
        /*width: 75%;*/
        margin-top: 30px;
        overflow: hidden;
    }

    .t-pe {
        font-size: 14px;
        margin: 0;
        padding: 0;
        text-indent: 1em;
        letter-spacing: 1px;
        width: 170px;
        float: left;

    }

    .t-pe:last-child {
        line-height: 40px;
    }

    .item {
        top: 10px;
        left: 5px;
    }
</style>