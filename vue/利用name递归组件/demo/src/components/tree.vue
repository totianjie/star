<template>
  <div class="table-wrapper">
    <ul>
      <li @click="toggle" class="item">
        <span v-if="model.children">有</span>
        {{model.name}}
      </li>
      <li v-for="(item, index) in 5" :key="index">{{item}}</li>
    </ul>
    <div v-if="open">
      <items v-for="(item, index) in model.children" :model="item"></items>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'items',
    props: {
      model: {
        type: Object,
        default: function () {
          return {};
        }
      }
    },

    data () {
      return {
        open: false,
        isFolder: true
      };
    },

    computed: {},

    watch: {},

    created () {
      console.log(this.model);
    },

    mounted () {
    },

    methods: {
      toggle () {
        console.log(this.model);
        this.open = !this.open;
      }
    },

    components: {}
  };
</script>
<style rel="stylesheet/css" lang="less">
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .table-wrapper {
    margin: 0 auto;
    width: 100%;
    ul {
      display: flex;
      .item {
        padding-left: 10px;
      }
      li {
        flex: 1;
        border-bottom: 1px solid #ccc;
        border-left: 1px solid #ccc;
      }
    }
  }
</style>
