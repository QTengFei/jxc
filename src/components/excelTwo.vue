<template>
    <div>

        <div class="stockFlow">
            <!--<el-button style="background: #009688;color: white;float: right" @click="ExportData"><i class="el-icon-download"></i>下载</el-button>-->
            <!--<div class="selectMenu">-->
            <!--<el-select style="margin-right: 20px;width: 200px" v-model="value"  placeholder="请选择所查询的工地">-->
            <!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
            <!--</el-select>-->
            <!--<el-date-picker v-model="starttime" style="margin-right: 20px" type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd">-->
            <!--</el-date-picker>-->
            <!--<el-date-picker v-model="endtime" style="margin-right: 20px" type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd">-->
            <!--</el-date-picker>-->
            <!--<el-button icon="el-icon-search" style="background: #009688;color: white;" @click="check">查询</el-button>-->
            <!--</div>-->
            <el-row>
                <el-col :span="6" :offset="9" style="margin-bottom: 20px">
                    <h5>进货记录报表</h5>
                </el-col>
            </el-row>
            <el-table
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    stripe
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                <el-table-column
                        prop="id"
                        label="编号"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="gmtCreate"
                        label="进货日期"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="materialName"
                        label="材料名称">
                </el-table-column>
                <el-table-column
                        prop="typeName"
                        label="材料类型">
                </el-table-column>
                <el-table-column
                        prop="planAmount"
                        label="数量">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="价格">
                </el-table-column>
                <el-table-column
                        prop="provider"
                        label="供货方">
                </el-table-column>
                <el-table-column
                        prop="applyPeopleName"
                        label="进货人">
                </el-table-column>
                <el-table-column
                        prop="comment"
                        label="注释">
                </el-table-column>
            </el-table>
            <div class="block depage">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="tableData.length"
                        v-on:current-change="current_change">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import contaUrl from "../../public/js/contaUrl";

    export default {
        beforeRouteEnter (to, from, next) {
            next(vm=>{
                // 在渲染该组件的对应路由被 confirm 前调用
                // 不！能！获取组件实例 `this`
                // 因为当守卫执行前，组件实例还没被创建
                var query=to.query;
                vm.siteId=query.siteId;
                vm.typeId=query.typeId;
                vm.materialId=query.materialId;
                vm.excelId=query.excelId;
                vm.startTime=query.startDate;
                vm.endTime=query.endDate;
                console.log(vm.siteId);
                console.log(vm.typeId);
                console.log(vm.materialId);
                console.log(vm.excelId);
                console.log(vm.startTime);
                console.log(vm.endTime);


                vm.$axios.get(contaUrl.contaUrl + '/report/stock',{
                    params:{
                        siteId:vm.siteId,
                        start:vm.startTime,
                        end:vm.endTime,
                        typeId:vm.typeId,
                        material_id:vm.materialId,
                        token: sessionStorage.getItem('token')
                    }
                }).then((response)=>{
                    console.log(response.data.data)
                    vm.tableData=response.data.data.stockList
                }).catch((error)=>{

                });
            })

        },
        created: function () {

        },
        mounted(){
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
        methods: {
            current_change:function(currentPage){
                this.currentPage = currentPage;
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            }
        },
        data() {
            return {
                currentIndex: '',
                pagesize:15,
                currentPage:1,
                tableData: [],
                options:[],
                option1s:[],
                value:'',
                value1:'',
                starttime:'',
                endtime:'',
                siteId:'',
                typeId:'',
                materialId:'',
                excelId:'',
                startTime:'',
                endTime:'',
        }
        }
    }
</script>

<style>
    .stockFlow{
        width: 90%;
        margin: 0 auto;
        margin-top: 40px;
    }

    .depage{
        float: right;
        margin-top:20px;
    }
</style>
