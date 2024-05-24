export const homepageBanner = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: { md: '394px', sm: '345px', xs: '184px' }, // Set the height or adjust as needed
    width: { lg: '10%', md: '20%', xs: '20%' }, // Set width to 100%
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
};
export const homepageBannerChip = {
    display: 'flex',
    justifyContent: 'end',
    // px: { sm: 2, xs: 1 },
    pt: 1
};
export const homepageBannerGradient = {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    height: '100%',
    width: '60%'
    // background: 'linear-gradient(90deg, rgba(10, 11, 24, 1),rgba(10, 11, 24, 0.83),rgba(10, 11, 24, 0))'
};
export const homepageBanner2 = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: { md: '394px', sm: '345px', xs: '184px' },
    width: { lg: '100%', md: '100%', xs: '100%' },
    opacity: 1,
    position: 'relative'
};
export const homepageSliderImg = {
    height: '24px',
    width: '24px',
    objectFit: 'fill',
    borderRadius: '6px'
};
export const homepageSliderCard = {
    background: '#1C2138',
    display: 'flex',
    px: { md: 1.5, xs: 1.2 },
    // pr: 0.7,
    py: 1.5,
    borderRadius: 3,
    cursor: 'pointer'
};
export const homepageSliderTxt = {
    pl: { lg: 1.2, md: 1, xs: 0.8 },
    color: '#FFFF',
    fontSize: { sm: '14px', xs: '14px' },
    alignSelf: 'center',
    fontWeight: 600,
    lineHeight: '18px'
};
export const homepageCircualImg = {
    borderRadius: 4,
    mr: { sm: 2, xs: 1 },
    height: { sm: '36px', xs: '30px' },
    width: { sm: '36px', xs: '30px' }
};
export const homepageCircualProgress = {
    color: '#00EE34',
    height: { sm: '35px !important', xs: '29px !important' },
    width: { sm: '35px !important', xs: '29px !important' }
};
export const homepageCircualSelectImgWrap = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};
export const homepageCircualSelectImg = {
    borderRadius: 8,
    p: '3px',
    height: { sm: '36px', xs: '30px' },
    width: { sm: '36px', xs: '30px' }
};
export const homepageCircualImgWrap = {
    position: 'absolute',
    zIndex: 1,
    bottom: { sm: 10, xs: 5 },
    right: { sm: 10, xs: 0 },
    display: 'flex'
};
//Mobile Games
export const mobileGamHeadTxt = {
    color: '#FFFF',
    fontSize: {
        sm: '32px',
        xs: '20px'
    },
    fontWeight: 700,
    pt: { sm: 0, xs: 1 },
    lineHeight: { sm: '40px', xs: '24px' },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: { sm: 'nowrap', xs: 'normal' }
};
export const mobGamGridWrap = {
    display: 'flex',
    justifyContent: 'space-between',
    px: { sm: 0, xs: 2 }
};
export const mobAndSubWrap = {
    background: 'rgba(131, 151, 195, 0.1)',
    px: { sm: 2.5, xs: 2 },
    pt: { sm: 1.5, xs: 1 },
    pb: { sm: 2.5, xs: 2 },
    borderRadius: '16px',
    boxShadow: 2
};
export const mobAndSubTxt = {
    fontSize: { lg: '14px', md: 12, sm: 14, xs: 12 },
    fontWeight: { sm: 700, xs: 400 },
    lineHeight: '18px',
    color: '#FFFF',
    pt: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textWrap: 'nowrap'
};

