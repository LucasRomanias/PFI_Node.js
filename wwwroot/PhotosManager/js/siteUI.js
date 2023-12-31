let contentScrollPosition = 0;




                                                    /* ----------------------------- Section d'initialisation ----------------------------- */






Init_UI();

function Init_UI() {                                                                                        // On initialise l'interface utilisateur
    renderLogin();
    initTimeout(200, renderLogin);
}




                                                        /* ----------------------------- Fonctions utiles ----------------------------- */




function showWaitingGif() {
    eraseContent();
    $("#content").append($("<div class='waitingGifcontainer'><img class='waitingGif' src='images/Loading_icon.gif' /></div>'"));
}
function eraseContent() {
    $("#content").empty();
}
function saveContentScrollPosition() {
    contentScrollPosition = $("#content")[0].scrollTop;
}
function restoreContentScrollPosition() {
    $("#content")[0].scrollTop = contentScrollPosition;
}
async function createProfil(profil) {
    let result = await API.register(profil)
    if (result) {
        renderLogin("", "", "", "Votre compte a été créé. Veuillez prendre vos courriels pour réccupérer votre code de vérification qui vous sera demandé lors de votre prochaine connexion.");
    }
    else {
        renderError("Une erreur c'est produite.");
    }

}
function getFormData($form) { // On récupère les données du formulaire
    const removeTag = new RegExp("(<[a-zA-Z0-9]+>)|(</[a-zA-Z0-9]+>)", "g");
    var jsonObject = {};
    $.each($form.serializeArray(), (index, control) => {
        jsonObject[control.name] = control.value.replace(removeTag, "");
    });
    return jsonObject;
}



            /* ----------------------------- Section que l'on Update le header selon le type de page  ainsi que les types de permissions de l'utilisateur -----------------------------  */




