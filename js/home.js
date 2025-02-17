const main = document.querySelector('.main')


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OGZkZTc0MmU3MmJiODI5MTVhOTdkM2UwODQ5NGRmNyIsIm5iZiI6MTczOTQxOTM5My4wMjgsInN1YiI6IjY3YWQ2ZjAxODExZmMyZGI4N2QwYjhhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lZyJ6VjzgQBk4tZRt9mAwlRS8Y3TWaS9vkuoAxFsGDc'
    }
  };
  
  fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    .then(res => res.json())
    .then(data => {
        data.genres.forEach(item=>{
            fetchMoviesByGenres(item.id, item.name);
        });
        console.log(data)
    })

    const fetchMoviesByGenres = (id, genres)=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OGZkZTc0MmU3MmJiODI5MTVhOTdkM2UwODQ5NGRmNyIsIm5iZiI6MTczOTQxOTM5My4wMjgsInN1YiI6IjY3YWQ2ZjAxODExZmMyZGI4N2QwYjhhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lZyJ6VjzgQBk4tZRt9mAwlRS8Y3TWaS9vkuoAxFsGDc'
            }
          };
          
          fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
            .then(res => res.json())
            .then(data => {
                makeCategoryElement(`${genres}_movies`, data.results);
            }
                )
            .catch(err => console.error(err));
    }
    // .catch(err => console.error(err));

    const makeCategoryElement = (category, data)=>{
        main.innerHTML +=`
            <div class="movie-list">
            <button class="pre-btn">
                <img src="images/pre.png" alt="">
            </button>
            <h1 class="movie-category">${category.split("_").join(" ")}</h1>
            <div class="movie-container" id="${category}">
                
            </div>

            <button class="nxt-btn">
                <img src="images/pre.png" class="nxt" alt="">
            </button>

        `;
        makeCards(category, data);


    }
    const makeCards = (id, data)=>{
        const movieContainer = document.getElementById(id);
        data.forEach((item, i)=>{
            if(item.backdrop_path == null){
                item.backdrop_path = item.poster_path;
                if(item.backdrop_path == null){
                    return;
                }

            movieContainer.innerHTML +=`
                <div class="movie">
                    <img src="${img_url}${item.backdrop_path}" alt="">
                    <p class="movie-title">${item.title}</p>
                </div>
            `
            }
        })
    }