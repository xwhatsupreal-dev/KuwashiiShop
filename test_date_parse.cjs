console.log(new Date("13-07-2024T16:20:30+07:00").getTime()); // NaN
console.log(new Date("2024-07-13T16:20:30+07:00").getTime()); // Valid
console.log(new Date("2024-07-13 16:20:30").getTime()); // Valid, but assumes UTC
