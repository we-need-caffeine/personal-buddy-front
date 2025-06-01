import styled from "styled-components";
import {
  fontSizeH4,
  fontSizeH8,
  fontWeightRegular,
  fontWeightLight,
} from "../../../../globals/common";


const S = {};
S.CustomEventTitle = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: #333;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 4px 6px;
  border-radius: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
` 
; 

S.CalendarWrapper = styled.div`
  width: ${({ isNested }) => (isNested ? "840px" : "1400px")};
  height: 780px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  /* 좌측 시간 라벨 배경 */
  .fc-timegrid-slot-label {
    background-color: #eefff8;
    border: none;
  }

  /* 가운데 시간표 배경 */
  .fc-timegrid-body,
  .fc-timegrid-col,
  .fc-timegrid-col-frame {
    background-color: #ffffff;
  }

  .fc-timegrid-slot-label {
    background-color: #ffffff;
    
  }

  /* 요일 헤더 제거 */
  .fc-col-header {
    display: none;
  }

  /* 전체 테두리 제거 */
  .fc-scrollgrid,
  .fc-scrollgrid-section,
  .fc-scrollgrid-sync-table,
  .fc-timegrid {
    border: none !important;
  }
  .fc-timegrid-slot-lane,
  .fc-scrollgrid,
  .fc-scrollgrid td,
  .fc-scrollgrid-section {
    border-right: none !important;
  }

  .fc-scroller,
  .fc-scroller-liquid-absolute {
    background: transparent !important;
    overflow-y: overlay !important;
    padding-right: 0 !important;
    margin-right: 0 !important;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .fc-scroller::-webkit-scrollbar {
    display: none;
  }

  .fc-timegrid-body,
  .fc-timegrid-body > table,
  .fc-timegrid-body > table td:last-child {
    width: 100% !important;
    max-width: 100% !important;
    background-color: transparent !important;
    padding-right: 0 !important;
    margin-right: 0 !important;
    box-sizing: border-box;
  }

  .fc-timegrid-slot {
    border-top: 1px solid #e5e7eb;
  }

  .fc-timegrid-divider {
    display: none !important;
  }

  .fc-timegrid-now-indicator-line {
    border-top: 2px solid #01cd74 !important;
  }

  .fc-timegrid-now-indicator-arrow {
    border-left: 6px solid #01cd74 !important;
    border-top: 6px solid transparent !important;
    border-bottom: 6px solid transparent !important;
    border-right: none !important;
    margin-top: -6px;
  }

  .fc-event {
    border: none !important;
    color: white !important;
    margin: 0 !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    height: 100% !important;
    padding: 4px 6px !important;
    font-size: 13px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .fc-timegrid-event-harness {
    display: flex;
    align-items: center;
  }

  .fc-highlight {
    background-color: #01cd74 !important;
    opacity: 0.4;
  }

  .fc-v-event {
    --fc-event-bg-color: transparent;
    border: 1px solid var(--fc-event-border-color);
  }
`;

S.DateInfoWrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #01cd74;
`;

S.TodayText = styled.span`
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

S.ArrowIcon = styled.img`
  margin-right: 10px;
  width: 12px;
  height: 24px;
  cursor: pointer;
`;

S.LeftArrowIcon = styled(S.ArrowIcon)`
  width: 12px;
  height: 24px;
  transform: rotate(180deg);
`;

export default S;
