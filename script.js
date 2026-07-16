const API_URL = "https://script.google.com/macros/s/AKfycbze2Me1uH3xZJ8ZUyccDIQ4du_Zti_uLY_kQpcNFt_N1SmYv_yICDVf-mDhTR0F4pVq/exec";

const generateBtn = document.getElementById("generateBtn");
const loading = document.getElementById("loading");
const result = document.getElementById("result");

generateBtn.addEventListener("click", generate);

async function generate() {

    const name = document.getElementById("nameInput").value.trim();

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    const gender =
        document.querySelector("input[name='gender']:checked").value;

    generateBtn.disabled = true;
    generateBtn.textContent = "Generating...";

    loading.style.display = "block";
    result.classList.add("hidden");

    try {

        const response = await fetch(
            `${API_URL}?name=${encodeURIComponent(name)}&gender=${gender}`
        );

        const data = await response.json();

        loading.style.display = "none";

        if (!data.success) {

            throw new Error(data.message);

        }

        document.getElementById("koreanName").textContent =
            data.korean_name;

        document.getElementById("romanization").textContent =
            data.romanization;

        document.getElementById("originalName").textContent =
            name;

        document.getElementById("pronunciation").textContent =
            data.pronunciation;

        document.getElementById("meaning").textContent =
            data.meaning;

        document.getElementById("reason").textContent =
            data.reason;

        result.classList.remove("hidden");

    } catch (err) {

        console.error(err);

        alert(err.message);

    }

    loading.style.display = "none";

    generateBtn.disabled = false;
    generateBtn.textContent = "Generate";

}

document.getElementById("shareBtn").addEventListener("click", async () => {

    const korean =
        document.getElementById("koreanName").textContent;

    const roman =
        document.getElementById("romanization").textContent;

    const text =
`🇰🇷 Every name tells a story.

Today, I discovered mine.

${korean} (${roman})

Curious about your Korean name?

✨ Try it here

https://jiwonllim09-maker.github.io/FindYourKoreanNameV8/;

    try {

        if (navigator.share) {

            await navigator.share({

                title: "Find Your Korean Name",

                text

            });

        } else {

            await navigator.clipboard.writeText(text);

            alert("Share text copied!");

        }

    } catch (e) {

        console.log(e);

    }

});

document.getElementById("downloadBtn").addEventListener("click", () => {

    alert("Certificate download will be added in the next step.");

});