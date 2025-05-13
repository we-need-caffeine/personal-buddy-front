import React from 'react';
import { NavLink } from 'react-router-dom';
import { myPageMemberInfoContainer, myPageMemberInfoFollow, myPageMemberInfoFollowContainer, myPageMemberInfoFollowCount, myPageMemberInfoNickName, myPageMemberInfoStatusMessage, myPageMemberProfile, myPageSubTitle, myPageTapContainer, myPageTitle, myPageTitleContainer } from './style';

const MyPageSidebar = () => {

    const isLogin = null;

    return (
        <div>
            {isLogin == null ? (
                <div>
                    <div style={myPageMemberProfile}>
                        <img src='/assets/images/header/memberProfile.png' alt='멤버 프로필 이미지'/>
                    </div>
                    <div style={myPageMemberInfoContainer}>
                        <div style={myPageMemberInfoNickName}>
                            <span>nickName</span>
                        </div>
                        <div style={myPageMemberInfoStatusMessage}>
                            <span>상태 메세지</span>
                        </div>
                        <div style={myPageMemberInfoFollowContainer}>
                            <div style={myPageMemberInfoFollow}>
                                <span>팔로워</span>
                                <span style={myPageMemberInfoFollowCount}>11.1만</span>
                            </div>
                            <div style={myPageMemberInfoFollow}>
                                <span>팔로잉</span>
                                <span style={myPageMemberInfoFollowCount}>11.1만</span>
                            </div>
                        </div>
                    </div>
                    <div style={{width:'200px', height:'40px', display:'flex'}}>
                        <div style={{width:'100px', height:'40px', backgroundColor:'gray'}}></div>
                        <div style={{width:'100px', height:'40px', backgroundColor:'green'}}></div>
                    </div>
                    <div style={myPageTapContainer}>
                        <div style={myPageTitleContainer}>
                            <img src='/assets/images/mypage/member.png' alt='멤버 아이콘'/>
                            <span style={myPageTitle}>마이페이지</span>
                            <div style={myPageSubTitle}>
                                <NavLink to={""}>
                                    <span>나의 성장나무</span>
                                </NavLink>
                            </div>
                            <div style={myPageSubTitle}>
                                <NavLink to={"achievement"}>
                                    <span>나의 업적</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div style={myPageMemberProfile}>
                        <img src='/assets/images/header/memberProfile.png' alt='멤버 프로필 이미지'/>
                    </div>
                    <div style={myPageMemberInfoContainer}>
                        <div style={myPageMemberInfoNickName}>
                            <span>nickName</span>
                        </div>
                        <div style={myPageMemberInfoStatusMessage}>
                            <span>상태 메세지</span>
                        </div>
                        <div style={myPageMemberInfoFollowContainer}>
                            <div style={myPageMemberInfoFollow}>
                                <span>팔로워</span>
                                <span style={myPageMemberInfoFollowCount}>11.1만</span>
                            </div>
                            <div style={myPageMemberInfoFollow}>
                                <span>팔로잉</span>
                                <span style={myPageMemberInfoFollowCount}>11.1만</span>
                            </div>
                        </div>
                    </div>
                    <div style={myPageTapContainer}>
                        <div style={myPageTitleContainer}>
                            <img src='/assets/images/mypage/member.png' alt='멤버 아이콘'/>
                            <span style={myPageTitle}>마이페이지</span>
                            <div style={myPageSubTitle}>
                                <NavLink to={""}>
                                    <span>나의 성장나무</span>
                                </NavLink>
                            </div>
                            <div style={myPageSubTitle}>
                                <NavLink to={"achievement"}>
                                    <span>나의 업적</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div style={myPageTapContainer}>
                        <div style={myPageTitleContainer}>
                            <img src='/assets/images/mypage/members.png' alt='멤버2 아이콘'/>
                            <span style={myPageTitle}>커뮤니티</span>
                            <div style={myPageSubTitle}>
                                <NavLink to={"posts"}>
                                    <span>내 게시물</span>
                                </NavLink>
                            </div>
                            <div style={myPageSubTitle}>
                                <NavLink to={"comments"}>
                                    <span>내가 쓴 댓글</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div style={myPageTapContainer}>
                        <div style={myPageTitleContainer}>
                            <img src='/assets/images/mypage/member.png' alt='멤버 아이콘'/>
                            <span style={myPageTitle}>내 정보</span>
                            <div style={myPageSubTitle}>
                                <NavLink to={"profile-edit"}>
                                    <span>프로필 설정</span>
                                </NavLink>
                            </div>
                            <div style={myPageSubTitle}>
                                <NavLink to={"member-edit"}>
                                    <span>계정 설정</span>
                                </NavLink>
                            </div>
                            <div style={myPageSubTitle}>
                                <NavLink to={"point-log"}>
                                    <span>포인트 내역</span>
                                </NavLink>
                            </div>
                            <div style={myPageSubTitle}>
                                <NavLink to={"survey-edit"}>
                                    <span>추천 정보 수정</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPageSidebar;