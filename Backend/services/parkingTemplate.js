const baseTemplate=require("./baseTemplate");



const parkingTemplate=(


name,


parkingName,


vehicleNumber,


bookingDate,


startTime,


endTime,


qrCode


)=>{


const content=`



<h1

style="
color:#5A140A;
"

>


🎉 Booking Confirmed


</h1>




<p
style="
font-size:16px;
color:#555;
"
>

Hi ${name},


</p>



<p
style="
font-size:16px;
line-height:1.7;
color:#555;
"
>

Your parking slot has been
successfully reserved.



</p>




<div


style="


background:#FFF5F0;


padding:25px;


border-radius:15px;


margin-top:30px;


margin-bottom:30px;


"

>




<h3
style="
color:#5A140A;
margin-bottom:20px;
"
>


Booking Details


</h3>




<table
width="100%"
>


<tr>

<td>

<b>Parking</b>

</td>


<td>

${parkingName}

</td>

</tr>




<tr>

<td>

<b>Vehicle</b>

</td>


<td>

${vehicleNumber}

</td>

</tr>




<tr>

<td>

<b>Date</b>

</td>


<td>

${bookingDate}

</td>

</tr>



<tr>

<td>

<b>Start</b>

</td>


<td>

${startTime}

</td>

</tr>




<tr>

<td>

<b>End</b>

</td>


<td>

${endTime}

</td>

</tr>



</table>


</div>




<div
style="
text-align:center;
">




<h3
style="
color:#5A140A;
"
>

Entry QR Code


</h3>




<img


src="${qrCode}"


width="220"



/>




<p
style="
font-size:15px;
color:#666;
margin-top:15px;
"
>

Present this QR code
at the parking entrance.



</p>



</div>






<div


style="

background:#f7f7f7;


padding:15px;


border-radius:10px;


margin-top:25px;


"

>



<p>


📌 Keep this email safe.


</p>



<p>


🚗 Reach 10 minutes early.


</p>



<p>


📱 QR scanning required.


</p>



</div>



`;





return baseTemplate({


title:"Parking",

content


});



};



module.exports=parkingTemplate;