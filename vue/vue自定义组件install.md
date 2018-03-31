> #### Vue  install  自定义全局组件

目录结构

```javascript
|-components/
  	|-loading/
		|-Loading.vue	// Loading组件
		|-index.js		// 导出组件并且install

```

引入	main.js

```javascript
import Loading from './components/loading'; // 全局引入
Vue.use(Loading);	// use一下ok
```

使用	

```javascript
<template>
  <div class="hello">
    <Loading></Loading> <!-- 直接使用就ok -->
  </div>
</template>
```

components/loading/Loading.vue

```javascript
<template>
  <div class="loading-wrap">
      {{text}}
  </div>
</template>
<script>
    export default {
        data () {
            return {
                text: 'loading ^_^'
            }
        }
    }
</script>
<style scoped>
    .loading-wrap {
        color: red;
    }
</style>
```

components/loading/index.js

```javascript
import LoadingComponent from './Loading.vue';

const Loading = {
    install: function (Vue) {
        Vue.component('Loading', LoadingComponent);
    }
};

export default Loading
```

-----------------------------------

> #### Vue install 注册全局组件  直接this.XXX调用

目录结构

```javascript
|-components/
  	|-toast/
		|-Toast.vue	// Toast 弹层组件
		|-index.js	// 导出install方法  在vue的原型上加入方法
```

引入	main.js

```javascript
import Toast from './components/common/toast'
Vue.use(Toast);
```

使用

```javascript
<script>
	export default {
  		data () {
  			return {}
		},
		mounted () {
  			this.$toast('提示信息', 3000);
		}
	}
</script>
```



components/toast/Toast.vue

```javascript
<template>
    <transition name="fade">
        <div class="toast" v-show="show">
            {{message}}
        </div>

    </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: ""
    };
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 40%;
  left: 50%;
  margin-left: -15vw;
  padding: 2vw;
  width: 30vw;
  font-size: 16px;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 5vw;
  z-index: 999;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.3s ease-out;
}
.fade-enter {
  opacity: 0;
  transform: scale(1.2);
}
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
```

components/toast/index.js

```javascript
import ToastComponent from './Toast.vue';

const Toast = {};

// 注册Toast
Toast.install = function (Vue) {
    // 生成一个Vue的子类
    // 同时这个子类也就是组件
    const ToastConstructor = Vue.extend(ToastComponent)
    // 生成一个该子类的实例
    const instance = new ToastConstructor();

    // 将这个实例挂载在我创建的div上
    // 并将此div加入全局挂载点内部
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)

    // 通过Vue的原型注册一个方法
    // 让所有实例共享这个方法 
    Vue.prototype.$toast = (msg, duration = 2000) => {
        instance.message = msg;
        instance.show = true;

        setTimeout(() => {
            instance.show = false;
        }, duration);
    }
}

export default Toast
```

> #### Vue install 注册全局组件  直接this.XXX调用

```javascript
|-components/
  	|-alert/
		|-Alert.vue	// Alert 弹层组件
		|-index.js	// 导出install方法  在vue的原型上加入方法
```

引入同上

使用也是一样		这里就对外定义了几个方法  （方法的调用）

```javascript
//  ** 注意 alert里面this指向的是alert组件
this.$alert({
    'modelTitle': '温馨提示',
    'modelContent': '请先登录,否则无法加入到购物车中!',
    callBack (type) {
        if (type === 'submit') { // 点击确定时做点什么
        	
        }
    	this._reset();	//	调用alert全局组中的方法   这里的this指向的是alert组伯
    }
});
```

components/alert/Alert.vue

