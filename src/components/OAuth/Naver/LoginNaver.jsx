import { useEffect } from 'react';

const { naver } = window;
    const NaverLogin = () => {
        const naverClientId = `fMDjfAFks4nyz8Itoz5_`; // 환경 변수로 설정
    const naverCallbackUrl = "http://localhost:8080/api/login/naver";

    
        const initializeNaverLogin = () => {
          const naverLogin = new naver.LoginWithNaverId({
            clientId: naverClientId,
            callbackUrl: naverCallbackUrl,
            isPopup: false, // popup 형식으로 띄울것인지 설정
            loginButton: { color: 'green', type: 1, height: '60' }, //버튼의 스타일, 타입, 크기를 지정
          });
          naverLogin.init();
        };
       
        useEffect(() => {
          initializeNaverLogin();
        }, []);
       
        return <div id='naverIdLogin' />;
      };

export default NaverLogin;