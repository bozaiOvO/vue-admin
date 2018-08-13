<template>
        
        <el-dialog
            class="qx-dialog-main"
            :title="'角色修改>> '+adminUser.username" 
			:visible="dialog2"
			:close-on-click-modal="false"
			:close-on-press-escape="false"
            width="600"
            @close="closeDialog"
            append-to-body>
            <el-transfer
                :loading = "loading"
                style="display: flex;justify-content:center;align-items:center"
                :titles="['所有角色','拥有角色']"
                v-model="value" 
                :data="data"></el-transfer>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="doSave">确 定</el-button>
            </div>
        </el-dialog>
</template>  

<script>
    import {userApi} from '@/api/sys'
    import {list2Arr} from '@/utils/index'
    export default {
        props:['data','adminUser','dialog2'],
        name: 'qxDialog',
        data () {
            return {
                value:[],
                loading: false
            }
        },
        methods:{
            closeDialog(){
                this.$emit('update:dialog2',false);
            },
            doSave(){
                userApi.saveUserRole({roleId:this.value,userId:this.adminUser.id})
                    .then(res=>{
                        if(res.data.code == 'success'){
                            this.$message.success('保存成功!');
                            this.$emit('get_user_list');
                        }else{
                            this.$message.error('保存失败!');
                        }
                        this.$emit('update:dialog2',false);
                    })
                
            },
            handleClose(){
                this.$message.success('guanbile')

            },
            getUserRole(){
                this.loading = true;
                userApi.getRoleByUser({userId:this.adminUser.id})
						.then(res=>{
							this.value = list2Arr(res.data.data,'roleId');
                            this.loading = false;
						})
            }
            
        },
        watch:{
                'dialog2'(nv,ov){
                    //显示 而且需要获取数据
                    if(nv||this.adminUser.id){
                        this.getUserRole()
                    }
                   
                }
            }

    }
</script>
<style scoped>
    
</style>