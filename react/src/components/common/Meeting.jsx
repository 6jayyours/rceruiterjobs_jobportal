import React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router";

const Meeting = () => {
  function randomID(len) {
    let result = "";
    if (result) return result;
    var chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  const { roomId } = useParams();

  const myMeeting = async (element) => {
    const appID = 783054159;
    const serverSecret = "c010ae0c22fc04845fab706e05403090";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      randomID(5),
      randomID(5)
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
        container: element,
        scenario: {
         mode: ZegoUIKitPrebuilt.VideoConference,
        },
   });

  };

  return <div>
    <div ref={myMeeting}/>
  </div>;
};

export default Meeting;
