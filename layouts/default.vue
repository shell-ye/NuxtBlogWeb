<template>
	<main>
		<Nav v-show="nav_foot_show"></Nav>	
		<Nuxt />
		<Footer v-show="nav_foot_show && foot_show"></Footer>
		<SideBar v-if="$route.path != '/login'"></SideBar>
		<!-- <canvas id="fireworks" style="zindex: 99999999999;position:fixed;left:0;top:0;pointer-events:none;"></canvas> -->
	</main>
</template>

<script>
import Nav from './../components/Nav'
import Footer from './../components/Footer'
import SideBar from './../components/SideBar'
import { subAccessLog } from '@/api/web'
export default {
	name: 'layout',
	data () {
		return {
			nav_foot_show: true,
			foot_show: true,
		}
	},
	mounted () {
		this.changeShow()
		this.checkMobile()
        require('@/assets/js/colorLine.js')

		// 访问日志
		subAccessLog()
	},
	components: {
		Nav, 
		Footer,
		SideBar
	},
	watch: {
		$route () {
			this.changeShow()
		}
	},
	methods: {
		changeShow () {
			if ( this.$route.path == '/login' || window.location.href.indexOf('/user') != -1 || this.$route.path == '/mobileLogin' || this.$route.path == '/mobileRegister' || this.$route.path == '/404' || window.location.href.indexOf('/notes/') != -1 ) {
				this.nav_foot_show = false
			} else {
				this.nav_foot_show = true
			}
			if ( window.location.href.indexOf('/mobile/user') != -1 ) {
				this.nav_foot_show = true
			}
			if ( this.$route.name == 'search' || window.location.href.indexOf('/mobile/user') != -1 || window.location.href.indexOf('/mobile/login') != -1 || window.location.href.indexOf('/mobile/register') != -1  ) {
				this.foot_show = false
			} else {
				this.foot_show = true
			}
		},
		checkMobile () {
			if ( (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) ) {
				this.$store.commit('webside/changeIsMobile', true)
			} else {
				this.$store.commit('webside/changeIsMobile', false)
			}
		}
	}
}
</script>

<style>

</style>
