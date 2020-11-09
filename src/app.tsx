import React from 'react'
import ReactDom from 'react-dom'
import Input from '../input/in'

const mainElement = document.createElement('div')
document.body.appendChild(mainElement)

const App = () => {
  return (<div>
      <Input />
      <hr />
      Typeset using <em>late xd</em>.
  </div>)
}

ReactDom.render(<App />, mainElement)
