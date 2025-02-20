// import React, { useState, useEffect } from "react";
// import { Sun, Moon } from "lucide-react";

// const Clock = () => {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTime(new Date());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   // Get current hour
//   const hours = time.getHours();

//   // Determine greeting with icons
//   let greeting;
//   if (hours >= 5 && hours < 12) {
//     greeting = (
//       <span>
//         Good Morning <Sun className="inline w-6 h-6 text-yellow-400" />
//       </span>
//     );
//   } else if (hours >= 12 && hours < 17) {
//     greeting = (
//       <span>
//         Good Afternoon{" "}
//         <Sun className="inline w-6 h-6 text-orange-400" size={40} />
//       </span>
//     );
//   } else {
//     greeting = (
//       <span>
//         Good Evening <Moon className="inline w-6 h-6 text-blue-300" size={50} />
//       </span>
//     );
//   }

//   return (
//     <div className="flex h-[10vh] items-center justify-center">
//       <h2 className="text-3xl font-semibold">{greeting}</h2>
//     </div>
//   );
// };

// export default Clock;
