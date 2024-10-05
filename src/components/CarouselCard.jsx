import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import PropTypes from "prop-types";
import {
  InstagramEmbed,
  LinkedInEmbed,
  XEmbed,
} from "react-social-media-embed";

const cardType = (socialPlatform, socialUrl) => {
  const defaultClassName =
    "w-full max-h-full overflow-hidden border-slate-100 border-solid border-2 mb-3";
  const result = {
    TWITTER: <XEmbed url={socialUrl} className={defaultClassName} />,
    LINKEDIN: (
      <div className="flex justify-center">
        <LinkedInEmbed url={socialUrl} className={defaultClassName} />
      </div>
    ),
    INSTAGRAM: (
      <div className="flex justify-center relative">
        <InstagramEmbed
          url={socialUrl}
          className={`${defaultClassName} border-none`}
        />
        <div className="absolute top-3 right-3 bg-white w-[110px] h-[30px]"></div>
      </div>
    ),
  };
  return result[socialPlatform];
};

CarouselCard.propTypes = {
  item: PropTypes.shape({
    userName: PropTypes.string,
    message: PropTypes.string,
    rating: PropTypes.number,
    date: PropTypes.string,
    type: PropTypes.string,
    socialPlatform: PropTypes.string,
    socialUrl: PropTypes.socialUrl,
  }),
};

function CarouselCard({ item }) {
  if (item?.type === "SOCIAL") {
    return cardType(item?.socialPlatform, item?.socialUrl);
  }
  return (
    <Card className="max-w-full min-h-[310px]">
      <CardContent className="flex p-6 ">
        <div className="flex flex-col">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>
                {item?.userName?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="font-bold ml-3">{item?.userName}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 my-2">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`h-6 w-6 cursor-pointer ${
                    item?.rating > index
                      ? "fill-yellow-400 stroke-none"
                      : "fill-muted stroke-muted"
                  } `}
                />
              ))}
            </div>
            <p className="mt-2 mb-4 ">{item?.message}</p>
            <p className="text-justify">{item?.date}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CarouselCard;

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      //   className="lucide lucide-star"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
