const baseTemplate=require("./baseTemplate");



const otpTemplate=(

name,
otp

)=>{


const content=`


<h2
style="
color:#5A140A;
margin-bottom:10px;
"
>


Hello ${name} 👋


</h2>



<p
style="
font-size:16px;
color:#555;
"
>

Use the OTP below
to verify your account.


</p>




<div

style="


background:#E26A00;


padding:20px;


border-radius:15px;


text-align:center;


margin-top:30px;


margin-bottom:30px;


"

>



<span


style="


font-size:34px;


letter-spacing:8px;


font-weight:bold;


color:white;


"



>

${otp}



</span>



</div>






<p
style="
color:#666;
"
>

This OTP is valid
for 10 minutes.


</p>




<p
style="
color:red;
font-size:14px;
"
>


Never share this OTP.


</p>




`;





return baseTemplate({


title:"OTP",

content


});


};



module.exports=otpTemplate;