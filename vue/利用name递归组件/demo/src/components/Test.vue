<template>
  <div class="page">
    <tree v-for="(item, index) in testData" :model='item' :key="index"></tree>
  </div>
</template>
<script type="text/ecmascript-6">
  import Tree from './tree.vue';
  export default {
    name: 'items',
    props: {},

    data () {
      return {
        testData: [
          {
            id: "1",
            name: '-1-采购',
            leaf: true,
            number: 100,
            children: [
              {
                id: "1-1",
                name: '-2-采购1',
                leaf: false,
                number: 10,
                children: [
                  {
                    id: "1-1",
                    name: '-2-采购1',
                    leaf: false,
                    number: 10,
                  }
                ]
              }
            ]
          },
          {
            id: "2",
            name: '-1-产品',
            leaf: true,
            number: 1000,
            children: [
              {
                id: "2-1",
                name: '-2-产品1',
                leaf: false,
                number: 100,
              }
            ]
          }
        ],

      };
    },

    computed: {},

    watch: {},

    created () {
    },

    mounted () {
    },

    methods: {},

    components: {
      Tree
    }
  };
</script>
<style rel="stylesheet/css">

</style>
