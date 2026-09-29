import ProfileComponent from '@/Component/Profile/ProfileComponent'
import { getLocalStorageItem } from '@/Constants/Api/Api'
import { getClinetProfile } from '@/redux/getClientProfileSlice'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {
  const ProfileGet = useSelector((state) => state.rootReducer.clientProfile.clientProfile
  )
  const dispatch = useDispatch()
  const storedValue = getLocalStorageItem("UserLoginToken");
  
  useEffect(() => {
      dispatch(getClinetProfile(storedValue))
  }, [dispatch,storedValue])
  return (
  <ProfileComponent data={ProfileGet}/>
  )
}

export default Profile
