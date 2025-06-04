import React, { useState } from 'react';
import S from './style';

const faqList = [
  {
    question: '퍼스널 버디란 무엇인가요?',
    answer:
      ` 
        퍼스널 버디란 "Personal"(개인적인, 나만의)과 "Buddy"(친구, 동반자)의 조합으로,언제 어디서나 나를 이해하고 도와주는 '맞춤형 일정 & 라이프 관리 친구’ 라는 의미를 담고 있습니다.
        퍼스널 버디는 개인화된 일정 관리와 삶의 질 향상을 목표로 한 혁신 플랫폼입니다.
        업무 일정과 개인 일정을 분리하고 추천 시스템과 커뮤니티 기능의 통합으로 재미를 더 하였으며,
        퍼스널 버디만의 성장나무로 성취감과 몰입을 강화했습니다.
        `,
  },
  {
    question: '공유 캘린더는 어떻게 사용하나요?',
    answer:
      `
        새로운 캘린더를 생성하면, 해당 캘린더의 고유 URL이 자동으로 생성됩니다.
        이 URL을 공유하고 싶은 사용자에게 전달합니다.
        사용자는 해당 URL에 접속하여 ‘참가하기’ 버튼을 누릅니다.
        초대된 화면이 나타나면, 공유된 캘린더를 함께 조회하고 사용할 수 있습니다.       
      `,
  },
  {
    question: '이메일을 변경할 수 있나요?',
    answer:
      `
        퍼스널 버디에서는 보안 및 시스템상의 이유로 이미 등록한 이메일은 변경할 수 없습니다.
        다른 이메일를 사용하려면 새로운 이메일로 다시 가입 후 이용하세요.
      `,
  },
  {
    question: '추천 정보는 어디서 변경 하나요?',
    answer:
      '마이페이지 > 추천 정보 수정 탭에서 관심사 및 추천 콘텐츠 설정을 변경할 수 있습니다.',
  },
];

const Faq = () => {
  const [answer, setAnswer] = useState(null);

  const toggleAnswer = (index) => {
    setAnswer(answer === index ? null : index);
  };

  return (
    <S.Section>
      <S.Wrapper>
        <S.SubLabel>도움말 찾아보기</S.SubLabel>
        <S.SubTitle>자주 묻는 질문</S.SubTitle>
        <S.List>
          {faqList.map((item, i) => (
            <S.Item key={i} className={answer === i ? 'active' : ''}>
              <S.Header onClick={() => toggleAnswer(i)}>
                <S.Q>Q.</S.Q>
                <S.Text>{item.question}</S.Text>
                <S.Icon
                  src='../assets/images/faq/arrow-icon.png'
                  alt='>'
                  className='cs-icon'
                  rotate={answer === i}
                />
              </S.Header>
              {answer === i && 
              <S.Answer>{item.answer}</S.Answer>
              }
            </S.Item>
          ))}
        </S.List>
      </S.Wrapper>
    </S.Section>
  );
};

export default Faq;