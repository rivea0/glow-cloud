// 'use client'

// import { useRouter } from 'next/navigation';


// // export default function HourlyDropdown() {
// //   return (
// //     <div>
// //       <select>
// //         <option value=""></option>
// //         <option value="Option 1"></option>
// //         <option value="Option 2"></option>
// //         <option value="Option 3"></option>


// //         <option>Select an option</option>
// //         <option>
// //           <a href='#section1'>
// //             Option 1
// //           </a>
// //         </option>
// //         <option>
// //           <a href='#section2'>
// //             Option 2
// //           </a>
// //         </option>
// //         <option>
// //           <a href='#section3'>
// //             Option 3
// //           </a>
// //         </option>
// //       </select>
// //     </div>
// //   )
// // }

// import React, { useState } from 'react';

// export default function HourlyDropdown() {
//   const router = useRouter();
//   const [selectedOption, setSelectedOption] = useState(null);
//   const options = [
//     { value: 'section1', label: 'Section 1' },
//     { value: 'section2', label: 'Section 2' },
//     { value: 'section3', label: 'Section 3' },
//     { value: 'section4', label: 'Section 4' },
//     { value: 'section5', label: 'Section 5' },
//   ];

//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//     router.push(`/#${option}`);
//   };

//   return (
//     <div>
//       <select value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
//         <option value="">Select an option</option>
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// // export default function HourlyDropdown() {
// //   return (
// //     <div>
// //       <Dropdown />
// //       <div>
// //         <Link href="/#section1">
// //         </Link>
// //         <Link href="/#section2">
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }

export default function HourlyDropdown({ days, onChange }) {
  return (
    <>
      <label htmlFor="hourlyDay">Select day: </label>
      <select name="hourlyDay" id="hourlyDay" onChange={onChange}>
        {days.map(day => <option value={day} key={day}>{day}</option> )}
      </select>
    </>
  )
}