function updateHeader(title, type) {                                                                                                        // On met à jour le header selon le type de page
    $("#header").empty();
    if (type == 'createProfil' || type == 'Login') {
        $("#header").append($(`<img id='photoTitleContainer' src='./favicon.ico'/><h2>${title}</h2>
        <div class="dropdown ms-auto dropdownLayout"> 
            <div data-bs-toggle="dropdown" aria-expanded="false"> 
                <i class="cmdIcon fa fa-ellipsis-vertical"></i> 
            </div>
            <div class="dropdown-menu noselect">
            <span class="dropdown-item" id="loginCmd"> 
                <i class="menuIcon fa fa-sign-in mx-2"></i> Connexion 
            </span>
            <div class="dropdown-divider"></div> 
            <span class="dropdown-item" id="aboutCmd"> 
                <i class="menuIcon fa fa-info-circle mx-2" id='aboutCmd'></i> À propos... </span>
            </div> 
        </div>`));
    }
    else if (type == "connected") {                                                                                                             // On affiche le header lorsqu'on est connecté
        if (API.retrieveLoggedUser() != undefined) {
            let user = API.retrieveLoggedUser();
            let isAdmin = "";
            if (user.Authorizations.readAccess == 2 && user.Authorizations.writeAccess == 2) {
                isAdmin = `<span class="dropdown-item" id="manageUserCm">
                <i class="menuIcon fas fa-user-cog mx-2"></i> 
                Gestion des usagers 
                </span>
                <div class="dropdown-divider"></div>`;
            }

            $("#header").append($(`
            <img id='photoTitleContainer' src='./favicon.ico'/><h2>${title}</h2>
            <img id='UserAvatarSmall' class='UserAvatarSmall' src='${user.Avatar}'>
             <div class="dropdown ms-auto dropdownLayout">
            <div data-bs-toggle="dropdown" aria-expanded="false">
            <i class="cmdIcon fa fa-ellipsis-vertical"></i>
            </div>
            <div class="dropdown-menu noselect">
            ${isAdmin}
            <span class="dropdown-item" id="logoutCmd">
            <i class="menuIcon fa fa-sign-out mx-2"></i>
            Déconnexion 
            </span>
            <span class="dropdown-item" id="editProfilMenuCmd">
            <i class="menuIcon fa fa-user-edit mx-2"></i>
            Modifier votre profil
            </span> <div class="dropdown-divider">
            </div> <span class="dropdown-item" id="listPhotosMenuCmd">
            <i class="menuIcon fa fa-image mx-2"></i>
            Liste des photos 
            </span>
            <div class="dropdown-divider"></div> 
            <span class="dropdown-item" id="sortByDateCmd"> 
            <i class="menuIcon fa fa-check mx-2"></i>
            <i class="menuIcon fa fa-calendar mx-2"></i> 
            Photos par date de création 
            </span> 
            <span class="dropdown-item" id="sortByOwnersCmd"> 
            <i class="menuIcon fa fa-fw mx-2"></i> 
            <i class="menuIcon fa fa-users mx-2"></i> 
            Photos par créateur 
            </span> 
            <span class="dropdown-item" id="sortByLikesCmd"> 
            <i class="menuIcon fa fa-fw mx-2"></i> 
            <i class="menuIcon fa fa-user mx-2"></i> 
            Photos les plus aiméés 
            </span> 
            <span class="dropdown-item" id="ownerOnlyCmd"> 
            <i class="menuIcon fa fa-fw mx-2"></i> 
            <i class="menuIcon fa fa-user mx-2"></i> 
            Mes photos 
            </span> 
            <div class="dropdown-divider"></div> 
            <span class="dropdown-item" id="aboutCmd"> 
            <i class="menuIcon fa fa-info-circle mx-2"></i> 
            À propos... 
            </span> 
            </div> 
            </div>`));
        }
    }
    else if (type == 'verif') {                                                                                                 // On affiche le header lorsqu'on est en vérification
        $("#header").append($(`<img id='photoTitleContainer' src='./favicon.ico'/><h2>${title}</h2>
        <div class="dropdown ms-auto dropdownLayout"> 
            <div data-bs-toggle="dropdown" aria-expanded="false"> 
                <i class="cmdIcon fa fa-ellipsis-vertical"></i> 
            </div>
            <div class="dropdown-menu noselect">
            <span class="dropdown-item" id="logoutCmd"> 
                <i class="menuIcon fa fa-sign-out mx-2"></i> Déconnexion 
            </span>
            <div class="dropdown-divider"></div> 
            <span class="dropdown-item" id="aboutCmd"> 
                <i class="menuIcon fa fa-info-circle mx-2" id='aboutCmd'></i> À propos... </span>
            </div> 
        </div>`));
    }
    else if (type == "about") {                                                                                                 // On affiche le header lorsqu'on est sur la page À propos
        let user = API.retrieveLoggedUser();
        if (user != null) {
            if (user.VerifyCode == 'verified') {
                $("#header").append($(`
            <img id='photoTitleContainer' src='./favicon.ico'/><h2>${title}</h2>
            <img id='avatarUser' class='UserAvatarSmall' src='${user.Avatar}'>
             <div class="dropdown ms-auto dropdownLayout"> <div data-bs-toggle="dropdown" aria-expanded="false"> <i class="cmdIcon fa fa-ellipsis-vertical"></i> </div> <div class="dropdown-menu noselect"> <span class="dropdown-item" id="manageUserCm"> <i class="menuIcon fas fa-user-cog mx-2"></i> Gestion des usagers </span> <div class="dropdown-divider"></div> <span class="dropdown-item" id="logoutCmd"> <i class="menuIcon fa fa-sign-out mx-2"></i> Déconnexion </span> <span class="dropdown-item" id="editProfilMenuCmd"> <i class="menuIcon fa fa-user-edit mx-2"></i> Modifier votre profil </span> <div class="dropdown-divider"></div> <span class="dropdown-item" id="listPhotosMenuCmd"> <i class="menuIcon fa fa-image mx-2"></i> Liste des photos </span> <div class="dropdown-divider"></div> <span class="dropdown-item" id="sortByDateCmd"> <i class="menuIcon fa fa-check mx-2"></i> <i class="menuIcon fa fa-calendar mx-2"></i> Photos par date de création </span> <span class="dropdown-item" id="sortByOwnersCmd"> <i class="menuIcon fa fa-fw mx-2"></i> <i class="menuIcon fa fa-users mx-2"></i> Photos par créateur </span> <span class="dropdown-item" id="sortByLikesCmd"> <i class="menuIcon fa fa-fw mx-2"></i> <i class="menuIcon fa fa-user mx-2"></i> Photos les plus aiméés </span> <span class="dropdown-item" id="ownerOnlyCmd"> <i class="menuIcon fa fa-fw mx-2"></i> <i class="menuIcon fa fa-user mx-2"></i> Mes photos </span> <div class="dropdown-divider"></div> <span class="dropdown-item" id="aboutCmd"> <i class="menuIcon fa fa-info-circle mx-2"></i> À propos... </span> </div> </div>`));
            }
            else {
                $("#header").append($(`<img id='photoTitleContainer' src='./favicon.ico'/><h2>${title}</h2>
                <div class="dropdown ms-auto dropdownLayout"> 
                    <div data-bs-toggle="dropdown" aria-expanded="false"> 
                        <i class="cmdIcon fa fa-ellipsis-vertical"></i> 
                    </div>
                    <div class="dropdown-menu noselect">
                    <span class="dropdown-item" id="loginCmd"> 
                        <i class="menuIcon fa fa-sign-in mx-2"></i> Connexion 
                    </span>
                    <div class="dropdown-divider"></div> 
                    <span class="dropdown-item" id="aboutCmd"> 
                        <i class="menuIcon fa fa-info-circle mx-2" id='aboutCmd'></i> À propos... </span>
                    </div> 
                </div>`));
            }
        }
        else {
            $("#header").append($(`<img id='photoTitleContainer' src='./favicon.ico'/><h2>${title}</h2>
            <div class="dropdown ms-auto dropdownLayout"> 
                <div data-bs-toggle="dropdown" aria-expanded="false"> 
                    <i class="cmdIcon fa fa-ellipsis-vertical"></i> 
                </div>
                <div class="dropdown-menu noselect">
                <span class="dropdown-item" id="logoutCmd"> 
                    <i class="menuIcon fa fa-sign-out mx-2"></i> Déconnexion 
                </span>
                <div class="dropdown-divider"></div> 
                <span class="dropdown-item" id="aboutCmd"> 
                    <i class="menuIcon fa fa-info-circle mx-2" id='aboutCmd'></i> À propos... </span>
                </div> 
            </div>`));
        }
    }
    else if (type == "UsersManager") {                                                                                              // On affiche le header lorsqu'on est sur la page Gestion des usagers
        let user = API.retrieveLoggedUser();
        $("#header").append($(`<img id='photoTitleContainer' src='./favicon.ico'/><h2>${title}</h2>
        <img id='UserAvatarSmall' class='UserAvatarSmall' src='./images/adminLogo.png'>
        <div class="dropdown ms-auto dropdownLayout">
        <div data-bs-toggle="dropdown" aria-expanded="false">
            <i class="cmdIcon fa fa-ellipsis-vertical"></i>
        </div>
        <div class="dropdown-menu noselect">
            <span class="dropdown-item" id="manageUserCm">
                <i class="menuIcon fas fa-user-cog mx-2"></i> 
                Gestion des usagers 
            </span>
        <div class="dropdown-divider"></div>
            <span class="dropdown-item" id="logoutCmd">
            <i class="menuIcon fa fa-sign-out mx-2"></i>
            Déconnexion 
            </span>
            <span class="dropdown-item" id="editProfilMenuCmd">
            <i class="menuIcon fa fa-user-edit mx-2"></i>
            Modifier votre profil
            </span> <div class="dropdown-divider">
        </div> 
        <span class="dropdown-item" id="listPhotosMenuCmd">
            <i class="menuIcon fa fa-image mx-2"></i>
            Liste des photos 
        </span>
        <div class="dropdown-divider"></div> 
            <span class="dropdown-item" id="sortByDateCmd"> 
                <i class="menuIcon fa fa-check mx-2"></i>
                <i class="menuIcon fa fa-calendar mx-2"></i> 
                Photos par date de création 
            </span> 
            <span class="dropdown-item" id="sortByOwnersCmd"> 
                <i class="menuIcon fa fa-fw mx-2"></i> 
                <i class="menuIcon fa fa-users mx-2"></i> 
                Photos par créateur 
            </span> 
            <span class="dropdown-item" id="sortByLikesCmd"> 
                <i class="menuIcon fa fa-fw mx-2"></i> 
                <i class="menuIcon fa fa-user mx-2"></i> 
                Photos les plus aiméés 
            </span> 
            <span class="dropdown-item" id="ownerOnlyCmd"> 
                <i class="menuIcon fa fa-fw mx-2"></i> 
                <i class="menuIcon fa fa-user mx-2"></i> 
                Mes photos 
            </span> 
            <div class="dropdown-divider"></div> 
                <span class="dropdown-item" id="aboutCmd"> 
                    <i class="menuIcon fa fa-info-circle mx-2"></i> 
                    À propos... 
                </span> 
            </div> 
        </div>`));
    }
    $('#loginCmd').on('click', renderLogin); // Quand on clique sur le bouton connexion
    $('#aboutCmd').on('click', renderAbout); // Quand on clique sur le bouton À propos
    $('#logoutCmd').on('click', renderlogout); // Quand on clique sur le bouton Déconnexion
    $('#editProfilMenuCmd').on('click', renderModify); // Quand on clique sur le bouton Modifier votre profil
    $('#manageUserCm').on('click', renderUserManager); // Quand on clique sur le bouton Gestion des usagers
}






                        /* -----------------------------Section que l'on affiche les différentes pages selon le type de page ----------------------------- */






