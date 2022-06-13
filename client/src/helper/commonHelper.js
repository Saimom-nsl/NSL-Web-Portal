export function dateFormat(formatDate){
    const date = new Date(formatDate);
    let d = date.getDate();
		let m = date.getMonth() + 1;
		let y = date.getFullYear();
    let dateString  = new String(y+ '-'+(m <= 9 ? '0' + m : m)+'-'+(d <= 9 ? '0' + d : d))
    return dateString
  }