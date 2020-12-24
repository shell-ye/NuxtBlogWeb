<template>
    <div class="color-select" :class="value">
        <el-select v-model="value" placeholder="请选择" @change="select">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <i :class="item.value"></i>
                {{ item.label }}
            </el-option>
        </el-select>
        <i :class="value"></i>
    </div>
</template>

<script>
export default {
    name: 'ColorSelect',
    props: {
        placeholder: {
            default: '请选择'
        }
    },
    data() {
        return {
            options: [
                {
                    value: 'blue',
                    label: '主题蓝'
                },
                {
                    value: 'red',
                    label: '活力红'
                },
                {
                    value: 'pink',
                    label: '骚气粉'
                }
            ],
            value: 'blue'
        }
    },
    methods: {
        select () {
            this.$emit('select', this.value)
        }
    }
}
</script>

<style lang="scss" scoped>
i {
    width: 12px;
    height: 12px;
    display: inline-block;
    border-radius: 50%;
    margin-right: 6px;
}
i.red {
    background: $MessageRed;
}
i.blue {
    background: $elementBlue;
}
i.pink {
    background: $MessagePink;
}

.color-select {
    position: relative;
    > i {
        position: absolute;
        top: 14px;
        left: 20px;
    }
}

ul {
    li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
}
</style>

<style lang="scss">
.color-select {
    input {
        padding-left: 40px!important;
    }
}

.color-select.red {
    input {
        color: $MessageRed;
    }
}
.color-select.blue {
    input {
        color: $elementBlue;
    }
}
.color-select.pink {
    input {
        color: $MessagePink;
    }
}
</style>