function renderlogout() { // On se déconnecte en tant qu'utilisateur                                                // On se déconnecte en tant qu'utilisateur
    API.logout()
    updateHeader("Connexion", 'Login');
    renderLogin()
}

function renderImages() { // On affiche les images                                                                  // On affiche les images
timeout();
eraseContent();
updateHeader('Liste des photos', 'connected');
$("#content").append(
$(`
<h2 style="margin-left:20px; margin-top:20px">En construction</h2>
`))
}

function renderAbout() {                                                                                            // On affiche la page À propos
    timeout();// On déconnecte l'utilisateur après 5 minutes d'inactivité
    saveContentScrollPosition(); // On sauvegarde la position du scroll
    eraseContent(); // On efface le contenu
    updateHeader("À propos...", "about"); // On met à jour le header

    $("#content").append(
        $(`
            <div class="aboutContainer">
                <h2>Gestionnaire de photos</h2>
                <hr>
                <p>
                    Petite application de gestion de photos multiusagers à titre de démonstration
                    d'interface utilisateur monopage réactive.
                </p>
                <p>
                    Auteurs : Nathan Dubois & Lucas Romanias
                </p>
                <p>
                    Collège Lionel-Groulx, automne 2023
                </p>
            </div>
        `))
}

function renderLogin(Email = "", EmailError = "", passwordError = "", loginMessage = "") {                          // On se connecte en tant qu'utilisateur existant

    API.logout(); // On se déconnecte
    eraseContent(); // On efface le contenu
    noTimeout(); // On arrête le timeout
    updateHeader("Connexion", "Login"); // On met à jour le header
    if (EmailError == undefined) {
        EmailError = "";
    }
    if (Email == '[object Object]') {
        Email = "";
    }

    $("#content").append(
        $(`
            <div class="content" style="text-align:center">
            <h3>${loginMessage}</h3>
            <form class="form" id="loginForm">
            <input type='email'
            name='Email'
            class="form-control"
            required
            RequireMessage = 'Veuillez entrer votre courriel'
            InvalidMessage = 'Courriel invalide'
            placeholder="adresse de courriel"
            value='${Email}'>
            <span style='color:red'>${EmailError}</span>
            <input type='password'
            name='Password'
            placeholder='Mot de passe'
            class="form-control"
            required
            RequireMessage = 'Veuillez entrer votre mot de passe'>
            <span style='color:red'>${passwordError}</span>
            <input type='submit' name='submit' value="Entrer" class="form-control btn-primary">
            </form>
            <div class="form">
            <hr>            
            <button class="form-control btn-info" id="createProfilCmd">Nouveau compte</button>        
            </div>
            </div>


        
        `))
    $('#createProfilCmd').on('click', renderRegister); // Quand on clique sur le bouton Nouveau compte

    $('#loginForm').on("submit", async function (event) {
        let loginInfo = getFormData($('#loginForm')) // On récupère les données du formulaire
        event.preventDefault(); // On empêche le formulaire de se soumettre
        showWaitingGif(); // On affiche le gif de chargement
        let result = await API.login(loginInfo.Email, loginInfo.Password)
        if (result) {
            let code = await API.retrieveLoggedUser();
            if (code.Authorizations.writeAccess == 0 && code.Authorizations.readAccess == 0) {
                API.logout()
                renderLogin("", "Votre compte est bloqué")
            }
            else {
                if (code.VerifyCode != "verified") {
                    renderVerifyForm();
                }
                else {
                    renderImages();
                }
            }
        }
        else {
            switch (API.currentStatus) {
                case 481: // On affiche les erreurs selon le code d'erreur
                    { renderLogin('', 'Courriel introuvable'); break; }
                case 482:
                    { renderLogin(loginInfo.Email, '', 'Mot de passe incorrect'); break; }
                default:
                    {
                        renderServerError();
                    }
            }
        }
    });
}

