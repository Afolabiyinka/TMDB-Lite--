// import React from "react";

// const Actor = ({ actor }) => {
//   return (
//     <div className=" max-w-xl rounded-md shadow-lg  flex flex-col p-4 gap-2 transition-all duration-300 text-black">
//       <img
//         src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
//         alt={actor.original_name}
//         className="w-full h-96 object-cover rounded-md"
//       />

//       <div className="flex flex-col justify-center gap-2 p-3  rounded-md ">
//         <div>
//           <h1 className="text-2xl font-bold">{actor?.name}</h1>
//           <p className="text-sm">{actor.known_for_department}</p>
//         </div>

//         <button className="py-2 rounded-md duration-300 px-8 transition-all bg-gradient-to-r from-red-500 to-yellow-500 hover:px-14">
//           View
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Actor;

import { Card, Typography } from "@material-tailwind/react";

export default function Actor({ actor }) {
  return (
    <Card className=" overflow-hidden w-80">
      <Card.Header
        as="img"
        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
        alt={actor.name}
        className="h-80 object-fill hover:scale-105"
      />
      <Card.Body className="p-3">
        <Typography type="h5" className="text-base overflow-hidden">
          {actor.name}
        </Typography>
        <Typography className="text-sm text-foreground">
          {actor.known_for_department}
        </Typography>
      </Card.Body>
    </Card>
  );
}
