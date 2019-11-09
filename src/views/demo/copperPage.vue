<template>
    <div>
        <cropper @uploadList="uploadList" :initList="fileList" type="blob" :limit="3"></cropper>
    </div>
</template>

<script>
    import cropper from '../../components/cropper/cropper.vue';
    export default {
        name: "copperPage",
        data(){
            return {
                dialogVisible: false,
                fileList:[
                    // {md5Path: "8f007d7b17f8e7ef5c67cbcfa9a44cce@1207269"},
                    // {md5Path: "eaf9bbf13120b1674ffbb395911d6402@1151918"}
                ],
                options:{
                    url:'',
                }
            }
        },
        components:{
            cropper
        },
        methods:{
            uploadList(list){
                window.console.info(list);
            },
            beforeupload(obj){
                window.console.log(obj)
            },

        }
    }
</script>

<style scoped>

</style>