function renderVerifyForm() {                                                                                // On vérifie notre courriel pour pouvoir se connecter
    eraseContent(); // On efface le contenu
    noTimeout(); // On arrête le timeout
    updateHeader("Vérification", "verif"); // On met à jour le header
    $("#content").append($(`
    <div class="content" style="text-align:center">
        <h5 style="margin-top:30px">Veuillez entrer le code de vérification que vous avez reçus par courriel</h5>
        <form class="form" id="verifyForm">
            <input type='text'
            id='code'
            name='Code'
            class="form-control"
            placeholder="Code de vérification de courriel">
        </form>
        <div class="form">
            <button class="form-control btn-primary" id="verifyCmd">Vérifier</button>
        </div>
    </div>
    `))
    $('#verifyCmd').on("click", async function (event) {
        let code = getFormData($('#verifyForm'));
        event.preventDefault();
        let userid = API.retrieveLoggedUser().Id;
        let result = await API.verifyEmail(userid, code.Code);
        if (result) {
            renderImages();
        }
        else {
            API.logout();
            renderLogin("", "", "", "Une erreur c'est produit.");

        }
    });
}

function renderRegister() {                                                                                     // On s'inscrit en tant que nouvel utilisateur
    noTimeout(); // On arrête le timeout
    eraseContent(); // On efface le contenu
    updateHeader("Inscription", "createProfil"); // On met à jour le header

    $("#content").append(
        $(`
        <form class="form" id="createProfilForm">
        <fieldset>
        <legend>Adresse ce courriel</legend>
        <input type="email"
        class="form-control Email"
        name="Email"
        id="Email"
        placeholder="Courriel"
        required
        RequireMessage = 'Veuillez entrer votre courriel'
        InvalidMessage = 'Courriel invalide'
        CustomErrorMessage ="Ce courriel est déjà utilisé"/>
        <input class="form-control MatchedInput"
        type="text"
        matchedInputId="Email"
        name="matchedEmail"
        id="matchedEmail"
        placeholder="Vérification"
        required
        RequireMessage = 'Veuillez entrez de nouveau votre courriel'
        InvalidMessage="Les courriels ne correspondent pas" />
        </fieldset>
        <fieldset>
        <legend>Mot de passe</legend>
        <input type="password"
        class="form-control"
        name="Password"
        id="Password"
        placeholder="Mot de passe"
        required
        RequireMessage = 'Veuillez entrer un mot de passe'
        InvalidMessage = 'Mot de passe trop court'/>
        <input class="form-control MatchedInput"
        type="password"
        matchedInputId="Password"
        name="matchedPassword"
        id="matchedPassword"
        placeholder="Vérification" required
        InvalidMessage="Ne correspond pas au mot de passe" />
        </fieldset>
        <fieldset>
        <legend>Nom</legend>
        <input type="text"
        class="form-control Alpha"
        name="Name"
        id="Name"
        placeholder="Nom"
        required
        RequireMessage = 'Veuillez entrer votre nom'
        InvalidMessage = 'Nom invalide'/>
        </fieldset>
        <fieldset>
        <legend>Avatar</legend>
        <div class='imageUploader'
        newImage='true'
        controlId='Avatar'
        imageSrc='images/no-avatar.png'
        waitingImage="images/Loading_icon.gif">
        </div>
        </fieldset>
        <input type='submit' name='submit' id='saveUserCmd' value="Enregistrer" class="form-control btn-primary">
        </form>
        <div class="cancel">
        <button class="form-control btn-secondary" id="abortCmd">Annuler</button>
        </div>
        `))

    $('#loginCmd').on('click', renderLogin); // Quand on clique sur le bouton Connexion
    $('#abortCmd').on('click', renderLogin); // Quand on clique sur le bouton Annuler
    initFormValidation(); // On initialise la validation du formulaire
    initImageUploaders(); // On initialise l'upload d'image
    addConflictValidation(API.checkConflictURL(), 'Email', 'saveUserCmd'); // On ajoute la validation de conflit
    $('#createProfilForm').on("submit", function (event) {
        let profil = getFormData($('#createProfilForm'));
        delete profil.matchedPassword;
        delete profil.matchedEmail;
        event.preventDefault();
        showWaitingGif();
        createProfil(profil); // On crée le profil relié au formulaire a l'api
    });
}

