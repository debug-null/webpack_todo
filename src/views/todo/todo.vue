<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下来你要做什么？"
      @keyup.enter="addToDo"
    >
    <Item v-for="todo in filteredTodos" :key="todo.id" :todo="todo" @del="deleteTodo" />
    <Tabs :filter="filter" :todos="todos" @toggle="handToggle" @clearCompleted="clearCompleted" />
  </section>
</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'

let id = 0
export default {
  components: {
    Item,
    Tabs
  },
  data() {
    return {
      todos: [],
      filter: 'all'
    }
  },
  computed: {
    test() {
      console.log('Dfsd')
    },
    filteredTodos() {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },

  methods: {
    addToDo(e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value,
        completed: false
      })
      e.target.value = ''
      this.total = this.todos.length
    },
    deleteTodo(id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    handToggle(state) {
      this.filter = state
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666

.add-input
    position relative
    margin 0
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit
    line-height 1.4em
    border none
    outline none
    color inherit
    box-sizing border-box
    font-smoothing antialiased
    padding 16px 16px 16px 36px
    border none
    box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)

</style>

