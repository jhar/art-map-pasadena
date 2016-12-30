export function getGraphData(pid) {
  const time = Math.floor(Date.now()/1000)
  const location = 'name,location{latitude, longitude}'
  const cover = 'cover{source, offset_y}'
  const events = `events.since(${time}){description, name, ${cover}}`
  FB.api(`/${pid}?fields=${location},${cover},${events}`)
}

export function handleLogin(callback) {
  FB.login(response => {
    if (response.authResponse) {
      callback()
    } else if (!response || response.error) {
      window.console.log('Facebook error')
    }
  })
}

export function handleLogout(callback) {
  FB.logout(() => callback())
}
