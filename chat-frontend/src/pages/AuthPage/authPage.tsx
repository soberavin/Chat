import './authPage.css'
import { Input } from '../../components/input'
import { SyntheticEvent, useState } from 'react'
import { myStore } from '../../store/store'

type AuthPageProps = {}

export function AuthPage(props: AuthPageProps) {
    const [loginInput, setLoginInput] = useState('')

    function handleLoginInput(e: SyntheticEvent){
        let newEvent = e.target as HTMLInputElement
        setLoginInput(newEvent.value)
    }

    function handleAuthButtonClick(){
        myStore.authUser(loginInput)
    }

    return <div className='authPage__content'>
        <div className='authPage__body'>
            <div className="authPage__title">
                Welcome to Boltalka
            </div>
            <div className="authPage__subText">Enter your name to start chatting, or remain it empty to submit as <b>anonymous</b></div>
            <Input value={loginInput} onChange={handleLoginInput} className='authPage__Input' placeholder='Name'/>
            <div onClick={handleAuthButtonClick} className='authPage__submit'>Enter the chat</div>
        </div>
    </div>
}

