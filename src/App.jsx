import React from 'react'
import UserImg from './assets/user.png'
const App = () => {
    const [userName, setUserName] = React.useState('')
    const [displayChat, setDisplayChat] = React.useState(false)
    const handleLogin = () => {
        // const availableUsers = JSON.parse(localStorage.getItem('users'))
        // if(!availableUsers){
        //     localStorage.setItem('users', JSON.stringify([userName]))
        // }
        // if(availableUsers  && !availableUsers.indexOf(userName)){
        //     const newValue = JSON.stringify(availableUsers.push(userName))
        //     localStorage.setItem('users', availableUsers)
        // }
        setDisplayChat(true)
        
    }
    return (
        <div className=''>
            {!displayChat && <UserLoginUI userName={userName} setUserName={setUserName} handleLogin = { handleLogin } />}
            {displayChat && <ChatUI username={userName} />}
        </div>
    )
}



const UserLoginUI = ({userName, setUserName, handleLogin}) => {
    

    return (
        <div className='flex justify-center place-items-center  flex-1 min-h-screen'>
            <div className='basis-1/3 sm:basis-1/2 xs:basis-full h-[400px] xs:h-full  bg-[#f1f1f1] p-5'> 
                <h2 className='text-center mb-5'>Welcome to MyChat</h2>
                <input type="text" value={userName} onChange={ (e) => setUserName(e.target.value) }  placeholder="Enter your name" className='h-10 w-[100%] pl-5' />    
                <button onClick={ handleLogin } className='bg-[#8659f6] text-white p-2 rounded-[5px] mt-2'>Login</button>            
            </div>
        </div>
    )
} 


const ChatUI = ({username}) => {
    // localStorage.removeItem('messages')
    const [messages, setMessages] = React.useState() 
    const [chat, setChat] = React.useState()
    const fetchedRecentChat = React.useRef(false)
    const [refreshChat, setRefreshChat] = React.useState(true)

    React.useEffect( () => {
        if(!fetchedRecentChat.current){
            window.addEventListener('storage', storageEventHandler, false);
            fetchedRecentChat.current = true

        }
        if(refreshChat){
            const data = getAllChats()
            setMessages(data)
            setRefreshChat(false)
            console.log(data)
        }

    }, [messages, refreshChat])


    const handleChat = () => {
        const  data = JSON.parse(localStorage.getItem('messages'))
        const newMessage = {
            "name": username,
            "content": chat
        }
        data.push(newMessage)
        localStorage.setItem('messages', JSON.stringify(data))  
    }

    const storageEventHandler = function() {
        console.log("lkkk")
        setRefreshChat(true)
    }

    return (
        <div className='flex justify-center border-[red] border-2 flex-1 max-h-screen'>
            <div className='basis-1/2 xs:basis-full'> 
                <div className='border-1 max-h-[90%] p-5 overflow-y-auto bg-[#f3f3f3]'>
                    {messages?.map( message => <MessageUI message={message} /> ) }
                </div>
                <div className='flex justify-space place-content-center p-[2%] h-[8%] bg-[#8659f6]'>
                    <input value={chat} onChange={ (e) => setChat(e.target.value) }  className='w-[70%] rounded-full pl-5' placeholder='Start Typing'/>
                    <button onClick={handleChat} className='rounded-full px-5 py-2 bg-white text-[14px]'>Send</button>
                </div>
            </div>
        </div>
    )
}

const MessageUI = ({message, active}) => {
    return (
        <div className={`flex ${active ? "flex-row-reverse":" "} justify-between mt-5`}>
            <div className='basis-[15%]'><img src={UserImg} width="70" height="70" /></div>
            <div className='basis-[80%] bg-white border-2 p-3'>
                <h5>{message.content}</h5>
            </div>
        </div>
    )
}


function getAllChats(){
    const messages = JSON.parse(localStorage.getItem('messages'))
    if(!messages){
        localStorage.setItem('messages', JSON.stringify([]))
    }
    return messages
}


export default App