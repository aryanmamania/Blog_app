import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'

const OAuth = () => {

    const HandleGoogleClick= async () =>{
        
    }
  return (
   <Button type='button' gradientDuoTone='pinkToOrange' outline>

    <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
    Continue with Google
   </Button>
  )
}

export default OAuth;
