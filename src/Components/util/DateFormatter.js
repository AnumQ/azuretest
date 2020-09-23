export default class DateFormatter {
    static formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hours = d.getHours(),
            min = d.getMinutes();
    
        var hoursString = hours.toString();
        var minString = min.toString();
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        if (hoursString.length < 2)
            hoursString = '0' + hoursString;
        if (minString.length < 2) 
            minString = '0' + minString;
        
        return [day, month, year].join('.') + " " + [hoursString, minString].join(':');
    }
}