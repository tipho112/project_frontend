<template>
    <body>
        <table>
            <thead>
                <strong> 카메라 상태 확인 </strong>
                <button @click="updateData(), getTime()"> 데이터 갱신 </button>
                <span> <strong>전체 :</strong> {{ Health_Infos.length }}   </span>
                <span> <strong>정상 :</strong> {{ health_true }}   </span>
                <span> <strong>비정상 :</strong> {{ health_false }}   </span>
                <span> <strong>최종 업데이트 :</strong> {{ update_Date }}   </span>
            </thead>
                <tbody>
                    <tr>
                        <td><strong> ID </strong></td>
                        <td><strong> 카메라명 </strong></td>
                        <td><strong> Health Check </strong></td>
                        <td><strong> Health Comment </strong></td>
                        <td><strong> User Comment </strong></td>
                        <td><strong> Action </strong></td>
                    </tr>
                </tbody>
            <tfoot >
                <tr v-for="(Health_Info, i) in Health_Infos" :key="i" class="list-unstyled" >
                    <td><span> {{ Health_Info.id }} </span></td>
                    <td><span> {{ Health_Info.name }} </span></td>
                    <td><span> {{ Health_Info.health_check }} </span></td>
                    <td><span> {{ Health_Info.comment }} </span></td>
                    <td><span> {{ Health_Info.user_comment }} </span></td>
                    <td><button :value="Health_Info.id" @click="reloadData(), getTime()"> 새로고침 </button></td>
                </tr>
            </tfoot>
        </table>
    </body>
</template>

<script>
export default {
    mounted() {
        this.getData();
        this.dataFilter();
    },
    data() {
        return {
            CCTV_Infos:[],
            Camera_Infos:[],
            Health_Infos: [],

            allCount : 0,
            health_true: 0,
            health_false: 0,
            
            update_Date: '00:00:00',

            loadData: false,
        }
    },
    methods: {
        getTime() {
            var moment = require('moment');
            var now = moment();
            this.update_Date = now.format('HH:mm:ss');
        },
        updateData() {
            if(this.loadData == false) {
                this.dataFilter();
                this.loadData = true;
            }
            else if(this.loadData == true) {
                this.reloadData();
            }
        },
        getData () {
            this.$http.get('http://localhost:3000/cctv_infos1')
            .then((res) => {
                this.CCTV_Infos = res.data
            })

            this.$http.get('http://localhost:3000/camera_infos')
            .then((res) => {
                this.Camera_Infos = res.data
            })
        },
        dataFilter() {
            for(let i = 0; i < this.CCTV_Infos.length; i++) {
                for(let j = 0; j < this.Camera_Infos.length; j++) {
                    if(this.CCTV_Infos[i].name == this.Camera_Infos[j].name) {
                        this.Health_Infos.push({
                            id : this.CCTV_Infos[i].id,
                            name : this.CCTV_Infos[i].name,
                            health_check : this.Camera_Infos[j].health_check,
                            comment : this.Camera_Infos[j].comment,
                            user_comment : ''
                        })
                    }
                }
            }

            for(let i = 0; i < this.Health_Infos.length; i++) {
                if(this.Health_Infos[i].health_check == "true") {
                    this.health_true += 1;
                }
                else {
                    this.health_false += 1;
                }
            }

            Array.from(new Set(this.CCTV_Infos));
            Array.from(new Set(this.Camera_Infos));
            Array.from(new Set(this.Health_Infos));
        },
        reloadData() {
            this.allCount = 0;
            this.health_true = 0;
            this.health_false = 0;

            for(let i = 0; i < this.Health_Infos.length; i++) {
                if(this.Health_Infos[i].health_check == "true") {
                    this.health_true += 1;
                }
                else {
                    this.health_false += 1;
                }
            }
            
        }
    },
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