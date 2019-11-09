<template>
        <calendar :events="events"></calendar>
</template>

<script>
    import calendar from '../../components/calendar/calendar.vue';


    export default {
        name: "Calendar",

        components:{
            calendar,
        },
         data(){
                return {
                        events: [
                                {id:'123',title: '赵子龙', start: '2019-08-01T12:30', end: '2019-08-01T13:30',},
                                {title: '刘备', start: '2019-08-02T10:20', end: '2019-08-02T11:00', color: 'red'},
                                {title: '关羽', start: '2019-08-03T14:20', end: '2019-08-03T15:20', backgroundColor: 'green',},
                                {title: '张飞', start: '2019-08-04T16:00', end: '2019-08-04T18:00', color: 'orange', editable: true},
                                {title: '曹操', start: '2019-08-05T18:40', end: '2019-08-05T19:20',}
                        ],
                }
            }

    }
</script>

<style scoped>

</style>