const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var table="";

function start()
{
    table="";
    var year = document.getElementById("input").value;
    var holiday = document.getElementById("Dropdown").value;
    var lang = document.getElementById("Dropdown_lang").value;
    for(let k=0;k<12;k++)//call the function 12 times for 12 months
    {
        draw_calender(months[k].substring(0,3), year, lang, holiday);//Pass first 3 letters of every elements
    }
    document.getElementById("calender").innerHTML =table; //grab calender ID and create all the tables there
}
// Function to draw calender
function draw_calender(mon, year, lang, holiday)
{
    table+="<table border ='2'><thead><th colspan='7'>";
    var start_date = new Date("01-"+mon+"-"+year);
    var last_date = new Date(start_date.getFullYear(), start_date.getMonth() + 1, 0);//fetch last date of the month Date("Year", "next mont ", 0 ["if we use this we get last day of previous month"])
    var day = start_date.getDay();
    let day_element=0;
    let i=0;
    table+=start_date.toLocaleDateString(lang,{ month: 'long' })+", "+year+"</th></thead><tbody><tr>"; // write month name as a heading
    var days_of_week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for(var d in days_of_week) // write all the week names 
    {
        let date = new Date(2023, 0, 1 + d - 2);
        let dow = date.toLocaleDateString(lang,{weekday:'short'});
        if(d==holiday){
            table+="<td class='sunday weekdays'>"+ dow +"</td>";
        }
        else{
            table+="<td class='weekdays'>"+ dow +"</td>";
        }
    }
    for(let week=0;week<6;week++)// Print dates according to their week
    {
        table+="<tr>";
        for(let j=0;j<7;j++)
        {
            if(i>=day)
            {
                if(day_element<last_date.getDate())//check if the date is within the range of last date
                {
                    day_element++;
                    if(j==holiday){// j=0 means it's a sunday so give the text red color
                        table+="<td class='sunday'>"+day_element+"</td>";
                    }
                    else{   //else normal color
                        table+="<td>"+day_element+"</td>";
                    }
                }
                //if the date is out side the range then do nothing
            }
            else // leave blank columns if the date not starts from first column
            {
                if(j==holiday){// j=0 means it's a sunday so give the text red color
                        table+="<td class='sunday'></td>";
                    }
                else{
                    table+="<td></td>";
                }
            }
            i++;
        } 
        table +="</tr>";
    }
    table+="</tbody></table>";
}
