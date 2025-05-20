import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJoin } from './JoinContext';
import S from './style';

const JoinAgree = () => {
  const [agreements, setAgreements] = useState({
    all: false,
    service: false,
    information: false,
    location: false,
  });

  const [agreed, setAgreed] = useState(false);


  const { joinData, setJoinData } = useJoin();
  const navigate = useNavigate();

  useEffect(() => {
    if (agreed) {
      navigate("/member/join/info");
    }
  }, [agreed]);

  const handleNext = (e) => {
  e.preventDefault();

  const service = agreements.service ? 1 : 0;
  const information = agreements.information ? 1 : 0;
  const location = agreements.location ? 1 : 0;

  setJoinData((prev) => ({
    ...prev,
    memberTermServiceAgree: service,
    memberTermInformationAgree: information,
    memberTermLocationAgree: location,
  }));

  setAgreed(true);
};

  const toggle = (key) => {
    if (key === 'all') {
      const newValue = !agreements.all;
      setAgreements({
        all: newValue,
        service: newValue,
        information: newValue,
        location: newValue
      });
    } else {
      setAgreements((prev) => {
        const updated = { ...prev, [key]: !prev[key] };
        updated.all = updated.service && updated.information && updated.location;
        return updated;
      });
    }
  };

  // 필수 항목만 체크
  const isValid = agreements.service && agreements.information && agreements.location;

  const getSrc = (flag) =>
    flag
      ? '/assets/images/member/checkbox-icon-true.png'
      : '/assets/images/member/checkbox-icon-false.png';

  return (
    <S.Container>
      <form onSubmit={handleNext}>
        <S.TextWrapper>
          <S.HiddenInput name="agreeAll" value={agreements.all ? 1 : 0} />
          <S.CheckboxImg src={getSrc(agreements.all)} alt="전체 동의" onClick={() => toggle('all')} />
          <S.TermText onClick={() => toggle('all')}>전체 동의</S.TermText>
        </S.TextWrapper>

        <S.SubTextWrapper>
          <S.HiddenInput name="agreeService" value={agreements.service ? 1 : 0} required />
          <S.CheckboxImg src={getSrc(agreements.service)} alt="이용약관" onClick={() => toggle('service')} />
          <S.TermText><span className='point'>[필수]</span> 퍼스널 버디 이용약관</S.TermText>
        </S.SubTextWrapper>
        <S.TextBox>
        <p>여러분을 환영합니다.퍼스널 버디 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다.
          본 약관은 다양한 퍼스널 버디 서비스의 이용과 관련하여 퍼스널 버디 서비스를 제공하는 퍼스널 버디(이하 '회사')와 이용자(이하 '회원') 간의 권리,
          의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.<br /><br />
          
          제1조 (목적)<br /><br />
          본 약관은 회사가 제공하는 서비스의 이용과 관련하여 회사와 회원 간의 권리, 
          의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.<br /><br />
          
          제2조 (약관의 효력 및 변경)<br /><br />
          본 약관은 회원이 서비스에 가입하거나 이용하는 경우 이에 동의한 것으로 간주되며,
          회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 화면에 게시합니다.
          회사는 필요 시 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있으며,
          개정된 약관은 적용일로부터 효력이 발생합니다.
          회원이 개정된 약관에 동의하지 않는 경우, 서비스 이용을 중단하고 회원 탈퇴를 요청할 수 있습니다.
          개정된 약관의 효력 발생 이후에도 서비스를 계속 이용할 경우, 회원은 변경된 약관에 동의한 것으로 간주됩니다.<br /><br />
          
          제3조 (서비스의 제공 및 변경)<br /><br />
          회사는 다음과 같은 서비스를 제공합니다.
          퍼스널 버디 플랫폼을 통한 맞춤형 추천 및 관리 서비스
          기타 회사가 정하는 서비스 회사는 서비스의 내용 및 제공 방식을 변경할 수 있으며,
          변경 사항이 중요한 경우 사전에 공지합니다.<br /><br />
          
          제4조 (회원가입 및 계정관리)<br /><br />
          회원은 회사가 정한 절차에 따라 가입 신청을 해야 하며, 회사는 이에 대한 승인을 통해 회원 자격을 부여합니다.
          회원은 자신의 계정 정보를 정확하게 관리해야 하며, 계정 관리 소홀로 인해 발생하는 모든 책임은 회원 본인에게 있습니다.<br /><br />
          
          제5조 (회원의 의무 및 금지사항)<br /><br />
          회원은 관련 법령, 본 약관 및 회사가 정한 운영 정책을 준수해야 합니다.
          회원은 다음 행위를 하여서는 안 됩니다.
          타인의 계정을 도용하는 행위	회사의 서비스 운영을 방해하는 행위 허위 정보를 등록하는 행위
          기타 불법적이거나 부적절한 행위<br /><br />
          
          제6조 (서비스 이용의 제한 및 중지)<br /><br />
          회사는 다음과 같은 경우 회원의 서비스 이용을 제한하거나 중지할 수 있습니다.
          회원이 본 약관을 위반한 경우
          서비스 운영에 지장을 초래하는 경우
          기타 회사가 필요하다고 판단하는 경우
          회원이 서비스 이용 제한에 이의가 있을 경우, 회사에 소명할 수 있으며 회사는 이를 검토 후 조치를 결정합니다.<br /><br />
          
          제7조 (개인정보 보호 및 관리)<br /><br />
          회사는 관련 법령에 따라 회원의 개인정보를 보호하며, 개인정보 보호정책을 통해 구체적인 내용을 제공합니다.
          회원은 자신의 개인정보를 정확하게 유지해야 하며, 제3자에게 계정을 양도하거나 공유해서는 안 됩니다.<br /><br />
          
          제8조 (책임의 한계)<br /><br />
          회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력적 사유로 인해 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.
          회사는 회원이 서비스 이용 과정에서 발생하는 손해에 대해 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.<br /><br />
          
          제9조 (기타 조항)<br /><br />
          본 약관에서 정하지 않은 사항은 관련 법령 및 회사가 정한 운영 정책에 따릅니다.
          본 약관과 관련하여 발생하는 분쟁에 대해 회사와 회원은 성실히 협의하여 해결하며, 협의가 이루어지지 않는 경우 관할 법원에 의해 해결됩니다.<br /><br /></p>
        </S.TextBox>
      

        <S.SubTextWrapper>
          <S.HiddenInput name="agreeInformation" value={agreements.information ? 1 : 0} required />
          <S.CheckboxImg src={getSrc(agreements.information)} alt="개인정보 수집" onClick={() => toggle('information')} />
          <S.TermText><span className='point'>[필수]</span> 개인정보 수집 및 이용</S.TermText>
        </S.SubTextWrapper>
        <S.TextBox>
        <p>본 약관에서 정하지 않은 사항은 관련 법령 및 회사가 정한 운영 정책에 따릅니다.<br /><br />
                본 약관과 관련하여 발생하는 분쟁에 대해 회사와 회원은 성실히 협의하여 해결하며, 
                협의가 이루어지지 않는 경우 관할 법원에 의해 해결됩니다.<br /><br />
                개인정보 이용 및 수집 동의개인정보보호법에 따라 퍼스널 버디 서비스에 
                회원가입 신청하시는 분께 수집하는 개인정보의 항목, 
                개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 
                동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.<br /><br />
                수집하는 개인정보의 항목<br />
                필수항목: 이름, 이메일 주소, 비밀번호, 휴대전화 번호<br />
                선택항목: 생년월일, 성별, 관심사 등<br />
                개인정보의 수집 및 이용 목적<br />
                회원 가입 및 관리<br />
                서비스 제공 및 운영<br />
                고객 지원 및 문의 응대<br />
                서비스 개선 및 맞춤형 서비스 제공<br />
                개인정보의 보유 및 이용기간<br />
                회원 탈퇴 시까지 보유 및 이용<br />
                법령에 따라 보존이 필요한 경우 해당 법령에서 정한 기간 동안 보관<br />
                동의 거부권 및 동의 거부 시 불이익<br />
                개인정보 제공에 동의하지 않을 권리가 있으며, 동의하지 않을 경우 서비스 이용이 제한될 수 있습니다.</p>
        </S.TextBox>

        <S.SubTextWrapper>
          <S.HiddenInput name="agreeLocation" value={agreements.location ? 1 : 0} required />
          <S.CheckboxImg src={getSrc(agreements.location)} alt="위치기반 서비스" onClick={() => toggle('location')} />
          <S.TermText><span className='point'>[필수]</span> 위치기반 서비스 이용약관</S.TermText>
        </S.SubTextWrapper>
        <S.TextBox>
        <p>위치기반서비스 이용 동의<br /><br />
                위치기반서비스 이용약관에 동의하시면, 
                위치를 활용한 광고 정보 수신 등을 포함하는 퍼스널 버디 위치기반 서비스를 이용할 수 있습니다.<br /><br />
                제1조 (목적)<br /><br />
                본 약관은 회사가 제공하는 위치기반서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정하는 것을 목적으로 합니다.<br /><br />
                제2조 (위치정보의 수집 및 이용목적)<br /><br />
                회사는 회원의 위치정보를 활용하여 맞춤형 서비스 및 광고를 제공합니다.
                위치정보는 실시간 서비스 제공, 길찾기 지원, 주변 정보 안내 등을 위해 이용됩니다.<br /><br />
                제3조 (위치정보의 보유 및 이용기간)<br /><br />
                회사는 회원의 위치정보를 필요한 기간 동안만 보유하며, 
                법령에 따라 보존이 필요한 경우 해당 법령에서 정한 기간 동안 보관합니다.
                회원은 언제든지 위치정보 제공을 중단할 수 있습니다.<br /><br />
                제4조 (동의 거부권 및 동의 거부 시 불이익)<br /><br />
                회원은 위치정보 제공에 동의하지 않을 권리가 있으며, 동의하지 않더라도 기본 서비스 이용에는 제한이 없습니다.
                단, 위치기반 맞춤형 서비스 및 광고 수신이 제한될 수 있습니다.<br /><br /></p>
        </S.TextBox>

        <S.NextButton type="submit" className={isValid ? 'active' : ''} disabled={!isValid}>
          다음
        </S.NextButton>
      </form>
    </S.Container>
  );
};

export default JoinAgree;