export const mobAndSubImgWrap = {
    px: { xl: 1.1, lg: 0.6, md: 0.4, sm: 2, xs: 0.5 },
    pt: { sm: 1, xs: 1 },
    textAlign: '-webkit-center'
};
export const mobAndSubImg = {
    height: {
        xl: '98px',
        lg: '98px',
        md: '78px',
        sm: '98px',
        xs: '72px'
    },
    width: {
        xl: '98px',
        lg: '100%',
        // lg: '-webkit-fill-available',
        md: '100%',
        sm: '100%',
        xs: '72px'
    },
    objectFit: 'cover',
    borderRadius: { md: '20px', sm: '25px', xs: 4 }
};
export const mobGamBecButton = {
    background: 'rgba(131, 151, 195, 0.1)',
    borderRadius: 5,
    color: '#FFF',
    p: { sm: '4px 9px 4px 12px', xs: '9px' },
    minWidth: { sm: '64px', xs: '45px' }
};
export const mobGamBecTxt = {
    display: { sm: 'flex', xs: 'none' },
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 400,
    textTransform: 'none'
};
export const mobGamBecWrap = {
    display: 'flex',
    alignItems: 'center'
};
//POpular services
export const ServiceDisChip = {
    background: '#EBFF00',
    color: '#14171E',
    fontSize: { sm: '16px', xs: '12px' },
    '& .MuiChip-label': {
        px: { sm: '5px', xs: '3px' }
        // pr: { sm: '5px', xs: '3px' }
    },
    lineHeight: { sm: '22px', xs: '14px' },
    fontWeight: { sm: 800, xs: 700 },
    height: { sm: '22px', xs: '15px' },
    alignItems: { sm: 'center', xs: 'end' }
};
export const popServiceChipRap = {
    top: { sm: '26px', xs: '20px' },
    left: { sm: '9px', xs: '6px' },
    position: 'relative',
    height: { sm: '20px', xs: '10px' }
};
export const popServiceCard = {
    height: { sm: 380, xs: 'auto' },
    boxShadow: 'none',
    background: 'transparent',
    // position: "absoulate",
    cursor: { xs: 'pointer', sm: 'default' }
};
export const popServiceImg = {
    width: { sm: '199px', xs: '96px' },
    height: { sm: '256px', xs: '130px' },
    objectFit: 'fill',
    borderRadius: { sm: 4, xs: 3 }
};
export const popServicePriceRap = {
    display: { sm: 'flex', xs: 'block' },
    justifyContent: 'space-between',
    px: 0.5,
    pt: 1
};
export const popServicePrice = {
    fontSize: { sm: '16px', xs: 14 },
    color: '#FFFF',
    fontWeight: 700,
    lineHeight: '20px'
};
export const popServiceDisPrice = {
    color: '#8C95AD',
    fontSize: { sm: '12px', xs: 10 },
    fontWeight: 600,
    lineHeight: '22px',
    textDecoration: 'line-through'
};
export const popServiceDesc = {
    pt: 0.5,
    px: 0.5,
    width: { sm: '199px', xs: '96px' },
    fontSize: { sm: '14px', xs: '11px' },
    fontWeight: 600,
    color: '#8C95AD',
    lineHeight: { sm: '18px', xs: '13px' },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
};
//Reviews
export const reviewCardSx = {
    py: 2.5,
    px: { md: 2.7, xs: 2 },
    background: 'rgba(131, 151, 195, 0.1)',
    borderRadius: { sm: '24px', xs: '16px' },
    height: { sm: '347px', xs: '267px' },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: { sm: '309px', xs: '248px' }
};
export const ReviewHeadTxt = {
    fontSize: { sm: '32px', xs: '20px' },
    fontWeight: 600,
    color: '#FFFF',
    lineHeight: '40px'
};
export const ReviewHeadStarTxt = {
    fontSize: { sm: 18, xs: 16 },
    fontWeight: 600,
    color: '#E5E6E8',
    pr: { lg: 0.3, xs: 0 }
};
export const ReviewHeadDesc = {
    fontSize: { sm: 18, xs: 14 },
    color: '#FFFFFF',
    fontWeight: 500
};
export const reviewCardDate = {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: { sm: 16, xs: 14 },
    fontWeight: 400,
    pb: 1.5
};
export const reviewCardDesc = {
    color: '#FFFFFF',
    pt: 1.5,
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 400
};
export const reviewCardTitle = {
    fontSize: { sm: '18px', xs: 16 },
    color: '#FFFFFF',
    fontWeight: 700,
    lineHeight: '24px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
};
export const reviewCardVerfied = {
    color: '#50B5FF',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '18px',
    pt: 1,
    display: 'flex'
};
export const reviewCardVerfiedTxt = {
    pl: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    alignSelf: 'center'
};
export const reviewCardStarTxt = {
    color: '#3CCA5B',
    fontSize: 18,
    fontWeight: 500,
    display: 'flex'
};
//Service Catelog

export const SreviceimgSx = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: { sm: 4, xs: 2 },
    display: 'flex',
    flexDirection: 'column',
    pl: { md: 2.2, sm: 1.7, xs: 1 },
    justifyContent: 'space-between',
    py: { md: 2.2, sm: 1.7, xs: 1 },
    cursor: 'pointer',
    backgroundRepeat: 'no-repeat'
};
export const ServicetextSx = {
    fontSize: { lg: '24px', sm: '18px', xs: '10px' },
    fontWeight: { sm: 400, xs: 600 },
    color: '#FFFF',
    lineHeight: { md: '32px', sm: '24px', xs: '10px' }
};
export const ServiceHeadTxt = {
    fontSize: { sm: '32px', xs: '20px' },
    fontWeight: 700,
    color: '#FFFF',
    pb: { sm: 3, xs: 1 },
    lineHeight: '40px'
};
export const ServicedisplayImg = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
};
//Mobile Landing Modal

