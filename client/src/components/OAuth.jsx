import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup , getAuth} from 'firebase/auth'
import { app } from '../firebase'

const OAuth = () => {
      const auth = getAuth(app)
    const HandleGoogleClick= async () =>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ promt: 'select_account '})
        try{
            const resutlsFromGoogle = await signInWithPopup(auth, provider)
            console.log(resutlsFromGoogle)
        }catch(error){
            console.log(error);
        }
    }
  return (
   <Button type='button' gradientDuoTone='pinkToOrange' outline>

    <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
    Continue with Google
   </Button>
  )
}

export default OAuth;
