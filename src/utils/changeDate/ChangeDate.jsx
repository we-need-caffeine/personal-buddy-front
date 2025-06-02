function ChangeDate(dateString) {
    if (!dateString) return "";

    // 파싱
    let date = new Date(dateString);

    // 한국 시간대 (UTC+9) 기준으로 표시
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours < 12 ? '오전' : '오후';
        const displayHour = hours % 12 === 0 ? 12 : hours % 12;
        return `${ampm} ${displayHour}:${minutes}`;
    } else if (diffDays === 1) {
        return '어제';
    } else if (diffDays < 7) {
        return `${diffDays}일 전`;
    } else {
        return date
            .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
            .replace(/\. /g, '.')
            .replace(/\.$/, '');
    }
}

export default ChangeDate;