const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbze2Me1uH3xZJ8ZUyccDIQ4du_Zti_uLY_kQpcNFt_N1SmYv_yICDVf-mDhTR0F4pVq/exec";

const button = document.getElementById("generateBtn");

button.addEventListener("click", generateName);

async function generateName() {

    const name = document.getElementById("name").value.trim();

    const gender =
        document.querySelector('input[name="gender"]:checked').value;

    if (!name) {

        alert("Please enter your first name.");

        return;

    }

    button.disabled = true;
    button.innerText = "Generating...";

    try {

        const response = await fetch(APPS_SCRIPT_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                name,
                gender

            })

        });

        const data = await response.json();

        alert(JSON.stringify(data, null, 2));

    } catch (error) {

        console.error(error);

        alert("Failed to connect to AI Server.");

    }

    button.disabled = false;
    button.innerText = "Generate Korean Name";

}