function renderModify() {                                                                                               // On modifie notre profil en tant qu'utilisateur
    let user = API.retrieveLoggedUser(); // On récupère l'utilisateur
    timeout(); // On déconnecte l'utilisateur après 5 minutes d'inactivité
    eraseContent(); // On efface le contenu
    $("#content").append($(`
    <form class="form" id="editProfilForm"'>
    <input type="hidden" name="Id" id="Id" value="${user.Id}"/>
    <fieldset>
    <legend>Adresse ce courriel</legend>
    <input type="email"
    class="form-control Email"
    name="Email"
    id="Email"
    placeholder="Courriel"
    required
    RequireMessage = 'Veuillez entrer votre courriel'
    InvalidMessage = 'Courriel invalide'
    CustomErrorMessage ="Ce courriel est déjà utilisé"
    value="${user.Email}" >
    <input class="form-control MatchedInput"
    type="text"
    matchedInputId="Email"
    name="matchedEmail"
    id="matchedEmail"
    placeholder="Vérification"
    required
    RequireMessage = 'Veuillez entrez de nouveau votre courriel'
    InvalidMessage="Les courriels ne correspondent pas"
    value="${user.Email}" >
    </fieldset>
    <fieldset>
    <legend>Mot de passe</legend>
    <input type="password"
    class="form-control"
    name="Password"
    id="Password"
    placeholder="Mot de passe"
    InvalidMessage = 'Mot de passe trop court' >
    <input class="form-control MatchedInput"
    type="password"
    matchedInputId="Password"
    name="matchedPassword"
    id="matchedPassword"
    placeholder="Vérification"
    InvalidMessage="Ne correspond pas au mot de passe" >
    </fieldset>
    <fieldset>
    <legend>Nom</legend>
    <input type="text"
    class="form-control Alpha"
    name="Name"
    id="Name"
    placeholder="Nom"
    required
    RequireMessage = 'Veuillez entrer votre nom'
    InvalidMessage = 'Nom invalide'
    value="${user.Name}" >
    </fieldset>
    <fieldset>
    <legend>Avatar</legend>
    <div class='imageUploader'
    newImage='false'
    controlId='Avatar'
    imageSrc='${user.Avatar}'
    waitingImage="images/Loading_icon.gif">
    </div>
    </fieldset>
    </form>
    <div class="form">
        <button class="form-control btn-primary" id="saveUserCmd">Enregistrer</button>
    </div>
    <div class="cancel">
    <button class="form-control btn-secondary" id="abortCmd">Annuler</button>
    </div>
    <div class="cancel"> <hr>
    <button class="form-control btn-warning" id="killCmd">Effacer le compte</button>
    </div>
    `))
    $("#saveUserCmd").on("click", async function (event) {
        let profil = getFormData($('#editProfilForm'));
        delete profil.matchedEmail;
        delete profil.matchedPassword;
        event.preventDefault();
        showWaitingGif();
        let result = await API.modifyUserProfil(profil);
        if (result) {
            renderImages();
        }
        else {
            renderError("Une erreur c'est produite.");
        }
    });
    $('#abortCmd').on('click', renderImages); // Quand on clique sur le bouton Annuler
    $('#killCmd').on("click", renderKill); // Quand on clique sur le bouton Effacer le compte
    initFormValidation(); // On initialise la validation du formulaire
    initImageUploaders(); // On initialise l'upload d'image
}

