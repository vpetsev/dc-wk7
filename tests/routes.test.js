const assert = require('node:assert/strict')
const test = require('node:test')
const movies = require('../app')
const todos = require('../nodeServer/app')

async function withServer(app, run) {
  const server = app.listen(0, '127.0.0.1')
  await new Promise(resolve => server.once('listening', resolve))
  try { await run(`http://127.0.0.1:${server.address().port}`) }
  finally { await new Promise(resolve => server.close(resolve)) }
}
test('movie filters preserve the complete collection and detail parameter', async () => {
  await withServer(movies, async base => {
    global.movies = [{title:'Funny',genre:'Comedy'},{title:'Serious',genre:'Drama'}]
    const filtered = await fetch(base + '/movies/genre/Comedy')
    assert.equal(filtered.status, 200)
    const body = await filtered.text()
    assert.match(body, /Funny/)
    assert.doesNotMatch(body, /Serious/)
    const detail = await fetch(base + '/movies/movies/Serious')
    assert.equal(detail.status, 200)
    assert.match(await detail.text(), /Serious/)
    const all = await (await fetch(base + '/movies')).text()
    assert.match(all, /Funny/)
    assert.match(all, /Serious/)
  })
})
test('TODO reads return the items saved by POST with the client priority field', async () => {
  await withServer(todos, async base => {
    const input = {title:'Saved task',priority:'high',details:'Details',date:'2026-11-05'}
    const post = await fetch(base + '/todos', {method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(input)})
    const saved = await post.json()
    assert.equal(saved[0].priority, 'high')
    assert.equal(saved[0].title, 'Saved task')
    const get = await fetch(base + '/todos')
    assert.equal(get.status, 200)
    assert.deepEqual(await get.json(), saved)
  })
})
