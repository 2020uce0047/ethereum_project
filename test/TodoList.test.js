const { assert } = require("chai")

const TodoList = artifacts.require("./TodoList.sol")

contract('TodoList', (accounts) => {
     before(async () => {
         this.todoList = await TodoList.deployed()
     })

     it('deploys successfully', async () => {
        const address = await this.todoList.address 
        console.log(address)
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
     })

     it('lists tasks', async () => {
        const taskCount = await this.todoList.TaskCount()
        const task = await this.todoList.tasks(taskCount)
        assert.equal(task.id.toNumber(), taskCount.toNumber())
        assert.equal(task.content, "Check out https://dappuniversity.com")
        assert.equal(task.completed, false)
        assert.equal(taskCount.toNumber(), 1)
    })

    it('create task', async() => {
        const result = await this.todoList.createTask('A New Task')
        const taskCount = await this.todoList.TaskCount()
        assert.equal(taskCount.toNumber(), 2)
        console.log(result)
        const event = result.logs[0].args        
        assert.equal(event.id.toNumber(), 2)
        assert.equal(event.content, 'A New Task')
        assert.equal(event.completed, false)
    })
})