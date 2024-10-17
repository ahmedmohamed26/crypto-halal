import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";

function ShareIcons({ pathName }: any) {
  const socialMediaList = [
    {
      button: (
        <FacebookShareButton
          url={`${process.env.NEXT_PUBLIC_WEBSiTE_URL}${pathName}`}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      ),
    },
    {
      button: (
        <LinkedinShareButton
          url={`${process.env.NEXT_PUBLIC_WEBSiTE_URL}${pathName}`}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      ),
    },
    {
      button: (
        <TwitterShareButton
          url={`${process.env.NEXT_PUBLIC_WEBSiTE_URL}${pathName}`}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      ),
    },
    {
      button: (
        <TelegramShareButton
          url={`${process.env.NEXT_PUBLIC_WEBSiTE_URL}${pathName}`}
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      ),
    },
    {
      button: (
        <WhatsappShareButton
          url={`${process.env.NEXT_PUBLIC_WEBSiTE_URL}${pathName}`}
          separator=":: "
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      ),
    },
  ];

  return (
    <ul className="flex justify-center gap-4 sm:mt-0 lg:justify-end">
      {socialMediaList.map((link, index) => {
        return <div key={index}>{link?.button}</div>;
      })}
    </ul>
  );
}

export default ShareIcons;
