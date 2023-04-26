<template>
    <div>
        <button @click="toggle">Toggle component</button>
        <div :class="{ 'is-hidden': !show, 'slide-transition': true }">This is the component</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        }
    },
    methods: {
        toggle() {
            this.show = !this.show
        },
    },
}
</script>

<style>
.slide-transition {
    position: relative;
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease-in-out;
}

.slide-transition-enter-active,
.slide-transition-leave-active {
    transition: height 0.3s ease-in-out;
}

.slide-transition-enter,
.slide-transition-leave-to {
    height: 0;
    opacity: 0;
}

.slide-transition-enter-to,
.slide-transition-leave {
    height: auto;
    opacity: 1;
}
</style>
