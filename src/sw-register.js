;(async () => {
  if (!navigator.serviceWorker) {
    return
  }
  const reg = await navigator.serviceWorker.register('/sw.js')
  reg.addEventListener('updatefound', e => {
    console.info('updatefound', e)
  })

  await navigator.serviceWorker.ready
  await reg.update()
  console.log('sw:ready')
})()
