export const searchResultSx = {
  fontSize: "24px",
  fontWeight: 500,
  color: "#FFFF",
  pb: 2,
};
export const searchBtnsWrap = {
  display: { sm: "none", xs: "flex" },
  maxHeight: "200px",
  overflowY: "auto",
  scrollbarWidth: "none",
};
export const searchBtnsSx = {
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: 1.5,
  padding: "8px 10px",
  borderRadius: "8px",
  cursor: "pointer",
  position: "relative",
  border: " 1px solid  #8397C31A",
  textTransform: "none",
  mr: 1,
  minWidth: "auto",
  display: "flex",
  background: "#8397C31A",
  color: "#FFFF",
  ":hover": {
    background: "#8397C31A",
    color: "#FFFF",
  },
};
export const moreBtn = {
  background: "rgba(131, 151, 195, 0.1)",
  color: "#FFF",
  width: { sm: "60%", xs: "100%" },
};
export const moreBtnWrap = {
  display: "flex",
  justifyContent: "center",
  py: 4,
};
export const catelogCard = {
  maxWidth: 345,
  height: { sm: 340, xs: "auto" },
  boxShadow: "none",
  background: "transparent",
  cursor: "pointer",
};
export const catelogCardShadow = {
  position: "relative",
  height: { sm: "278px", xs: "155px" },
  overflow: "hidden",
  borderRadius: { sm: 4, xs: 2.5 },
  "&:hover::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: { sm: "278px", xs: "133px" },
    backgroundColor: "rgba(0, 238, 52, 0.3)",
    zIndex: 1,
  },
};
export const catelogCardImg = {
  position: "relative",
  height: { sm: "278px", xs: "155px" },
  width: "100%",
  objectFit: "fill",
  borderRadius: { sm: 4, xs: 2.5 },
  zIndex: 0,
};
export const catelogCardPrice = {
  fontSize: { sm: "16px", xs: "14px" },
  color: "#00EE34",
  fontWeight: { sm: 700, xs: 600 },
  lineHeight: { sm: "20px", xs: "18px" },
};
export const catelogCardDisPrice = {
  color: "#8C95AD",
  fontSize: { sm: "12px", xs: "10px" },
  fontWeight: 500,
  lineHeight: { sm: "22px", xs: "13px" },
  textDecoration: "line-through",
};
export const catelogCardTxt = {
  py: 0.5,
  px: { sm: 0.5, xs: 0 },
  fontSize: { sm: "14px", xs: "12px" },
  fontWeight: { sm: 500, xs: 400 },
  lineHeight: { sm: "18px", xs: "16px" },
  color: "#FFFF",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};
export const catelogSearchRest = {
  backgroundColor: "rgba(0, 238, 52, 0.15)",
  cursor: "pointer",
  p: 1,
  borderRadius: 2,
  color: "#FFFF",
  fontSize: 14,
  alignSelf: "center",
};
export const catelogSearchRestTxt = {
  fontSize: 14,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};
export const catelogSearchResultShow = {
  backgroundColor: "rgba(0, 238, 52, 0.15)",
  display: "flex",
  alignItems: "center",
  mr: 1,
  p: 1,
  borderRadius: 2,
};
//BottomModal
export const catalogfilterbtn = {
  borderRadius: 3,
  fontSize: "18px",
  fontWeight: 700,
  mt: 2,
  textTransform: "none",
  lineHeight: "24px",
  py: 1.5,
  background: "#00EE34",
  color: "#252525",
  ":hover": {
    background: "#00EE34",
    color: "#252525",
  },
};
export const labalTxt = {
  lineHeight: "18px",
  fontSize: "16px",
  fontWeight: 600,
  alignSelf: "center",
};
export const PlatformTxt = {
  fontSize: "20px",
  fontWeight: 700,
  lineHeight: "28px",
  pb: 1,
};
