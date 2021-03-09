<template>
    <section id="user-message">
        <div class="select">
            <p :class="{select: selectMessage == 'web'}" @click="selectMessage = 'web'">网站留言</p>
            <p :class="{select: selectMessage == 'me-reply'}" @click="selectMessage = 'me-reply'">我回复的</p>
            <p :class="{select: selectMessage == 'reply-me'}" @click="selectMessage = 'reply-me'">回复我的</p>
            <span class="bg" :class="{
                'me-reply': selectMessage == 'me-reply',
                'reply-me': selectMessage == 'reply-me'
            }"></span>
        </div>
        <ul>
            <li :class="selectMessage">
                <div></div>
                <div>序号</div>
                <div>我的头衔</div>
                <div>内容</div>
                <div v-if="selectMessage == 'me-reply' || selectMessage == 'reply-me'" v-text="selectMessage == 'reply-me' ? '谁回复我' : '回复给谁'"></div>
                <div>留言时间</div>
                <div>操作</div>
            </li>
            <template v-if="messageList.rows && messageList.rows.length">
                <li v-for="(item, index) in messageList.rows" :key="item.id" :class="selectMessage">
                    <div><el-checkbox v-model="item.check" value="item"></el-checkbox></div>
                    <div style="text-indent: 10px;">{{ index }}</div>
                    <div v-if="selectMessage != 'reply-me'"><span class="identification_color" :class="item.identification_color">{{ item.identification }}</span></div>
                    <div v-if="selectMessage == 'reply-me'"><span class="identification_color" :class="item.to_identification_color">{{ item.to_identification }}</span></div>
                    <div>
                        <el-tooltip class="item" effect="dark" placement="bottom" popper-class="user-message-tips">
                            <div slot="content">{{ item.message }}</div>
                            <span class="message">{{ item.message }}</span>
                        </el-tooltip>
                    </div>
                    <div v-if="selectMessage == 'me-reply'">{{ item.to_username }}<span class="identification_color" :class="item.to_identification_color">{{ item.to_identification }}</span></div>
                    <div v-if="selectMessage == 'reply-me'">{{ item.username }}<span class="identification_color" :class="item.identification_color">{{ item.identification }}</span></div>
                    <div>{{ item.time }}</div>
                    <div>
                        <el-button v-if="selectMessage != 'reply-me'" type="primary" size="mini" @click="change(index)">修改</el-button>
                        <el-button type="primary" size="mini" @click="reply(index)">回复</el-button>
                        <el-button v-if="selectMessage != 'reply-me'" type="danger" size="mini" @click="del(index)">删除</el-button>
                    </div>
                </li>
            </template>
            <li v-if="!messageList.rows.length" class="no-data">
                <img src="@/assets/img/no-data.jpg" alt="">
            </li>
        </ul>

        <!-- 修改弹窗 -->
        <Dialog dialog-title="修改留言" :show="changeDialog" @cancel="changeDialog = false" @confirm="confirmChange">
            <el-input type="textarea" v-model="changeMessageText" style="margin: 20px 0px;" rows="4"></el-input>
        </Dialog>

        <!-- 删除弹窗 -->
        <Dialog dialog-title="提示" :show="deleteDialog" @cancel="deleteDialog = false" @confirm="confirmDelete">确定要删除这条留言吗?</Dialog>

        <!-- 回复弹窗 -->
        <Dialog dialog-title="回复留言" :show="replyDailog" @cancel="replyDailog = false" @confirm="confirmReply" type='no-button' width="900px">
            <ReplyMessage :replyMessage="replyMessage"></ReplyMessage>
        </Dialog>
    </section>
</template>

