<template>
    <div>

        <div id="myVue" class="container" style="margin-top: 50px;">

            <div class="t-selection3">
                <div class="t-people3">
                    <img :src="img" :onerror="defaultImg" style="float: left" width="48px" height="48px">
                    <!--<img src="../../public/images/人像.png" alt="图片受损" style="float: left">-->
                    <div class="zunjing3">
                        <p class="t-pe">欢迎登陆</p>
                        <p class="t-pe">尊敬的&nbsp;<span style="color:red">{{info.realName}}</span></p>
                    </div>
                    <router-link to="/file">
                        <el-button depressed style="line-height: 30px;"  type="info" size="small">更该账户信息</el-button>
                    </router-link>
                </div>

            </div>

            <div class="row" style="margin-top: 10px;margin-left: 20px;">
                <el-row>
                    <el-col :span="2" :offset="4">
                        <el-badge :value="listTitle" class="item"></el-badge>
                    </el-col>
                    <el-col :span="2" :offset="4">
                        <el-badge :value="listTitle1" class="item"></el-badge>
                    </el-col>
                </el-row>
            </div>

            <div class="row" >
                <el-tabs type="border-card" >
                    <el-tab-pane label="提货申请" >

                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column label="日期" width="120">
                                <template slot-scope="scope">
                                    <span >{{ scope.row.date }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="姓名" width="100">
                                <template slot-scope="scope">
                                    <span >{{ scope.row.name }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="button" @click="handleClick(scope.$index, scope.row);xiangqing()" >详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <el-dialog  :visible.sync="outerVisible" width="100%" >
                            <el-dialog width="100%"  :visible.sync="innerVisible"  append-to-body>
                                <h3 style="text-align: center" >申请内容</h3>
                                <el-row >
                                    <table v-for="item in text1" style="margin:auto; border-collapse: collapse;width: 100%;text-align: center;margin-top: 20px" border="1"  >
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
                            </el-dialog>
                            <div >
                                <el-row >
                                    <el-col :span="8" :offset="3">
                                        <el-button type="primary" @click="chakan">查看申请</el-button>
                                    </el-col>

                                    <el-col :span="8" :offset="2">
                                        <el-button type="danger" @click="dialogVisible = true">删除申请</el-button>
                                    </el-col>
                                </el-row>

                                <el-dialog title="警告" :visible.sync="dialogVisible" :append-to-body="true" width="100%">
                                    <span>此操作会删除本次申请</span>
                                    <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="cancelpick">确 定</el-button>
                                    </span>
                                </el-dialog>
                                <el-row >
                                    <table v-for="item in text" style="margin:auto; border-collapse: collapse;width: 100%;text-align: center;margin-top: 20px" border="1"  >
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

                    <el-tab-pane label="进货申请" >
                        <el-table :data="tableData1" style="width: 100%">
                            <el-table-column label="日期" width="120">
                                <template slot-scope="scope">
                                    <span >{{ scope.row.date }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="姓名" width="100">
                                <template slot-scope="scope">
                                    <span >{{ scope.row.name }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="button" @click="handleClick2(scope.$index, scope.row);xiangqing2()" >详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <el-dialog  :visible.sync="outerVisible1" width="100%" :append-to-body="true">
                            <el-dialog width="100%"  :visible.sync="innerVisible" append-to-body>
                                <h3 style="text-align: center" >申请内容</h3>
                                <el-row >
                                    <table v-for="item in textp1" style="margin:auto; border-collapse: collapse;width: 100%;text-align: center;margin-top: 20px" border="1"  >
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
                                            <td>{{item.applyPeopleName}}</td>
                                        </tr>
                                        <tr>
                                            <td>申请人电话</td>
                                            <td>{{item.applyPeoplePhone}}</td>
                                        </tr>
                                        <tr>
                                            <td>使用部位</td>
                                            <td>{{item.provider}}</td>
                                        </tr>
                                        <tr>
                                            <td>工地</td>
                                            <td>{{item.siteName}}</td>
                                        </tr>

                                    </table>
                                </el-row>

                            </el-dialog>
                            <div >
                                <el-row >
                                    <el-col :span="8" :offset="3">
                                        <el-button type="primary" @click="chakan2">查看申请</el-button>
                                    </el-col>

                                    <el-col :span="8" :offset="2">
                                        <el-button type="danger" @click="dialogVisible1 = true">删除申请</el-button>
                                    </el-col>
                                </el-row>

                                <el-row >
                                    <table v-for="item in textp" style="margin:auto; border-collapse: collapse;width: 100%;text-align: center;margin-top: 20px" border="1"  >
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

                                <el-dialog title="警告" :visible.sync="dialogVisible1" :append-to-body="true" width="100%">
                                    <span>此操作会删除本次申请</span>
                                    <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible1 = false">取 消</el-button>
                                    <el-button type="primary" @click="cancelstock">确 定</el-button>
                                    </span>
                                </el-dialog>


                            </div>
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
                tabIndexqq: 2,
                tableData:[],
                tableData1:[],
                text:[],
                text1:[],
                outerVisible: false,
                outerVisible1:false,
                innerVisible: false,
                dialogVisible: false,
                dialogVisible1: false,
                info:[],
                textp:[],
                textp1:[],
                img:'',
                id:'',
                defaultImg:'this.src="'+require('../../public/images/人像.png')+'"',

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
            this.$axios.get(contaUrl.contaUrl + '/apply/getapplylist', {
                params: {
                    token:sessionStorage.getItem('token')
                    //token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY0ODY0NjIsInVzZXJuYW1lIjoiYWRtaW4ifQ.xQzyd74DwDaM9epiQSEPphV8zWW230JalPVVs8Lsk5A"
                }
            }).then((response)=>{
                if (response.data.code == 200) {
                    var tableData = response.data.data.applies.pickApplyList;
                    console.log(tableData)
                    for(var i=0;i<tableData.length;++i){
                        var obj={};
                        obj.date=tableData[i].gmtCreate;
                        obj.name=tableData[i].applyPeopleName;
                        obj.id=tableData[i].id;
                        obj.applyId=tableData[i].applyId;
                        this.tableData.push(obj);
                    }
                    var tableData1 = response.data.data.applies.stockRecordList;
                    console.log(tableData1)
                    for(var i=0;i<tableData1.length;++i){
                        var obj={};
                        obj.date=tableData1[i].gmtCreate;
                        obj.name=tableData1[i].applyPeopleName;
                        obj.id=tableData1[i].id;
                        obj.applyId=tableData1[i].applyId;
                        this.tableData1.push(obj);
                    }
                }
            }).catch((error)=>{
                console.log(error);
            })

            this.$axios.get(contaUrl.contaUrl + '/user/getUserInfo', {
                params: {
                    token:sessionStorage.getItem('token')
                }
            }).then((response)=>{
                if (response.data.code == 200) {
                    this.info = response.data.data.user;
                    this.img = sessionStorage.getItem('image');
                }
            }).catch((error)=>{
                console.log(error);
            })
        },
        computed:{
            listTitle:function () {
                return this.tableData.length;
            },
            listTitle1:function () {
                return this.tableData1.length;
            }
        },
        methods: {
            input:function(){
                this.$router.push('input')
            },
            apply:function(){
                this.$router.push('apply')
            },
            query:function(){
                this.$router.push('query')
            },
            water:function(){
                this.$router.push('record')
            },
            ordinary:function(){
                this.$router.push('ordinary')
            },
            money: function () {
                this.$router.push('money')
            },
            homepage:function(){
                this.$router.push('homepage')
            },
            stop:function () {
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                this.$router.push('/')
            },
            back:function () {
                // window.history.back(-1)
                this.$router.push('homepage')
            },
            to:function(){
                // window.location.href = "./view/file.html"
            },

            handleClick(index, row) {
                console.log(index, row)
                this.row=row;
                console.log(this.row);
                this.id=this.row.id;
                console.log(this.id);
                this.applyId=this.row.applyId;
                this.id=this.row.id;
                console.log(this.applyId);
            },
            handleClick2(index, row) {
                console.log(index, row)
                this.row=row;
                console.log(this.row);
                this.id=this.row.id;
                console.log(this.id);
                this.applyId=this.row.applyId;
                this.id=this.row.id;
                console.log(this.applyId);
            },
            xiangqing: function (){
                var that=this;
                this.outerVisible=true;
                this.$axios.get(contaUrl.contaUrl + '/apply/applyresult', {
                    params: {
                        id:this.id
                    }
                }).then(function(response) {
                    if (response.data.code == 200) {
                        console.log(response.data.data.apply)
                        that.text=new Array();
                        that.text.push(response.data.data.apply);
                        console.log(that.text)
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            xiangqing2:function (){
                this.outerVisible1=true;
                this.$axios.get(contaUrl.contaUrl + '/apply/applyresult', {
                    params: {
                        id:this.id
                    }
                }).then((response)=>{
                    if (response.data.code == 200) {
                        this.textp=new Array();
                        this.textp.push(response.data.data.apply);
                        console.log(this.textp)
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            },
            chakan:function (){
                this.innerVisible = true;
                this.$axios.get(contaUrl.contaUrl + '/apply/getapplyinfo', {
                    params: {
                        id:this.applyId
                    }
                }).then((response) =>{
                    if (response.data.code == 200) {
                        this.text1 = new Array();
                        this.text1.push(response.data.data.apply);
                        console.log(this.text1)
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            chakan2:function (){
                this.innerVisible = true;
                this.$axios.get(contaUrl.contaUrl + '/apply/getapplyinfo', {
                    params: {
                        id:this.applyId
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
            removeTab(targetName) {
                let tabs = this.editableTabs2;
                let activeName = this.editableTabsValue2;
                if(activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if(tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if(nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }
                this.editableTabsValue2 = activeName;
                this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            cancelpick:function (){
                this.dialogVisible = true;
                this.$axios.get(contaUrl.contaUrl + '/apply/cancelPickApply', {
                    params: {
                        id:this.id,
                        token:sessionStorage.getItem('token')
                    }
                }).then(function (response) {
                    if (response.data.code == 200) {
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            cancelstock:function (){
                this.dialogVisible1 = true;
                this.$axios.get(contaUrl.contaUrl + '/apply/cancelStockApply', {
                    params: {
                        id:this.id,
                        token:sessionStorage.getItem('token')
                    }
                }).then(function (response) {
                    if (response.data.code == 200) {
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            center:function () {
                var role = sessionStorage.getItem("role");
                console.log(role)
                if(role == 3){
                    this.$router.push("centerThree")
                }else if(role == 2){
                    this.$router.push("centerTwo")
                }else if(role == 1){
                    // this.$router.push("center")
                    window.location.reload();
                }
            }
        }
    }
</script>

<style>
    .t-selection3 {
        border-bottom: 2px solid #666;
        padding-bottom: 10px;
    }

    .t-people3 {
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

    .zunjing3 {
        float: left;
        width: 125px;
    }

    .item {
        top: 10px;
    }
</style>