import db from "../../models";

//                              ↱ app.js에서 io 객체를 받아옴
export const initChatSocket = (io) => {
  //                    ↱ 새 클라이언트가 연결될 때마다 socket 객체 생성
  io.on('connection', (socket) => {
    console.log('🔌 소켓 연결:', socket.id);

    //          ↱ 클라이언트가 'join' 이벤트 보내면 실행
    socket.on('join', (roomId) => {
      //       ↱ 이 socket을 특정 room에 추가
      socket.join(`room_${roomId}`);
    });

    //                           ↱ 클라이언트가 보낸 데이터
    socket.on('message', async (data) => {
      //                     ↱ DB에 저장
      const message = await db.ChatMessage.create({
        roomId: data.roomId,
        senderType: data.senderType,
        adminId: data.adminId,
        content: data.content,
        messageType: data.messageType || 'TEXT',
      });
      // ↱ 해당 room에 있는 모든 socket에게 전달
      io.to(`room_${data.roomId}`).emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log('🔌 소켓 해제:', socket.id);
    });
  });
};