import theme from "../../../globals/theme";

export const headerContainer = {
    backgroundColor: theme.PALLETE.background.white,
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "90px",
    transition: "transform 0.3s ease",
    zIndex: "10000",
    fontSize: theme.FONT_SIZE.h6,
    fontColor: theme.PALLETE.black,
    fontWeight: theme.FONT_WEIGHT.regular,
};

export const headerMainContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "1400px",
};

export const headerLeftContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
};

export const headerRightContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
};

export const headerMainIconContainer = {
    display: "flex",
    alignItems: "center",
    width: "70px",
    height: "46px",
}

export const headerLinkContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: "54px",
    width: "558px",
}

export const headerSocialContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80px",
    marginRight: "20px",
}

export const headerProfileContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}