function renderKill() {                                                                                                     // On efface notre compte en tant qu'utilisateur
    timeout(); // On déconnecte l'utilisateur après 5 minutes d'inactivité
    eraseContent(); // On efface le contenu
    $("#content").append($(`
    <div class="content" style="text-align:center">
        <h4 style="margin-top:30px">Voulez-vous vraiment effacer votre compte?</h4>
        <div class="form">
            <button class="form-control btn-danger" id="deleteCmd">Effacer mon compte</button>
        </div>
        <div class="form">
            <button class="form-control btn-secondary" id="cancelCmd">Annuler</button>
        </div>
    </div>
    `));
    $('#deleteCmd').on("click", async function (event) {
        let profil = API.retrieveLoggedUser();
        event.preventDefault();
        showWaitingGif();
        let result = await API.unsubscribeAccount(profil.Id); // On efface le compte relié à l'utilisateur
        if (result) {
            renderlogout();
            renderLogin();
        } else {
            renderError("Une erreur c'est produite.");
        }
    });
    $('#cancelCmd').on("click", renderModify);
}


function renderServerError() {                                                                              // On affiche une erreur de serveur 
    eraseContent(); // On efface le contenu
    updateHeader("Problème", "Login");
    $("#content").append($(`<div class="content" style="text-align:center">
        <span style='color:red; font-weight:bold;'>Le serveur ne répond pas</span>
        <hr>
        <div class="form">
            <button class="form-control btn-primary" id="connectCmd">Connexion</button>
        </div>
        </div>
    `));
    $("#connectCmd").on("click", renderLogin); // Quand on clique sur le bouton Connexion
}




                                                /* ----------------------------- Section Administrative ----------------------------- */





