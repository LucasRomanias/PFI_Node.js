let contentScrollPosition = 0;

Init_UI();

function Init_UI() {
    renderLogin();
    renderHeader();
    $('#aboutCmd').on("click", function () {
        renderAbout();
    });
    $('#loginCmd').on("click", function () {
        renderLogin();
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Views rendering
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
function updateHeader(string, name) {
    $("#header") = empty();

    $(".viewTitle") = (string)

    
}

function renderHeader(){    
    timeout();
    saveContentScrollPosition();
    eraseContent();

    $("#header").append(
        $(`
        <span title="Liste des photos" id="listPhotosCmd">
        <img src="images/PhotoCloudLogo.png" class="appLogo">
         </span>
        <span class="viewTitle">Liste des photos
        <div class="cmdIcon fa fa-plus" id="newPhotoCmd" title="Ajouter une photo"></div>
        </span>
        <div class="headerMenusContainer">
        <span>&nbsp;</span> <!--filler-->
        <i title="Modifier votre profil">
        <div class="UserAvatarSmall" userid="" id="editProfilCmd"
        style="background-image:url('')"
        title="Nicolas Chourot"></div>
        </i>
        <div class="dropdown ms-auto dropdownLayout">
        <div data-bs-toggle="dropdown" aria-expanded="false">
        <i class="cmdIcon fa fa-ellipsis-vertical"></i>
    </div>
    <div class="dropdown-menu noselect">
        <div class="dropdown-item" id="loginCmd">
            <i class="menuIcon fa fa-sign-in mx-2"></i> Connexion
        </div>
        <div class="dropdown-divider"></div>

        <div class="dropdown-item" id="aboutCmd">
            <i class="menuIcon fa fa-info-circle mx-2"></i> À propos...
        </div>
    </div>
        </div>
        </div>
        
        
  
        `))
}


function renderAbout() {
    timeout();
    saveContentScrollPosition();
    eraseContent();
    UpdateHeader("À propos...", "about");

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
                    Auteur: Nicolas Chourot
                </p>
                <p>
                    Collège Lionel-Groulx, automne 2023
                </p>
            </div>
        `))
}

function renderLogin() {

    let loginMessage = "";
    let Email = "";
    let EmailError = "";
    let passwordError = "";

    timeout();
    saveContentScrollPosition();
    eraseContent();
    //UpdateHeader("À propos...", "about");

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
}
