import { useEffect, useState } from 'react'
import useAccount from '../../../hooks/services/useAccount'
import useNav from '../../../hooks/utils/useNav'
import Button from '../../Library/Button/Button'
import TopBar from '../../Library/TopBar/TopBar'
import { UserInfo } from '../../../backend/types'

const Account: React.FC = () => {
  const navigate = useNav()
  const { logout, getUserInfo } = useAccount()

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  const handleLogout = async () => {
    await logout()
    navigate('login')
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo()
      setUserInfo(userInfo)
    }

    fetchUserInfo()
  }, [getUserInfo])

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <TopBar>
        <h2 className="text-[14px] text-text-1">Account</h2>
      </TopBar>

      <div className="w-full h-full flex flex-col p-8 gap-4 items-center overflow-hidden">
        <div className="w-full max-w-[600px] flex flex-col gap-4">
          <h2 className="text-[24px] font-semibold text-text-1">Account</h2>
          <div className="border border-panel-border rounded-[6px]">
            <div className="w-full px-3 py-3 gap-2 flex items-center border-b border-panel-border">
              <p className="text-[14px] text-text-1">User Info</p>
            </div>
            <div className="w-full px-3 py-3 gap-3 flex flex-col">
              <div className="w-full gap-3 flex items-center justify-between">
                <p className="w-[140px] text-[14px] text-text-2">Email</p>
                <div className="px-3 py-3 flex-1 border border-panel-border rounded-[6px]">
                  <p className="text-[14px] text-text-1 truncate">
                    {userInfo?.email}
                  </p>
                </div>
              </div>
              <div className="w-full gap-3 flex items-center justify-between">
                <p className="w-[140px] text-[14px] text-text-2">Password</p>
                <div className="px-3 py-3 flex-1 border border-panel-border rounded-[6px]">
                  <p className="text-[14px] text-text-1 truncate">
                    {'********'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="self-start"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Account
