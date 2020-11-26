<template>
    <div class="dialog">
        <el-dialog
            :title="dialogTitle"
            :visible.sync="show"
            :close-on-click-modal="false"
            v-if="show"
        >
            <div slot="footer" class="dialog-footer">
                <slot></slot>
                <div class="btn-list" v-if="type == 'two-button'">
                    <el-button :type="confirmBtnType" @click="confirm">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'ui-dialog',
    props: {
        dialogTitle: {
            default: '提示'
        },
        type: {
            default: 'two-button'
        },
        confirmBtnType: {
            default: 'primary'
        },
        show: {
            default: true
        }
    },
    methods: {
        confirm () {
            this.$emit('confirm')
        },
        cancel () {
            this.$emit('cancel')
        }
    }
}
</script>

<style lang="scss" scoped>
.dialog {
    z-index: 9999;
}
</style>