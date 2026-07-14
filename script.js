const button = document.getElementById("generateBtn");

const loading = document.getElementById("loading");

const result = document.getElementById("result");

button.addEventListener("click", generate);

function generate(){

    const name=document.getElementById("name").value.trim();

    const gender=document.querySelector('input[name="gender"]:checked');

    if(name===""){
        alert("Please enter your name.");
        return;
    }

    if(!gender){
        alert("Please select gender.");
        return;
    }

    loading.classList.remove("hidden");

    result.classList.add("hidden");

    button.disabled=true;

    setTimeout(()=>{

        loading.classList.add("hidden");

        document.getElementById("koreanName").innerText="민준";

        document.getElementById("pronunciation").innerText="마이클";

        document.getElementById("meaning").innerText="Bright and warm-hearted person.";

        document.getElementById("reason").innerText=
        `${name} is naturally pronounced similar to 민준 in Korean.`;

        result.classList.remove("hidden");

        button.disabled=false;

    },2000);

}