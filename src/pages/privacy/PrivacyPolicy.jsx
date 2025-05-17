import React from 'react';
import S from './style';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
    const navigate = useNavigate()

  return (
    <S.Container>
      <S.Title>개인정보 처리방침</S.Title>
        <S.Paragraph>
            여러분을 환영합니다.퍼스널 버디 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다.
            본 약관은 다양한 퍼스널 버디 서비스의 이용과 관련하여 퍼스널 버디 서비스를 제공하는 퍼스널 버디(이하 '회사')와 이용자(이하 '회원') 간의 권리,
            의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
        </S.Paragraph>  

        <S.SectionTitle>
            제1조 (목적)
        </S.SectionTitle>

            <S.Paragraph>
            본 약관은 회사가 제공하는 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </S.Paragraph>
                	
        <S.SectionTitle>
            제2조 (약관의 효력 및 변경)
        </S.SectionTitle>

            <S.Paragraph>
            본 약관은 회원이 서비스에 가입하거나 이용하는 경우 이에 동의한 것으로 간주되며,
            회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 화면에 게시합니다.
            회사는 필요 시 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있으며,
            개정된 약관은 적용일로부터 효력이 발생합니다.
            회원이 개정된 약관에 동의하지 않는 경우, 서비스 이용을 중단하고 회원 탈퇴를 요청할 수 있습니다.
            개정된 약관의 효력 발생 이후에도 서비스를 계속 이용할 경우, 회원은 변경된 약관에 동의한 것으로 간주됩니다.
            </S.Paragraph>

        <S.SectionTitle>
            제3조 (서비스의 제공 및 변경)
        </S.SectionTitle>    

            <S.Paragraph>
            회사는 다음과 같은 서비스를 제공합니다.
            퍼스널 버디 플랫폼을 통한 맞춤형 추천 및 관리 서비스
            기타 회사가 정하는 서비스 회사는 서비스의 내용 및 제공 방식을 변경할 수 있으며,
            변경 사항이 중요한 경우 사전에 공지합니다.
            </S.Paragraph>  

        <S.SectionTitle>
            제4조 (회원가입 및 계정관리)
        </S.SectionTitle>               	
     	
            <S.Paragraph>
            회원은 회사가 정한 절차에 따라 가입 신청을 해야 하며, 회사는 이에 대한 승인을 통해 회원 자격을 부여합니다.
            회원은 자신의 계정 정보를 정확하게 관리해야 하며, 계정 관리 소홀로 인해 발생하는 모든 책임은 회원 본인에게 있습니다.
            </S.Paragraph>

        <S.SectionTitle>
            제5조 (회원의 의무 및 금지사항)
        </S.SectionTitle>    

            <S.Paragraph>
            회원은 관련 법령, 본 약관 및 회사가 정한 운영 정책을 준수해야 합니다.
            회원은 다음 행위를 하여서는 안 됩니다.
            타인의 계정을 도용하는 행위	회사의 서비스 운영을 방해하는 행위 허위 정보를 등록하는 행위
            기타 불법적이거나 부적절한 행위
            </S.Paragraph>

        <S.SectionTitle>
            제6조 (서비스 이용의 제한 및 중지)
        </S.SectionTitle>

        <S.Paragraph>
            회사는 다음과 같은 경우 회원의 서비스 이용을 제한하거나 중지할 수 있습니다.
            회원이 본 약관을 위반한 경우
            서비스 운영에 지장을 초래하는 경우
            기타 회사가 필요하다고 판단하는 경우
            회원이 서비스 이용 제한에 이의가 있을 경우, 회사에 소명할 수 있으며 회사는 이를 검토 후 조치를 결정합니다.
        </S.Paragraph>

        <S.SectionTitle>
            제7조 (개인정보 보호 및 관리)
        </S.SectionTitle>

        <S.Paragraph>
            회사는 관련 법령에 따라 회원의 개인정보를 보호하며, 개인정보 보호정책을 통해 구체적인 내용을 제공합니다.
            회원은 자신의 개인정보를 정확하게 유지해야 하며, 제3자에게 계정을 양도하거나 공유해서는 안 됩니다.
        </S.Paragraph>

        <S.SectionTitle>      	
            제8조 (책임의 한계)
        </S.SectionTitle>  

        <S.Paragraph>
            회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력적 사유로 인해 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.
            회사는 회원이 서비스 이용 과정에서 발생하는 손해에 대해 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.
        </S.Paragraph>

        <S.SectionTitle>         	
            제9조 (기타 조항)
        </S.SectionTitle> 

        <S.Paragraph>
            본 약관에서 정하지 않은 사항은 관련 법령 및 회사가 정한 운영 정책에 따릅니다.
			본 약관과 관련하여 발생하는 분쟁에 대해 회사와 회원은 성실히 협의하여 해결하며, 협의가 이루어지지 않는 경우 관할 법원에 의해 해결됩니다.
        </S.Paragraph>

        <S.BackButton onClick={() => navigate(-1)}> &lt;&lt;이전으로 돌아가기</S.BackButton>
    </S.Container>
  );
};

export default PrivacyPolicy;
