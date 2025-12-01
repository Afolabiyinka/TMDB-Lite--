import { Button, IconButton } from "@material-tailwind/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";

interface TrailerModalProps {
  trailer: any[];
  trailerOpen: boolean;
  trialerClose: () => void;
}

function CustomNavigation() {
  const swiper = useSwiper();

  return (
    <>
      <IconButton
        isCircular
        size="lg"
        variant="ghost"
        color="secondary"
        onClick={() => swiper?.slidePrev()}
        className="!absolute left-2 top-1/2 -translate-y-1/2 z-20"
      >
        <ArrowLeft className="h-6 w-6" />
      </IconButton>

      <IconButton
        isCircular
        size="lg"
        variant="ghost"
        color="secondary"
        onClick={() => swiper?.slideNext()}
        className="!absolute right-2 top-1/2 -translate-y-1/2 z-20"
      >
        <ArrowRight className="h-6 w-6" />
      </IconButton>
    </>
  );
}

const TrailerModal = ({ trailer, trialerClose }: TrailerModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      {/* Close Button */}
      <Button
        variant="solid"
        isPill
        color="primary"
        onClick={trialerClose}
        className="flex items-center gap-2 text-xl rounded-xl fixed top-6 right-6 z-[100]"
      >
        <X size={30} className="stroke-[1px] text-red-800" />
        Close
      </Button>

      {/* Responsive Trailer Container */}
      <Swiper
        className="
          w-full max-w-[900px] 
          h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] 
          rounded-xl shadow-xl overflow-hidden
        "
      >
        {trailer.map((vid: any) => (
          <SwiperSlide key={vid.id} className="relative">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${vid.key}?autoplay=1&mute=1`}
              title={vid.name || "Movie Trailer"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <CustomNavigation />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrailerModal;
