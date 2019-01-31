<template>
    <div>
        <div id="myVue" class="container" style="margin-top: 100px;">
            <el-row>
                <el-col :span="18" :offset="3">
                    <img src="../../public/images/小云朵.png" alt="图片受损">
                </el-col>
            </el-row>

            <div class="row" style="margin-top: 10px">
                <hr style="height: 3px;background-color:#D1D1D1;border: none;margin:5px">
            </div>

            <div class="row" style="margin-top: 10px">
                <span style="text-align: center;font-size: 20px;display: block;">请搜索明细流水</span>
            </div>

            <el-row class="row" style="margin-top: 20px;">
                <el-col :span="9" style="margin-top: 6px"><span>请选择工地</span></el-col>
                <el-col :span="15">
                    <el-select v-model="value" size="medium" placeholder="请选择" style="width: 200px">
                        <el-option v-for="item in option1s" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>

            <el-row class="row" style="margin-top: 10px">
                <el-col :span="9" style="margin-top: 6px"><span>请选择材料分类</span></el-col>
                <el-col :span="15">
                    <el-select class="col-xs-7 " v-model="value1" size="medium" placeholder="请选择" style="width: 200px" @change="selectOn">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>

            <el-row style="margin-top: 10px">
                <el-col :span="9" style="margin-top: 6px"><span>请选择材料名称</span></el-col>
                <el-col :span="15">
                    <el-select v-model="name2" size="medium" placeholder="请选择" style="width: 200px">
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>

            <el-row style="margin-top: 10px">
                <el-col :span="9" style="margin-top: 6px"><span>请选择流水报表</span></el-col>
                <el-col :span="15">
                    <el-select v-model="gao" size="medium" placeholder="请选择" style="width: 200px">
                        <el-option v-for="item in excel" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>

            <el-row style="margin-top: 10px">
                <el-col :span="9" style="margin-top: 6px"><span>请选择初始日期</span></el-col>
                <el-col :span="15">
                    <div class="block">
                        <el-date-picker size="medium" v-model="starttime" type="date" placeholder="选择日期时间"
                                        value-format="yyyy-MM-dd" style="width: 200px">
                        </el-date-picker>
                    </div>
                </el-col>
            </el-row>

            <el-row style="margin-top: 10px">
                <el-col :span="9" style="margin-top: 6px"><span>请选择结束日期</span></el-col>
                <el-col :span="15">
                    <div class="block">
                        <el-date-picker size="medium" v-model="endtime" type="date" placeholder="选择日期时间"
                                        value-format="yyyy-MM-dd" style="width: 200px">
                        </el-date-picker>
                    </div>
                </el-col>
            </el-row>

            <el-row style="margin-top: 20px;margin-bottom: 50px">
                <el-col :span="6" :offset="9">
                    <el-button plain size="medium" @click="search"> 搜索明细</el-button>
                </el-col>
            </el-row>

            <!--<el-dialog :visible.sync="dialogTableVisible" width="90%">-->
            <!--<el-table :data="gridData">-->
            <!--<el-table-column prop="applyTime" label="申请日期"></el-table-column>-->
            <!--<el-table-column prop="materialName" label="材料名称"></el-table-column>-->
            <!--<el-table-column prop="amount" label="数量"></el-table-column>-->
            <!--<el-table-column-->
            <!--fixed="right"-->
            <!--label="更多"-->
            <!--width="80">-->
            <!--<div slot-scope="scope">-->
            <!--<el-button @click="handleClick(scope.row)" type="text" size="small">点击查看更多</el-button>-->
            <!--<el-dialog-->
            <!--width="90%"-->
            <!--:visible.sync="innerVisible"-->
            <!--append-to-body>-->
            <!--<ul class="ul">-->
            <!--<li>工具类</li>-->
            <!--<li>价格</li>-->
            <!--<li>工地名称</li>-->
            <!--<li>人</li>-->
            <!--</ul>-->
            <!--<ul class="ul">-->
            <!--<li>{{gongju}}</li>-->
            <!--<li>{{jiage}}</li>-->
            <!--<li>{{ming}}</li>-->
            <!--<li>{{people}}</li>-->
            <!--</ul>-->
            <!--</el-dialog>-->
            <!--</div>-->

            <!--</el-table-column>-->

            <!--</el-table>-->

            <!--</el-dialog>-->

        </div>
    </div>
</template>

