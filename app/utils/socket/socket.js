import db from "../../models/index.js";
const { ChatMessage, ChatRoom } = db;

import subscriptionService from "../../services/subscription.service.js";

//                              ↱ app.js에서 io 객체를 받아옴
export const initChatSocket = (io) => {
  //                    ↱ 새 클라이언트가 연결될 때마다 socket 객체 생성
  io.on('connection', (socket) => {
    console.log('🔌 소켓 연결:', socket.id);

    //          ↱ 클라이언트가 'join' 이벤트 보내면 실행
    socket.on('join', async (data) => {
      try {
        const roomId = data?.roomId;
        const userType = data?.userType;

        // roomId 필수 체크
        if (!roomId) {
          console.log('⚠️ join: roomId 없음', data);
          return;
        }

        //       ↱ 이 socket을 특정 room에 추가
        socket.join(`room_${roomId}`);

        // userType 없으면 읽음 처리 스킵
        if (!userType) return;

        // 입장 시 상대방이 보낸 읽지 않은 메시지들 읽음 처리
        const targetSenderType = userType === 'USER' ? 'ADMIN' : 'USER';
        const updatedMessages = await ChatMessage.findAll({
          where: { roomId, isRead: false, senderType: targetSenderType }
        });

        if (updatedMessages.length > 0) {
          await ChatMessage.update(
            { isRead: true },
            { where: { roomId, isRead: false, senderType: targetSenderType } }
          );

          // 상대방에게 읽음 알림
          const messageIds = updatedMessages.map(m => m.id);
          io.to(`room_${roomId}`).emit('messagesRead', { messageIds });
        }
      } catch (error) {
        console.error('❌ join 에러:', error);
      }
    });

    // 실시간 읽음 처리
    socket.on('read', async (data) => {
      try {
        const messageId = data?.messageId;
        const roomId = data?.roomId;

        if (!messageId || !roomId) return;

        await ChatMessage.update({ isRead: true }, { where: { id: messageId } });
        io.to(`room_${roomId}`).emit('messagesRead', { messageIds: [messageId] });
      } catch (error) {
        console.error('❌ read 에러:', error);
      }
    });

    //                           ↱ 클라이언트가 보낸 데이터
    socket.on('message', async (data) => {
      try {
        //                     ↱ DB에 저장
        const message = await ChatMessage.create({
          roomId: data.roomId,
          senderType: data.senderType,
          adminId: data.adminId,
          content: data.content,
          messageType: data.messageType || 'TEXT',
        });
        console.log('💾 DB 저장 성공:', message.id);
        
        // ↱ 해당 room에 있는 모든 socket에게 전달
        io.to(`room_${data.roomId}`).emit('message', message);

        // pwa 푸시 알림
        if(message.senderType === 'ADMIN') {
          const room = await ChatRoom.findByPk(message.roomId);
          if (room && room.userId) {
            setTimeout(async () => {

              await subscriptionService.sendPushNotification(
                room.userId,
                'MEMBER.', // 받는 사람 타입
                {
                  title: '1:1 상담 답장이 도착했어요.',
                  message: message.messageType === 'IMAGE' ? '사진을 보냈습니다.' : message.content, // "안녕하세요" or "사진을 보냈습니다"
                  data: { targetUrl: `/chat` } // 클릭 시 이동할 주소
                }
              )
              console.log('⏰ 3초 뒤 푸시 발송 완료!');
            }, 3000)
          }
        }
        
      } catch (error) {
        console.error('❌ 메시지 저장 실패:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('🔌 소켓 해제:', socket.id);
    });
  });
};