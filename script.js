const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbze2Me1uH3xZJ8ZUyccDIQ4du_Zti_uLY_kQpcNFt_N1SmYv_yICDVf-mDhTR0F4pVq/exec";

const button = document.getElementById("generateBtn");
const loading = document.getElementById("loading");
const result = document.getElementById("result");

button.addEventListener("click", generate);

async function generate() {

    const name = document.getElementById("name").value.trim();

    const genderElement =
        document.querySelector('input[name="gender"]:checked');

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    if (!genderElement) {
        alert("Please select gender.");
        return;
    }

    const gender = genderElement.value;

    button.disabled = true;
    loading.classList.remove("hidden");
    result.classList.add("hidden");

    try {

        const url =
            `${APPS_SCRIPT_URL}?name=${encodeURIComponent(name)}&gender=${encodeURIComponent(gender)}`;

        console.log(url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        document.getElementById("koreanName").innerText =
            data.korean_name;

        document.getElementById("pronunciation").innerText =
            data.pronunciation;

        document.getElementById("meaning").innerText =
            data.meaning;

        document.getElementById("reason").innerText =
            data.reason;

        result.classList.remove("hidden");

    }
    catch(err){

        console.error(err);

        alert(err.message);

    }
    finally{

        loading.classList.add("hidden");

        button.disabled = false;

    }

}