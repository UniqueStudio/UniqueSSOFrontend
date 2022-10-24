import { observer } from 'mobx-react-lite'
import './index.scss'

function _Home() {
  return (
    <div className='home'>
      <span>Hello</span>
    </div>
  )
}

const Chat = observer(_Home)

export default Chat