<script>
import { dateFormat } from '@/utils'
import { mapState } from 'vuex'
import { getMessageList } from '@/api/message'
import { userChangeMessage, userDeleteMessage } from '@/api/user'
import Dialog from '@/components/UI/Dialog'
import ReplyMessage from '@/components/Message/ReplyMessage'
export default {
    name: 'UserMessage',
    data () {
        return {
            selectMessage: 'web',
            messageList: {
                pageIndex: 1,
                pageSize: 10,
                rows: []
            },
            outIndex: 0,

            // 修改留言弹窗
            changeDialog: false,
            changeMessageText: '',

            // 删除留言弹窗
            deleteDialog: false,

            // 回复留言弹窗
            replyDailog: false,
            replyMessage: {}
        }
    },
    mounted () {
        this.getMessage()
    },
    computed: {
        ...mapState({
            'token': state => state.token
        })
    },
    watch: {
        selectMessage () {
            this.getMessage()
        }
    },
    components: {
        Dialog, ReplyMessage
    },
    methods: {
        async getMessage () {
            let type = this.selectMessage == 'web' ? 3 : this.selectMessage == 'me-reply' ? 4 : 5
            let result = await getMessageList( type, this.messageList.pageIndex, this.messageList.pageSize, this.token )
            if ( result.data.code == 200 ) {
                result.data.data.rows.forEach(item => {
                    item.time = dateFormat( Date.parse(item.time), 'yyyy-MM-dd hh:mm:ss' )
                })
                this.messageList = result.data.data
            }
        },
        change ( index ) {
            this.outIndex = index
            this.changeMessageText = this.messageList.rows[index].message
            this.changeDialog = true
        },
        async confirmChange () {
            let type = this.selectMessage == 'web' ? 1 : 2
            let result = await userChangeMessage( this.token, type, this.messageList.rows[this.outIndex].id, this.changeMessageText )
            if ( result.data.code == 200 ) {
                await this.getMessage()
                this.$message({type: 'success', message: '修改成功'})
                this.changeDialog = false
            }
        },
        del ( index ) {
            this.outIndex = index
            this.deleteDialog = true
        },
        async confirmDelete () {
            let type = this.selectMessage == 'web' ? 1 : 2
            let result = await userDeleteMessage( this.token, type, this.messageList.rows[this.outIndex].id )
            if ( result.data.code == 200 ) {
                await this.getMessage()
                this.$message({type: 'success', message: '删除成功'})
                this.deleteDialog = false
            }
        },
        reply ( index ) {
            this.outIndex = index
            this.replyMessage = this.messageList.rows[index]
            this.replyDailog = true
        },
        confirmReply () {

        }
    }
}
</script>

<style lang="scss" scoped>
#user-message {
    .select {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        p {
            color: black;
            width: 120px;
            height: 40px;
            color: black;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            z-index: 2;
            transition: .2s;
            cursor: pointer;
        }
        p.select {
            color: white;
        }
        span.bg {
            position: absolute;
            left: 0;
            top: 0;
            width: 120px;
            height: 40px;
            background: $elementBlue;
            z-index: 1;
            transition: .2s;
            border-radius: 4px;
        }
        span.bg.me-reply {
            left: 120px;
        }
        span.bg.reply-me {
            left: 240px;
        }
    }
    ul {
        list-style: none;
        width: 100%;
        background: white;
        margin-top: 40px;
        box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
        li {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 60px;
            box-sizing: border-box;
            padding: 0 20px;
            border-bottom: 1px solid #ebeef5;
            &:nth-child(even) {
                background: #fafafa;
            }
            div {
                height: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                span.message {
                    cursor: pointer;
                    text-overflow : ellipsis; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
                    white-space :nowrap; /*让文字不换行*/
                    overflow : hidden; /*超出要隐藏*/
                    display: inline-block;
                    line-height: 60px;
                }
                &:nth-child(1) {
                    width: 60px;
                }
                &:nth-child(2) {
                    width: 80px;
                }
                &:nth-child(3) {
                    width: 100px;
                    span {
                        color: white;
                        padding: 4px 6px;
                    }
                }
            }
        }
        li.web {
            div {
                &:nth-child(4) {
                    width: calc( 100% - 640px );
                }
                &:nth-child(5) {
                    width: 200px;
                }
                &:nth-child(6) {
                    width: 200px;
                }
            }
        }
        li.me-reply {
            div {
                &:nth-child(4) {
                    width: calc( 100% - 860px );
                }
                &:nth-child(5) {
                    width: 220px;
                    span {
                        color: white;
                        padding: 4px 6px;
                        margin-left: 2px;
                    }
                }
                &:nth-child(6) {
                    width: 200px;
                }
                &:nth-child(7) {
                    width: 200px;
                }
            }
        }
        li.reply-me {
            div {
                &:nth-child(4) {
                    width: calc( 100% - 720px );
                }
                &:nth-child(5) {
                    width: 220px;
                    span {
                        color: white;
                        padding: 4px 6px;
                        margin-left: 2px;
                    }
                }
                &:nth-child(6) {
                    width: 200px;
                }
                &:nth-child(7) {
                    width: 60px;
                }
            }
        }
        li.no-data {
            display: flex;
            justify-content: center;
            align-items: center;
            background: white;
            height: 500px;
            img {
                width: 320px;
                height: 214px;
            }
        }
    }
}

// 头衔颜色
span.identification_color.red {
    background: $MessageRed;
}
span.identification_color.yellow {
    background: $MessageYellow;
}
span.identification_color.pink {
    background: $MessagePink;
}
span.identification_color.blue {
    background: $elementBlue;
}
</style>

<style lang="scss">
.user-message-tips {
    max-width: 40%;
}
</style>