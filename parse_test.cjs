const testDates = [
    "20240713",
    "2024-07-13",
    "13-07-2024",
    "13/07/2024",
    "2024-07-13T16:20:30",
    "2024-07-13 16:20:30",
    "2024-07-13T16:20:30+07:00"
];
const testTimes = ["16:20:30", null, "16:20"];

const parseSlipDate = (slipData) => {
    let slipTime = NaN;
    
    // Attempt 1: Direct full ISO string
    if (slipData.timestamp) {
        let tsStr = slipData.timestamp.toString();
        if (tsStr.includes(' ')) tsStr = tsStr.replace(' ', 'T');
        if (!tsStr.includes('+') && !tsStr.includes('Z')) {
            tsStr += "+07:00";
        }
        slipTime = new Date(tsStr).getTime();
    }
    
    if (isNaN(slipTime) && slipData.date) {
        let ds = slipData.date.toString();
        let tsStr = slipData.time ? slipData.time.toString() : "00:00:00";
        if (ds.includes('/')) {
           const parts = ds.split(' ')[0].split('/'); // in case time is in date string
           if (parts[0].length === 2 && parts[2].length === 4) {
               ds = `${parts[2]}-${parts[1]}-${parts[0]}`;
           }
        } else if (ds.match(/^\d{2}-\d{2}-\d{4}$/)) {
           const parts = ds.split('-');
           ds = `${parts[2]}-${parts[1]}-${parts[0]}`;
        } else if (ds.includes(' ')) {
           const parts = ds.split(' ');
           ds = parts[0];
           if (parts[1]) tsStr = parts[1];
        }
        
        let fullStr = `${ds}T${tsStr}`;
        if (!fullStr.includes('+') && !fullStr.includes('Z')) {
            fullStr += "+07:00";
        }
        slipTime = new Date(fullStr).getTime();
    }
    
    if (isNaN(slipTime) && slipData.transDate && slipData.transTime) {
        const ds = slipData.transDate.toString();
        const ts = slipData.transTime.toString();
        if (ds.length === 8 && !ds.includes('-')) {
            slipTime = new Date(`${ds.substring(0,4)}-${ds.substring(4,6)}-${ds.substring(6,8)}T${ts}+07:00`).getTime();
        } else if (ds.includes('-')) {
            slipTime = new Date(`${ds}T${ts}+07:00`).getTime();
        }
    }
    
    if (isNaN(slipTime) && slipData.rawSlip?.transDate && slipData.rawSlip?.transTime) {
        const ds = slipData.rawSlip.transDate.toString();
        const ts = slipData.rawSlip.transTime.toString();
        if (ds.length === 8 && !ds.includes('-')) {
            slipTime = new Date(`${ds.substring(0,4)}-${ds.substring(4,6)}-${ds.substring(6,8)}T${ts}+07:00`).getTime();
        } else if (ds.includes('-')) {
            slipTime = new Date(`${ds}T${ts}+07:00`).getTime();
        }
    }
    
    return slipTime;
};

console.log("Empty:", parseSlipDate({}));
console.log("transDate/transTime 8 chars:", parseSlipDate({ transDate: "20240713", transTime: "16:20:30" }));
console.log("date/time ISO-like:", parseSlipDate({ date: "2024-07-13", time: "16:20:30" }));
console.log("date/time DD/MM/YYYY:", parseSlipDate({ date: "13/07/2024", time: "16:20:30" }));
console.log("timestamp missing timezone:", parseSlipDate({ timestamp: "2024-07-13 16:20:30" }));
console.log("timestamp with timezone:", parseSlipDate({ timestamp: "2024-07-13T16:20:30+07:00" }));

