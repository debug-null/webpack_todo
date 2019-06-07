<template>
  <div class="helper">
    <span class="left">{{ finshTotal }} items left</span>
    <span class="tabs">
      <span
        v-for="state in states"
        :key="state"
        :class="[state, filter === state ? 'actived' : '']"
        @click="toggleFilter(state)"
      >
        {{ state }}
      </span>
    </span>
    <span
      class="clear"
      @click="clearAllCompleted"
    >
      Clear completed
    </span>
  </div>
</template>
<script>
export default {
  props: {
    filter: {
      required: true,
      type: String
    },
    todos: {
      required: true,
      type: Array
    }

  },
  data() {
    return {
      states: ['all', 'active', 'completed']
    }
  },
  computed: {
    finshTotal() {
      return this.todos.filter(todo => !todo.completed).length
    }
  },
  methods: {
    toggleFilter(state) {
      this.$emit('toggle', state)
    },
    clearAllCompleted(state) {
      this.$emit('clearCompleted')
    }
  }
}
</script>
<style lang="stylus" scoped>
.helper
    font-weight 100
    display flex
    justify-content space-between
    padding 5px 0
    line-height 30px
    background-color #ffffff
    font-size 14px
    font-smoothing antialiased
.left, .clear, .tabs
    padding 0 10px
.left .clear
    width 150px
.left
    text-align center
.clear
    text-align right
    cursor pointer
.tabs
    width 200px
    display flex
    justify-content space-between
    *
        display inline-block
        padding 0 10px
        cursor pointer
        border 1px solid rgba(175,47,47,0)
        &.actived
            border-color rgba(175,47,47,0.4)
            border-radius 5px
</style>
