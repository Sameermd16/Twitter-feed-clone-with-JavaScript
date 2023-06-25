//.forEach() to iterate over arrays
//generate uuid
//textarea, data attributes
//conditionally render styles
//not operator !

import {tweetsData} from './data.js'


const tweetInput = document.getElementById("tweet-input")


document.addEventListener('click', (e) => {
    if(e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    } else if (e.target.dataset.retweet) {
        handleRetweetsClick(e.target.dataset.retweet)
    } else if (e.target.dataset.reply) {
        // console.log(e.target.dataset.reply)
        handleReplyClick(e.target.dataset.reply)
    } else if (e.target.id === 'tweet-btn') {
        handleTweetBtnClick() 
    }
})

function handleLikeClick(tweetId) {
    // console.log(tweetId) 
    const targetTweetObj = tweetsData.filter((object) => {
        return object.uuid === tweetId
    })[0]
    if(targetTweetObj.isLiked) {
        targetTweetObj.likes--
        targetTweetObj.isLiked = false
    } else {
        targetTweetObj.likes++
        targetTweetObj.isLiked = true
    }
    // targetTweetObj.isLiked = !targetTweetObj.isLiked
    // console.log(targetTweetObj)
    render()
}

function handleRetweetsClick(tweetId) {
    const targetTweetObj = tweetsData.filter((object) => {
        return object.uuid === tweetId
    })[0]
    if(!targetTweetObj.isRetweeted) {
        targetTweetObj.retweets++
        targetTweetObj.isRetweeted = true
    }else {
        targetTweetObj.retweets--
        targetTweetObj.isRetweeted = false
    }
    // targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    // console.log(targetTweetObj)
    render()
}

function handleReplyClick(tweetId) {
    const targetTweetObj = tweetsData.filter((object) => {
        return object.uuid === tweetId
    })[0]
    // console.log(targetTweetObj)
    document.getElementById(`replies-${tweetId}`).classList.toggle('hidden')
    // if (targetTweetObj.replies.length > 0) {
    //     //show the replies div
    // } else {
    //     //keep hiding the replies div
    // }
}

function handleTweetBtnClick() {
    console.log(tweetInput.value)
}

function getFeedHtml() {
    let feedHtml = ''
    // for(let eachObject of tweetsData) {
    //      feedHtml += `
    //         <div class="tweet">
    //             <div class="tweet-inner">
    //                 <img src="${eachObject.profilePic}" class="profile-pic">
    //                 <div>
    //                     <p class="handle">${eachObject.handle}</p>
    //                     <p class="tweet-text">${eachObject.tweetText}</p>
    //                     <div class="tweet-details">
    //                         <span class="tweet-detail">
    //                             ${eachObject.replies.length} 
    //                         </span>
    //                         <span class="tweet-detail">
    //                             ${eachObject.likes}
    //                         </span>
    //                         <span class="tweet-detail">
    //                             ${eachObject.retweets}
    //                         </span>
    //                     </div>   
    //                 </div>            
    //             </div>
    //         </div>         
    //     `
    // }
    
    tweetsData.forEach((eachObject) => {
        let heartClass = ''
        let retweetClass = ''

        if (eachObject.isLiked) {
            heartClass = 'liked'
        } else if (eachObject.isRetweeted) {
            retweetClass = 'retweeted'
        }
        let repliesHtml = ''
        let repliesClass = ''
        if(eachObject.replies.length > 0) {
            eachObject.replies.forEach((object) => {
                // console.log(object)
                repliesHtml += `
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${object.profilePic}" class="profile-pic">
                                <div>
                                    <p class="handle">${object.handle}</p>
                                    <p class="tweet-text">${object.tweetText}</p>
                                </div>
                        </div>
                    </div>
                `
            })
        }
        
        feedHtml += `
             <div class="tweet">
                 <div class="tweet-inner">
                     <img src="${eachObject.profilePic}" class="profile-pic">
                     <div>
                         <p class="handle">${eachObject.handle}</p>
                         <p class="tweet-text">${eachObject.tweetText}</p>
                         <div class="tweet-details">
                             <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots" data-reply="${eachObject.uuid}"></i>
                                 ${eachObject.replies.length} 
                             </span>
                             <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${heartClass}" data-like="${eachObject.uuid}"></i>
                                 ${eachObject.likes}
                             </span>
                             <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetClass}" data-retweet="${eachObject.uuid}"></i>
                                 ${eachObject.retweets}
                             </span>
                         </div>   
                     </div>            
                 </div>
                 <div id="replies-${eachObject.uuid}" class="${repliesClass}">
                    ${repliesHtml}
                 </div>
             </div>         
         `
    })
    // console.log(feedHtml)
    return feedHtml
}
// getFeedHtml()
{/* <div class="tweet">
    <div class="tweet-inner">
        <img src="URL OF PROFILE PIC" class="profile-pic">
        <div>
            <p class="handle">TWEET HANDLE</p>
            <p class="tweet-text">TWEET TEXT</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    NUMBER OF REPLIES
                </span>
                <span class="tweet-detail">
                    NUMBER OF LIKES
                </span>
                <span class="tweet-detail">
                    NUMBER OF RETWEETS
                </span>
            </div>   
        </div>            
    </div>
</div> */}

function render() {
    document.getElementById('feed').innerHTML = getFeedHtml()
}
render()