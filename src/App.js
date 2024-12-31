import Main from "./components/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./components/Login";
import Sign_up from "./components/Sign_up";
import Sign_up_Form from "./components/Sign_up_Form";
import PlayDetail from "./components/PlayDetail";
import FindId from './components/FindId';
import FindPwd from './components/FindPwd';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    BrowserRouter,
} from "react-router-dom";
import Infomation from "./components/mypage/Infomation";
import FindIdDetail from "./components/FindIdDetail";
import FindPwdDetail from "./components/FindPwdDetail";
import ResetPwd from "./components/ResetPwd";
import Notice from "./components/Notice";
import CallbackNaver from "./components/OAuth/Naver/CallbackNaver";
import CallbackGoogle from "./components/OAuth/Google/CallbackGoogle";

import Book from "./components/playDetail/Book";
import { CheckoutPage } from "./components/Toss/Checkout";
import { SuccessPage } from "./components/Toss/Success";
import { FailPage } from "./components/Toss/Fail";
import ScrollToTopOnPageLoad from "./components/ScrollToTopOnPageLoad";
import { useEffect } from "react";



const App = () => {

    useEffect(() => {
        window.history.scrollRestoration = "manual";
    }, []);

    return (
        <>
            <BrowserRouter>
                <ScrollToTopOnPageLoad />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<Sign_up />} />
                    <Route path="/signUpForm" element={<Sign_up_Form />} />
                    <Route path="/findId" element={<FindId />} />
                    <Route path="/findPwd" element={<FindPwd />} />
                    <Route path="/findIdDetail" element={<FindIdDetail/>}/>
                    <Route path="/findPwdDetail" element={<FindPwdDetail />} />
                    <Route path="/resetPwd" element={<ResetPwd />} />
                    <Route path="/playDetail/:playSeq" element={<PlayDetail />} />
                    <Route path="/member" element={<Infomation />} />
                    <Route path="/notice" element={<Notice />} />
                    <Route path="/naverloding" element={<CallbackNaver/>}/>
                    <Route path="/googleloding" element={<CallbackGoogle/>}/>
                    <Route path="/bookTicket/:playSeq" element={<Book />} />
                    <Route path="/payment" element={<CheckoutPage />} />
                    <Route path="/success" element={<SuccessPage />} />
                    <Route path="fail" element={<FailPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
