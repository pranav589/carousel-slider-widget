import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import PropTypes from "prop-types";

CarouselCard.propTypes = {
  item: PropTypes.shape({
    userName: PropTypes.string,
    message: PropTypes.string,
    rating: PropTypes.number,
    date: PropTypes.string,
  }),
};

function CarouselCard({ item }) {
  return (
    <Card className="max-w-full">
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
                  className={`h-5 w-5 cursor-pointer ${
                    item?.rating > index
                      ? "fill-primary"
                      : "fill-muted stroke-muted-foreground"
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