async function renderUserManager() {                                                                                          // On gère les usagers
    eraseContent(); // On efface le contenu
    timeout(); // On déconnecte l'utilisateur après 5 minutes d'inactivité
    updateHeader("Gestion des usagers", "UsersManager"); // On met à jour le header
    let currentUserId = "";
    let users = "";
    let result1 = await API.GetAccounts();
    if (result1) {
        users = result1.data;
        let result2 = await API.retrieveLoggedUser();
        if (result2) {
            currentUserId = result2.Id;
            let buttonAdmin = "";
            let buttonBlock = "";
            users.forEach((user) => {
                if (user.Authorizations.readAccess == 2 && user.Authorizations.writeAccess == 2) {
                    buttonAdmin = '<button class="cmdIconVisible fas fa-user-cog dodgerblueCmd demoteCmd" style="border-width:0px" id="demoteCmd" userId="' + user.Id + '"/>';
                } else {
                    buttonAdmin = '<button class="cmdIconVisible fas fa-user-alt dodgerblueCmd promoteCmd" style="border-width:0px" id="promoteCmd" userId="' + user.Id + '"/>';
                }
                if (user.Authorizations.readAccess == 0 && user.Authorizations.writeAccess == 0) {
                    buttonBlock = '<button class="cmdIconVisible fa fa-ban redCmd unblockCmd" style="border-width:0px" userId="' + user.Id + '"/>'
                } else {
                    buttonBlock = '<button class="cmdIconVisible fa-regular fa-circle greenCmd blockCmd" style="border-width:0px" userId="' + user.Id + '"/>';
                }
                if (user.Id != currentUserId) {
                    $("#content").append($(`
                    <div class="UserContainer">
                        <div class="UserLayout">
                            <img id="avatarUser" class="UserAvatar"src="${user.Avatar}"/>
                            <div class="UserInfo">
                                <span class="UserName">${user.Name}</span>
                                <span class="UserEmail">${user.Email}</span>
                            </div>
                        </div>
                        <div class="UserCommandPanel">
                            ${buttonAdmin}
                            ${buttonBlock}
                            <button class="cmdIconVisible fas fa-user-slash goldenrodCmd removeCmd" style="border-width:0px" id="removeCmd" userid="${user.Id}"/>
                        </div>
                    </div>
                    `));
                }

            });
        }
    }

    $('.promoteCmd').on('click', async function () {                                                       // On promouvoit un usager
        let userId = $(this).attr("userId");
        let result = await API.getUserByIdPromote(userId); // On promouvoit l'usager relié à l'id
        if (result) {
            renderUserManager();
        }
        else {
            renderError("Une erreur c'est produite.");
        }
    });
    $('.demoteCmd').on('click', async function () {                                                         // On dégrade un usager
        let userId = $(this).attr("userId");
        let result = await API.getUserByIdDemote(userId); // On dégrade l'usager relié à l'id
        if (result) {
            renderUserManager();
        }
        else {
            renderError("Une erreur c'est produite.")
        }
    });
    $('.blockCmd').on('click', async function () {  // On bloque un usager
        let userId = $(this).attr("userId");
        let result = await API.BlockUser(userId); // On bloque l'usager relié à l'id
        if (result) {
            renderUserManager();
        }
        else {
            renderError("Une erreur c'est produite.");
        }
    });
    $('.unblockCmd').on('click', async function () { // On débloque un usager
        let userId = $(this).attr("userId");
        let result = await API.getUserByIdDemote(userId); // On débloque l'usager relié à l'id
        if (result) {
            renderUserManager();
        }
        else {
            renderError("Une erreur c'est produite.");
        }
    });
    $('.removeCmd').on('click', async function () {  // On efface un usager
        let userId = $(this).attr("userId");
        let result = await API.GetUser(userId);
        if (result) {
            renderKA(result); // On efface l'usager relié à l'id
        }
        else {
            renderError("Une erreur c'est produite.");
        }
    });
}

