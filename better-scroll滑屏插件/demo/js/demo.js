let vm = new Vue({
    el: '#box',
    data: {
        list: []
    },
    created() {
        let n = 30;
        for (let i = 0; i < n; i++) {
            this.list.push(i);
        }
        console.log(123456);
        console.log(this);
    },
    mounted: function () {
        console.log(321321);
        this.scrollInit();
    },
    methods: {
        scrollInit() {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.scroll_wrapper, {
                    click: true
                });
                this.scroll.on('touchend', function (pos) {
                    // 下拉动作
                    // if (Math.abs(pos.y) > 20) {
                    //     
                    // }
                });
            } else {
                this.scroll.refresh();
            }
        }
    }
});