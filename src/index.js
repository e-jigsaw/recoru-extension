import parse from 'date-fns/parse'
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds'
import format from 'date-fns/format'

window.addEventListener('load', () => {
  const root = document.getElementById('ACHG')
  const observer = new MutationObserver(() =>{
    for (const el of document.getElementsByClassName('content')) {
      const times = []
      for (const e of el.querySelectorAll('.punchContent')) {
        const kbn = e.querySelector('.punchKbn')
        if (kbn) {
          times.push(parse(e.textContent.match(/\d\d:\d\d/)[0], 'HH:mm', new Date()))
        }
      }
      if (times.length % 2) {
        times.unshift(new Date())
      }
      let workMsec = 0
      for (let i = 0; i < times.length; i += 2) {
        workMsec += differenceInMilliseconds(times[i], times[i + 1])
      }
      const sp = document.createElement('span')
      const offset = 9 * 60 * 60 * 1000
      sp.textContent = ` - ${format(workMsec - offset, 'HH:mm')}`
      el.previousElementSibling.appendChild(sp)
    }
  })
  observer.observe(root, {
    childList: true,
    characterData: true
  })
})
