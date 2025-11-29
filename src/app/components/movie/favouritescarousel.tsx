// import { Navigation, Pagination } from "swiper/modules";
// import { IconButton } from "@material-tailwind/react";
// import { ArrowRight, ArrowLeft } from "lucide-react";
// import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// import MovieCard from "./MovieCard";

// function CustomNavigation() {
//   const swiper = useSwiper();

//   return (
//     <>
//       <IconButton
//         isCircular
//         size="lg"
//         variant="ghost"
//         color="secondary"
//         onClick={() => swiper?.slidePrev()}
//         className="dark !absolute left-2 top-1/2 z-10 -translate-y-1/2"
//       >
//         <ArrowLeft className="h-7 w-7 -translate-x-0.5 stroke-2" />
//       </IconButton>

//       <IconButton
//         isCircular
//         size="lg"
//         variant="ghost"
//         color="secondary"
//         onClick={() => swiper?.slideNext()}
//         className="dark !absolute right-2 top-1/2 z-10 -translate-y-1/2"
//       >
//         <ArrowRight className="h-7 w-7 translate-x-px stroke-2" />
//       </IconButton>
//     </>
//   );
// }

// function customPagination(index: number, className: string) {
//   return `<span class="${className} w-4 h-4
//     [&.swiper-pagination-bullet-active]:!opacity-100
//     [&.swiper-pagination-bullet-active]:[background:rgb(var(--color-background))]
//     !opacity-50
//     ![background:rgb(var(--color-background))]
//   "></span>`;
// }

// export default function FavouritesCarousel({ favourites }: any) {
//   return (
//     <div className="w-full mx-auto px-5">
//       <Swiper
//         spaceBetween={20}
//         breakpoints={{
//           0: { slidesPerView: 1 },
//           480: { slidesPerView: 2 },
//           768: { slidesPerView: 3 },
//           1024: { slidesPerView: 4 },
//         }}
//         pagination={{
//           enabled: true,
//           clickable: true,
//           dynamicBullets: true,
//           renderBullet: customPagination,
//         }}
//         modules={[Navigation, Pagination]}
//         className="relative rounded-lg"
//       >
//         {favourites.map((favourite: any, index: number) => (
//           <SwiperSlide key={index} className="select-none">
//             <MovieCard movie={favourite} />
//           </SwiperSlide>
//         ))}

//         <CustomNavigation />
//       </Swiper>
//     </div>
//   );
// }
