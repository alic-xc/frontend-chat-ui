import React from 'react'

const App = () => {
    const [userName, setUserName] = React.useState('')
    const [displayChat, setDisplayChat] = React.useState(false)
    const handleLogin = () => {
        const availableUsers = JSON.parse(localStorage.getItem('users'))
        if(!availableUsers){
            localStorage.setItem('users', JSON.stringify([userName]))
        }
        if(availableUsers  && !availableUsers.indexOf(userName)){
            const newValue = JSON.stringify(availableUsers.push(userName))
            localStorage.setItem('users', availableUsers)
        }
        setDisplayChat(true)
        
    }
    return (
        <div className=''>
            {!displayChat && <UserLoginUI userName={userName} setUserName={setUserName} handleLogin = { handleLogin } />}
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


export default App