```javascript
<template>
  <div class="alertModal" ref="alert">
    <!--social post弹框-->
      <transition name="fade">
          <div v-if="modelFlag" class="alertbox">
            <div class="alert-dialog">
              <div class="alert-content">
                <div class="alert-header">
                    <span  class="alertclose" @click="close">×</span>
                    <span class="alert-title">
                       {{modelTitle}}
                    </span>
                </div>
                <div class="alert-body">
                    {{modelContent}}
                </div>
                <div class="alert-footer">
                    <button class="alertbtn"  @click="close">{{modelClose}}</button>
                    <button class="alertbtn alert-info" @click="submit">{{modelSave}}</button>
                </div>
              </div>
            </div>
        </div>
      </transition>
      <div v-if="modelFlag" class="modal-backdrop"></div>
  </div>
</template>

<script>

export default {
    data(){
        return{
            modelFlag: false,//false为消失，true为显示
            modelTitle:'Alert',//弹窗标题
            modelContent:'',//弹窗内容
            modelClose:'取消',//取消按钮文字
            modelSave:'确定',//确定按钮文字
            callBack:null,//是否需要回调函数
        }
    },
    methods:{
        //回调函数
        doCallBack(flag){
            if(typeof this.callBack == 'function'){
                this.callBack(flag)
            }
        },
        _reset () {
            this.modelFlag=false;
            this.modelTitle='Alert';
            this.modelClose='取消';
            this.modelContent='';
            this.modelSave='确定';
            this.callBack=null;
        },
        //关闭弹窗，数据重置
        close(){
           this.doCallBack('close');
        },
        //点击确定按钮弹窗消失
        submit(){
            this.doCallBack('submit')
        }
    },
    watch:{
       
    }
}
</script>
<style scoped>
.modal.fade .alert-dialog {
  -webkit-transition: -webkit-transform .3s ease-out;
       -o-transition:      -o-transform .3s ease-out;
          transition:         transform .3s ease-out;
  -webkit-transform: translate(0, -25%);
      -ms-transform: translate(0, -25%);
       -o-transform: translate(0, -25%);
          transform: translate(0, -25%);
}
.modal.in .alert-dialog {
  -webkit-transform: translate(0, 0);
      -ms-transform: translate(0, 0);
       -o-transform: translate(0, 0);
          transform: translate(0, 0);
}
.alertbox{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 99999;
}
.alert-dialog{
    display: inline-block;
    width: 420px;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #e6ebf5;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: left;
    overflow: hidden;
    backface-visibility: hidden;
    position: relative;
    top: 140px;
    padding: 10px 15px;
}
.modal-backdrop.fade {
  filter: alpha(opacity=0);
  opacity: 0;
}
.modal-backdrop.in {
  filter: alpha(opacity=50);
  opacity: .5;
}
.alert-footer{
    float: right;
    margin-top: 5px;
}
.alert-scrollbar-measure {
  position: absolute;
  top: -9999px;
  width: 50px;
  height: 50px;
  overflow: scroll;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: #000;
    opacity: 0.5;
}

.el-icon-date{
    cursor: pointer;
}
.alert-header{
    
}
.alert-title{
    font-size: 18px;
    line-height: 1;
    color: #2d2f33;
}
.alert-body{
    padding: 10px 0px;
    color: #5a5e66;
    font-size: 14px;
    line-height: 17px;
}
.alertbtn{
    text-align: center;
    font-weight: 500;
    cursor: pointer;
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
    line-height: 1;
    background: #fff;
    border: 1px solid #d8dce5;
    border-color: #d8dce5;
    color: #5a5e66;
}
.alert-info{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
}
.alertclose{
    float: right;
    cursor: pointer;
}
</style>

```

components/alert/index.js

```javascript
import AlertComponent from './Alert.vue';

const Alert = {};

// 注册Alert
Alert.install = function (Vue) {
    // 生成一个Vue的子类
    // 同时这个子类也就是组件
    const AlertConstructor = Vue.extend(AlertComponent)
    // 生成一个该子类的实例
    const instance = new AlertConstructor();

    // 将这个实例挂载在我创建的div上
    // 并将此div加入全局挂载点内部
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)

    // 通过Vue的原型注册一个方法
    // 让所有实例共享这个方法 
    Vue.prototype.$alert = (json) => {
        instance.modelFlag = true;
        instance.modelTitle = json.modelTitle || 'Alert';
        instance.modelContent = json.modelContent || '';
        instance.callBack = json.callBack || function () {};
    }
}

export default Alert
```

