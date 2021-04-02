"use strict";

const deleteThisGuy = (id) => {

    fetch(`/api/delete/${id}`, {
        method: "DELETE",
        mode: 'cors',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            document.getElementById(id).remove();
        }).catch(function (error) {
            console.log("Fetch error: " + error);
        });

}


const showThemAll = () => {
    fetch('/api/get-them-all')
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            let profileSection = document.getElementById('profile_section');
            
            for (const item in json) {
                let profile = document.createElement('div');
                profile.setAttribute('id', json[item].id);
                let name = document.createElement('h4');
                name.setAttribute('style', 'color: #c5773b');
                name.innerHTML = json[item].name + ' ' + json[item].surname;

                let content = document.createElement('h5');
                content.innerHTML = json[item].content;
                let birth = document.createElement('h6');
                let properDate = new Date(json[item].date_of_birth);
                birth.innerHTML = properDate.toLocaleDateString();

                let delete_btn = document.createElement('button');
                delete_btn.classList = 'btn btn-primary mt-2';
                delete_btn.innerHTML = 'Delete';
                delete_btn.addEventListener('click', () => deleteThisGuy(json[item].id));

                let br = document.createElement('br');
                let hr = document.createElement('hr');


                profile.appendChild(name);
                profile.appendChild(content);
                profile.appendChild(birth);
                profile.appendChild(delete_btn);
                profile.appendChild(br);
                profile.appendChild(hr);
                
                profileSection.appendChild(profile);

            }
        })
}

showThemAll();