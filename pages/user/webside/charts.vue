<template>
    <section id="user-webside-charts">
        <UserCard>
            <i class="iconfont iconliulanqi" slot="icon" style="margin-left: 4px;"></i>
            <div slot="body" class="content">
                <div class="title">访客数据</div>
                <div id="user-visit" ref="userVisit"></div>
            </div>
        </UserCard>
    </section>
</template>

<script>
import { getAccessLog } from '@/api/web'
import { mapState } from 'vuex'
export default {
    name: 'UserWebsideCharts',
    async mounted () {
        await this.getUserVisitData()
    },
    computed: {
        ...mapState({
            'userData': state => state.webside.userData
        })
    },
    methods: {
        async getUserVisitData () {
            let result = await getAccessLog( this.userData.id )
            if ( result.data.code == 200 && result.data.data.length ) {
                let days = []
                let count = []
                result.data.data.forEach(item => {
                    days.push(item.ymd)
                    count.push(item.num)
                })
                let length = 30 - days.length
                if ( days.length < 30 ) {
                    for ( let i = 0; i < length; i++ ) {
                        days.unshift('2021-03-' + i)
                        count.unshift(0)
                    }
                }
                let options = {
                    tooltip: {
                        trigger: 'axis',
                    },
                    xAxis: {
                        type: 'category',
                        data: days
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        name: '访问量',
                        data: count,
                        type: 'line',
                        areaStyle: {
                            opacity: '.3'
                        },
                        smooth: true
                    }]
                }
                this.renderCharts( this.$refs.userVisit, options )
            }
        },
        renderCharts( el, options ) {
            let charts = this.$echarts.init( el )
            charts.setOption( options )
        }
    }
}
</script>

<style lang="scss" scoped>
section#user-webside-charts {
    padding-top: 60px!important;
    div#user-visit {
        height: 600px;
        position: relative;
    }
}
</style>