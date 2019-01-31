<template>
    <div>
       <div style="margin-top: 100px;">
           <el-row>
               <el-col :span="18" :offset="3">
                   <img src="../../public/images/小云朵.png" alt="图片受损">
               </el-col>
           </el-row>

           <div class="row" style="margin-top: 10px">
               <hr  style="height: 3px;background-color:#D1D1D1;border: none;margin:5px">
           </div>

           <div class="row" style="margin-top: 10px">
               <h4 style="text-align: center;">我的库存</h4>
           </div>

           <el-row style="margin-top: 10px" >
               <el-col :span="12" :offset="6"><el-select  v-model="value" size="medium" placeholder="请选择" style="width: 200px">
                   <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"  >
                   </el-option>
               </el-select></el-col>

           </el-row>

           <el-row style="margin-top: 10px" >
               <el-col :span="12" :offset="6"><el-button plain size="medium" @click="search" style="width: 200px">搜索</el-button></el-col>
           </el-row>

           <el-dialog :visible.sync="dialogTableVisible" width="90%">
               <el-row class="row" >
                   <el-col :offset="1" :span="22">
                       <h5>查询结果如下</h5>
                   </el-col>
               </el-row>

               <div class="row" style="margin-top: 10px">
                   <h4 style="text-align: center;"><span style="color: red" >{{name}}</span>库存明细</h4>
               </div>
               <el-table :data="tableData3" border style="width: 100%;margin-top: 10px;margin-bottom: 50px" height="260">
                   <el-table-column fixed prop="id" label="id" width="40"></el-table-column>

                   <el-table-column prop="materialTypeName" label="材料分类" width="80"></el-table-column>

                   <el-table-column prop="materialName" label="材料名称" width="80"></el-table-column>

                   <el-table-column prop="amount" label="进货数量" width="80"></el-table-column>

                   <el-table-column prop="materialStandard" label="归属工地" width="80"></el-table-column>

               </el-table>

           </el-dialog>
           <!--<el-row style="margin-top: 20px;margin-bottom: 50px">-->
           <!--<el-col :span="6" :offset="9" ><el-button plain size="medium">下载明细</el-button></el-col>-->
           <!--</el-row>-->


       </div>


    </div>
</template>

<script>
    import contaUrl from '../../public/js/contaUrl'

    export default {
        data(){
            return{
                dialogTableVisible: false,
                tableData3: [],
                options: [],
                value: '',
                name:'',
                role: '',
            }
        },
        methods:{
            to:function(){
                // window.location.href="detail.html"
                this.$router.replace('record')
            },
            search:function (){
                this.dialogTableVisible = true;
                this.$axios.get(contaUrl.contaUrl + '/record/myinventory', {
                    params: {
                        siteId:this.value,
                        token:sessionStorage.getItem('token')
                        //token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY0ODY0NjIsInVzZXJuYW1lIjoiYWRtaW4ifQ.xQzyd74DwDaM9epiQSEPphV8zWW230JalPVVs8Lsk5A"
                    }
                }).then((response)=>{
                    if (response.data.code == 200) {
                        this.tableData3=response.data.data.inventory;
                        for(var i=0;i<this.options.length;++i){
                            if(this.options[i].value==this.value){
                                this.name=this.options[i].label;
                                break;
                            }
                        }
                        console.log(this.inventory)
                    }
                }).catch((error)=>{
                    console.log(error);
                })
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

            this.$axios.get(contaUrl.contaUrl + '/user/getUserSites', {
                params: {
                    token:sessionStorage.getItem('token')
                }
            }).then((response)=>{
                if (response.data.code == 200) {
                    var options = response.data.data.siteList;
                    console.log(options)
                    for(var i=0;i<options.length;++i){
                        var obj={};
                        obj.value=options[i].id;
                        obj.label=options[i].siteName;
                        this.options.push(obj);
                    }
                }
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
</script>

<style>

</style>