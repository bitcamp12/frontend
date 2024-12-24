import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    async function confirm() {
      const requestData = {
        orderId: searchParams.get("orderId"),
        amount: searchParams.get("amount"),
        paymentKey: searchParams.get("paymentKey"),
      };

      try {
        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
          console.error("Access token is missing");
      }
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/payment/confirm`,
          requestData, // Do not stringify here, axios will automatically stringify
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${accessToken}` 
            },
            withCredentials: true
          });

          if (response.status === 200) {
            // 응답에서 새로운 토큰이 있으면 로컬스토리지에 저장
            const authorizationHeader = response.headers["Authorization"] || response.headers["authorization"];
            if (authorizationHeader) {
                const newToken = authorizationHeader.replace("Bearer ", ""); // "Bearer " 제거
                localStorage.setItem("token", newToken); // 새로운 토큰 저장
            }
        }

        setResponseData(response.data);

        const transformSeats = JSON.parse(decodeURIComponent(searchParams.get("transformSeats")));
        const userDetails = JSON.parse(decodeURIComponent(searchParams.get("userDetails")));
        console.log("Payload:", transformSeats);
        console.log("User:", userDetails);
        
        const payload = {
          seats: transformSeats,
          user: userDetails, 
        };

        const bookResponse = await axios.post(`${process.env.REACT_APP_API_URL}/books/purchaseSeats`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${accessToken}` 
            },
            withCredentials: true
          });

          console.log("axios 요청 시작");
          
          if (response.status === 200) {
            // 응답에서 새로운 토큰이 있으면 로컬스토리지에 저장
            const authorizationHeader = response.headers["Authorization"] || response.headers["authorization"];
            if (authorizationHeader) {
                const newToken = authorizationHeader.replace("Bearer ", ""); // "Bearer " 제거
                localStorage.setItem("token", newToken); // 새로운 토큰 저장
            }
        }
        console.log("bookResponse : ", bookResponse);

        if (bookResponse.data.message !== "성공") {
          alert(`좌석 예약 실패: ${bookResponse.data.message}`);
        }
      } catch (error) {
        console.error("Error during payment confirmation:", error);
        navigate(`/fail?code=${error.code || ''}&message=${error.message}`);
      }
    }

    confirm();
  }, [searchParams]);

  const handleConfirmClick = () => {
    const popupName = searchParams.get("popupRef");
    if (popupName) {
      const popupWindow = window.open('', popupName);
      if(popupWindow) {
        popupWindow.close();
      }
    }
    window.close();
    navigate(0);
    }

  return (
    <>
      <div className="box_section" style={{ width: "600px" }}>
        <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" />
        <h2>결제를 완료했어요</h2>
        <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
          <div className="p-grid-col text--left">
            <b>결제금액</b>
          </div>
          <div className="p-grid-col text--right" id="amount">
            {`${Number(searchParams.get("amount")).toLocaleString()}원`}
          </div>
        </div>
        <div className="p-grid-col">
            <button className="toss-button p-grid-col5" onClick={handleConfirmClick}>확인</button>
          <Link to="https://discord.gg/A4fRFXQhRu">
            <button className="toss-button p-grid-col5" style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}>
              실시간 문의
            </button>
          </Link>
        </div>
      </div>
      {/* <div className="box_section" style={{ width: "600px", textAlign: "left" }}>
        <b>Response Data :</b>
        <div id="response" style={{ whiteSpace: "initial" }}>
          {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
        </div>
      </div> */}
    </>
  );
}
