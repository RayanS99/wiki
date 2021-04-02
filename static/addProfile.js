"use strict";

async function postFormDataAsJson({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    console.log("plainFormData");
    console.log(plainFormData);
    console.log(typeof plainFormData);
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString);
    console.log(typeof formDataJsonString);


    const fetchOptions = {
        method: "POST",
        redirect: "follow",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(plainFormData),
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
        console.log('response not ok');
    }

    if (response.redirected) {
        window.location.href = "/showprofiles";
    }
}


async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const url = form.action;
    console.log(url);

    try {
        console.log("inside try");
        const formData = new FormData(form);

        const responseData = await postFormDataAsJson({ url, formData });
        console.log("Response data in try:");
        console.log(responseData);
    } catch (error) {
        console.error(error);
    }
}

const profileForm = document.getElementById("profile-form");
profileForm.addEventListener("submit", handleFormSubmit);
