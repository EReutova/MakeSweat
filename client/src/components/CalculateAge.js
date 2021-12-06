//function that calculates age
export const calculateAge = (dob) => {
    
    let diff_ms = Date.now() - dob.getTime();
    let age_dt = new Date(diff_ms); 
    
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

// calculateAge(new Date(1989, 1, 4))
// dob = new Date(1989, 1, 4)