function renderKA(user) {    // On efface un usager en tant qu'administrateur
    eraseContent(); // On efface le contenu
    timeout(); // On déconnecte l'utilisateur après 5 minutes d'inactivité
    updateHeader("Retrait de compte", "UsersManager"); // On met à jour le header
    $("#content").append($(`
    <div class="content" style="text-align:center">
        <h4 style="margin-top:30px">Voulez-vous vraiment effacer cet usager et toutes ses photos?</h4>
        <div class="UserLayout">
            <img id="avatarUser" class="UserAvatar"src="${user.Avatar}"/>
            <div class="UserInfo">
                <span class="UserName">${user.Name}</span>
                <span class="UserEmail">${user.Email}</span>
            </div>
        </div>
        <div class="form">
            <button class="form-control btn-danger" id="deleteCmd">Effacer mon compte</button>
        </div>
        <div class="form">
            <button class="form-control btn-secondary" id="cancelCmd">Annuler</button>
        </div>
    </div>
    `));
    $('#deleteCmd').on("click", async function (event) {
        event.preventDefault();
        showWaitingGif();
        let result = await API.unsubscribeAccount(user.Id);
        if (result) {
            renderUserManager();
        } else {
            renderError("Une erreur c'est produite.");
        }
    });
    $('#cancelCmd').on("click", renderUserManager);
}

function renderError(message) {
    $('body').append(`
        <div class='popupError'> 
            <div class='popupContentError'>
                <div>
                    <div class='popupHeaderError errorMessage'>${message}</div>
                </div>
                <div onclick='closePopupError(); ' class='close-btn fa fa-close'></div> 
            </div>
        </div> 
    `);
}

function closePopupError() {
    $(".popupError").hide();
}