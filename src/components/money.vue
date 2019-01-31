<template>
    <div>
        <div style="margin-top: 100px;">
            <el-row>
                <el-col :span="18" :offset="3">
                    <img src="../../public/images/小云朵.png" alt="图片受损">
                </el-col>
            </el-row>
        </div>

        <el-row>

            <el-col :span="12" :offset="6">
                <p style="font-size: 15px;color: gray;margin-top: 50px">选择需要的图表明细&nbsp;&nbsp;&nbsp;&nbsp;</p>
            </el-col>

            <div style="width:200px;margin: auto" >
                <el-select v-model="value9" filterable placeholder="明细类型" style="width: 200px;">
                    <el-option v-for="item in option2s" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="width:200px;margin: auto" >
                <el-button type="primary" style="margin-top: 20px;width: 200px;" @click="find">查询</el-button>
            </div>


        </el-row>

    </div>
</template>

<script>
    import contaUrl from "../../public/js/contaUrl";

    export default {
        data() {
            return {
                drawer: null,
                // option1s: [],
                option2s: [
                    {
                        value: '1',
                        label: '工地材料使用占比'
                    },

                    {
                        value: '2',
                        label: '工地材料价格变化趋势图'
                    },
                    {
                        value: '3',
                        label: '不同工地材料使用量对比'
                    },

                    {
                        value: '4',
                        label: '不同工地材料价格对比'
                    },
                    

                ],
                value8: '',
                value9: ''
            }
        },
        // created: function () {
        //     this.$axios.get(contaUrl.contaUrl + '/system/siteList', {
        //         params: {}
        //     }).then((response) => {
        //         if (response.data.code == 200) {
        //             var option1s = response.data.data.siteList;
        //             console.log(option1s)
        //             for (var i = 0; i < option1s.length; i++) {
        //                 var obj = {};
        //                 obj.value = option1s[i].id;
        //                 obj.label = option1s[i].siteName;
        //                 this.option1s.push(obj);
        //             }
        //         }
        //     }).catch((error) => {
        //         console.log(error);
        //     })
        // },
        methods: {
            find:function () {
                if(this.value9 == '1'){
                    this.$router.push('EchartsOne')
                }else if(this.value9 == '2'){
                    this.$router.push('dataPrice')
                }else if (this.value9 == '3'){
                    this.$router.push('EchartsTwo')
                }else if(this.value9 == '4'){
                    this.$router.push('EchartsThree')
                }
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
        }
    }
</script>

<style>

    .filter-box select {
        display: none;
    }

    .filter-text input {
        font-size: 14px;
        outline: none;
    }

    .filter-list li.filter-null a {
        color: #d2d2d2;
    }

    .filter-list li a {
        display: block;
        padding: 0 10px;
        line-height: 36px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
    }

    .filter-list li:hover {
        background-color: #f2f2f2;
    }

    .filter-list li.filter-selected a {
        display: block;
        color: #fff;
    }

    .filter-list li.filter-disabled a {
        display: block;
        color: #d2d2d2;
    }

    .filter-list li.filter-disabled:hover a {
        cursor: not-allowed !important;
        background-color: #fff;
    }

    .list li {
        line-height: 24px;
        padding: 0 5px;
        font-size: 14px;
        text-indent: 10px;
        padding: 5px 0 5px 0;
    }

</style>