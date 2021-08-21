<template>
	<article id="author">
        <HeadBackground type="author" text="夏叶"></HeadBackground>
        <section class="white-card">
            <div class="header">
                <img src="@/assets/img/xiaye.jpg" alt="">
                <div>
                    <p class="text">夏叶 - 前端工程师</p>
                    <p>
                        <el-tooltip class="item" effect="dark" content="QQ: 1216814604" placement="bottom">
                            <a target="_black" href="http://wpa.qq.com/msgrd?v=3&uin=1216814604&site=qq&menu=yes" class="small"><img src="@/assets/img/qq.png"></a>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" placement="bottom" content="">
                            <div slot="content"><img src="@/assets/img/weixin_code.png" style="width: 72px;height: 72px;"></div>
                            <a href="###" class="small"><img src="@/assets/img/weixin.png"></a>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="bilibili 小破站" placement="bottom">
                            <a target="_black" href="https://space.bilibili.com/179603646"><img src="@/assets/img/bilibili.png"></a>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="邮我" placement="bottom">
                            <a target="_black" href="mailto:15070035244@163.com" class="small"><img src="@/assets/img/mail.png"></a>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="GitHub" placement="bottom">
                            <a target="_blank" href="https://github.com/shell-ye" class="small"><img src="@/assets/img/github.png"></a>
                        </el-tooltip>
                    </p>
                </div>
            </div>
            <div class="section">
                <p class="title">简介</p>
                <div class="introduce">
                    一个00后前端工程师，目前任职于南昌一家小公司的前端。喜欢唱、跳、rap、篮球和恰火锅，以及一起玩流行梗。起床困难户，10点上班给了我一个能赖床的充分理由，能九点半起床绝不八点半起床。玩最右，最右简直是沙雕们的天堂，各种神评
                    各种脑洞大开，最右的小哥哥们的脑子里都装了些什么
                </div>
            </div>
            <div class="section">
                <p class="title">基本技能</p>
                <div class="long">
                    <div v-for="(item, index) in skills.long" :key="index">
                        <p>{{ item.name }}:</p>
                        <el-progress :text-inside="true" :stroke-width="20" :percentage="item.percentage" :color="item.color"></el-progress>
                    </div>
                </div>
                <div class="circle">
                    <div v-for="(item, index) in skills.circle" :key="index">
                        <el-progress type="dashboard" :percentage="item.percentage" :stroke-width="10" :color="item.color"></el-progress>
                        <p>{{ item.name }}</p>
                    </div>
                </div>
            </div>
            <div class="section">
                <p class="title">我的项目</p>
                <div class="program">
                    <a v-for="item in programList" :key="item.name" target="_blank", :href="item.href">
                        <UIImage :src="item.img" :class="item.className" :loading="false"></UIImage>
                        <span>{{ item.name }}</span>
                    </a>
                </div>
            </div>
        </section>
    </article>
</template>

<script>
import HeadBackground from '@/components/article/HeadBackground'
import UIImage from '@/components/UI/Image'
import BlogImage from '@/assets/img/color_logo.png'
import ApeyunImage from '@/assets/img/apeyun.png'
import CocoImage from '@/assets/img/coco.png'
import HufengyunImage from '@/assets/img/hufengyun.png'
import MaoyanImage from '@/assets/img/maoyan.jpg'
export default {
    name: 'Author',
    head () {
		return {
			title: '夏叶的技术博客-关于夏叶',
			meta: [
				{ hid: 'description-author', name: 'description', content: '夏叶，夏叶博客，夏叶的技术博客，作者，关于作者，关于我' }
			]
		}
	},
    data () {
        return {
            skills: {
                long: [
                    {name: 'HTML5', percentage: 90, color: '#E14C24'},
                    {name: 'CSS3', percentage: 90, color: '#016FBA'},
                    {name: 'Javascript', percentage: 80, color: '#F78132'},
                    {name: 'Bootstrap', percentage: 70, color: '#4E3773'},
                    {name: 'jQuery', percentage: 70, color: '#78CFF5'},
                    {name: 'MySQL', percentage: 40, color: '#044970'}
                ],
                circle: [
                    {name: 'Vue', percentage: 80, color: '#42b983'},
                    {name: 'React', percentage: 70, color: '#20232a'},
                    {name: 'Webpack', percentage: 50, color: '#55A7DD'},
                    {name: 'Node', percentage: 60, color: '#6DA55F'}
                ]
            },

            // 项目
            programList: [{
                href: '/',
                name: '博客',
                img: BlogImage,
                className: 'blog'
            }, {
                href: 'https://ape.vip/T-mSbvuu',
                name: '猿人云',
                img: ApeyunImage,
                className: 'apeyun'
            }, {
                href: 'https://www.hufengyun.com',
                name: '呼风云',
                img: HufengyunImage,
                className: "hufengyun"
            }, {
                href: 'http://coco.xiaye.top',
                name: '后台管理系统',
                img: CocoImage,
                className: "coco"
            }, {
                href: 'http://maoyan.xiaye.top',
                name: '猫眼',
                img: MaoyanImage,
                className: "maoyan"
            }]
        }
    },
    components: {
        HeadBackground, UIImage
    }
}
</script>

<style lang="scss" scoped>
#author {
    font-size: 16px;
    margin-bottom: 40px;
    section {
        width: 1200px;
        padding: 0px 40px;
        margin: -40px auto 0px auto;
        div.header {
            width: 100%;
            display: flex;
            margin-top: -60px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            > img {
                height: 120px;
                width: 120px;
                border-radius: 60px;
            }
            p.text {
                font-size: 24px;
                text-align: center;
                margin: 40px auto 10px auto;
                padding-bottom: 20px;
                border-bottom: 1px solid #000;
            }
            p {
                a {
                    margin: 0 10px;
                    img {
                        width: 36px;
                        height: 36px;
                    }
                }
                a.small img {
                    width: 28px;
                    height: 28px;
                }
            }
        }
        div.section {
            width: 80%;
            margin-bottom: 40px;
            p.title {
                margin-bottom: 60px!important;
            }
            div.introduce {
                text-indent: 2rem;
                line-height: 24px;
            }
            div.long {
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                > div {
                    width: 40%;
                    margin: 20px 0;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    p {
                        width: 90px;
                    }
                    > div {
                        width: 70%;
                    }
                }
            }
            div.circle {
                margin-top: 60px;
                display: flex;
                justify-content: space-around;
                text-align: center;
                font-size: 24px;
            }
            div.program {
                display: flex;
                justify-content: center;
                a {
                    margin: 0 30px;
                    color: #000;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .el-image {
                        margin-bottom: 10px;
                        background: white!important;
                    }
                    .blog {
                        width: 84px; 
                        height: 84px;
                    }
                    .apeyun {
                        width: 56px; 
                        height: aoto;
                        margin-bottom: 12px;
                    }
                    .coco {
                        height: 72px;
                        margin-top: 4px;
                        margin-bottom: 18px;
                    }
                    .hufengyun {
                        margin-bottom: 14px;
                    }
                    .maoyan {
                        width: 108px;
                        margin-bottom: 14px;
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 1024px) {
    #author {
        section {
            width: 90%;
            padding: 0;
            div.section {
                div.long, div.circle {
                    flex-wrap: wrap;
                    > div {
                        width: 100%;
                    }
                }
                div.circle {
                    > div {
                        margin-bottom: 20px;
                    }
                }
                div.program {
                    text-align: center;
                }
            }
        }
    }
}
</style>