const theme = {};

theme.PALLETE = {
    primary: { // 대표 색상
        mainGreen: "#01CD74",
        subGreen: "#24C394",
        lightGreen: "#EFFFF8",
        subBlue: "#009DCC"
    },

    black: "#000",
    white: "#fff",

    gray: {
        gray1: "#EEEEEE",
        gray2: "#DDDDDD",
        gray3: "#BBBBBB",
        gray4: "#999999",
        gray5: "#777777",
        gray6: "#555555",
    },

    warningRed: "#FF3F3F",
    pointRed: "#FF4E00",

    background: { // 배경 색상
        white: "#fff"
    } 
}

theme.FONT_SIZE = { // 폰트 크기
    h1:"36px",
    h2:"32px",
    h3:"28px",
    h4:"24px",
    h5:"20px",
    h6:"18px",
    h7:"16px",
    h8:"14px",
    h9:"12px",
    h10:"10px"
}

theme.FONT_WEIGHT = { // 폰트 두께
    thin: "100",
    light: "300",
    regular: "400",
    medium: "500",
    bold: "700",
    
}

// theme.FONT_LINE = { // 줄간격 - 우리팀은 줄 간격 설정을 따로 안 해서 주석 처리 해뒀는데, 필요하면 상의후 추가합시더
//     h1: "50px",
//     h2: "42px",
//     h3: "24px",
//     h4: "28px",
//     h5: "26px",
//     h6: "22px",
//     h7: "15px",
// }

export default theme;
