// import React, { useState, useEffect } from "react";
// import { getPopularPeople } from "../Services/API";
// import Actor from "../Components/Actor";

// const TrendingActors = () => {
//   const [actors, setActors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const loadPopularActors = async () => {
//       try {
//         const popularActors = await getPopularPeople();
//         setLoading(true);
//         setActors(popularActors);
//       } catch (err) {
//         console.log(err);
//         setLoading(false)
//         setError(true);
//       } finally {
//         console.log("hello");
//       }
//     };
//     loadPopularActors();
//   }, []);
//   return (
//     {loading ? <h1>Loading</h1> :  <div className="h-screen w-screen">
//         {actors.map((actor) => (
//           <Actor actor={actor} key={actor.id} />
//         ))}
//       </div>}

//   );
// };

// export default TrendingActors;
