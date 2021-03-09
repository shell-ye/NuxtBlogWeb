<template>
    <div class="submit-message">
        <div class="reply" v-if="type == 'reply'">
            <div>
                <span>回复 <img :src="replyMessage.head_img" alt=""> {{ replyMessage.username }}<em :class="replyMessage.identification_color">{{ replyMessage.identification }}</em> {{ replyMessage.time }} 的 留言</span>
                <span @click="replyMessage = {}" title="取消"><i class="el-icon-close"></i></span>
            </div>
            <div>{{ replyMessage.message }}</div>
        </div>
        <div class="form">
            <div class="user">
                <DownLineInput v-model="user.name" placeholder="昵称（必填）"></DownLineInput>
                <DownLineInput v-model="user.identification" placeholder="头衔(不填写默认游客哦)"></DownLineInput>
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
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { submitMessage, getMessageList } from '@/api/message'
import DownLineInput from '@/components/Form/DownLineInput'
import ColorSelect from '@/components/Form/ColorSelect'
export default {
    name: 'SubmitMessage',
    props: {
        type: {
            type: String,
            default: 'submit'
        },
        replyMessage: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            // 基础留言（网站留言）
            user: {
                name: '',
                identification: '游客',
                message: ''
            },
            identification_color: 'blue',
        }
    },
    mounted () {
        if ( this.userData.id ) {
            this.user.name = this.userData.name
            if ( this.userData.admin == 1 ) {
                this.user.identification = '博主'
            }
        }
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

        }
    }
}
</script>

<style lang="scss" scoped>
.submit-message {
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
    .form {
        border: 1px solid #f0f0f0;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 20px;
        width: 100%;
        .user {
            display: flex;
            justify-content: space-between;
            width: 100%;
            div {
                &:nth-child(1) {
                    width: 39%;
                }
                &:nth-child(2) {
                    width: 39%;
                }
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
.submit-message {
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
}
</style>