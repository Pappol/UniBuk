import axios from 'axios'

export let favs = []

export let toShow = []

export const getFavourites = async () => {
    if(localStorage.myId === null || localStorage.myId === '') {
      favs = null;
    } else {
      const usrRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${localStorage.myId}`);
      const json = await usrRes.json();
      favs = await json.user.favourites;
    }
  };

export const editFavourites = async (id) => {
    const i = favs.indexOf(id);

    if(i >= 0) {
      favs.splice(i, 1);
    } else {
      favs.push(id);
    }

    const data = [{
      'propName': 'favourites',
      'value': favs
    }]
    const token = "Bearer " + localStorage.token;
    const headers = {
      'Content-type': 'application/json',
      'Authorization': token
    }

    axios.patch(`${process.env.REACT_APP_BACKEND_URL}/user/${localStorage.myId}`, data, {
      headers: headers
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });

  }

export const isInFavs = (id) => {
  if(localStorage.myId == null || localStorage.myId  == ''){
    return false
  } else {
    const i = favs.indexOf(id);
    if(i >= 0) {
      return true
    } else {
      return false
    }
  }
  }

export const setFavourites = async (kind) => {
  await getFavourites()
  .then( async () => {
    //let favResources = [];
    toShow = []

    for( const fav of favs) {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${kind}/${fav}`);
      const jres = await res.json();

      if(typeof(jres.message) === 'undefined' && kind === 'books') {
        toShow.push(jres.book);
      }

      if(typeof(jres.message) === 'undefined' && kind === 'contents') {
        toShow.push(jres.content);
      }
    }
  })
}