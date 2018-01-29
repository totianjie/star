> ### #使用步骤

文档：`https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/installation.html`



> #### 使用方法

~~~vue
// better-scroll 也支持直接用 script 加载的方式，加载后会在 window 上挂载一个 BScroll 的对象。
	<div id="box" class="box">
      <!-- .scroll-wrapper 一定要限高 overflow-y: auto; -->
        <div ref="scroll_wrapper" class="scroll-wrapper">
            <ul class="list-wrapper">
                <li 
                class="item" 
                v-for="(item, index) in list" 
                v-text='item' 
                :key='index'
                >
                </li>
            </ul>
        </div>
    </div>

<script>
	scrollInit() {
      if (!this.scroll) {
        // 初始化
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
        // 如果已经存在就刷新   
        this.scroll.refresh();
      }
    }
</script>
~~~



