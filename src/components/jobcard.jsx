import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Card } from './ui/card'

const Jobcard = ({
     job,
     isMyJob = false,
     savedInit = false,
     onJobSaved = () => {},
}) => {
     const {user} = useUser
  return (
    <Card>
    
    </Card>
  )
}

export default Jobcard
