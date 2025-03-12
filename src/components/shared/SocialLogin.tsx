import React from 'react'
import { Button } from '../ui/button'
import { Icon } from '@iconify/react/dist/iconify.js'
import { socialLogin } from '@/utilities/actions/loginUser';

const SocialLogin = () => {
  return (
    <form action={socialLogin} className="flex flex-col gap-3">
      <Button
        type="submit"
        name="action"
        value="google"
        className="w-full flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white"
      >
        <Icon icon="flat-color-icons:google" width="22" height="22" />
        Sign in with Google
      </Button>
      <Button
        type="submit"
        name="action"
        value="github"
        className="w-full flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white"
      >
        <Icon icon="mdi:github" width="22" height="22" />
        Sign in with GitHub
      </Button>
    </form>
  );
}

export default SocialLogin
