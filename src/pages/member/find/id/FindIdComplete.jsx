import { Link, useLocation } from 'react-router-dom';
import S from './style';

const FindIdComplete = () => {
  const location = useLocation();
  const { memberName, memberEmail, memberCreateDate } = location.state || {};


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(memberEmail);
      alert("이메일이 복사되었습니다!");
    } catch (err) {
      console.error("복사 실패:", err);
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <S.Container>
          <S.Wrapper>
            <form>
              <S.TitleWrapper>
                <S.Title>
                  <span>이메일 찾기</span>
                </S.Title>
                <S.StepText>
                  <span>1. 본인확인 &gt; <S.ActiveStep>2. 이메일 확인</S.ActiveStep> </span>
                </S.StepText>
              </S.TitleWrapper>
              <S.SubTitle>
                <span>고객님의 정보와 일치하는 아이디 입니다.</span>
              </S.SubTitle>
              <S.ResultBox>
                <S.TextWrapper>
                  <span style={{ fontWeight: '400', fontSize: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    {memberEmail}
                    <img 
                      src="../assets/images/member/copy-icon.png"
                      onClick={handleCopy}
                      alt="복사"
                      style={{ width: '16px', height: '16px', cursor: 'pointer', verticalAlign: 'middle' }}
                    />
                  </span>
                </S.TextWrapper>
                <span>가입일: {new Date(memberCreateDate).toLocaleDateString()}</span>
              </S.ResultBox>
              <S.GoToLogin to="/member/login">로그인 하러 가기</S.GoToLogin>
              <S.SubTitle>
                <span>비밀번호가 기억나지 않는다면?
                  <S.GoToFindPassword to="/member/find-password/identify">비밀번호 찾기</S.GoToFindPassword>
                </span>
              </S.SubTitle>
            </form>
          </S.Wrapper>
        </S.Container>
  );
};

export default FindIdComplete;