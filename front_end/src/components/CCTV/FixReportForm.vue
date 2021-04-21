<template>
    <body>
        <table>
            <thead>
                <strong> 고장 리포트 </strong>
                <button @click="test()"> 코멘트 설정 </button>
            </thead>
                <tbody>
                    <tr>
                        <td><strong> 번호 </strong></td>
                        <td><strong> 보고자 </strong></td>
                        <td><strong> 보고일자 </strong></td>
                        <td><strong> 장치 이름 </strong></td>
                        <td><strong> 주소(시/군/구) </strong></td>
                        <td><strong> 보고 사유 </strong></td>
                        <td><strong> 관리자 코멘트 </strong></td>
                        <td><strong> 수리 현황 </strong></td>
                    </tr>
                </tbody>
            <tfoot>
                <tr v-for="(Repared_Data, i) in Repared_Datas" :key="i">
                    <td><span> {{ i+1 }} </span></td>
                    <td><span> {{ Repared_Data.id_string }} </span></td>
                    <td><span> {{ Repared_Data.created_at }} </span></td>
                    <td><span> {{ Repared_Data.name }} </span></td>
                    <td><span> {{ Repared_Data.address }} </span></td>
                    <td><span> {{ Repared_Data.status }} </span></td>
                    <td><span> {{ Repared_Data.comment }} </span></td>
                    <!-- <td><span> {{ Repared_Data.deleted_at }} </span></td> -->
                    <td><button :value="Repared_Data.id" @click="del_Repared_Data(Repared_Data.id)"> 새로고침 </button></td>
                </tr>
            </tfoot>
        </table>
    </body>
</template>

<script>
export default {
    mounted() {
        this.getData();
        // this.dataFilter();
    },
    data() {
        return {
            Repared_Logs:[],
            CCTV_Infos: [],
            Camera_Infos:[],
            User_Infos: [],
            Repared_Datas: [],
        }
    },
    methods: {
        getData () {
            this.$http.get('http://localhost:3000/repared_logs')
            .then((res) => {
                this.Repared_Logs = res.data
            })

            this.$http.get('http://localhost:3000/cctv_infos1')
            .then((res) => {
                this.CCTV_Infos = res.data
            })

            this.$http.get('http://localhost:3000/camera_infos')
            .then((res) => {
                this.Camera_Infos = res.data
            })

            this.$http.get('http://localhost:3001/user_infos')
            .then((res) => {
                this.User_Infos = res.data
            })
        },
        test() {
            this.getData();

            for(var i = 0; i < this.Repared_Logs.length; i++) {
                for(var j = 0; j < this.User_Infos.length; j++) {
                    if(this.Repared_Logs[i].user_info_id == this.User_Infos[j].id) {
                        this.Repared_Datas.push({
                            id : this.Repared_Logs[i].id,
                            created_at : this.Repared_Logs[i].created_at,
                            updated_at : this.Repared_Logs[i].updated_at,
                            deleted_at : '0000-00-00',
                            status : this.Repared_Logs[i].status,
                            id_string : this.User_Infos[j].id_string,
                            user_info_id : this.User_Infos[j].id
                        })
                    }
                }
            }

            for(var k = 0; k < this.Repared_Logs.length; k++) {
                for(var l = 0; l < this.CCTV_Infos.length; l++) {
                    for(var m = 0; m < this.Camera_Infos.length; m++) {
                        if(this.Repared_Logs[k].cctv_info_id == this.CCTV_Infos[l].id && this.CCTV_Infos[l].name == this.Camera_Infos[m].name) {
                            this.Repared_Datas.push({
                                name : this.CCTV_Infos[l].name,
                                address : this.Camera_Infos[m].address,
                                comment : this.Camera_Infos[m].comment,
                                cctv_info_id : this.Camera_Infos[m].id
                            })
                        }
                    }
                }
            }

            // Array.from(new Set(this.Repared_Datas));
        },
        del_Repared_Data(id) {

        }
        // getTime() {
        //     var moment = require('moment');
        //     var now = moment();
        //     this.update_Date = now.format('HH:mm:ss');
        // },
        // updateData() {
        //     if(this.loadData == false) {
        //         this.dataFilter();
        //         this.loadData = true;
        //     }
        //     else if(this.loadData == true) {
        //         this.reloadData();
        //     }
        // },

        // dataFilter() {
        //     for(let i = 0; i < this.CCTV_Infos.length; i++) {
        //         for(let j = 0; j < this.Camera_Infos.length; j++) {
        //             if(this.CCTV_Infos[i].name == this.Camera_Infos[j].name) {
        //                 this.Health_Infos.push({
        //                     id : this.CCTV_Infos[i].id,
        //                     name : this.CCTV_Infos[i].name,
        //                     health_check : this.Camera_Infos[j].health_check,
        //                     comment : this.Camera_Infos[j].comment,
        //                     user_comment : ''
        //                 })
        //             }
        //         }
        //     }

        //     for(let i = 0; i < this.Health_Infos.length; i++) {
        //         if(this.Health_Infos[i].health_check == "true") {
        //             this.health_true += 1;
        //         }
        //         else {
        //             this.health_false += 1;
        //         }
        //     }

        //     Array.from(new Set(this.CCTV_Infos));
        //     Array.from(new Set(this.Camera_Infos));
        //     Array.from(new Set(this.Health_Infos));
        // },
        // reloadData() {
        //     this.allCount = 0;
        //     this.health_true = 0;
        //     this.health_false = 0;

        //     for(let i = 0; i < this.Health_Infos.length; i++) {
        //         if(this.Health_Infos[i].health_check == "true") {
        //             this.health_true += 1;
        //         }
        //         else {
        //             this.health_false += 1;
        //         }
        //     }
            
        // }
    }
}
</script>


<style scoped>
.tBody {
    border: 3px solid black;
}

td {
    border: 1px solid #bcbcbc;
}


</style>