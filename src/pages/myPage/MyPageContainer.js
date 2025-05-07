import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import memberProfile from '../../../public/assets/images/header/memberProfile.png';
import memberImg from '../../../public/assets/images/mypage/member.png';
import membersImg from '../../../public/assets/images/mypage/members.png';

const MyPageContainer = () => {
  return (
    <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
      <div style={{marginTop:'70px', width:"1400px", display:'flex', justifyContent:'space-between'}}>
        <div style={{width:"200px"}}>
          <div style={{width:'200px', height:'200px'}}>
            <img src={memberProfile} />
          </div>
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', border:'solid 1px #DDDDDD', width:'198px',}}>
            <div style={{fontSize:'18px', marginTop:'30px'}}>
              <span>nickName</span>
            </div>
            <div style={{fontSize:'12px', color:'#777', marginTop:'10px'}}>
              <span>상태 메세지</span>
            </div>
            <div style={{width:'190px', fontSize:'14px', color:'#777', margin:'20px 0', display:'flex', justifyContent:'center'}}>
              <span style={{margin:'0 5px', display:'flex'}}>팔로워 <p style={{color:'#01CD74', marginLeft:'2px'}}>11.1만</p></span>
              <span style={{margin:'0 5px', display:'flex'}}>팔로잉 <p style={{color:'#01CD74', marginLeft:'2px'}}>11.1만</p></span>
            </div>
          </div>
          <div style={{border:'solid 1px #DDDDDD', width:'198px'}}>
            <div style={{margin:'20px 20px 10px 20px', fontSize:'18px'}}>
              <img src={memberImg} />
              <span style={{marginLeft:'5px'}}>마이페이지</span>
              <div style={{fontSize:'14px', display:'flex', flexDirection:'column', margin:'10px 24px'}}>
                <NavLink to={""}>
                  <span>나의 성장나무</span>
                </NavLink>
              </div>
              <div style={{fontSize:'14px', display:'flex', flexDirection:'column', margin:'10px 24px'}}>
                <NavLink to={"achievement"}>
                  <span>나의 업적</span>
                </NavLink>
              </div>
            </div>
          </div>
          <div style={{border:'solid 1px #DDDDDD', width:'198px'}}>
            <div style={{margin:'20px 20px 10px 20px', fontSize:'18px'}}>
              <img src={membersImg} />
              <span style={{marginLeft:'5px'}}>커뮤니티</span>
              <div style={{fontSize:'14px', display:'flex', flexDirection:'column', margin:'10px 24px'}}>
                <NavLink to={"achievement"}>
                  <span>내 게시물</span>
                </NavLink>
              </div>
              <div style={{fontSize:'14px', display:'flex', flexDirection:'column', margin:'10px 24px'}}>
                <NavLink to={"comments"}>
                  <span>내가 쓴 댓글</span>
                </NavLink>
              </div>
            </div>
          </div>
          <div style={{border:'solid 1px #DDDDDD', width:'198px'}}>
            <div style={{margin:'20px 20px 10px 20px', fontSize:'18px'}}>
              <img src={memberImg} />
              <span style={{marginLeft:'5px'}}>내 정보</span>
              <div style={{fontSize:'14px', display:'flex', flexDirection:'column', margin:'10px 24px'}}>
                <NavLink to={"profile-edit"}>
                  <span>프로필 설정</span>
                </NavLink>
              </div>
              <div style={{fontSize:'14px', display:'flex', flexDirection:'column', margin:'10px 24px'}}>
                <NavLink to={"member-edit"}>
                  <span>계정 설정</span>
                </NavLink>
              </div>
              <div style={{fontSize:'14px', display:'flex', flexDirection:'column', margin:'10px 24px'}}>
                <NavLink to={"point-log"}>
                  <span>포인트 내역</span>
                </NavLink>
              </div>
              <div style={{fontSize:'14px', display:'flex', flexDirection:'column', margin:'10px 24px'}}>
                <NavLink to={"survey-edit"}>
                  <span>추천 정보 수정</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div style={{width:'1160px'}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MyPageContainer;