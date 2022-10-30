import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const tweetsData = [
    {
        handle: `@TrollBot66756542 💎`,
        profilePic: `images/troll.jpg`,
        likes: 27,
        retweets: 10,
        tweetText: `Buy Bitcoin, ETH Make 💰💰💰 low low prices. 
            Guaranteed return on investment. HMU DMs open!!`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: '4b161eee-c0f5-4545-9c4b-8562944223ee',
    },
    {
        handle: `@Elon ✅`,
        profilePic: `images/musk.png`,
        likes: 6500,
        retweets: 234,
        tweetText: `I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀`,
        replies: [
            {
                handle: `@TomCruise ✅`,
                profilePic: `images/tcruise.png`,
                tweetText: `Yes! Sign me up! 😎🛩`,
            },
            {
                handle: `@ChuckNorris ✅`,
                profilePic: `images/chucknorris.jpeg`,
                tweetText: `I went last year😴`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '3c23454ee-c0f5-9g9g-9c4b-77835tgs2',
    },
    {
        handle: `@NoobCoder12`,
        profilePic: `images/flower.png`,
        likes: 10,
        retweets: 3,
        tweetText: `Are you a coder if you only know HTML?`,
        replies: [
            {
                handle: `@StackOverflower ☣️`,
                profilePic: `images/overflow.png`,
                tweetText: `No. Onviosuly not. Go get a job in McDonald's.`,
            },
            {
                handle: `@YummyCoder64`,
                profilePic: `images/love.png`,
                tweetText: `You are wonderful just as you are! ❤️`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '8hy671sff-c0f5-4545-9c4b-1237gyys45',
    },
]


function getFeedHtml() {
    let feedHtml = ``

    tweetsData.forEach(function (tweets) {
        let likedClass = ``
        let retweetClass = ``

        if (tweets.isLiked) {
            likedClass = `liked`
        }
        if (tweets.isRetweeted) {
            retweetClass = `retweeted`
        }

        let repliesHtml = ``
        if(tweets.replies.length > 0){
            tweets.replies.forEach(function(reply){
                repliesHtml += `<div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
            </div>`
            })
        }

        feedHtml += `<div class="tweet">
        <div class="tweet-inner">
            <img src="${tweets.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweets.handle}</p>
                <p class="tweet-text">${tweets.tweetText}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots" data-reply="${tweets.uuid}"></i>
                    ${tweets.replies.length}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likedClass}" data-like="${tweets.uuid}"></i>
                    ${tweets.likes}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetClass}" data-retweet="${tweets.uuid}"></i>
                    ${tweets.retweets}
                    </span>
                </div>   
            </div>            
        </div>
        <div class="hidden" id="replies-${tweets.uuid}">
       ${repliesHtml} 
    </div> 
    </div>`
    })
    return feedHtml
}


function render() {
    const feed = document.getElementById('feed')
    feed.innerHTML = getFeedHtml()
}
render()


document.addEventListener("click", function (e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    } else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    } else if (e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    } else if (e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
})


function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid.includes(tweetId)
    })[0]
    if (!targetTweetObj.isLiked) {
        targetTweetObj.likes++
    } else {
        targetTweetObj.likes--
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}


function handleRetweetClick(retweetId) {
    const targetRetweetObj = tweetsData.filter(function (retweet) {
        return retweet.uuid.includes(retweetId)
    })[0]

    if (!targetRetweetObj.isRetweeted) {
        targetRetweetObj.retweets++
    } else {
        targetRetweetObj.retweets--
    }
    targetRetweetObj.isRetweeted = !targetRetweetObj.isRetweeted
    render()
}


function handleReplyClick(commentId){
    const replyDiv = document.getElementById(`replies-${commentId}`)
    replyDiv.classList.toggle('hidden')
}


function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')

    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
            })
            render()
            tweetInput.value = ``
    } 
    }
    

 

 


