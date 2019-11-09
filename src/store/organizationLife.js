import QRCode from 'qrcode';

export default {
    namespaced:true,
    
    state:{
        qrCodeUrl:'',
        orgDetail:{}
    },

    getters:{
        // qrCodeUrl: async (text) => {
        //     return await QRCode.toDataURL(text);
        // }
        generateQRCode:  (state) => async (payload) => {
            // conference name and position convert to QRCode image URL
            let qrCodeUrl = await QRCode.toDataURL(payload.name); 
            return qrCodeUrl
        },
        headerTitle:() =>{
            return '组织生活会管理'
        }
    },

    actions:{
       async generateQRCode (context,{payload})  {
            console.log('payload',payload)
            let text = payload.name;
            let qrCodeUrl = await QRCode.toDataURL(text);
            console.log(qrCodeUrl)
            context.commit({
                type:'factoryMutation',
                qrCodeUrl
            })
        },
        async deleteConf(context,{payload}){

        },
        async cancelConf(context,{payload}){

        },
        async closeConf(context,{payload}){

        }
    },

    mutations:{
        factoryMutation(state,payload){
            state = {...state,...payload};
        },
        qrCode(state,payload){
        }
    }
}