export const mobileLandWrap = {
    color: '#fff',
    background: '#2F3654',
    ':hover': { border: '0.5px solid #00EE34' },
    border: '0.5px solid #2F3654',
    borderRadius: '12px',
    p: '5px 6px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};
export const mobileLandText = {
    px: 1,
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '22px',
    pt: '7px',
    pb: '4px'
};
export const mobileLandCurrWrap = {
    color: '#fff',
    background: '#2F3654',
    ':hover': { border: '0.5px solid #00EE34' },
    border: '0.5px solid #2F3654',
    borderRadius: '12px',
    padding: '4px 10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};
export const mobileLandGameArrWrap = {
    background: '#8397C333',
    height: 160,
    width: '48%',
    borderRadius: 3,
    display: 'flex',
    justifyContent: 'center'
};
export const mobileLandGameArrImgWrap = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%'
};
export const mobileLandGameArrTxtWrap = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1
};
export const mobileLandGameArrTxt = {
    color: '#FFFF',
    textAlign: 'center',
    fontSize: 14
};
export const mobileLandGameArrImg = {
    width: 70,
    height: 70,
    backgroundColor: '#8397C333',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3
};
//Mobile Drop Down
export const CheckclorWrap = {
    display: 'flex',
    justifyContent: 'flex-end',
    pr: 1,
    color: '#fff'
};
export const Checkclor = {
    color: '#00EE34 !important'
};
export const MobileWrap = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    top: 0,
    left: 0,
    backgroundColor: '#1C2138'
};
export const MobileTitleSx = {
    pt: 0.4,
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
    pb: 0.4,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textWrap: 'nowrap'
};
export const LeftIconColor = {
    color: '#fff',
    fontSize: 30,
    pr: 0.2
};

//Game Catalog
export const GamTitle = {
    fontSize: { sm: '32px', xs: '20px' },
    fontWeight: 700,
    color: '#FFFF',
    pb: { sm: 1, xs: 0 },
    lineHeight: '40px'
};
export const GamCatXsBtn = {
    background: 'rgba(131, 151, 195, 0.1)',
    border: 'none',
    pl: 1.4,
    py: 1,
    marginRight: '15px',
    borderRadius: '52px',
    minWidth: '40px',
    display: { sm: 'none', xs: 'flex' },
    color: '#FFFF',
    m: 0
};
export const GamCatBecBtn = {
    background: 'rgba(131, 151, 195, 0.1)',
    borderRadius: 5,
    color: '#FFF',
    p: { sm: '4px 9px 4px 12px', xs: '9px' },
    minWidth: { sm: '64px', xs: '45px' }
};
export const GamCatScrolBtn = {
    background: 'rgba(131, 151, 195, 0.1)',
    border: 'none',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '52px',
    minWidth: '40px'
};
export const GamCatBecBtnTxt = {
    display: { sm: 'flex', xs: 'none' },
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 400,
    textTransform: 'none'
};
export const GamCatMoreBtn = {
    background: 'rgba(131, 151, 195, 0.1)',
    width: { md: '70%', xs: '100%' },
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: { sm: 400, xs: 600 },
    lineHeight: { sm: '24px', xs: '22px' },
    borderRadius: { sm: 4, xs: 3 },
    p: { sm: '16px 32px', xs: '12px 32px' },
    ':hover': {
        background: 'rgba(131, 151, 195, 0.1)',
        color: '#FFFFFF'
    }
};

export const GamCatbtnSx = {
    borderRadius: 6,
    px: 2,
    py: 1,
    // mt: 1,
    fontWeight: 500,
    fontSize: { sm: '16px', xs: 14 },
    lineHeight: '22px',
    display: 'flex',
    textTransform: 'none'
};
export const GamCattabWrap = {
    pt: { sm: 2.2, xs: 1.2 },
    pb: { sm: 0.6, xs: 0.5 },
    display: 'flex',
    justifyContent: 'space-between'
};
export const GamCattabSx = {
    p: 0,
    borderRadius: 6,

    mr: { sm: 1, xs: 0.5 }
};
//Game Slider
export const GmSlideCardSx = {
    height: { sm: 345, xs: 'auto' },
    boxShadow: 'none',
    background: 'transparent',
    cursor: 'pointer'
};
export const GmSlideImg = {
    height: { sm: '240px', xs: '136px' },
    width: { sm: '200px', xs: '107px' },
    objectFit: 'fill',
    borderRadius: { sm: '0px 0px 15px 15px', xs: '0px 0px 11px 11px' }
};
export const GmSlideDetail = {
    display: { sm: 'flex', xs: 'block' },
    justifyContent: 'space-between',
    px: 0.5,
    pt: { sm: 2, xs: 0.5 }
};
export const GmSlideTxt1 = {
    fontSize: { sm: '16px', xs: '14px' },
    color: '#00EE34',
    fontWeight: { sm: 700, xs: 400 },
    lineHeight: { sm: '20px', xs: '18px' }
};
export const GmSlideTxt2 = {
    color: '#8C95AD',
    fontSize: { sm: '12px', xs: '10px' },
    fontWeight: 600,
    textDecoration: 'line-through',
    lineHeight: { sm: '22px', xs: '14px' }
};
export const GmSlideTitle = {
    pt: 0.5,
    px: 0.5,
    fontSize: { sm: '14px', xs: '12px' },
    fontWeight: 600,
    color: '#8C95AD',
    lineHeight: { sm: '18px', xs: '16px' },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
};
