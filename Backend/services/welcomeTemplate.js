const baseTemplate = require("./baseTemplate");


const welcomeTemplate = (name)=>{


const content=`

<h1
style="
color:#5A140A;
margin-bottom:10px;
">

Welcome ${name} 🎉


</h1>


<p
style="
font-size:16px;
line-height:1.7;
color:#555;
">

Thank you for joining
<b>GatiShakti</b>.


</p>



<p
style="
font-size:16px;
line-height:1.7;
color:#555;
">

Experience smarter mobility,
seamless parking and intelligent
traffic solutions.


</p>



<div
style="
text-align:center;
margin-top:35px;
margin-bottom:35px;
">

<a

href="#"

style="

background:#E26A00;

padding:14px 30px;

border-radius:10px;

text-decoration:none;

color:white;

font-weight:bold;

font-size:16px;

"

>

Explore GatiShakti


</a>


</div>




<div

style="

background:#FFF5F0;

padding:20px;

border-radius:15px;

margin-top:30px;

"

>



<h3
style="
color:#5A140A;
">

What's next?



</h3>



<p>

🚗 Book Smart Parking


</p>


<p>

🚦 Monitor Traffic


</p>


<p>

📝 File Complaints


</p>


<p>

🤖 AI Assistance


</p>


</div>



`;



return baseTemplate({

title:"Welcome",

content

});


};



module.exports=welcomeTemplate;