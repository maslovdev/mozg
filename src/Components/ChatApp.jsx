
import "./main.css";

import React, { useState, useEffect } from 'react';
import axios from 'axios';





function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Получаем все сообщения при загрузке страницы
  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const response = await axios.get('https://primarily-ace-buffalo.ngrok-free.app/api/messages/');
      
      if (!Array.isArray(response.data)) {
        throw new Error("Ответ сервера должен содержать массив");
      }
      
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setNewMessage('');
    try {
      const response = await axios.post(
        'https://primarily-ace-buffalo.ngrok-free.app/api/messages/',
        { text: newMessage },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      setIsLoading(false);
      setMessages([...messages, { text: newMessage, processed_text: response.data.processed_text }]);
      
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }
  const containerStyle = {
    whiteSpace: 'pre-wrap', // Эффект, аналогичный <pre>
    wordWrap: 'break-word', // Перенос слов
    // Вы можете добавить другие стили сюда
  };
  

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    userid: '',
    photoUrl: ''
});

useEffect(() => {
    // Проверяем, доступен ли объект WebApp
    if (window.Telegram && window.Telegram.WebApp) {
        const user = window.Telegram.WebApp.initDataUnsafe.user;

        if (user) {
            setUserData({
                firstName: user.first_name || '',
                lastName: user.last_name || '',
                userid: user.id || '',
                photoUrl: user.photo_url || '' // Вы можете использовать это поле, если оно доступно
            });
        }
    }  
}, []);



  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="input-container">
                          <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Cообщение"
                              />
                           <button className="button" type="submit">
                             <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="7.00391" width="2" height="17" rx="1" fill="white"/>
                              <rect x="7.15625" y="1.26416" width="1.78777" height="10.7266" rx="0.893885" transform="rotate(-45 7.15625 1.26416)" fill="white"/>
                                 <rect x="7.58594" width="1.78777" height="10.7266" rx="0.893885" transform="rotate(45 7.58594 0)" fill="white"/>
                              </svg>
                            </button>
        </div>
      </form>
      


      <div className="m">
      {messages.length === 0 ? (
        <div>
          <div className='nomessage'>
             <div className="container-nomessage">
                  <div className="maintext-nomessage">
                       Сообщений пока нет
                  </div>
                  <div className="text-nomessage">
                       Задайте мне любой вопрос и я постараюсь дать вам ответ
                  </div>
                  <div className='img-nomessage'>
                        <img className='gif-nomessage' src="https://i.yapx.cc/YQuRO.gif" alt="" />               
                  </div>
              </div>
          </div> 
                {isLoading &&           
      <div className="back">
                  <div className='nomessage'>
                         <div className="container-nomessage">
                              <div className="maintext-nomessage">
                                   Загрузка...
                              </div>
                              <div className="text-nomessage">
                                   Идет генерация ответа, пожалуйста подождите
                              </div>
                              <div className='img-nomessage'>
                                    <img className='gif-nomessage2' src="https://i.yapx.cc/YTZdC.gif" alt="" />               
                              </div>
                          </div>
                      </div> 
       </div>
                      }
            </div>              
        
      ) : (
        
        messages.map((message, index) => (        
      <div>
                                 {isLoading &&           
       <div className="back">
                  <div className='nomessage'>
                        <div className="container-nomessage">
                           <div className="maintext-nomessage">
                            Загрузка...
                            </div>
                           <div className="text-nomessage">
                            Идет генерация ответа, пожалуйста подождите
                            </div>
                             <div className='img-nomessage'>
                         <img className='gif-nomessage2' src="https://i.yapx.cc/YTZdC.gif" alt="" />               
                   </div>
                  </div>
                 </div> 
        </div>
          }  

          <div className="message_container">
          <div  className="message max-w70">
             <div className='user'>{userData.firstName} {userData.lastName}</div>
            
          <div  key={index}>{message.text}</div>
          </div>
          <div className="c-img">{userData.photoUrl && (
            <img className='user-img img-l4'  src={userData.photoUrl} alt={`${userData.firstName} ${userData.lastName}`} />
            )}
          </div>
         </div> 

         <div className='message_container2'>
                        <svg className='user-img img-r4' width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="34.6875" height="34.5205" rx="17.2603" fill="black"/><path d="M12.9545 23.815C12.781 24.1429 11.6897 26.2832 9.57245 26.2832C9.03482 26.2832 8.39306 25.938 8.1329 25.4547C7.87274 24.9714 7.75136 24.7125 7.57792 22.8312C7.40448 20.9498 7.27123 18.2178 7.57792 16.1514C8.01282 13.2212 8.87776 10.4468 11.9152 8.9277C13.6149 8.07766 17.9379 8.20998 18.9381 8.233V8.36706C19.1 14.0054 19.3786 25.327 19.1982 25.5065C18.9728 25.7309 18.3831 26.1451 17.776 26.2487C17.169 26.3522 16.6487 26.1796 16.2671 26.007C15.8856 25.8344 15.452 25.4029 15.1225 25.0405C14.7929 24.678 14.2078 23.508 13.9791 23.1286C13.875 22.956 13.8057 22.8312 13.6309 22.8312C13.4935 22.8312 13.4414 22.9733 13.3374 23.1286C13.2893 23.2004 13.1279 23.4871 12.9545 23.815Z" fill="white"/><path d="M21.8424 23.802C22.0158 24.1299 23.1072 26.2702 25.2244 26.2702C25.7621 26.2702 26.4038 25.925 26.664 25.4417C26.9241 24.9584 27.0455 24.6995 27.219 22.8182C27.3924 20.9368 27.5256 18.2048 27.219 16.1384C26.7841 13.2082 25.9191 10.4338 22.8817 8.91471C21.182 8.06466 16.859 8.21011 15.8588 8.23312V8.35406C15.6969 13.9924 15.4183 25.314 15.5986 25.4935C15.8241 25.7179 16.4138 26.1321 17.0208 26.2357C17.6279 26.3392 18.1482 26.1666 18.5297 25.994C18.9113 25.8214 19.3449 25.3899 19.6744 25.0275C20.004 24.665 20.5891 23.495 20.8178 23.1156C20.9218 22.943 20.9912 22.8182 21.166 22.8182C21.3034 22.8182 21.3554 22.9603 21.4595 23.1156C21.5076 23.1874 21.669 23.4741 21.8424 23.802Z" fill="white"/></svg>
                        {/* <div className="cursor"></div>  */}
                          <div className="message max-w90">
                         <div className="user">MozgGPT</div>
                         <div key={index}>
                         <div style={containerStyle}>{message.processed_text}</div>
                         </div>
                         </div>
                         </div>                  
    </div>
        ))
        
      )}</div>
    </div>
  );
}

export default ChatApp;