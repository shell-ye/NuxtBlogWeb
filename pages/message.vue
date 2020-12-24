<template>
    <article id="message">
        <HeadBackground type="message" text="留言板"></HeadBackground>
        <section class="white-card container tips">
            <div>留言区请随意，在这里你可以提问，可以玩梗，可以唱跳rap篮球，但是不能过界哦~</div>
        </section>
        <section class="white-card container content">
            <!-- 基础留言 -->
            <div class="base" v-for="item in messageList.rows" :key="item.id">
                <div class="info">
                    <img :src="item.head_img" alt="">
                    <div class="text">
                        <p><span>{{ item.username }}</span><span :class="item.identification_color">{{ item.identification }}</span></p>
                        <p>{{ item.time }}</p>
                    </div>
                    <p @click="base = item">回复</p>
                </div>
                <div class="message">{{ item.message }}</div>
                <!-- 回复留言 -->
                <div v-if="item.child.length" class="replys">
                    <div class="content" v-for="reply in item.child" :key="reply.id">
                        <div class="info">
                            <img :src="reply.head_img" alt="">
                            <div class="text">
                                <p><span>{{ reply.username }}</span><span :class="reply.identification_color">{{ reply.identification }}</span></p>
                                <p>{{ reply.time }}</p>
                            </div>
                            <div @click="replyto(reply)">回复</div>
                        </div>
                        <div>
                            <span>@{{ reply.to_username }}</span>
                            <span>{{ reply.message }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 加载更多 -->
            <el-pagination background layout="prev, pager, next" :total="messageList.total" v-if="messageList.pageCount != 1" :page-size="4" @change="getMessageListHandler" @prev-click="messageList.pageIndex--" @next-click="messageList.pageIndex++" @current-change="getMessageListHandler"></el-pagination>
        </section>
        <section class="white-card container submit">
            <div class="head">发表留言</div>
            <div class="reply" v-show="JSON.stringify(base) != '{}'">
                <div>
                    <span>回复 <img :src="base.head_img" alt=""> {{ base.username }}<em :class="base.identification_color">{{ base.identification }}</em> {{ base.time }} 的 留言</span>
                    <span @click="base = {}" title="取消"><i class="el-icon-close"></i></span>
                </div>
                <div>{{ base.message }}</div>
            </div>
            <div class="form">
                <div class="user">
                    <DownLineInput v-model="user.name" placeholder="昵称（必填）"></DownLineInput>
                    <DownLineInput v-model="user.identification" placeholder="身份(不填写默认游客哦)"></DownLineInput>
                    <ColorSelect @select="selectColor" placeholder="请选择身份颜色"></ColorSelect>
                </div>
                <div class="text">
                    <textarea name="" id="" cols="30" rows="10" v-model="user.message" placeholder="哎，空荡荡的"></textarea>
                </div>
                <div class="btn-list">
                    <el-button type="primary" size="small" @click="submit">提交</el-button>
                    <el-button type="danger" size="small" @click="user.message = ''">清空</el-button>
                </div>
            </div>
        </section>
    </article>
</template>

<script>
import { mapState } from 'vuex'
import { dateFormat } from '@/utils'
import { submitMessage, getMessageList } from '@/api/message'
import DownLineInput from '@/components/Form/DownLineInput'
import ColorSelect from '@/components/Form/ColorSelect'
export default {
    name: 'Message',
    data () {
        return {
            messageList: {
                pageIndex: 1, // 当前页
                pageCount: 1, // 总页数
                pageSize: 4, // 单页多少条
                total: 4, // 总条目数
                rows: []
            },
            // 基础留言（网站留言）
            user: {
                name: '',
                identification: '游客',
                message: ''
            },
            identification_color: 'blue',

            // 回复基础留言（回复网站留言）
            base: {},
        }
    },
    mounted () {
        this.getMessageListHandler()
        if ( this.userData.id ) {
            this.user.name = this.userData.name
            if ( this.userData.admin == 1 ) {
                this.user.identification = '博主'
            }
        }
    },
    components: {
        DownLineInput
    },
    computed: {
        ...mapState({
            'userData': state => state.webside.userData
        })
    },
    methods: {
        selectColor ( color ) {
            this.identification_color = color
        },
        async submit () {
            if ( !this.user.name || !this.user.message ) {
                this.$message({type: 'error', message: '请输入完整的信息'})
            } else {
                this.user.message = this.user.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')
                let data = this.userData.id ? {
                    user_id: this.userData.id,
                    username: this.user.name,
                    identification: this.user.identification || '游客',
                    identification_color: this.userData.admin == 1 ? 'yellow' : this.identification_color,
                    message: this.user.message
                } : {
                    user_id: 'none',
                    username: this.user.name,
                    identification: this.user.identification || '游客',
                    identification_color: this.identification_color,
                    message: this.user.message
                }
                let result = JSON.stringify(this.base) == '{}'
                ? await submitMessage( 1, data.user_id, data.username, data.identification, data.identification_color, data.message )
                : await submitMessage( 2, data.user_id, data.username, data.identification, data.identification_color, data.message, this.base.id, this.base.user_id, this.base.username, this.base.head_img.split('/')[this.base.head_img.split('/').length - 1], this.base.identification, this.base.identification_color )
                if ( result.data.code == 200 ) {
                    this.$message({type: 'success', message: '感谢你的留言'})
                    this.getMessageListHamdler()
                    this.user.message = ''
                }
            }
        },
        async getMessageListHandler () {
            let result = await getMessageList(2, this.messageList.pageIndex)
            if ( result.data.code == 200 ) {
                result.data.data.rows.forEach(item => {
                    item.head_img = process.env.AXIOS_URL + '/images/userHeadImg/' + item.head_img
                    item.time =  dateFormat( new Date(item.time), 'yyyy-MM-dd' )
                    item.message = item.message.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                    if ( item.child.length ) {
                        item.child.forEach(items => {
                            items.head_img = process.env.AXIOS_URL + '/images/userHeadImg/' + items.head_img
                            items.to_head_img = process.env.AXIOS_URL + '/images/userHeadImg/' + items.to_head_img
                            items.time =  dateFormat( new Date(item.time), 'yyyy-MM-dd' )
                            items.message = items.message.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                        })
                    }
                })
                this.messageList = result.data.data
            }
        },
        // 回复留言中的回复
        replyto ( info ) {
            this.base = info
            this.base.id = info.base_id
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/theme.scss';

#message {
    section {
        margin: 40px auto;
        .base {
            width: 100%;
            margin-top: 20px;
            margin-bottom: 20px;
            border-bottom: 1px dashed $elementBlueOpacity;
            padding-bottom: 20px;
            &:last-child {
                border: none;
            }
            .info {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 60px;
                position: relative;
                box-sizing: border-box;
                padding: 0px 20px;
                img {
                    width: 50px;
                    height: 50px;
                    border: 1px solid #f5f5f5;
                    border-radius: 50%;
                }
                .text {
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
                    height: 70%;
                    font-size: 16px;
                    margin-left: 10px;
                    p {
                        &:first-child {
                            color: $elementBlue;
                        }
                        &:last-child {
                            color: #b3b3b3;
                        }
                        span {
                            &:last-child {
                                color: white;
                                padding: 2px 4px;
                                font-size: 14px;
                                margin-left: 10px;
                                line-height: 1.75;
                            }
                        }
                        span.red {
                            background: $MessageRed;
                        }
                        span.pink {
                            background: $MessagePink;
                        }
                        span.blue {
                            background: $elementBlue;
                        }
                        span.yellow {
                            background: #ffa51e;
                        }
                    }
                }
                > p {
                    cursor: pointer;
                    position: absolute;
                    top: 10px;
                    right: 20px;
                }
            }
            .message {
                margin-left: 80px;
                margin-top: 10px;
                width: 1000px;
                line-height: 1.5;
                word-break: break-all;
            }
            .replys {
                width: 90%;
                margin: 20px auto 0 auto;
                padding: 20px 0;
                .content {
                    margin-bottom: 20px;
                    img {
                        width: 32px;
                        height: 32px;
                    }
                    > div {
                        &:last-child {
                            padding-left: 60px;
                            margin-top: 10px;
                            word-break: break-all;
                            line-height: 2;
                            span {
                                &:first-child {
                                    color: $elementBlue;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                    .info {
                        div {
                            &:last-child {
                                cursor: pointer;
                                position: absolute;
                                top: 10px;
                                right: 20px;
                            }
                        }
                    }
                }
            }
        }
    }
    section.submit {
        .reply {
            text-align: left;
            width: 100%;
            margin: 10px 0 20px 0;
            background: $elementBlueOpacity;
            border: 1px dashed $elementBlue;
            border-radius: 8px;
            box-sizing: border-box;
            padding: 10px;
            color: white;
            div {
                position: relative;
                em {
                    color: white;
                    padding: 2px 4px;
                    font-size: 14px;
                    margin-left: 10px;
                    line-height: 1.75;
                }
                em.red {
                    background: $MessageRed;
                }
                em.pink {
                    background: $MessagePink;
                }
                em.blue {
                    background: $elementBlue;
                }
                em.yellow {
                    background: #ffa51e;
                }
                span {
                    &:last-child {
                        background: red;
                        color: white;
                        text-align: center;
                        padding: 0 2px;
                        border-radius: 50%;
                        display: inline-block;
                        padding: 0px 4px 3px 3px;
                        cursor: pointer;
                        position: absolute;
                        right: 10px;
                        top: 10px;
                        i {
                            margin-right: 0;
                            font-size: 12px;
                            transform: translateX(1px);
                        }
                    }
                }
                &:last-child {
                    word-break: break-all;
                    text-indent: 2rem;
                    margin-top: 10px;
                }
                img {
                    width: 32px;
                    height: 32px;
                }
            }
        }
    }
    .form {
        border: 1px solid #f0f0f0;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 20px;
        width: 100%;
        .user {
            display: flex;
            justify-content: space-between;
            div {
                width: 39%;
            }
        }
        .text {
            padding-top: 20px;
            textarea {
                padding-left: 10px;
                width: 100%;
                background: white;
                resize: none;
            }
        }
        .btn-list {
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>

<style lang="scss">
#message {
    section {
        .form {
            .user {
                div {
                    input {
                        padding: 12px 12px;
                        font-size: 12px;
                    }
                    span.line {
                        height: 1px!important;
                    }
                }
                div.color-select{
                    width: 20%;
                }
            }
        }
        .el-pagination.is-background {
            display: flex;
        }
    }
}
</style>