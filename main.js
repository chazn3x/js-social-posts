const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

arrayReorder(posts);
popolateContainer();

// creazione nuovo post
const post = document.getElementById("create-post");
post.addEventListener("click", function () {
    const newAuthor = {
        name: document.getElementById("new-author").innerHTML,
        image: null
    };
    console.log(posts.length + 1);
    const newId = posts.length + 1;
    const newContent = document.getElementById("new-post-text").value;
    const newMedia = null;
    const newLikes = 0;
    const data = new Date();
    const year = data.getFullYear();
    const month = ("00" + (data.getMonth() + 1)).slice(-2);
    const day = ("00" + (data.getDate())).slice(-2);
    const hour = data.getHours();
    const minutes = data.getMinutes() + 1;
    const created = year + "-" + month + "-" + day;
    const newPost = {
        "id": newId,
        "content": newContent,
        "media": newMedia,
        "author": newAuthor,
        "likes": newLikes,
        "created": created,
        "time": {
            hour: hour,
            minutes: minutes
        }
    }
    const postData = document.getElementsByClassName("new-post-data");
    for (let i = 0; i < postData.length; i++) {
        const newData = new Date;
        const newHour = newData.getHours() - posts[i].time.hour;
        const newMinutes = (newData.getMinutes() + 1) - posts[i].time.minutes;
        if (newHour == 0) {
            if (newMinutes == 0) {
                postData[postData.length - 1 - i].innerHTML = "Poco fa";
            } else if (newMinutes == 1) {
                postData[postData.length - 1 - i].innerHTML = newMinutes + " minuto fa";
            } else {
                postData[postData.length - 1 - i].innerHTML = newMinutes + " minuti fa";
            }
        } else {
            postData[postData.length - 1 - i].innerHTML = newHour + " ore fa";
        }
    }
    posts.push(newPost);
    arrayReorder(posts);
    let newPostDiv = document.createElement("div");
    newPostDiv.classList.add("post");
    const profileImage = takeProfileImage(newAuthor);
    newPostDiv.innerHTML =
    `<div class="post__header">
        <div class="post-meta">                    
            <div class="post-meta__icon">
                ${profileImage}         
            </div>
            <div class="post-meta__data">
                <div class="post-meta__author">${newAuthor.name}</div>
                <div class="post-meta__time"><span class="new-post-data">Adesso</span>, ${posts[0].newCreated.itaDate}</div>
            </div>                    
        </div>
    </div>
    <div class="post__text">${newContent}</div>
    <div class="post__image">
        <img src="${newMedia}" alt="">
    </div>
    <div class="post__footer">
        <div class="likes js-likes">
            <div class="likes__cta">
                <button class="like-button  js-like-button" data-postid="${newId}">
                    <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                    <span class="like-button__label">Mi Piace</span>
                </button>
            </div>
            <div class="likes__counter">
                Piace a <b id="like-counter-${newId}" class="js-likes-counter">${newLikes}</b> persone
            </div>
        </div> 
    </div>`;
    const container = document.getElementById("container");
    container.prepend(newPostDiv);
    const likeBtn = document.querySelector(`[data-postid="${newId}"]`);
    likeBtn.addEventListener("click", function () {
        const likeCounter = document.getElementById(`like-counter-${newId}`);
        let likeInt = parseInt(likeCounter.innerHTML);
        if (!(this.classList.contains("like-button--liked"))) {
            this.classList.add("like-button--liked");
            likeInt += 1;
        } else {
            this.classList.remove("like-button--liked");
            likeInt -= 1;
        }
        likeCounter.innerHTML = likeInt;
    });
    document.getElementById("new-post-text").value = "";
});
// funzione per inserire i post iniziali
function popolateContainer() {
    const container = document.getElementById("container");
    let item = '';
    for (let i = 0; i < posts.length; i++) {
        const {id, content, media, author, newCreated,likes} = posts[i];
        const profileImage = takeProfileImage(author);
        item =
        `<div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        ${profileImage}         
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${author.name}</div>
                        <div class="post-meta__time">${takeDate(newCreated)} mesi fa, ${newCreated.itaDate}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${content}</div>
            <div class="post__image">
                <img src="${media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <button class="like-button  js-like-button" data-postid="${id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </button>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>`;
        container.innerHTML += item;
    }
    addLikes();
}
// funzione per calcolare quanti mesi fa è stato pubblicato il post
function takeDate(newCreated) {
    let postMonth = newCreated.month;
    const todayDate = new Date();
    const todayMonth = todayDate.getMonth() + 1;
    postMonth = todayMonth - postMonth;
    return postMonth;
}
// funzione per creare l'icona del profilo
function takeProfileImage(author) {
    const {name, image} = author;
    if (image == null) {
        const firstLetter = name[0];
        let secondLetter = '';
        for (let i = 0; i < name.length; i++) {
            if (name[i] == " ") {
                secondLetter = name[i + 1];
            }
        }
        return profileImage = 
        `<div class="profile-pic-default">
            <span>${firstLetter + secondLetter}</span>
        </div>`;
    }
    return profileImage = `<img class="profile-pic" src="${image}" alt="${name}">`;
}
// funzione per i mi piace
function addLikes() {
    for (let i = 0; i < posts.length; i++) {
        const {id} = posts[i];
        const likeBtn = document.querySelector(`[data-postid="${id}"]`);
        likeBtn.addEventListener("click", function () {
            const likeCounter = document.getElementById(`like-counter-${id}`);
            let likeInt = parseInt(likeCounter.innerHTML);
            if (!(this.classList.contains("like-button--liked"))) {
                this.classList.add("like-button--liked");
                likeInt += 1;
            } else {
                this.classList.remove("like-button--liked");
                likeInt -= 1;
            }
            likeCounter.innerHTML = likeInt;
        });
    }
}
// funzione per ordinare array per data di pubblicazione
function arrayReorder(posts) {
    for (let i = 0; i < posts.length; i++) {
        const {created} = posts[i];
        const reverseDate = created.split("-").reverse();
        const postYear = parseInt(reverseDate[2]);
        const postMonth = parseInt(reverseDate[1]);
        const postDay = parseInt(reverseDate[0]);
        let printMonth = '';
        switch (postMonth) {
            case 1:
                printMonth = "Gennaio";
                break;
            case 2:
                printMonth = "Febbraio";
                break;
            case 3:
                printMonth = "Marzo";
                break;
            case 4:
                printMonth = "Aprile";
                break;
            case 5:
                printMonth = "Maggio";
                break;
            case 6:
                printMonth = "Giugno";
                break;
            case 7:
                printMonth = "Luglio";
                break;
            case 8:
                printMonth = "Agosto";
                break;
            case 9:
                printMonth = "Settembre";
                break;
            case 10:
                printMonth = "Ottobre";
                break;
            case 11:
                printMonth = "Novembre";
                break;
            case 12:
                printMonth = "Dicembre";
        }
        const date = {
            day: postDay,
            month: postMonth,
            year: postYear,
            itaDate: postDay + " " + printMonth + " " + postYear
        }
        posts[i].newCreated = date;
    }
    posts.sort(compare);
}
// funzione per comparare gli elementi nell'array in base alla data
function compare(a, b) {
    if (a.newCreated.month < b.newCreated.month) {
      return 1;
    }
    if (a.newCreated.month > b.newCreated.month) {
      return -1;
    }
    if (a.newCreated.month == b.newCreated.month) {
        if (a.newCreated.day < b.newCreated.day) {
          return 1;
        }
        if (a.newCreated.day > b.newCreated.day) {
          return -1;
        }
    }
    return 0;
}
