const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbze2Me1uH3xZJ8ZUyccDIQ4du_Zti_uLY_kQpcNFt_N1SmYv_yICDVf-mDhTR0F4pVq/exec";

const button = document.getElementById("generateBtn");

button.addEventListener("click", generateName);

async function generateName() {

    const name = document.getElementById("name").value.trim();

    const genderInput =
        document.querySelector('input[name="gender"]:checked');

    if (!name) {
        alert("Please enter your first name.");
        return;
    }

    if (!genderInput) {
        alert("Please select a gender.");
        return;
    }

    const gender = genderInput.value;

    button.disabled = true;
    button.innerText = "Generating...";

    try {

        const url =
            `${APPS_SCRIPT_URL}?name=${encodeURIComponent(name)}&gender=${encodeURIComponent(gender)}`;

        console.log("Request URL:", url);

        const response = await fetch(url, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status} ${response.statusText}`
            );
        }

        const text = await response.text();

        console.log("Raw Response");
        console.log(text);

        let data;

        try {

            data = JSON.parse(text);

        } catch (e) {

            throw new Error(
                "Server returned invalid JSON.\n\n" + text
            );

        }

        if (!data.success) {

            throw new Error(
                data.message || "Unknown Server Error"
            );

        }

        alert(
`Pronunciation : ${data.pronunciation}

Korean Name : ${data.korean_name}

Meaning :
${data.meaning}

Reason :
${data.reason}`
        );

    } catch (err) {

        console.error(err);

        alert(
`AI Server Error

${err.message}`
        );

    } finally {

        button.disabled = false;
        button.innerText = "Generate Korean Name";

    }

}