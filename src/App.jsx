import { useEffect, useRef, useState } from 'react';
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function App() {
  const zpRef = useRef(null);

  const [targetUserID, setTargetUserID] = useState('');
  const [targetUserName, setTargetUserName] = useState('');

  const userID = "user" + Math.floor(Math.random() * 1000); 
  const userName = "call" + userID;
  const appID = 1484014221;
  const serverSecret = "303358eb7bb624e9e65910b20f6c5b92";
  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, null, userID, userName);

  useEffect(() => {
    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zpRef.current = zp;
    zp.addPlugins({ ZIM });
  }, [TOKEN]);

  function invite(callType) {
    if (!targetUserID || !targetUserName) {
      alert("Please enter both User ID and User Name to call.");
      return;
    }

    const targetUser = {
      userID: targetUserID,
      userName: targetUserName
    };

    zpRef.current.sendCallInvitation({
      callees: [targetUser],
      callType,
      timeout: 60, // Timeout duration in seconds
    }).then((res) => {
      console.warn(res);
    }).catch((err) => {
      console.warn(err);
    });
  }

  return (
    <div className='w-full h-screen bg-gradient-to-b from-[#313221] to-black flex items-center justify-center'>
      <div className='w-[500px] h-[500px] bg-[#0f1114] border-2 border-[#3f3e3e] flex flex-col items-center justify-center gap-[20px] px-4'>
        <h2 className='text-white text-[20px]'><span className='text-blue-500'>UserName:</span> {userName}</h2>
        <h2 className='text-white text-[20px]'><span className='text-blue-500'>UserId:</span> {userID}</h2>

        <input 
          className='w-[300px] h-[40px] rounded-lg px-4 bg-amber-50'
          type='text'
          placeholder='Enter Target User ID'
          value={targetUserID}
          onChange={(e) => setTargetUserID(e.target.value)}
        />

        <input 
          className='w-[300px] h-[40px] rounded-lg px-4 bg-amber-50'
          type='text'
          placeholder='Enter Target User Name'
          value={targetUserName}
          onChange={(e) => setTargetUserName(e.target.value)}
        />

        <button
          className='w-[200px] h-[50px] bg-white text-black text-[20px] rounded-2xl'
          onClick={() => invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}
        >
          Voice Call
        </button>

        <button
          className='w-[200px] h-[50px] bg-white text-black text-[20px] rounded-2xl'
          onClick={() => invite(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}
        >
          Video Call
        </button>
      </div>
    </div>
  );
}

export default App;
