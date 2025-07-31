import { useEffect, useRef, useState } from 'react';
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function App() {
  const zpRef = useRef(null);

  const [targetUserID, setTargetUserID] = useState('');

  // Only generate userID once
  const userIDRef = useRef(Math.floor(Math.random() * 1000000));
  const userID = userIDRef.current;

  const appID = 1484014221;
  const serverSecret = "303358eb7bb624e9e65910b20f6c5b92";
  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, null, userID, userID); // userID used as both ID and name

  useEffect(() => {
    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zpRef.current = zp;
    zp.addPlugins({ ZIM });
  }, [TOKEN]);

  function invite(callType) {
    if (!targetUserID) {
      alert("Please enter the target User ID.");
      return;
    }

    const targetUser = {
      userID: targetUserID,
      userName: targetUserID  // using ID as name too
    };

    zpRef.current.sendCallInvitation({
      callees: [targetUser],
      callType,
      timeout: 60,
    }).then((res) => {
      console.warn(res);
    }).catch((err) => {
      console.warn(err);
    });
  }

  return (
  <div className="min-h-screen bg-gradient-to-b from-[#1e1e2f] to-black flex items-center justify-center px-4 py-6">
    <div className="w-full max-w-md bg-[#121212] rounded-2xl shadow-lg p-6 border border-[#2c2c2c] flex flex-col gap-6">
      
      <div className="text-center">
        <h2 className="text-white text-xl font-semibold mb-1">Your User ID</h2>
        <p className="text-emerald-400 font-mono text-lg">{userID}</p>
      </div>

      <input
        className="w-full h-12 px-4 text-black rounded-lg bg-amber-100 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
        type="text"
        placeholder="Enter Target User ID"
        value={targetUserID}
        onChange={(e) => setTargetUserID(e.target.value)}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition duration-150"
          onClick={() => invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}
        >
          📞 Voice Call
        </button>
        <button
          className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-xl transition duration-150"
          onClick={() => invite(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}
        >
          🎥 Video Call
        </button>
      </div>
    </div>
  </div>
);

}

export default App;
