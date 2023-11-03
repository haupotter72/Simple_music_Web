const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);
const player=$('.player');
const heading=$('header h2');
const cdThumb=$('.cd-thumb');
const audio=$('#audio');
const cd=$('.cd');
const playBtn=$('.btn-toggle-play');
const progress=$('#progress');
const nextBtn=$('.btn-next');
const prevBtn=$('.btn-prev');
const randomBtn=$('.btn-random');
const repeatBtn=$('.btn-repeat');
const playlist=$('.playlist');
const PLAYER_STORAGE_KEY='tum de thuong';




const app=
{
    currentIndex:0,
    isPlaying:false,
    isRandom:false,
    isRepeat:false,
    config:JSON.parse(localStorage.getItem('PLAYER_STORAGE_KEY'))||{},
    songs:[
        {
            name:'Internet Lovee',
            singer:'tum',
            path:'./mp3/song1.mp3',
            image:'https://firebasestorage.googleapis.com/v0/b/hehe-73795.appspot.com/o/hau%2Fz3478278474826_37458421f3a3e9cf2bf5239d5fffa56f31c.png?alt=media&token=345e2e83-3ea6-4987-9cf6-d05334b9e00d'
        },
         {
            name:'Beautiful girl',
            singer:'hau potter',
            path:'./mp3/song2.mp3',
            image:'https://firebasestorage.googleapis.com/v0/b/hehe-73795.appspot.com/o/hau%2Fz3502958780493_e93c38f11fbf7af30312181f9671a8d4.jpg?alt=media&token=78c64be4-e2d5-4400-aeff-523fb6f3d181'
        },
         {
            name:'Cau hon',
            singer:'van mai huong',
            path:'./mp3/song3.mp3',
            image:'https://firebasestorage.googleapis.com/v0/b/hehe-73795.appspot.com/o/hau%2Fz2984953987604_8e1d57f7c4fa368d239432b6193ed5fa.jpg?alt=media&token=a5502ab4-31ab-47be-96c0-cfb326ee9cd9'
        },
         {
            name:'ghe qua',
            singer:'Tho potter',
            path:'./mp3/song4.mp3',
            image:'https://firebasestorage.googleapis.com/v0/b/hehe-73795.appspot.com/o/hau%2Fz3460377327439_c7ee883acca744639c0ac7a842db6960.jpg?alt=media&token=addb2f7e-5fcf-4a5f-8694-fc698894a87e'
        },
         {
            name:'lan Hen ho dau tien',
            singer:' nguoi yeu Tho potter',
            path:'./mp3/song5.mp3',
            image:'https://firebasestorage.googleapis.com/v0/b/hehe-73795.appspot.com/o/hau%2Fz3487437585739_10e816351a58625bd8d678dcdc82f71f.jpg?alt=media&token=d5d9dffc-77b6-4f72-aa60-d374df941399'
        },
         {
            name:'Nợ Tui lời xin lỗi',
            singer:' Vuong xì ke',
            path:'./mp3/song6.mp3',
            image:'https://firebasestorage.googleapis.com/v0/b/hehe-73795.appspot.com/o/hau%2Favt.png?alt=media&token=8690c5ff-2709-438f-8ec5-7062051d94c0'
        },
         {
            name:'buoc qua mùa cô đơn',
            singer:'vuong tam trang',
            path:'./mp3/song7.mp3',
            image:'https://firebasestorage.googleapis.com/v0/b/hehe-73795.appspot.com/o/hau%2Fz3321447384658_bcd1417456fckokjk34d5688295ab24dd9ad3.png?alt=media&token=4ea97b25-cfd6-457c-b794-dea34b1c8911'
        },
         {
            name:'vuong doi tui nhé',
            singer:' nguoi yeu Tho potter',
            path:'./mp3/song8.mp3',
            image:'https://firebasestorage.googleapis.com/v0/b/hehe-73795.appspot.com/o/hau%2Fz3460377340956_a5e99f455e4436e09eadafb8c67a8586.jpg?alt=media&token=efd2f6ce-3453-442f-8548-f6bd9157fd4f'
        },
    ],
    setConfig:function(key,value)
    {
        this.config[key]=value;
        localStorage.setItem(PLAYER.STORAGE_KEY,JSON.stringify(this.config));
    },
    render:function()
    {
        const htmls=this.songs.map((song,index)=>
            {
                return `
                 <div class="song ${index===this.currentIndex ? 'active' : ''}" data-index="${index}">
                     <div class="thumb" style="background-image: url('${song.image}')"> </div>
                     <div class="body">
                       <h3 class="title">${song.name}</h3>
                       <p class="author">${song.singer}</p>
                    </div>
                   <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                  </div>
                </div>

                `
            })
            playlist.innerHTML=htmls.join('');

        

    },
    defineproperties: function()
    {
        Object.defineProperty(this,'currentSong',
        {
            get: function()
            {
                return this.songs[this.currentIndex];
            },
        })
        
        
    },
    handleEvents: function()
    {
        const _this=this;
       
        const cdWidth=cd.offsetWidth;
        // xu ly phong to th nho cd

        //xu li cd quay va dung
        const cdThumbAnimate=cdThumb.animate([
            {
                transform: ' rotate(360deg)'
            }
        ],
        {
            duration:10000, //10 seconds
            interations:Infinity

        })
        cdThumbAnimate.pause();


        
        document.onscroll=function()
        {

            const scrollTop=window.scrollY || document.documentElement.scrollTop;
            const newCdWidth=cdWidth-scrollTop;
            

            cd.style.width=newCdWidth > 0 ? newCdWidth +'px' : 0;
            cd.style.opacity=newCdWidth / cdWidth;
          
        }
        // xu li khi click play
        playBtn.onclick=function()
        {
            if(_this.isPlaying)
            {
                // _this.isPlaying=false;
                // audio.pause();
                // player.classList.remove('playing');
                audio.pause();
            }
            else
            {
                audio.play();
             
            } 
            

        }
        // console.log(cdThumbAnimate);
        // khi bai hat duoc play
        audio.onplay=function()
        {
            _this.isPlaying=true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        },
        // khi bi pause
        audio.onpause=function()
        {
            _this.isPlaying=false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        },
        // khi tien do bai hat thya doi
        audio.ontimeupdate=function()
        {
            if(audio.duration)
            {
                const progressPercent=Math.floor(audio.currentTime / audio.duration *100);
                progress.value=progressPercent;
            }
            
        }
        // xu ly khi tua song
        progress.oninput=function(e)
        {
            // console.log(audio.duration/ 100 *  e.target.value );
            const seekTime=audio.duration /100 * e.target.value;
            audio.currentTime=seekTime;

        }
        // next song
        nextBtn.onclick=function()
        {
            if(_this.isRandom)
            {
                _this.playRandomSong();
            }else{
                _this.nextSong();
            }
            _this.nextSong();
            audio.play();
            _this.render();
            _this.scrollToActiveSong();

        }
          

        // khi preve xong
        prevBtn.onclick=function()
        {
            // _this.prevSong();
            // audio.play();
            if(_this.isRandom)
            {
                _this.playRandomSong();
            }
            else{
                _this.prevSong();
            }
            audio.play();
            _this.render();

        }
        // ran dom bat va tat random
        randomBtn.onclick=function(e)
        {
            _this.isRandom=!_this.isRandom;
            _this.setConfig('isRandom',_this.isRandom);

             randomBtn.classList.toggle('active',_this.isRandom);


        }

        //xu li next thi audio endded
        audio.onended=function()
        {
            if(_this.isReapeat)
            {
                audio.play();
            }
            else{
                nextBtn.click();
            }
          
        }
         // lang nghe hanh vi click vao playlist
        playlist.onclick=function(e)
        {
            const songNode=e.target.closest('.song:not(.active)');
            // xu li khi click vao song        
            if(songNode || e.target.closest('option'))
            {
                // song
                if(songNode)
                {
                    _this.currentIndex=Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    audio.play();
                    _this.render();
                 

                    

                };
                // option
                if(e.target.closest('.option'))
                {

                }
                
              
            
            }
        }
      
       

        // xu li repeat bai hat 
        repeatBtn.onclick=function()
        {
            _this.isReapeat=!_this.isReapeat;
            _this.setConfig('isReapeat',_this.isReapeat);
            repeatBtn.classList.toggle('active',_this.isReapeat);

        }


       
        

        

        
    },
    // bien thanh bai khac
    nextSong: function()
    {
        this.currentIndex++;
        if(this.currentIndex>=this.songs.length)
        {
            this.currentIndex=0;
        }
        this.loadCurrentSong();

    },
    prevSong:function()
    {
        this.currentIndex--;
        if(this.currentIndex<0)
        {
            this.currentIndex=this.songs.length-1;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function()
    {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }
        while (newIndex === this.currentIndex);
        this.currentIndex=newIndex;
        this.loadCurrentSong();
  
    },
    scrollToActiveSong: function()
    {
        setTimeout(()=>
        {
            $('.song.active').scrollIntoView({
                behavior:'smooth',
                block:'center'});
        },500);
    },
    loadConfig:function()
    {
        this.isRandom=this.config.isRandom;
        this.isReapeat=this.config.isRepeat;

    },



  

    
    loadCurrentSong: function()
    {
        

        heading.textContent=this.currentSong.name;
        cdThumb.style.backgroundImage=`url('${this.currentSong.image}')`;
        audio.src=this.currentSong.path;
       


        

    },

  
    start: function()
    {
        // gan cau hinh tu config vao ob
        this.loadConfig();
        // định nghĩa các thuộc tính cho object
        this.defineproperties();

        // lắng nghe các sự kiện dom
        this.handleEvents();

        //render play list
        
        this.render();
        
        // tải thông tin bài hat
        this.loadCurrentSong();
          randomBtn.classList.toggle("active", this.isRandom);
          repeatBtn.classList.toggle("active", this.isRepeat);
          


    }

}
app.start();