<script>
    import contaUrl from '../../public/js/contaUrl'

    export default {
        data() {
            return {
                drawer: null,
                dialogTableVisible: false,
                dialogFormVisible: false,
                dialogVisible: false,
                outerVisible: false,
                innerVisible: false,
                options: [],
                option1s: [],
                options2: [],
                name2: [],
                value: '',
                name: '',
                value1: '',
                starttime: '',
                endtime: '',
                gridData: [],
                role: '',
                gongju: "",
                jiage: "",
                ming: "",
                people: "",
                gao: '',
                excel: [
                    {
                        value: '1',
                        label: '到货记录流水报表'
                    },
                    {
                        value: '2',
                        label: '进货记录流水报表'
                    },
                    {
                        value: '3',
                        label: '提货记录流水报表'
                    },
                ]
            }
        },
        methods: {
            selectOn(){
                this.$axios.get(contaUrl.contaUrl + '/material/getList', {
                    params: {
                        typeId: this.value1
                    }
                }).then((response) => {
                    console.log(response.data.data.materialList)
                    if(response.data.code == 200){
                        this.options2 = new Array();
                        var options2 = response.data.data.materialList;
                        for(var i=0;i<options2.length;i++){
                            var obj = {};
                            obj.value = options2[i].id;
                            obj.label = options2[i].materialName;
                            this.options2.push(obj)

                        }
                    }
                }).catch((error) => {
                    console.log(error)
                })

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            handleClick(row) {
                this.innerVisible = true
            },
            search: function () {
                /*   this.dialogTableVisible = true;
                   this.$axios.get(contaUrl.contaUrl + '/record/stockList', {
                       params: {
                           siteId: this.value,
                           typeId: this.value1,
                           name: this.name,
                           start: this.starttime,
                           end: this.endtime,
                           token: sessionStorage.getItem('token')
                           //token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY0ODY0NjIsInVzZXJuYW1lIjoiYWRtaW4ifQ.xQzyd74DwDaM9epiQSEPphV8zWW230JalPVVs8Lsk5A"

                       }
                   }).then(function (response) {
                       if (response.data.code == 200) {
                           this.gridData = response.data.data.stockList;
                           console.log(this.gridData)
                       }
                   }).catch(function (error) {
                       console.log(error);
                   })*/


                var query = {
                    siteId: this.value,
                    typeId: this.value1,
                    materialId: this.name2,
                    excelId: this.gao,
                    startDate: this.starttime,
                    endDate: this.endtime
                };
                var path;
                if (this.gao == '1') {
                    path = "/excelOne";
                } else if (this.gao == '2') {
                    path = "/excelTwo";
                } else {
                    path = "/excelThree";
                }
                this.$router.push({
                    path: path,
                    query: query
                })

                //this.$axios.get(contaUrl.contaUrl+'')
            }
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

            this.$axios.get(contaUrl.contaUrl + '/system/getTypes', {
                params: {}
            }).then((response) => {
                if (response.data.code == 200) {
                    var options = response.data.data.types;
                    console.log(options)
                    for (var i = 0; i < options.length; ++i) {
                        var obj = {};
                        obj.value = options[i].id;
                        obj.label = options[i].typeName;
                        this.options.push(obj);
                    }
                }
            }).catch((error) => {
                console.log(error);
            })
            // console.log(this.value1)


            this.$axios.get(contaUrl.contaUrl + '/user/getUserSites', {
                params: {
                    token: sessionStorage.getItem('token')
                }
            }).then((response) => {
                if (response.data.code == 200) {
                    var option1s = response.data.data.siteList;
                    console.log(option1s)
                    for (var i = 0; i < option1s.length; ++i) {
                        var obj = {};
                        obj.value = option1s[i].id;
                        obj.label = option1s[i].siteName;
                        this.option1s.push(obj);
                    }
                }
            }).catch((error) => {
                console.log(error);
            })

            /*            this.$axios.get(contaUrl.contaUrl + '/material/getAll', {
                            params: {}
                        }).then((response) => {
                            if (response.data.code == 200) {
                                var options2 = response.data.data.materialList;
                                // console.log(options1)
                                for (var i = 0; i < options2.length; ++i) {
                                    var obj = {};
                                    obj.value = options2[i].id;
                                    obj.label = options2[i].materialName;
                                    // obj.value = options1[i].materialTypeName;
                                    this.options2.push(obj);
                                }
                            }
                        }).catch((error) => {
                            console.log(error);
                        })*/

            /*this.$axios.get(contaUrl.contaUrl + '/material/getList', {
                params: {
                    typeId: this.name2
                }
            }).then((response) => {
                console.log(response.data.data.materialList)
            }).catch((error) => {
                console.log(error)
            })
*/
        }
    }
</script>

<style scoped>
    .ul {
        display: inline-block;
        padding: 0;
        list-style: none;
        margin-left: 10px;
    }

    .ul:last-child {
        background-color: #f7f7f7;
        margin-left: 0;
    }

    .ul li {
        border: 1px solid #d7d7d7;
        width: 130px;
        height: 35px;
        text-align: center;
        line-height: 35px;
    }
</style>