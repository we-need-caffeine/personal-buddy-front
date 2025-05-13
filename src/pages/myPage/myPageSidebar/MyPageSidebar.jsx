import React from 'react';
import { NavLink } from 'react-router-dom';
import S from './style';

const MyPageSidebar = () => {

    const isLogin = 1;

    return (
        <div>
            {isLogin == null ? (
                <div>
                    <S.MyPageMemberProfile>
                        <img src='/assets/images/header/memberProfile.png' alt='멤버 프로필 이미지'/>
                    </S.MyPageMemberProfile>
                        <S.MyPageMemberInfoNickName>
                            <span>nickName</span>
                        </S.MyPageMemberInfoNickName>
                    <S.MyPageMemberInfoContainer>
                        <S.MyPageMemberInfoStatusMessage>
                            <span>상태 메세지</span>
                        </S.MyPageMemberInfoStatusMessage>
                        <S.MyPageMemberInfoFollowContainer>
                            <S.MyPageMemberInfoFollow>
                                <span>팔로워</span>
                                <S.MyPageMemberInfoFollowCount>
                                    <span>11.1만</span>
                                </S.MyPageMemberInfoFollowCount>
                            </S.MyPageMemberInfoFollow>
                            <S.MyPageMemberInfoFollow>
                                <span>팔로잉</span>
                                <S.MyPageMemberInfoFollowCount>
                                    <span>11.1만</span>
                                </S.MyPageMemberInfoFollowCount>
                            </S.MyPageMemberInfoFollow>
                        </S.MyPageMemberInfoFollowContainer>
                    </S.MyPageMemberInfoContainer>
                    <div style={{width:'200px', height:'40px', display:'flex'}}>
                        <div style={{width:'100px', height:'40px', backgroundColor:'gray'}}></div>
                        <div style={{width:'100px', height:'40px', backgroundColor:'green'}}></div>
                    </div>
                    <S.MyPageTapContainer>
                        <S.MyPageTitleContainer>
                            <S.MyPageTitle>
                                <S.MyPageTitleIcon>
                                    <img src='/assets/images/mypage/member.png' alt='멤버 아이콘'/>
                                </S.MyPageTitleIcon>
                                <span>마이페이지</span>
                            </S.MyPageTitle>
                            <S.MyPageSubTitle>
                                <NavLink to={""}>
                                    <span>나의 성장나무</span>
                                </NavLink>
                            </S.MyPageSubTitle>
                            <S.MyPageSubTitle>
                                <NavLink to={"achievement"}>
                                    <span>나의 업적</span>
                                </NavLink>
                            </S.MyPageSubTitle>
                        </S.MyPageTitleContainer>
                    </S.MyPageTapContainer>
                </div>
            ) : (
                <div>
                    <S.MyPageMemberProfile>
                        <img src='/assets/images/header/memberProfile.png' alt='멤버 프로필 이미지'/>
                    </S.MyPageMemberProfile>
                    <S.MyPageMemberInfoContainer>
                        <S.MyPageMemberInfoNickName>
                            <span>nickName</span>
                        </S.MyPageMemberInfoNickName>
                        <S.MyPageMemberInfoStatusMessage>
                            <span>상태 메세지</span>
                        </S.MyPageMemberInfoStatusMessage>
                        <S.MyPageMemberInfoFollowContainer>
                            <S.MyPageMemberInfoFollow>
                                <span>팔로워</span>
                                <S.MyPageMemberInfoFollowCount>
                                    <span>11.1만</span>
                                </S.MyPageMemberInfoFollowCount>
                            </S.MyPageMemberInfoFollow>
                            <S.MyPageMemberInfoFollow>
                                <span>팔로잉</span>
                                <S.MyPageMemberInfoFollowCount>
                                    <span>11.1만</span>
                                </S.MyPageMemberInfoFollowCount>
                            </S.MyPageMemberInfoFollow>
                        </S.MyPageMemberInfoFollowContainer>
                    </S.MyPageMemberInfoContainer>
                    <S.MyPageTapContainer>
                        <S.MyPageTitleContainer>
                            <S.MyPageTitle>
                                <S.MyPageTitleIcon>
                                    <img src='/assets/images/mypage/member.png' alt='멤버 아이콘'/>
                                </S.MyPageTitleIcon>
                                <span>마이페이지</span>
                            </S.MyPageTitle>
                            <S.MyPageSubTitle>
                                <NavLink to={""}>
                                    <span>나의 성장나무</span>
                                </NavLink>
                            </S.MyPageSubTitle>
                            <S.MyPageSubTitle>
                                <NavLink to={"achievement"}>
                                    <span>나의 업적</span>
                                </NavLink>
                            </S.MyPageSubTitle>
                        </S.MyPageTitleContainer>
                    </S.MyPageTapContainer>
                    <S.MyPageTapContainer>
                        <S.MyPageTitleContainer>
                            <S.MyPageTitle>
                                <S.MyPageTitleIcon>
                                    <img src='/assets/images/mypage/members.png' alt='멤버2 아이콘'/>
                                </S.MyPageTitleIcon>
                                <span>커뮤니티</span>
                            </S.MyPageTitle>
                            <S.MyPageSubTitle>
                                <NavLink to={"posts"}>
                                    <span>내 게시물</span>
                                </NavLink>
                            </S.MyPageSubTitle>
                            <S.MyPageSubTitle>
                                <NavLink to={"comments"}>
                                    <span>내가 쓴 댓글</span>
                                </NavLink>
                            </S.MyPageSubTitle>
                        </S.MyPageTitleContainer>
                    </S.MyPageTapContainer>
                    <S.MyPageTapContainer>
                        <S.MyPageTitleContainer>
                            <S.MyPageTitle>
                                <S.MyPageTitleIcon>
                                    <img src='/assets/images/mypage/member.png' alt='멤버 아이콘'/>
                                </S.MyPageTitleIcon>
                                <span>내 정보</span>
                            </S.MyPageTitle>
                            <S.MyPageSubTitle>
                                <NavLink to={"profile-edit"}>
                                    <span>프로필 설정</span>
                                </NavLink>
                            </S.MyPageSubTitle>
                            <S.MyPageSubTitle>
                                <NavLink to={"member-edit"}>
                                    <span>계정 설정</span>
                                </NavLink>
                            </S.MyPageSubTitle>
                            <S.MyPageSubTitle>
                                <NavLink to={"point-log"}>
                                    <span>포인트 내역</span>
                                </NavLink>
                            </S.MyPageSubTitle>
                            <S.MyPageSubTitle>
                                <NavLink to={"survey-edit"}>
                                    <span>추천 정보 수정</span>
                                </NavLink>
                            </S.MyPageSubTitle>
                        </S.MyPageTitleContainer>
                    </S.MyPageTapContainer>
                </div>
            )}
        </div>
    );
};


export default MyPageSidebar;