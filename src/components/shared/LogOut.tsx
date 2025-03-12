import { logOut } from '@/utilities/actions/logout'
import React from 'react'
import { Button } from '../ui/button';

const LogOut = () => {
  return (
    <form action={logOut}>
          <Button className="bg-red-500 hover:bg-red-600"
          type='submit'>
        Log Out
      </Button>
    </form>
  );
}

export default LogOut
