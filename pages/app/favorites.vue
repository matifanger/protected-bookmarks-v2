<template>
    <div>
        sape
        {{this.getrouteName}}
    </div>
</template>

<script>
    export default {
                layout: 'dashboardv2',
        data() {
            return {
            }
        },
    computed: {
        getrouteName: function () {

            return this.$route.name

        },
    }
    }
</script>

<style lang="scss" scoped>

</style>