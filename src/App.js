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
import Book from "./components/playDetail/Book";



const App = () => {
    return (
        <>
            <BrowserRouter>
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
                    <Route path="/bookTicket/:playSeq" element={<Book />} /> 
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
