import React from 'react'
import UserImg from './assets/user.png'
const App = () => {
    const [userName, setUserName] = React.useState('')
    const [displayChat, setDisplayChat] = React.useState(false)
    const handleLogin = () => setDisplayChat(true) 
    return (
        <div className=''>
            {!displayChat && <UserLoginUI userName={userName} setUserName={setUserName} handleLogin = { handleLogin } />}
            {displayChat && <ChatUI username={userName} />}
        </div>
    )
}

const UserLoginUI = ({userName, setUserName, handleLogin}) => {
    // Handle user login UI
    // Pure Component
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
    // Handle Chat UI
    const [messages, setMessages] = React.useState() 
    const [chat, setChat] = React.useState()
    const fetchedRecentChat = React.useRef(false)
    const [refreshChat, setRefreshChat] = React.useState(true)
    const bottomRef = React.useRef(null);
    const disabledScroll = React.useRef(false) // Handle when to scroll to the bottom
    const pagination = React.useRef(25)

    React.useEffect( () => {
        if(!fetchedRecentChat.current){
            // Attached event listener to storage once
            window.addEventListener('storage', storageEventHandler, false);
            fetchedRecentChat.current = true
        }
          
        if(!disabledScroll.current){
            if(refreshChat){
                //  On every refresh chat, update  messages and disable refreshChat state
                const data = getAllChats(pagination.current)
                setMessages(data)
                setRefreshChat(false)
            }
            scroll() 
        }
        
    }, [messages, refreshChat])


    const handleChat = () => {
        // Handle message inputted by the user
        // Actually, there are better way to do this, but the goal was  achieved using generic logic
        const  data = JSON.parse(localStorage.getItem('messages'))
        const newMessage = {
            "name": username,
            "content": chat
        }
        
        data.push(newMessage)
        setChat('')
        disabledScroll.current = false
        setMessages(prevState => ([ ...prevState, newMessage]))
        localStorage.setItem('messages', JSON.stringify(data))
        
    }

    const scroll =  () => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'})
    } 

    const onScrollPagination = (e) => {
        // Handle onscroll to the top of the container 
        const top = e.target.scrollHeight + e.target.scrollTop === e.target.scrollHeight;
        if(top){
            //Perform action only when onscroll to top condition met
            pagination.current += 25
            const data  = getAllChats(pagination.current)
            if(data.length  >  0){
                disabledScroll.current =  true
                setMessages(data)
            }
        }
    }

    const storageEventHandler = function() {
        // Execute this function only on dispatch storage event 
        setRefreshChat(true)
        disabledScroll.current = false
    }
    
    return (
        <div className='flex justify-center flex-1 max-h-screen'>
            <div className='basis-1/2 xs:basis-full'> 
                <div style={{overflow: 'scroll'}} onScroll={onScrollPagination} className='border-1 h-[500px] p-5 bg-[#f3f3f3]'>
                    {messages?.map( message => {
                        let active = false
                        if(message.name === username){
                            active = true
                        }
                        return <MessageUI message={message} active= { active } />
                    } 
                    ) }
                    <div ref={bottomRef} />
                </div>
                <div  className='flex justify-space place-content-center p-[2%] h-[60px] bg-[#8659f6]'>
                    <input value={chat} onChange={ (e) => setChat(e.target.value) }  className='w-[70%] rounded-full pl-5' placeholder='Start Typing'/>
                    <button onClick={handleChat} className='rounded-full px-5 py-2 bg-white text-[14px]'>Send</button>
                </div>
            </div>
        </div>
    )
}

const MessageUI = ({message, active}) => {
    // Handle message UI
    // Pure component
    return (
        <div className={`flex ${active ? "flex-row-reverse":" "} justify-between mt-5`}>
            <div className='basis-[15%]'><img src={UserImg} width="70" height="70" /></div>
            <div className={`basis-[80%] ${active ? "bg-[#8659f6] text-white":"bg-white"}  border-2 p-3`}>
                <h5>{message.content}</h5>
            </div>
        </div>
    )
}

function getAllChats(pagination ){
    // Get all chats on the system
    const messages = JSON.parse(localStorage.getItem('messages'))
    if(!messages){
        localStorage.setItem('messages', JSON.stringify([]))
    }else{
        return messages.slice(-pagination)
    }
    
    
}

export default App