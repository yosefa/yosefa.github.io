const base_url = "https://api.football-data.org/";
const API_KEY = '15d06b405ec144789fc05efed1727a21';
const fetchApi = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    });
};

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

// Blok kode response
function responseTeam(data) {
    let teamsHTML = "";
    data.teams.forEach(function (team) {
        let logoUri = team.crestUrl;
        logoUri = logoUri.replace(/^http:\/\//i, 'https://');
        teamsHTML += `
        <div class="col s12 m6">
            <div class="card">
                <a href="./team.html?id=${team.id}">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img src="${logoUri}" class="logo-image" alt="Logo" />
                    </div>
                    <div class="card-content color-black">
                        <span class="card-title truncate">${team.name}</span>
                        <p>${team.venue}</p>
                    </div>
                </a>
            </div>
        </div>
        `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #
    document.getElementById("teams").innerHTML = teamsHTML;
}

// Blok kode untuk loading team
function loadingTeams() {
    let loadingHTML = `
        <div class="center-align p5">
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                        <div class="circle"></div>
                    </div><div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #
    document.getElementById("teams").innerHTML = loadingHTML;
}

// Blok kode untuk melakukan request data json
function getTeams() {
    const urlTeams = base_url + "v2/competitions/2021/teams";

    // loading dulu
    loadingTeams();

    if ('caches' in window) {
        caches.match(urlTeams).then(function (response) {
            if (response) {
                response.json().then(responseTeam)
            }
        })
    }

    fetchApi(urlTeams)
        .then(status)
        .then(json)
        .then(responseTeam)
        .catch(error);
}

// Blok kode response team berdasarkan id
function responseTeamDetail(data) {
    let logoUri = data.crestUrl;
    logoUri = logoUri.replace(/^http:\/\//i, 'https://');
    let teamHTML = `
        <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
                <img src="${logoUri}" class="logo-detail-image" alt="Logo" />
            </div>
            <div class="card-content">
                <span class="card-title center-align">${data.name}</span>
                <table>
                    <tbody>
                        <tr>
                            <td>Address</td>
                            <td>${data.address}</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>${data.phone}</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td>${data.website}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${data.email}</td>
                        </tr>
                        <tr>
                            <td>Club Colors</td>
                            <td>${data.clubColors}</td>
                        </tr>
                        <tr>
                            <td>Venue</td>
                            <td>${data.venue}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById("body-content").innerHTML = teamHTML;
    return data;
}

// Blok kode untuk loading team by id
function loadingTeamById() {
    let loadingHTML = `
        <div class="center-align p5">
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                        <div class="circle"></div>
                    </div><div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #
    document.getElementById("body-content").innerHTML = loadingHTML;
}

// Blok kode mendapatkan team berdasarkan id
function getTeamById() {
    return new Promise(function (resolve, reject) {
        // Ambil nilai query parameter (?id=)
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        const urlTeamId = base_url + "v2/teams/" + idParam;

        loadingTeamById();

        if ("caches" in window) {
            caches.match(urlTeamId).then(function (response) {
                if (response) {
                    response.json().then(responseTeamDetail).then((data) => resolve(data));
                }
            });
        }

        fetchApi(urlTeamId)
            .then(status)
            .then(json)
            .then(responseTeamDetail)
            .then((data) => resolve(data));
    });
}

// Blok kode response dari saved teams
function responseSavedTeams(teams) {
    // Menyusun komponen card team secara dinamis
    let teamsHTML = "";
    teams.forEach(function (team) {
        let logoUri = team.crestUrl;
        logoUri = logoUri.replace(/^http:\/\//i, 'https://');
        teamsHTML += `
            <div class="col s12 m6">
                <div class="card">
                    <a href="./team.html?id=${team.id}&saved=true">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="${logoUri}" class="logo-image" alt="Logo" />
                        </div>
                        <div class="card-content color-black">
                            <span class="card-title truncate">${team.name}</span>
                            <p>${team.venue}</p>
                        </div>
                    </a>
                </div>
            </div>
        `;
    });

    // cek jika team belum ada yang disimpan
    if (teams.length === 0) {
        teamsHTML += `
            <div class="col s12 m6">
                <div class="card p3 center-align">
                    <b>Belum ada team yang disimpan.</b>
                </div>
            </div>
        `;
    }

    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = teamsHTML;
}

// Blok kode untuk loading saved team
function loadingSavedTeams() {
    let loadingHTML = `
        <div class="center-align p5">
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                        <div class="circle"></div>
                    </div><div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #
    document.getElementById("body-content").innerHTML = loadingHTML;
}

// Blok kode mendapatkan saved teams dari indexeddb
function getSavedTeams() {
    // Loading dulu
    loadingSavedTeams();

    // get all saved teams dari db
    getAll().then(responseSavedTeams);
}

// Blok kode response dari saved team by id
function responseSavedTeamById(team) {
    let logoUri = team.crestUrl;
    logoUri = logoUri.replace(/^http:\/\//i, 'https://');
    let teamHTML = `
    <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
            <img src="${logoUri}" class="logo-detail-image" alt="Logo" />
        </div>
        <div class="card-content">
            <span class="card-title center-align">${team.name} DUAR</span>
            <table>
                <tbody>
                    <tr>
                        <td>Address</td>
                        <td>${team.address}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>${team.phone}</td>
                    </tr>
                    <tr>
                        <td>Website</td>
                        <td>${team.website}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>${team.email}</td>
                    </tr>
                    <tr>
                        <td>Club Colors</td>
                        <td>${team.clubColors}</td>
                    </tr>
                    <tr>
                        <td>Venue</td>
                        <td>${team.venue}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #
    document.getElementById("body-content").innerHTML = teamHTML;
}

// Blok kode mendapatkan saved team berdasarkan id
function getSavedTeamById() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    getById(idParam).then(responseSavedTeamById).catch(error);
}